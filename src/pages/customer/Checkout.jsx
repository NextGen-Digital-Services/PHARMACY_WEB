import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { AdminDataContext } from '../../context/AdminDataContext';
import CheckoutStepper from '../../components/checkout/CheckoutStepper';
import AddressForm from '../../components/checkout/AddressForm';
import PaymentMethodSelector from '../../components/checkout/PaymentMethodSelector';
import OrderReviewCard from '../../components/checkout/OrderReviewCard';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import generateOrderId from '../../utils/generateOrderId';
import EmptyState from '../../components/common/EmptyState';
import { Clipboard } from 'lucide-react';

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, clearCart } = useContext(CartContext);
  const { addOrder } = useContext(AdminDataContext);

  const [step, setStep] = useState(1);
  const [address, setAddress] = useState({
    name: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    pincode: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('Card');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  // If cart is empty, do not allow checkout unless they just completed an order
  if (cart.length === 0 && step !== 4) {
    return (
      <div className="container" style={{ padding: '80px 0' }}>
        <EmptyState
          icon={Clipboard}
          title="Checkout Queue is Empty"
          message="You have no formulations in your cart queue to purchase. Browse our catalog to select products."
          actionLink="/shop"
          actionText="Browse Shop Catalog"
        />
      </div>
    );
  }

  const handleNextStep = () => {
    setStep(prev => prev + 1);
  };

  const handleBackStep = () => {
    setStep(prev => Math.max(1, prev - 1));
  };

  const handlePlaceOrder = (finalTotal) => {
    setLoading(true);

    // Simulate short network delay for clinical confirmation
    setTimeout(() => {
      const generatedId = generateOrderId();
      const mockOrderItems = cart.map(item => ({
        productId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
        dosage: item.dosage
      }));

      const newOrder = {
        id: generatedId,
        customerName: address.name,
        customerEmail: address.email,
        placedDate: new Date().toISOString(),
        items: mockOrderItems,
        total: finalTotal,
        paymentStatus: paymentMethod === 'COD' ? 'Pending' : 'Paid',
        orderStatus: 'Order Placed',
        paymentMethod,
        shippingAddress: {
          street: address.street,
          city: address.city,
          state: address.state,
          pincode: address.pincode,
          phone: address.phone
        },
        trackingNumber: 'Pending'
      };

      // Add to Admin context state
      addOrder(newOrder);

      // Clear Shopping Cart Context
      clearCart();

      setLoading(false);
      
      // Route to Order Confirmation page
      navigate(`/order-confirmation/${generatedId}`);
    }, 1500);
  };

  return (
    <div className="container" style={{ paddingBottom: '100px', maxWidth: '800px' }}>
      <Breadcrumbs paths={[{ name: 'Cart', url: '/cart' }, { name: 'Checkout', url: '/checkout' }]} />

      <div style={styles.header}>
        <span className="text-mono" style={styles.eyebrow}>APOTHECARY DISPENSARY</span>
        <h1 style={styles.title}>Prescription Checkout</h1>
        <p style={styles.subtitle}>Complete your address and billing configuration below.</p>
      </div>

      {/* Stepper progress */}
      <CheckoutStepper activeStep={step} />

      {/* Steps Content */}
      <div style={styles.stepContent}>
        {step === 1 && (
          <AddressForm 
            address={address} 
            setAddress={setAddress} 
            onNext={handleNextStep} 
          />
        )}

        {step === 2 && (
          <PaymentMethodSelector
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            onNext={handleNextStep}
            onBack={handleBackStep}
          />
        )}

        {step === 3 && (
          <OrderReviewCard
            address={address}
            paymentMethod={paymentMethod}
            onBack={handleBackStep}
            onSubmit={handlePlaceOrder}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
}

const styles = {
  header: {
    marginBottom: '32px',
    marginTop: '16px',
    textAlign: 'center'
  },
  eyebrow: {
    fontSize: '11px',
    color: 'var(--color-amber-600)',
    fontWeight: 'bold',
    letterSpacing: '1.5px',
    display: 'block',
    marginBottom: '8px'
  },
  title: {
    fontFamily: 'var(--font-display)',
    fontSize: '32px',
    color: 'var(--color-ink)',
    marginBottom: '8px'
  },
  subtitle: {
    fontSize: '15px',
    color: 'var(--color-charcoal)'
  },
  stepContent: {
    width: '100%'
  }
};
