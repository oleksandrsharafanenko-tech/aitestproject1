import { createContext, useContext } from 'react'

export const AuthContext = createContext(null)

// { user, loading, register, login, logout, updateProfile, changePassword }
export const useAuth = () => useContext(AuthContext)
