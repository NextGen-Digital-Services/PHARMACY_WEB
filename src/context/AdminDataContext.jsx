import React, { createContext, useState, useEffect } from 'react';
import { mockProducts } from '../data/mockProducts';
import { mockCategories } from '../data/mockCategories';
import { mockOrders } from '../data/mockOrders';
import { mockCustomers } from '../data/mockCustomers';

export const AdminDataContext = createContext();

export const AdminDataProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);

  // Hydrate states from sessionStorage (so demo state is retained across route transitions)
  useEffect(() => {
    const savedProducts = sessionStorage.getItem('vd_products');
    const savedCategories = sessionStorage.getItem('vd_categories');
    const savedOrders = sessionStorage.getItem('vd_orders');
    const savedCustomers = sessionStorage.getItem('vd_customers');

    if (savedProducts) setProducts(JSON.parse(savedProducts));
    else {
      setProducts(mockProducts);
      sessionStorage.setItem('vd_products', JSON.stringify(mockProducts));
    }

    if (savedCategories) setCategories(JSON.parse(savedCategories));
    else {
      setCategories(mockCategories);
      sessionStorage.setItem('vd_categories', JSON.stringify(mockCategories));
    }

    if (savedOrders) setOrders(JSON.parse(savedOrders));
    else {
      setOrders(mockOrders);
      sessionStorage.setItem('vd_orders', JSON.stringify(mockOrders));
    }

    if (savedCustomers) setCustomers(JSON.parse(savedCustomers));
    else {
      setCustomers(mockCustomers);
      sessionStorage.setItem('vd_customers', JSON.stringify(mockCustomers));
    }
  }, []);

  const saveProducts = (data) => {
    setProducts(data);
    sessionStorage.setItem('vd_products', JSON.stringify(data));
  };

  const saveCategories = (data) => {
    setCategories(data);
    sessionStorage.setItem('vd_categories', JSON.stringify(data));
  };

  const saveOrders = (data) => {
    setOrders(data);
    sessionStorage.setItem('vd_orders', JSON.stringify(data));
  };

  const saveCustomers = (data) => {
    setCustomers(data);
    sessionStorage.setItem('vd_customers', JSON.stringify(data));
  };

  // Product CRUD
  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: product.id || `VD-${(products.length + 1).toString().padStart(4, '0')}`,
      sku: product.sku || `SKU-GEN-${products.length + 2001}`,
      rating: parseFloat(product.rating) || 4.2,
      reviewCount: parseInt(product.reviewCount) || 12,
      price: parseInt(product.price),
      mrp: parseInt(product.mrp || product.price),
      tags: product.tags || ["New"]
    };
    const updated = [newProduct, ...products];
    saveProducts(updated);
  };

  const updateProduct = (productId, updatedProduct) => {
    const updated = products.map(p => 
      p.id === productId ? { ...p, ...updatedProduct, price: parseInt(updatedProduct.price), mrp: parseInt(updatedProduct.mrp || updatedProduct.price) } : p
    );
    saveProducts(updated);
  };

  const deleteProduct = (productId) => {
    const updated = products.filter(p => p.id !== productId);
    saveProducts(updated);
  };

  // Category CRUD
  const addCategory = (category) => {
    const newCat = {
      ...category,
      id: category.slug,
      slug: category.slug
    };
    const updated = [...categories, newCat];
    saveCategories(updated);
  };

  const updateCategory = (categoryId, updatedCategory) => {
    const updated = categories.map(c => 
      c.id === categoryId ? { ...c, ...updatedCategory, id: updatedCategory.slug, slug: updatedCategory.slug } : c
    );
    saveCategories(updated);
  };

  const deleteCategory = (categoryId) => {
    const updated = categories.filter(c => c.id !== categoryId);
    saveCategories(updated);
  };

  // Order Operations
  const addOrder = (order) => {
    const updated = [order, ...orders];
    saveOrders(updated);

    // If customer doesn't exist, create customer record or increment counts
    const existingCustIdx = customers.findIndex(c => c.email === order.customerEmail);
    if (existingCustIdx > -1) {
      const updatedCust = [...customers];
      updatedCust[existingCustIdx].totalOrders += 1;
      updatedCust[existingCustIdx].totalSpent += order.total;
      saveCustomers(updatedCust);
    } else {
      const newCust = {
        id: `cust-${Math.floor(100 + Math.random() * 900)}`,
        name: order.customerName,
        email: order.customerEmail,
        phone: order.shippingAddress.phone || '+91 99999 99999',
        totalOrders: 1,
        totalSpent: order.total,
        joinedDate: new Date().toISOString().split('T')[0]
      };
      saveCustomers([...customers, newCust]);
    }
  };

  const updateOrderStatus = (orderId, status) => {
    const updated = orders.map(o => {
      if (o.id === orderId) {
        let trackingNumber = o.trackingNumber;
        if (status === 'Shipped' && (!trackingNumber || trackingNumber === 'Pending')) {
          trackingNumber = `TRK-VD-${Math.floor(10000 + Math.random() * 90000)}`;
        } else if (status === 'Cancelled') {
          trackingNumber = 'Cancelled';
        }
        return { ...o, orderStatus: status, trackingNumber };
      }
      return o;
    });
    saveOrders(updated);
  };

  const updateOrderPaymentStatus = (orderId, paymentStatus) => {
    const updated = orders.map(o => 
      o.id === orderId ? { ...o, paymentStatus } : o
    );
    saveOrders(updated);
  };

  const updateOrderTracking = (orderId, trackingStage, trackingNumber) => {
    const updated = orders.map(o => 
      o.id === orderId ? { ...o, orderStatus: trackingStage, trackingNumber } : o
    );
    saveOrders(updated);
  };

  return (
    <AdminDataContext.Provider value={{
      products,
      categories,
      orders,
      customers,
      addProduct,
      updateProduct,
      deleteProduct,
      addCategory,
      updateCategory,
      deleteCategory,
      addOrder,
      updateOrderStatus,
      updateOrderPaymentStatus,
      updateOrderTracking
    }}>
      {children}
    </AdminDataContext.Provider>
  );
};
