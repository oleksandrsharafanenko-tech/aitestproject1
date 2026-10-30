import { useAuth } from '../auth/AuthContext.js'
import { avatarIcon } from '../auth/avatars.js'
import './AccountBadge.css'

// Wooden sign in the top-right corner: "Sign in" or the rider's badge and name.
function AccountBadge({ current }) {
  const { user, loading } = useAuth()
  if (loading) return null

  if (!user) {
    return (
      <a className="account-badge" href="#/login" aria-current={current === 'login' ? 'page' : undefined}>
        <span aria-hidden="true">🤠</span> Sign in
      </a>
    )
  }

  return (
    <a
      className="account-badge"
      href="#/profile"
      aria-current={current === 'profile' ? 'page' : undefined}
      title="Your profile"
    >
      <span aria-hidden="true">{avatarIcon(user.avatar)}</span>
      <span className="account-badge__name">{user.nickname || user.name.split(' ')[0]}</span>
    </a>
  )
}

export default AccountBadge
