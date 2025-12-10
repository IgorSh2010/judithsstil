import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProductsMain from './pages/ProductsMain'
import HomePage from './pages/HomePage'
import ProductDetail from './pages/ProductDetail'
import AboutUs from './pages/AboutUs'
import AuthPage from './pages/AuthPage'
import Profile from './components/AccountData'
import AdminProtectedRoute from './components/AdminProtectedRoute'
import ProductCMS from './pages/ProductsCMS'
import Settings from './pages/Settings'
import ProductEdit from './pages/ProductEdit'
import ClientsOrders from './pages/ClientsOrders'
import ClientOrderDetail from './pages/ClientOrderDetails'
import AdminOrders from './pages/AdminOrders'
import AdminOrderDetails from './pages/AdminOrderDetails'
import CartPage from './pages/CartPage';
import Conversations from './pages/Conversations'
import ConversationsDetails from './pages/ConversationsDetails'
import Regulamin from './pages/Regulamin'
import PolitykaPrywatnosci from './pages/PolitykaPrywatnosci'
import { CartProvider } from './contexts/CartActions'

export default function App(){
  return (
    <CartProvider>
    <Router>          
      <Navbar />        
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/productsMain" element={<ProductsMain />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/AuthPage" element={<AuthPage />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/Regulamin" element={<Regulamin />} />
        <Route path="/PolitykaPrywatnosci" element={<PolitykaPrywatnosci />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/CartPage" element={<CartPage />} />
        <Route path="/clientsOrders" element={<ClientsOrders />} />
        <Route path="/clientsOrders/:id" element={<ClientOrderDetail />} />
        <Route path="/conversations" element={<Conversations />} />
        <Route path="/conversations/:id" element={<ConversationsDetails />} />
        <Route path="/admin/orders" element={<AdminProtectedRoute><AdminOrders /></AdminProtectedRoute>} />
        <Route path="/admin/orders/:id" element={<AdminProtectedRoute><AdminOrderDetails /></AdminProtectedRoute>} />
        <Route path="/admin/products" element={<AdminProtectedRoute><ProductCMS /></AdminProtectedRoute>} />
        <Route path="/admin/settings" element={<AdminProtectedRoute><Settings /></AdminProtectedRoute>} />
        <Route path="/admin/products/:id/edit" element={<AdminProtectedRoute><ProductEdit /></AdminProtectedRoute>} />
      </Routes>

      <Footer />
    </Router>
    </CartProvider>
  )
}