import { createBrowserRouter } from 'react-router-dom'
import PublicLayout from '@/layouts/PublicLayout'
import MozoLayout from '@/layouts/MozoLayout'
import AdminLayout from '@/layouts/AdminLayout'
import ProtectedRoute from '@/components/routing/ProtectedRoute'
import HomePage from '@/pages/HomePage'
import MenuPage from '@/pages/MenuPage'
import CartPage from '@/pages/CartPage'
import CheckoutPage from '@/pages/CheckoutPage'
import LoginPage from '@/features/auth/LoginPage'
import MozoHome from '@/features/menu/MozoHome'
import AdminHome from '@/features/orders/AdminHome'
import AdminCategoriesPage from '@/features/categories/AdminCategoriesPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'menu', element: <MenuPage /> },
      { path: 'cart', element: <CartPage /> },
      { path: 'checkout', element: <CheckoutPage /> },
      { path: 'login', element: <LoginPage /> },
    ],
  },
  {
    path: '/mozo',
    element: (
      <ProtectedRoute role="mozo">
        <MozoLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <MozoHome /> },
    ],
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute role="admin">
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <AdminHome /> },
      { path: 'categories', element: <AdminCategoriesPage /> },
    ],
  },
])

export default router


