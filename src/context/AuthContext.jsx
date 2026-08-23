import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Initialize with dummy customer for demo convenience if desired, or null
  // Let's start with a pre-logged in customer to make demoing easier, or start with null and document credentials
  // Starting with null is better, but let's make it very clear on the login pages
  useEffect(() => {
    const savedUser = sessionStorage.getItem('vd_auth_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (email, password) => {
    // Check credentials
    if (email === 'demo@vitaderm.com' && password === 'demo123') {
      const customer = {
        id: 'cust-012',
        name: 'Demo Customer',
        email: 'demo@vitaderm.com',
        phone: '+91 98765 00000',
        role: 'customer',
        joinedDate: '2026-02-20'
      };
      setUser(customer);
      sessionStorage.setItem('vd_auth_user', JSON.stringify(customer));
      return { success: true, role: 'customer' };
    } else if (email === 'admin@vitaderm.com' && password === 'admin123') {
      const admin = {
        id: 'admin-001',
        name: 'VitaDerm Administrator',
        email: 'admin@vitaderm.com',
        role: 'admin',
        joinedDate: '2025-01-01'
      };
      setUser(admin);
      sessionStorage.setItem('vd_auth_user', JSON.stringify(admin));
      return { success: true, role: 'admin' };
    }
    return { success: false, message: 'Invalid credentials. Use demo@vitaderm.com / demo123 (Customer) or admin@vitaderm.com / admin123 (Admin)' };
  };

  const register = (name, email, password) => {
    const newUser = {
      id: `cust-${Math.floor(100 + Math.random() * 900)}`,
      name,
      email,
      phone: '+91 99999 99999',
      role: 'customer',
      joinedDate: new Date().toISOString().split('T')[0]
    };
    setUser(newUser);
    sessionStorage.setItem('vd_auth_user', JSON.stringify(newUser));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('vd_auth_user');
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};
