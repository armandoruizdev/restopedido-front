import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import httpClient from '@/lib/axios'
import { useAuthStore } from '@/store/authStore'
import type { LoginInput } from '../validation/loginSchema'

export function useLogin() {
  const navigate = useNavigate()
  const login = useAuthStore(s => s.login)

  return useMutation({
    mutationFn: async (values: LoginInput) => {
      // Sanctum flow: CSRF handled by interceptor; login to /login
      const { data } = await httpClient.post('/login', values)
      return data
    },
    onSuccess: (data: any) => {
      login({ id: String(data.user.id), name: data.user.name, email: data.user.email, role: data.user.role })
      if (data.user.role === 'admin') {
        navigate('/admin', { replace: true })
      } else if (data.user.role === 'mozo') {
        navigate('/mozo/panel', { replace: true })
      } else {
        navigate('/', { replace: true })
      }
    },
  })
}


