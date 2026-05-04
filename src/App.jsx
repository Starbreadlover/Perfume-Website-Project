import { Routes, Route, Navigate } from 'react-router-dom'

// Layouts
import MainLayout from './components/MainLayout'
import AdminLayout from './components/AdminLayout'

// Public Pages
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import ProductDetails from './pages/ProductDetails'
import Contact from './pages/Contact'
import Checkout from './pages/Checkout'

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin'
import Dashboard from './pages/admin/Dashboard'
import ProductForm from './pages/admin/ProductForm'
import Orders from './pages/admin/Orders'

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/checkout/:id" element={<Checkout />} />
      </Route>

      <Route path="/admin/login" element={<AdminLogin />} />
      <Route element={<AdminLayout />}>
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/products/new" element={<ProductForm />} />
        <Route path="/admin/products/:id/edit" element={<ProductForm />} />
        <Route path="/admin/orders" element={<Orders />} />
      </Route>
    </Routes>
  )
}

export default App
