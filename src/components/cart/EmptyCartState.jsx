import React, { useContext } from 'react';
import { ShoppingBag } from 'lucide-react';
import EmptyState from '../common/EmptyState';
import { CartContext } from '../../context/CartContext';

export default function EmptyCartState() {
  const { setIsCartOpen } = useContext(CartContext);

  return (
    <EmptyState
      icon={ShoppingBag}
      title="Your Prescription Cart is Empty"
      message="You have no skincare or wellness formulations in your cart. Browse our categories or bestsellers to find what fits your health profile."
      actionLink="/shop"
      actionText="Browse Bestsellers"
    />
  );
}
