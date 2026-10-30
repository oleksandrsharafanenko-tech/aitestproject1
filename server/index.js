import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import express from 'express'
import db from './db.js'
import {
  SESSION_COOKIE,
  clearFailures,
  cookieOptions,
  createSession,
  deleteOtherSessions,
  deleteSession,
  findSessionUser,
  hashPassword,
  isLockedOut,
  purgeExpiredSessions,
  readCookie,
  recordFailure,
  verifyDummy,
  verifyPassword,
} from './auth.js'

const PORT = Number(process.env.PORT) || 3001
const AVATARS = ['hat', 'horse', 'bull', 'cactus', 'star', 'guitar', 'eagle', 'boot']

const app = express()
app.disable('x-powered-by')
app.use(express.json({ limit: '10kb' }))

// Every change must be sent as JSON. Browsers can't send cross-site JSON
// without permission, which adds a second layer of CSRF protection.
app.use((req, res, next) => {
  // (req.is() is null when there's no body at all, e.g. logout.)
  if (req.method !== 'GET' && req.is('application/json') === false) {
    return res.status(415).json({ error: 'Requests must be JSON.' })
  }
  req.body ??= {}
  next()
})

// ---- helpers ---------------------------------------------------------------

// Only these fields ever leave the server (never the password hash).
const publicUser = (u) => ({
  id: u.id,
  email: u.email,
  name: u.name,
  nickname: u.nickname,
  avatar: u.avatar,
  createdAt: u.created_at,
})

const fail = (res, status, error) => res.status(status).json({ error })

const text = (v) => (typeof v === 'string' ? v.trim() : '')
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function checkPassword(password) {
  if (typeof password !== 'string' || password.length < 8) {
    return 'Password must be at least 8 characters.'
  }
  if (password.length > 200) return 'Password is too long.'
  return null
}

function startSession(res, userId) {
  res.cookie(SESSION_COOKIE, createSession(userId), cookieOptions)
}

// Attaches req.user if the session cookie is valid.
app.use((req, _res, next) => {
  req.sessionToken = readCookie(req, SESSION_COOKIE)
  req.user = findSessionUser(req.sessionToken)
  next()
})

const requireUser = (req, res, next) =>
  req.user ? next() : fail(res, 401, 'Please sign in first.')

// ---- auth routes -----------------------------------------------------------

app.post('/api/auth/register', async (req, res) => {
  const name = text(req.body.name)
  const email = text(req.body.email).toLowerCase()
  const { password } = req.body

  if (!name || name.length > 60) return fail(res, 400, 'Please enter your name (up to 60 characters).')
  if (!EMAIL_RE.test(email) || email.length > 254) return fail(res, 400, 'Please enter a valid email.')
  const problem = checkPassword(password)
  if (problem) return fail(res, 400, problem)

  if (db.prepare('SELECT 1 FROM users WHERE email = ?').get(email)) {
    return fail(res, 409, 'An account with this email already exists.')
  }

  const { lastInsertRowid } = db
    .prepare('INSERT INTO users (email, password_hash, name) VALUES (?, ?, ?)')
    .run(email, await hashPassword(password), name)

  startSession(res, lastInsertRowid)
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(lastInsertRowid)
  res.status(201).json({ user: publicUser(user) })
})

app.post('/api/auth/login', async (req, res) => {
  const email = text(req.body.email).toLowerCase()
  const password = typeof req.body.password === 'string' ? req.body.password : ''
  const limitKey = `${req.ip}|${email}`

  if (isLockedOut(limitKey)) {
    return fail(res, 429, 'Too many failed attempts. Try again in 15 minutes.')
  }

  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email)
  const ok = user ? await verifyPassword(password, user.password_hash) : await verifyDummy(password)

  if (!ok) {
    recordFailure(limitKey)
    return fail(res, 401, 'Wrong email or password.')
  }

  clearFailures(limitKey)
  startSession(res, user.id)
  res.json({ user: publicUser(user) })
})

app.post('/api/auth/logout', (req, res) => {
  deleteSession(req.sessionToken)
  res.clearCookie(SESSION_COOKIE, { ...cookieOptions, maxAge: undefined })
  res.json({ ok: true })
})

app.get('/api/auth/me', (req, res) => {
  res.json({ user: req.user ? publicUser(req.user) : null })
})

// ---- profile routes --------------------------------------------------------

app.patch('/api/profile', requireUser, (req, res) => {
  const name = text(req.body.name)
  const nickname = text(req.body.nickname)
  const avatar = text(req.body.avatar)

  if (!name || name.length > 60) return fail(res, 400, 'Please enter your name (up to 60 characters).')
  if (nickname.length > 40) return fail(res, 400, 'Nickname can be up to 40 characters.')
  if (!AVATARS.includes(avatar)) return fail(res, 400, 'Please pick one of the badges.')

  db.prepare('UPDATE users SET name = ?, nickname = ?, avatar = ? WHERE id = ?').run(
    name,
    nickname,
    avatar,
    req.user.id,
  )
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.user.id)
  res.json({ user: publicUser(user) })
})

app.post('/api/profile/password', requireUser, async (req, res) => {
  const { currentPassword, newPassword } = req.body

  if (typeof currentPassword !== 'string' || !(await verifyPassword(currentPassword, req.user.password_hash))) {
    return fail(res, 400, 'Your current password is not correct.')
  }
  const problem = checkPassword(newPassword)
  if (problem) return fail(res, 400, problem)

  db.prepare('UPDATE users SET password_hash = ? WHERE id = ?').run(await hashPassword(newPassword), req.user.id)
  deleteOtherSessions(req.user.id, req.sessionToken)
  res.json({ ok: true })
})

app.use('/api', (_req, res) => fail(res, 404, 'Not found.'))

// ---- production: also serve the built site from dist/ ----------------------

const dist = fileURLToPath(new URL('../dist/', import.meta.url))
if (existsSync(dist)) app.use(express.static(dist))

// Unexpected errors: log them, but don't leak details to the browser.
app.use((err, _req, res, _next) => {
  if (err.status >= 400 && err.status < 500) return fail(res, err.status, 'Bad request.')
  console.error(err)
  fail(res, 500, 'Something went wrong.')
})

purgeExpiredSessions()
setInterval(purgeExpiredSessions, 60 * 60 * 1000).unref()

app.listen(PORT, () => console.log(`API ready on http://localhost:${PORT}`))
