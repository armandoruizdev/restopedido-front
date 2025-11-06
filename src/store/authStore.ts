import { create } from 'zustand'

export type AuthUser = {
  id: string
  name: string
  email: string
  role?: string
}

type AuthState = {
  user: AuthUser | null
  isAuthenticated: boolean
  role: string | null
  login: (user: AuthUser) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  role: null,
  login: (user) => set({ user, isAuthenticated: true, role: user.role ?? null }),
  logout: () => set({ user: null, isAuthenticated: false, role: null }),
}))


