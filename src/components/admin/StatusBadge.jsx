import React from 'react';
import Badge from '../common/Badge';

export default function StatusBadge({ status }) {
  const getStatusType = (s) => {
    switch (s) {
      case 'Delivered':
      case 'Paid':
        return 'success';
      case 'Cancelled':
      case 'Failed':
        return 'danger';
      case 'Shipped':
      case 'Out for Delivery':
        return 'teal';
      case 'Confirmed':
      case 'Packed':
        return 'teal';
      case 'Pending':
      case 'Order Placed':
      default:
        return 'amber';
    }
  };

  return <Badge text={status} type={getStatusType(status)} />;
}
