import React from 'react';
import { Outlet } from 'react-router-dom';
import TopUtilityBar from '../common/TopUtilityBar';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';
import CartDrawer from '../cart/CartDrawer';

export default function CustomerLayout() {
  return (
    <div style={styles.container}>
      <TopUtilityBar />
      <Navbar />
      
      {/* Slide-in cart drawer on all customer views */}
      <CartDrawer />
      
      <main style={styles.main}>
        <Outlet />
      </main>
      
      <Footer />
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  },
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    position: 'relative'
  }
};
