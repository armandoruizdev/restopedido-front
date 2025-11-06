import { useNavigate, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import httpClient from '@/lib/axios'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/store/authStore'

const schema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
})

type FormValues = z.infer<typeof schema>

export default function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation() as any
  const login = useAuthStore(s => s.login)
  const from = location.state?.from?.pathname || '/'

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '' },
  })

  const mutation = useMutation({
    mutationFn: async (values: FormValues) => {
      const { data } = await httpClient.post('/api/auth/login', values)
      return data
    },
    onSuccess: (data) => {
      // Se asume que la API devuelve el usuario en data.user
      login({ id: String(data.user.id), name: data.user.name, email: data.user.email, role: data.user.role })
      navigate(from, { replace: true })
    },
  })

  return (
    <div className="container mx-auto max-w-sm p-6">
      <h1 className="text-2xl font-semibold">Login</h1>
      <p className="text-muted-foreground mt-2">Ingresa tus credenciales para continuar.</p>

      <form onSubmit={handleSubmit(values => mutation.mutate(values))} className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input type="email" className="mt-1 w-full rounded-md border px-3 py-2" placeholder="tu@email"
                 {...register('email')} />
          {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">Password</label>
          <input type="password" className="mt-1 w-full rounded-md border px-3 py-2" placeholder="••••••"
                 {...register('password')} />
          {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>}
        </div>
        {mutation.isError && (
          <p className="text-sm text-red-600">Credenciales inválidas o error de servidor.</p>
        )}
        <Button disabled={isSubmitting || mutation.isPending} className="w-full" type="submit">
          {mutation.isPending ? 'Ingresando...' : 'Ingresar'}
        </Button>
      </form>
    </div>
  )
}


