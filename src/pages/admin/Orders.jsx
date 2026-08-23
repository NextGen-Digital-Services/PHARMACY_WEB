import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AdminDataContext } from '../../context/AdminDataContext';
import { ORDER_STAGES } from '../../utils/statusStages';
import StatusBadge from '../../components/admin/StatusBadge';
import formatCurrency from '../../utils/formatCurrency';
import { Search, Eye, Filter, ArrowUpDown } from 'lucide-react';

export default function Orders() {
  const { orders, updateOrderStatus, updateOrderPaymentStatus } = useContext(AdminDataContext);

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filter orders
  const filtered = orders.filter((o) => {
    const matchesSearch = 
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customerName.toLowerCase().includes(search.toLowerCase()) ||
      o.customerEmail.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === 'all' || o.orderStatus === statusFilter;
    const matchesPayment = paymentFilter === 'all' || o.paymentStatus === paymentFilter;

    return matchesSearch && matchesStatus && matchesPayment;
  });

  return (
    <div style={styles.container}>
      {/* Filter and Search Bar */}
      <div style={styles.actionHeader}>
        <div style={styles.searchBlock}>
          <Search size={18} style={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search by ID, Customer name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.searchInput}
          />
        </div>

        <div style={styles.filtersBlock}>
          <div style={styles.filterGroup}>
            <Filter size={14} color="var(--color-charcoal)" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={styles.filterSelect}
            >
              <option value="all">All Order Statuses</option>
              {ORDER_STAGES.map(stage => (
                <option key={stage} value={stage}>{stage}</option>
              ))}
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <div style={styles.filterGroup}>
            <select
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
              style={styles.filterSelect}
            >
              <option value="all">All Payment Statuses</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
              <option value="Failed">Failed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="apothecary-card" style={styles.tableCard}>
        <div style={styles.tableWrapper}>
          {filtered.length > 0 ? (
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Order ID</th>
                  <th style={styles.th}>Placed Date</th>
                  <th style={styles.th}>Customer Name</th>
                  <th style={styles.th}>Total Revenue</th>
                  <th style={styles.th}>Payment Status</th>
                  <th style={styles.th}>Quick Action</th>
                  <th style={styles.th}>Fulfillment Stage</th>
                  <th style={styles.th} style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((o) => (
                  <tr key={o.id} style={styles.tr}>
                    <td style={styles.td} className="text-mono">
                      <Link to={`/admin/orders/${o.id}`} style={styles.orderLink}>
                        {o.id}
                      </Link>
                    </td>
                    <td style={styles.td}>
                      {new Date(o.placedDate).toLocaleDateString('en-IN', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                    <td style={styles.td}>
                      <span style={styles.custName}>{o.customerName}</span>
                      <span style={styles.custEmail}>{o.customerEmail}</span>
                    </td>
                    <td style={styles.td} className="price-mono">
                      {formatCurrency(o.total)}
                    </td>
                    <td style={styles.td}>
                      <StatusBadge status={o.paymentStatus} />
                    </td>
                    <td style={styles.td}>
                      <select
                        value={o.paymentStatus}
                        onChange={(e) => updateOrderPaymentStatus(o.id, e.target.value)}
                        style={styles.inlineSelect}
                      >
                        <option value="Paid">Mark Paid</option>
                        <option value="Pending">Mark Pending</option>
                        <option value="Failed">Mark Failed</option>
                      </select>
                    </td>
                    <td style={styles.td}>
                      <select
                        value={o.orderStatus}
                        onChange={(e) => updateOrderStatus(o.id, e.target.value)}
                        style={{
                          ...styles.inlineSelect,
                          borderColor: o.orderStatus === 'Cancelled' ? 'var(--color-danger)' : 'var(--color-border)'
                        }}
                      >
                        {ORDER_STAGES.map(stage => (
                          <option key={stage} value={stage}>{stage}</option>
                        ))}
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td style={styles.td} style={{ textAlign: 'right' }}>
                      <Link to={`/admin/orders/${o.id}`} style={styles.actionBtn}>
                        <Eye size={16} />
                        <span>Manage</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div style={styles.empty}>
              <h4>No orders matched filters</h4>
              <p>Try clearing selection states or searching for other customer profiles.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    width: '100%'
  },
  actionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '16px'
  },
  searchBlock: {
    position: 'relative',
    flex: '1 1 300px',
    maxWidth: '400px'
  },
  searchIcon: {
    position: 'absolute',
    left: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: 'var(--color-charcoal)',
    opacity: 0.6
  },
  searchInput: {
    width: '100%',
    padding: '10px 14px 10px 38px',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-sm)',
    outline: 'none',
    fontSize: '13px',
    backgroundColor: 'var(--color-white)'
  },
  filtersBlock: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap'
  },
  filterGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: 'var(--color-white)',
    border: '1px solid var(--color-border)',
    padding: '4px 12px',
    borderRadius: 'var(--radius-sm)'
  },
  filterSelect: {
    border: 'none',
    outline: 'none',
    fontSize: '13px',
    color: 'var(--color-ink)',
    backgroundColor: 'transparent',
    cursor: 'pointer'
  },
  tableCard: {
    padding: '24px',
    backgroundColor: 'var(--color-white)',
    '--notch-bg': 'var(--color-mist-50)'
  },
  tableWrapper: {
    width: '100%',
    overflowX: 'auto'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '13px',
    textAlign: 'left'
  },
  th: {
    padding: '10px 12px',
    borderBottom: '1px solid var(--color-border)',
    color: 'var(--color-ink)',
    fontWeight: 'bold',
    backgroundColor: 'var(--color-mist-50)'
  },
  td: {
    padding: '12px',
    borderBottom: '1px solid var(--color-border)',
    color: 'var(--color-charcoal)',
    verticalAlign: 'middle'
  },
  tr: {
    ':hover': {
      backgroundColor: 'rgba(0,0,0,0.01)'
    }
  },
  orderLink: {
    fontWeight: 'bold',
    color: 'var(--color-teal-700)',
    textDecoration: 'none'
  },
  custName: {
    display: 'block',
    fontWeight: 'bold',
    color: 'var(--color-ink)'
  },
  custEmail: {
    display: 'block',
    fontSize: '11px',
    opacity: 0.8
  },
  inlineSelect: {
    fontSize: '12px',
    border: '1px solid var(--color-border)',
    padding: '4px 8px',
    borderRadius: '2px',
    outline: 'none',
    cursor: 'pointer',
    backgroundColor: 'var(--color-white)'
  },
  actionBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    color: 'var(--color-teal-700)',
    textDecoration: 'none',
    fontWeight: 'bold'
  },
  empty: {
    padding: '48px',
    textAlign: 'center',
    color: 'var(--color-charcoal)'
  }
};
