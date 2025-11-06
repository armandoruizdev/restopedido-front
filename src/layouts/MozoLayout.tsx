import { Outlet, Link } from 'react-router-dom'

export default function MozoLayout() {
  return (
    <div className="min-h-screen">
      <header className="border-b">
        <div className="container mx-auto flex items-center justify-between p-4">
          <Link to="/mozo" className="font-semibold">Panel Mozo</Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link to="/">Volver a público</Link>
          </nav>
        </div>
      </header>
      <main className="container mx-auto p-6">
        <Outlet />
      </main>
    </div>
  )
}


