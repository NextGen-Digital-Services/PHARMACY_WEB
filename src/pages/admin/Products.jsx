import React, { useState, useContext } from 'react';
import { AdminDataContext } from '../../context/AdminDataContext';
import ProductFormModal from '../../components/admin/ProductFormModal';
import Pagination from '../../components/common/Pagination';
import formatCurrency from '../../utils/formatCurrency';
import StatusBadge from '../../components/admin/StatusBadge';
import { Plus, Edit2, Trash2, Search, Info } from 'lucide-react';

const ADMIN_PRODUCTS_PER_PAGE = 15;

export default function Products() {
  const { products, deleteProduct } = useContext(AdminDataContext);

  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);

  // Search filter
  const filtered = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.id.toLowerCase().includes(search.toLowerCase()) ||
    p.sku.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filtered.length / ADMIN_PRODUCTS_PER_PAGE);
  const startIdx = (currentPage - 1) * ADMIN_PRODUCTS_PER_PAGE;
  const currentProducts = filtered.slice(startIdx, startIdx + ADMIN_PRODUCTS_PER_PAGE);

  const handleOpenAdd = () => {
    setProductToEdit(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (product) => {
    setProductToEdit(product);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm(`Are you sure you want to retire product ${id} from catalog database?`)) {
      deleteProduct(id);
    }
  };

  return (
    <div style={styles.container}>
      {/* Action Header */}
      <div style={styles.actionHeader}>
        <div style={styles.searchBlock}>
          <Search size={18} style={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search by ID, name, SKU..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            style={styles.searchInput}
          />
        </div>
        
        <button onClick={handleOpenAdd} className="btn btn-secondary" style={styles.addBtn}>
          <Plus size={16} />
          <span>Add Product</span>
        </button>
      </div>

      {/* Main Table */}
      <div className="apothecary-card" style={styles.tableCard}>
        <div style={styles.tableWrapper}>
          {currentProducts.length > 0 ? (
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>ID / SKU</th>
                  <th style={styles.th}>Image</th>
                  <th style={styles.th}>Name</th>
                  <th style={styles.th}>Range Category</th>
                  <th style={styles.th}>Unit Price</th>
                  <th style={styles.th}>MRP</th>
                  <th style={styles.th}>Stock Status</th>
                  <th style={styles.th}>Tags</th>
                  <th style={styles.th} style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentProducts.map((p) => (
                  <tr key={p.id} style={styles.tr}>
                    <td style={styles.td}>
                      <span className="text-mono" style={{ fontWeight: 'bold' }}>{p.id}</span>
                      <span className="text-mono" style={styles.skuSub}>{p.sku}</span>
                    </td>
                    <td style={styles.td}>
                      <img src={p.image} alt={p.name} style={styles.thumbnail} />
                    </td>
                    <td style={styles.td}>
                      <span style={styles.prodName}>{p.name}</span>
                      <span style={styles.dosageSub}>{p.dosage}</span>
                    </td>
                    <td style={styles.td} style={{ textTransform: 'capitalize' }}>
                      {p.category.replace('-', ' ')}
                    </td>
                    <td style={styles.td} className="price-mono">
                      {formatCurrency(p.price)}
                    </td>
                    <td style={styles.td} className="text-mono" style={styles.mrpText}>
                      {formatCurrency(p.mrp)}
                    </td>
                    <td style={styles.td}>
                      <StatusBadge status={p.inStock ? "In Stock" : "Out of Stock"} />
                    </td>
                    <td style={styles.td}>
                      <div style={styles.tagWrapper}>
                        {p.tags.slice(0, 2).map(t => (
                          <span key={t} style={styles.inlineTag}>{t}</span>
                        ))}
                        {p.tags.length > 2 && <span style={styles.inlineTag}>+{p.tags.length - 2}</span>}
                      </div>
                    </td>
                    <td style={styles.td} style={{ textAlign: 'right' }}>
                      <div style={styles.actions}>
                        <button 
                          onClick={() => handleOpenEdit(p)} 
                          style={styles.actionBtn}
                          title="Edit formulation details"
                        >
                          <Edit2 size={14} color="var(--color-teal-700)" />
                        </button>
                        <button 
                          onClick={() => handleDelete(p.id)} 
                          style={styles.actionBtn}
                          title="Delete from database"
                        >
                          <Trash2 size={14} color="var(--color-danger)" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div style={styles.empty}>
              <Info size={36} color="var(--color-border)" style={{ marginBottom: '12px' }} />
              <h4>No matching catalog entries found</h4>
              <p>Check search keywords or add a new formulation.</p>
            </div>
          )}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>

      {/* Product edit/add modal */}
      <ProductFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        productToEdit={productToEdit}
      />
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
    maxWidth: '450px'
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
  addBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px'
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
  skuSub: {
    display: 'block',
    fontSize: '10px',
    color: 'var(--color-charcoal)',
    opacity: 0.7,
    marginTop: '2px'
  },
  thumbnail: {
    width: '40px',
    height: '40px',
    objectFit: 'cover',
    borderRadius: '2px',
    border: '1px solid var(--color-border)'
  },
  prodName: {
    display: 'block',
    fontWeight: 'bold',
    color: 'var(--color-ink)'
  },
  dosageSub: {
    display: 'block',
    fontSize: '11px',
    opacity: 0.8
  },
  mrpText: {
    opacity: 0.6,
    fontSize: '12px'
  },
  tagWrapper: {
    display: 'flex',
    gap: '4px',
    flexWrap: 'wrap'
  },
  inlineTag: {
    fontSize: '10px',
    backgroundColor: 'var(--color-mist-50)',
    border: '1px solid var(--color-border)',
    padding: '1px 6px',
    borderRadius: '2px'
  },
  actions: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'flex-end'
  },
  actionBtn: {
    padding: '4px',
    cursor: 'pointer',
    opacity: 0.8,
    ':hover': {
      opacity: 1
    }
  },
  empty: {
    padding: '48px',
    textAlign: 'center',
    color: 'var(--color-charcoal)'
  }
};
