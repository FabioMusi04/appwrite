import { createRoot } from 'react-dom/client'
import './index.css'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from './pages/auth';
import { UserProvider } from './components/authcontext';
import PrivateRoute from './components/privateroute';
import Navbar from './components/navbar';
import ProductsPage from './pages/products';
import AdminProductsPage from './pages/backoffice/productsCRUD';
import AdminUsersPage from './pages/backoffice/usersCRUD';
import ProductDetailPage from './pages/product';
import CartPage from './pages/cart';

createRoot(document.getElementById('root')!).render(
  <div className="flex flex-col w-full min-h-screen">
    <Router>
      <UserProvider>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/products" element={<><Navbar /><PrivateRoute><ProductsPage /></PrivateRoute></>} />
          <Route path="/handleproducts" element={<><Navbar /><PrivateRoute roles={['admin']}><AdminProductsPage /></PrivateRoute></>} />
          <Route path="/handleusers" element={<><Navbar /><PrivateRoute  roles={['admin']}><AdminUsersPage /></PrivateRoute></>} />
          <Route path="/" element={<div>Home</div>} />
          <Route path="/product/:productId" element={ <><Navbar /><PrivateRoute ><ProductDetailPage/></PrivateRoute></> }/>
          <Route path="/cart"  element={ <><Navbar /><PrivateRoute ><CartPage/></PrivateRoute></> } />
          <Route path="*" element={<div>404</div>} />
        </Routes>
      </UserProvider>
    </Router>
  </div>
)
