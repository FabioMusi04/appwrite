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
import ProfilePage from './pages/profilepage';
import HomePage from './pages/home';
import NotFound from './pages/notfound';
import OrdersPage from './pages/orders';
import AdminOrdersPage from './pages/backoffice/ordersCRUD';
import Unauthorized from './pages/unauthorized';
import AboutPage from './pages/about';

createRoot(document.getElementById('root')!).render(
  <div className="flex flex-col w-full min-h-screen">
    <Router>
      <UserProvider>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/me"  element={ <><Navbar /><PrivateRoute ><ProfilePage/></PrivateRoute></> } />
          <Route path="/products" element={<><Navbar /><PrivateRoute><ProductsPage /></PrivateRoute></>} />
          <Route path="/" element={<HomePage/>} />
          <Route path="/about" element={<><Navbar /><AboutPage/></>} />
          <Route path="/product/:productId" element={ <><Navbar /><PrivateRoute ><ProductDetailPage/></PrivateRoute></> }/>
          <Route path="/cart"  element={ <><Navbar /><PrivateRoute ><CartPage/></PrivateRoute></> } />
          <Route path="/myorders" element={ <><Navbar /><PrivateRoute ><OrdersPage/></PrivateRoute></> } />
          <Route path="/handleproducts" element={<><Navbar /><PrivateRoute roles={['admin']}><AdminProductsPage /></PrivateRoute></>} />
          <Route path="/handleusers" element={<><Navbar /><PrivateRoute  roles={['admin']}><AdminUsersPage /></PrivateRoute></>} />
          <Route path="/handleorders" element={<><Navbar /><PrivateRoute roles={['admin']}><AdminOrdersPage/></PrivateRoute></>} />
          <Route path="/unauthorized" element={<PrivateRoute><Unauthorized/></PrivateRoute>} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </UserProvider>
    </Router>
  </div>
)
