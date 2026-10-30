import { useEffect, useMemo, useState } from 'react'
import { api } from './api.js'
import { AuthContext } from './AuthContext.js'

// Keeps track of who is signed in. The session itself lives in an httpOnly
// cookie set by the server; we only ask the server "who am I?".
function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api('/auth/me')
      .then((data) => setUser(data.user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false))
  }, [])

  const value = useMemo(
    () => ({
      user,
      loading,
      register: async (fields) => setUser((await api('/auth/register', { method: 'POST', body: fields })).user),
      login: async (fields) => setUser((await api('/auth/login', { method: 'POST', body: fields })).user),
      logout: async () => {
        await api('/auth/logout', { method: 'POST' })
        setUser(null)
      },
      updateProfile: async (fields) => setUser((await api('/profile', { method: 'PATCH', body: fields })).user),
      changePassword: (fields) => api('/profile/password', { method: 'POST', body: fields }),
    }),
    [user, loading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
