import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import CustomerLayout from '../components/layout/CustomerLayout';
import AdminLayout from '../components/layout/AdminLayout';
import AuthLayout from '../components/layout/AuthLayout';

// Customer Pages
import Home from '../pages/customer/Home';
import Shop from '../pages/customer/Shop';
import CategoryPage from '../pages/customer/CategoryPage';
import ProductDetails from '../pages/customer/ProductDetails';
import SearchResults from '../pages/customer/SearchResults';
import Cart from '../pages/customer/Cart';
import Checkout from '../pages/customer/Checkout';
import OrderConfirmation from '../pages/customer/OrderConfirmation';
import Login from '../pages/customer/Login';
import Register from '../pages/customer/Register';
import Account from '../pages/customer/Account';
import OrderHistory from '../pages/customer/OrderHistory';
import OrderTracking from '../pages/customer/OrderTracking';
import AboutUs from '../pages/customer/AboutUs';
import ContactUs from '../pages/customer/ContactUs';
import NotFound from '../pages/customer/NotFound';

// Admin Pages
import AdminLogin from '../pages/admin/AdminLogin';
import Dashboard from '../pages/admin/Dashboard';
import Products from '../pages/admin/Products';
import Categories from '../pages/admin/Categories';
import Orders from '../pages/admin/Orders';
import OrderDetails from '../pages/admin/OrderDetails';
import PaymentStatus from '../pages/admin/PaymentStatus';
import TrackingManagement from '../pages/admin/TrackingManagement';
import Customers from '../pages/admin/Customers';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Customer Shop Route Group */}
      <Route path="/" element={<CustomerLayout />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="shop/:categorySlug" element={<CategoryPage />} />
        <Route path="product/:productId" element={<ProductDetails />} />
        <Route path="search" element={<SearchResults />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="order-confirmation/:orderId" element={<OrderConfirmation />} />
        
        {/* Customer Account Routes */}
        <Route path="account" element={<Account />} />
        <Route path="account/orders" element={<OrderHistory />} />
        <Route path="account/orders/:orderId/track" element={<OrderTracking />} />
        
        {/* General Info Pages */}
        <Route path="about" element={<AboutUs />} />
        <Route path="contact" element={<ContactUs />} />
      </Route>

      {/* Split-screen Authentication Route Group */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Standalone Admin Sign In */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Admin Panel Console Group (Protected via AdminLayout) */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="categories" element={<Categories />} />
        <Route path="orders" element={<Orders />} />
        <Route path="orders/:orderId" element={<OrderDetails />} />
        <Route path="payments" element={<PaymentStatus />} />
        <Route path="tracking" element={<TrackingManagement />} />
        <Route path="customers" element={<Customers />} />
      </Route>

      {/* 404 Route Catch-All */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
