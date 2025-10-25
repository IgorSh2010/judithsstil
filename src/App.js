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

export default function App(){
  return (
    <Router>          
      <Navbar />        
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/productsMain" element={<ProductsMain />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/AuthPage" element={<AuthPage />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin/products" element={<AdminProtectedRoute><ProductCMS /></AdminProtectedRoute>} />
        <Route path="/admin/settings" element={<AdminProtectedRoute><Settings /></AdminProtectedRoute>} />
      </Routes>

      <Footer />
    </Router>
  )
}