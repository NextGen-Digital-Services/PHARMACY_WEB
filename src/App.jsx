import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AdminDataProvider } from './context/AdminDataContext';
import { CartProvider } from './context/CartContext';
import AppRoutes from './routes/AppRoutes';
import './styles/globals.css';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AdminDataProvider>
          <CartProvider>
            <AppRoutes />
          </CartProvider>
        </AdminDataProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
