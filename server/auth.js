import { createHash, randomBytes, scrypt, timingSafeEqual } from 'node:crypto'
import { promisify } from 'node:util'
import db from './db.js'

const scryptAsync = promisify(scrypt)

export const SESSION_COOKIE = 'sid'
export const SESSION_DAYS = 30
const SESSION_MS = SESSION_DAYS * 24 * 60 * 60 * 1000

// ---- passwords -------------------------------------------------------------
// Stored as "scrypt$<salt>$<hash>". scrypt is deliberately slow, so guessing
// passwords from a stolen database is expensive.

export async function hashPassword(password) {
  const salt = randomBytes(16)
  const hash = await scryptAsync(password.normalize('NFKC'), salt, 64)
  return `scrypt$${salt.toString('base64')}$${hash.toString('base64')}`
}

export async function verifyPassword(password, stored) {
  const [, saltB64, hashB64] = stored.split('$')
  const expected = Buffer.from(hashB64, 'base64')
  const actual = await scryptAsync(password.normalize('NFKC'), Buffer.from(saltB64, 'base64'), 64)
  return timingSafeEqual(actual, expected)
}

// Used when the email doesn't exist, so a failed login takes the same time
// either way and doesn't reveal which emails are registered.
const DUMMY_HASH = await hashPassword('not-a-real-password')
export const verifyDummy = (password) => verifyPassword(password, DUMMY_HASH)

// ---- sessions --------------------------------------------------------------

const sha256 = (s) => createHash('sha256').update(s).digest('hex')

export function createSession(userId) {
  const token = randomBytes(32).toString('base64url')
  db.prepare('INSERT INTO sessions (token_hash, user_id, expires_at) VALUES (?, ?, ?)').run(
    sha256(token),
    userId,
    Date.now() + SESSION_MS,
  )
  return token
}

export function findSessionUser(token) {
  if (!token) return null
  const row = db
    .prepare(
      `SELECT users.* FROM sessions JOIN users ON users.id = sessions.user_id
       WHERE sessions.token_hash = ? AND sessions.expires_at > ?`,
    )
    .get(sha256(token), Date.now())
  return row ?? null
}

export function deleteSession(token) {
  if (token) db.prepare('DELETE FROM sessions WHERE token_hash = ?').run(sha256(token))
}

// After a password change, log the user out everywhere except this browser.
export function deleteOtherSessions(userId, keepToken) {
  db.prepare('DELETE FROM sessions WHERE user_id = ? AND token_hash != ?').run(userId, sha256(keepToken))
}

export function purgeExpiredSessions() {
  db.prepare('DELETE FROM sessions WHERE expires_at <= ?').run(Date.now())
}

// ---- cookie helpers --------------------------------------------------------

export function readCookie(req, name) {
  for (const part of (req.headers.cookie ?? '').split(';')) {
    const [key, ...rest] = part.trim().split('=')
    if (key === name) return decodeURIComponent(rest.join('='))
  }
  return null
}

export const cookieOptions = {
  httpOnly: true, // not readable from JavaScript, so XSS can't steal it
  sameSite: 'lax', // not sent on cross-site POSTs (CSRF protection)
  secure: process.env.NODE_ENV === 'production',
  path: '/',
  maxAge: SESSION_MS,
}

// ---- brute-force protection -----------------------------------------------
// At most 10 failed logins per IP + email every 15 minutes (kept in memory).

const failures = new Map()
const WINDOW_MS = 15 * 60 * 1000
const MAX_FAILURES = 10

export function isLockedOut(key) {
  const entry = failures.get(key)
  if (!entry || entry.resetAt < Date.now()) return false
  return entry.count >= MAX_FAILURES
}

export function recordFailure(key) {
  const entry = failures.get(key)
  if (!entry || entry.resetAt < Date.now()) {
    failures.set(key, { count: 1, resetAt: Date.now() + WINDOW_MS })
  } else {
    entry.count += 1
  }
}

export const clearFailures = (key) => failures.delete(key)
