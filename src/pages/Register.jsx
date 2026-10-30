import { useState } from 'react'
import { useAuth } from '../auth/AuthContext.js'
import AccountShell from '../components/AccountShell.jsx'

function Register() {
  const { user, register } = useAuth()
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function onSubmit(e) {
    e.preventDefault()
    const { confirm, ...fields } = Object.fromEntries(new FormData(e.currentTarget))
    if (fields.password !== confirm) {
      setError('The two passwords don’t match.')
      return
    }

    setError('')
    setBusy(true)
    try {
      await register(fields)
      window.location.hash = '#/profile'
    } catch (err) {
      setError(err.message)
      setBusy(false)
    }
  }

  if (user) {
    return (
      <AccountShell kicker="Howdy" title="You’ve already signed on">
        <p className="account-note">
          You’re signed in as <strong>{user.name}</strong>. <a href="#/profile">Go to your profile →</a>
        </p>
      </AccountShell>
    )
  }

  return (
    <AccountShell kicker="New hands wanted" title="Join the Outfit">
      <form className="account-form" onSubmit={onSubmit}>
        <label>
          Your name
          <input name="name" autoComplete="name" maxLength={60} required />
        </label>
        <label>
          Email
          <input name="email" type="email" autoComplete="email" required />
        </label>
        <label>
          Password
          <input name="password" type="password" autoComplete="new-password" minLength={8} required />
          <span className="account-hint">At least 8 characters.</span>
        </label>
        <label>
          Repeat password
          <input name="confirm" type="password" autoComplete="new-password" minLength={8} required />
        </label>

        {error && <p className="account-error" role="alert">{error}</p>}

        <button className="account-button" type="submit" disabled={busy}>
          {busy ? 'Signing you on…' : 'Create account'}
        </button>
      </form>
      <p className="account-switch">
        Already ride with us? <a href="#/login">Sign in</a>
      </p>
    </AccountShell>
  )
}

export default Register
