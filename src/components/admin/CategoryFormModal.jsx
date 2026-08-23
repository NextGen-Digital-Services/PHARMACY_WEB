import React, { useState, useEffect, useContext } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import { AdminDataContext } from '../../context/AdminDataContext';

export default function CategoryFormModal({ isOpen, onClose, categoryToEdit }) {
  const { addCategory, updateCategory } = useContext(AdminDataContext);

  const [form, setForm] = useState({
    name: '',
    slug: '',
    type: 'Derma',
    image: '',
    description: ''
  });

  // Sync state if editing category
  useEffect(() => {
    if (categoryToEdit) {
      setForm({
        name: categoryToEdit.name || '',
        slug: categoryToEdit.slug || '',
        type: categoryToEdit.type || 'Derma',
        image: categoryToEdit.image || '',
        description: categoryToEdit.description || ''
      });
    } else {
      setForm({
        name: '',
        slug: '',
        type: 'Derma',
        image: '',
        description: ''
      });
    }
  }, [categoryToEdit, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => {
      const updated = { ...prev, [name]: value };
      // Auto generate slug if name is changing
      if (name === 'name' && !categoryToEdit) {
        updated.slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      }
      return updated;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const finalImage = form.image.trim() || "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=600&q=80";

    const payload = {
      ...form,
      image: finalImage
    };

    if (categoryToEdit) {
      updateCategory(categoryToEdit.id, payload);
    } else {
      addCategory(payload);
    }

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={categoryToEdit ? `Edit Category Range: ${categoryToEdit.name}` : "Establish New Medical Range"}
    >
      <form onSubmit={handleSubmit} style={styles.form}>
        <div className="form-group">
          <label className="form-label">Category Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. Skin Cleansers"
            className="form-input"
            required
          />
        </div>

        <div style={styles.row}>
          <div className="form-group" style={{ flex: 1 }}>
            <label className="form-label">Category Slug</label>
            <input
              type="text"
              name="slug"
              value={form.slug}
              onChange={handleChange}
              placeholder="e.g. skin-cleansers"
              className="form-input text-mono"
              disabled={!!categoryToEdit}
              required
            />
          </div>

          <div className="form-group" style={{ flex: 1 }}>
            <label className="form-label">Apothecary Type</label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="Derma">Dermatology (Skincare)</option>
              <option value="Nutrition">Nutrition (Supplements)</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Unsplash Banner Image URL</label>
          <input
            type="url"
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="https://images.unsplash.com/photo-..."
            className="form-input text-mono"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Clinical Scope (Description)</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Advisory description detailing the range benefits..."
            rows="4"
            className="form-textarea"
            required
          />
        </div>

        <div style={styles.formBtns}>
          <button type="button" onClick={onClose} style={styles.cancelBtn}>
            Cancel
          </button>
          <Button type="submit" variant="primary" style={styles.submitBtn}>
            {categoryToEdit ? "Apply Changes" : "Create Range"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  row: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap'
  },
  formBtns: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '16px',
    marginTop: '20px',
    alignItems: 'center'
  },
  cancelBtn: {
    fontSize: '14px',
    color: 'var(--color-charcoal)',
    cursor: 'pointer'
  },
  submitBtn: {
    width: '100%',
    maxWidth: '160px'
  }
};
