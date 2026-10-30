import { useState } from 'react'
import { useAuth } from '../auth/AuthContext.js'
import AccountShell from '../components/AccountShell.jsx'

function Login() {
  const { user, login } = useAuth()
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    setBusy(true)
    try {
      await login(Object.fromEntries(new FormData(e.currentTarget)))
      window.location.hash = '#/'
    } catch (err) {
      setError(err.message)
      setBusy(false)
    }
  }

  if (user) {
    return (
      <AccountShell kicker="Howdy" title="Already in the saddle">
        <p className="account-note">
          You’re signed in as <strong>{user.name}</strong>. <a href="#/profile">Go to your profile →</a>
        </p>
      </AccountShell>
    )
  }

  return (
    <AccountShell kicker="Welcome back, partner" title="Saddle Up">
      <form className="account-form" onSubmit={onSubmit}>
        <label>
          Email
          <input name="email" type="email" autoComplete="email" required />
        </label>
        <label>
          Password
          <input name="password" type="password" autoComplete="current-password" required />
        </label>

        {error && <p className="account-error" role="alert">{error}</p>}

        <button className="account-button" type="submit" disabled={busy}>
          {busy ? 'Riding in…' : 'Sign in'}
        </button>
      </form>
      <p className="account-switch">
        New in town? <a href="#/register">Register an account</a>
      </p>
    </AccountShell>
  )
}

export default Login
