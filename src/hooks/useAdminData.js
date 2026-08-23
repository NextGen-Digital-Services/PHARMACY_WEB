import { useContext } from 'react';
import { AdminDataContext } from '../context/AdminDataContext';

export default function useAdminData() {
  const context = useContext(AdminDataContext);
  if (!context) {
    throw new Error('useAdminData must be used within an AdminDataProvider');
  }
  return context;
}
