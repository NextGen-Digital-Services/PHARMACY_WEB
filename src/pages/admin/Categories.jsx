import React, { useState, useContext, useEffect } from 'react';
import { AdminDataContext } from '../../context/AdminDataContext';
import CategoryFormModal from '../../components/admin/CategoryFormModal';
import { Plus, Edit2, Trash2, Tag, Info } from 'lucide-react';
import StatusBadge from '../../components/admin/StatusBadge';

export default function Categories() {
  const { categories, products, deleteCategory } = useContext(AdminDataContext);

  const [modalOpen, setModalOpen] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState(null);

  const getProductCount = (categorySlug) => {
    return products.filter((p) => p.category === categorySlug).length;
  };

  const handleOpenAdd = () => {
    setCategoryToEdit(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (category) => {
    setCategoryToEdit(category);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm(`Are you sure you want to retire category range: ${id}? This will detach products but won't delete them.`)) {
      deleteCategory(id);
    }
  };

  return (
    <div style={styles.container}>
      {/* Action Header */}
      <div style={styles.actionHeader}>
        <div style={styles.infoText}>
          Establish new formulation range classifications for dermatology and nutrition lines.
        </div>
        
        <button onClick={handleOpenAdd} className="btn btn-secondary" style={styles.addBtn}>
          <Plus size={16} />
          <span>Add Category</span>
        </button>
      </div>

      {/* Main Table */}
      <div className="apothecary-card" style={styles.tableCard}>
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Thumbnail</th>
                <th style={styles.th}>Category Name</th>
                <th style={styles.th}>URL Slug</th>
                <th style={styles.th}>Scope Type</th>
                <th style={styles.th}>Scope Description</th>
                <th style={styles.th}>Products Formulated</th>
                <th style={styles.th} style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((c) => (
                <tr key={c.id} style={styles.tr}>
                  <td style={styles.td}>
                    <img src={c.image} alt={c.name} style={styles.thumbnail} />
                  </td>
                  <td style={styles.td}>
                    <strong style={styles.catName}>{c.name}</strong>
                  </td>
                  <td style={styles.td}>
                    <code className="text-mono" style={styles.slugCode}>{c.slug}</code>
                  </td>
                  <td style={styles.td}>
                    <StatusBadge status={c.type === 'Derma' ? 'Dermatology' : 'Nutrition'} />
                  </td>
                  <td style={styles.td} style={styles.descTd}>
                    {c.description}
                  </td>
                  <td style={styles.td} className="text-mono" style={styles.countTd}>
                    {getProductCount(c.slug)} formulations
                  </td>
                  <td style={styles.td} style={{ textAlign: 'right' }}>
                    <div style={styles.actions}>
                      <button 
                        onClick={() => handleOpenEdit(c)} 
                        style={styles.actionBtn}
                        title="Edit category scope"
                      >
                        <Edit2 size={14} color="var(--color-teal-700)" />
                      </button>
                      <button 
                        onClick={() => handleDelete(c.id)} 
                        style={styles.actionBtn}
                        disabled={categories.length <= 3} // Keep some categories
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
        </div>
      </div>

      {/* Modal */}
      <CategoryFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        categoryToEdit={categoryToEdit}
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
  infoText: {
    fontSize: '14px',
    color: 'var(--color-charcoal)'
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
  thumbnail: {
    width: '44px',
    height: '44px',
    objectFit: 'cover',
    borderRadius: '2px',
    border: '1px solid var(--color-border)'
  },
  catName: {
    color: 'var(--color-ink)'
  },
  slugCode: {
    backgroundColor: 'var(--color-mist-50)',
    padding: '2px 6px',
    borderRadius: '2px',
    fontSize: '11px'
  },
  descTd: {
    maxWidth: '280px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  countTd: {
    fontWeight: 'bold'
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
  }
};
