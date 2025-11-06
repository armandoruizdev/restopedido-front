import { useNavigate, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/store/authStore'

export default function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation() as any
  const login = useAuthStore(s => s.login)

  const from = location.state?.from?.pathname || '/'

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold">Login</h1>
      <p className="text-muted-foreground mt-2">Botones de demo para roles.</p>
      <div className="mt-4 flex gap-2">
        <Button onClick={() => { login({ id: '1', name: 'Mozo', email: 'mozo@example.com', role: 'mozo' }); navigate(from, { replace: true }) }}>Entrar como Mozo</Button>
        <Button variant="secondary" onClick={() => { login({ id: '2', name: 'Admin', email: 'admin@example.com', role: 'admin' }); navigate(from, { replace: true }) }}>Entrar como Admin</Button>
      </div>
    </div>
  )
}


