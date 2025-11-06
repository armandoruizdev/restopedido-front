import { Link, NavLink } from 'react-router-dom'
import { useCartStore } from '@/store/cartStore'

export default function Layout({ children }: { children: React.ReactNode }) {
  const totalQuantity = useCartStore(s => s.totalQuantity)
  return (
    <div className="min-h-screen">
      <header className="border-b">
        <div className="container mx-auto flex items-center justify-between p-4">
          <Link to="/" className="font-semibold">RESTOPEDIDO</Link>
          <nav className="flex items-center gap-4 text-sm">
            <NavLink to="/menu" className={({ isActive }) => isActive ? 'font-medium' : ''}>Menú</NavLink>
            <NavLink to="/cart" className={({ isActive }) => isActive ? 'font-medium' : ''}>
              Carrito{totalQuantity > 0 ? ` (${totalQuantity})` : ''}
            </NavLink>
          </nav>
        </div>
      </header>
      <main>{children}</main>
    </div>
  )
}


