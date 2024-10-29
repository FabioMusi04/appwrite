import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from './pages/auth';
import { UserProvider } from './components/authcontext';
import PrivateRoute from './components/privateroute';
import Navbar from './components/navbar';
import ProductsPage from './pages/products';
import AdminProductsPage from './pages/backoffice/productsCRUD';

createRoot(document.getElementById('root')!).render(
  <div className="flex flex-col w-full min-h-screen">
    <Router>
      <UserProvider>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<><Navbar /><PrivateRoute><ProductsPage /></PrivateRoute></>} />
          <Route path="/handleproducts" element={<><Navbar /><PrivateRoute><AdminProductsPage /></PrivateRoute></>} />
          <Route path="*" element={<div>404</div>} />
        </Routes>
      </UserProvider>
    </Router>
  </div>
)
