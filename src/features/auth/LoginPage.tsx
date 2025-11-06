import LoginForm from './components/LoginForm'

export default function LoginPage() {
  return (
    <div className="container mx-auto max-w-sm p-6">
      <h1 className="text-2xl font-semibold">Login</h1>
      <p className="text-muted-foreground mt-2">Ingresa tus credenciales para continuar.</p>
      <div className="mt-6">
        <LoginForm />
      </div>
    </div>
  )
}


