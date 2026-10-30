import { useState } from 'react'
import { useAuth } from '../auth/AuthContext.js'
import avatars, { avatarIcon } from '../auth/avatars.js'
import AccountShell from '../components/AccountShell.jsx'

// Runs an async form action and tracks its busy / error / success state.
function useFormAction(action, successMessage) {
  const [status, setStatus] = useState({ busy: false, error: '', done: '' })

  async function onSubmit(e) {
    e.preventDefault()
    const form = e.currentTarget
    setStatus({ busy: true, error: '', done: '' })
    try {
      await action(Object.fromEntries(new FormData(form)), form)
      setStatus({ busy: false, error: '', done: successMessage })
    } catch (err) {
      setStatus({ busy: false, error: err.message, done: '' })
    }
  }

  return [status, onSubmit]
}

function Status({ error, done }) {
  if (error) return <p className="account-error" role="alert">{error}</p>
  if (done) return <p className="account-success" role="status">{done}</p>
  return null
}

function DetailsForm({ user, updateProfile }) {
  const [status, onSubmit] = useFormAction(updateProfile, 'Saved. Looking sharp!')

  return (
    <form className="account-form" onSubmit={onSubmit}>
      <h2 className="account-section">Your details</h2>
      <label>
        Name
        <input name="name" defaultValue={user.name} autoComplete="name" maxLength={60} required />
      </label>
      <label>
        Cowboy nickname <span className="account-hint">(optional)</span>
        <input name="nickname" defaultValue={user.nickname} maxLength={40} placeholder="e.g. Dusty" />
      </label>

      <fieldset className="badge-picker">
        <legend>Badge</legend>
        {Object.entries(avatars).map(([key, a]) => (
          <label key={key} className="badge-option" title={a.label}>
            <input type="radio" name="avatar" value={key} defaultChecked={user.avatar === key} />
            <span aria-hidden="true">{a.icon}</span>
            <span className="visually-hidden">{a.label}</span>
          </label>
        ))}
      </fieldset>

      <Status {...status} />
      <button className="account-button" type="submit" disabled={status.busy}>
        {status.busy ? 'Saving…' : 'Save details'}
      </button>
    </form>
  )
}

function PasswordForm({ changePassword }) {
  const [status, onSubmit] = useFormAction(async ({ confirm, ...fields }, form) => {
    if (fields.newPassword !== confirm) throw new Error('The two new passwords don’t match.')
    await changePassword(fields)
    form.reset()
  }, 'Password changed. Other devices have been signed out.')

  return (
    <form className="account-form" onSubmit={onSubmit}>
      <h2 className="account-section">Change password</h2>
      <label>
        Current password
        <input name="currentPassword" type="password" autoComplete="current-password" required />
      </label>
      <label>
        New password
        <input name="newPassword" type="password" autoComplete="new-password" minLength={8} required />
        <span className="account-hint">At least 8 characters.</span>
      </label>
      <label>
        Repeat new password
        <input name="confirm" type="password" autoComplete="new-password" minLength={8} required />
      </label>

      <Status {...status} />
      <button className="account-button account-button--plain" type="submit" disabled={status.busy}>
        {status.busy ? 'Changing…' : 'Change password'}
      </button>
    </form>
  )
}

function Profile() {
  const { user, loading, logout, updateProfile, changePassword } = useAuth()

  if (loading) {
    return (
      <AccountShell kicker="One moment" title="Fetching your papers…">
        <p className="account-note">Loading your profile.</p>
      </AccountShell>
    )
  }

  if (!user) {
    return (
      <AccountShell kicker="Hold your horses" title="Members only">
        <p className="account-note">
          You need to be signed in to see your profile. <a href="#/login">Sign in</a> or{' '}
          <a href="#/register">register</a>.
        </p>
      </AccountShell>
    )
  }

  const since = new Date(`${user.createdAt.replace(' ', 'T')}Z`).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
  })

  async function onLogout() {
    await logout()
    window.location.hash = '#/'
  }

  return (
    <AccountShell kicker="Ranch papers" title="Your Profile" wide>
      <div className="profile-id">
        <span className="profile-id__badge" aria-hidden="true">{avatarIcon(user.avatar)}</span>
        <div>
          <p className="profile-id__name">
            {user.name}
            {user.nickname && <span> “{user.nickname}”</span>}
          </p>
          <p className="profile-id__meta">
            {user.email} · Riding with us since {since}
          </p>
        </div>
        <button type="button" className="account-button account-button--plain" onClick={onLogout}>
          Sign out
        </button>
      </div>

      <div className="profile-grid">
        <DetailsForm key={user.id} user={user} updateProfile={updateProfile} />
        <PasswordForm changePassword={changePassword} />
      </div>
    </AccountShell>
  )
}

export default Profile
