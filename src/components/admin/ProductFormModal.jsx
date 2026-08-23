import React, { useState, useEffect, useContext } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import { AdminDataContext } from '../../context/AdminDataContext';

export default function ProductFormModal({ isOpen, onClose, productToEdit }) {
  const { addProduct, updateProduct, categories } = useContext(AdminDataContext);

  const [form, setForm] = useState({
    name: '',
    category: '',
    subCategory: '',
    price: '',
    mrp: '',
    dosage: '',
    inStock: true,
    shortDescription: '',
    fullDescription: '',
    image: '',
    tags: []
  });

  const [tagInput, setTagInput] = useState('');

  // Sync state if editing product
  useEffect(() => {
    if (productToEdit) {
      setForm({
        name: productToEdit.name || '',
        category: productToEdit.category || '',
        subCategory: productToEdit.subCategory || '',
        price: productToEdit.price || '',
        mrp: productToEdit.mrp || '',
        dosage: productToEdit.dosage || '',
        inStock: productToEdit.inStock !== false,
        shortDescription: productToEdit.shortDescription || '',
        fullDescription: productToEdit.fullDescription || '',
        image: productToEdit.image || '',
        tags: productToEdit.tags || []
      });
    } else {
      // Clear form
      setForm({
        name: '',
        category: categories[0]?.slug || '',
        subCategory: '',
        price: '',
        mrp: '',
        dosage: '',
        inStock: true,
        shortDescription: '',
        fullDescription: '',
        image: '',
        tags: []
      });
    }
  }, [productToEdit, isOpen, categories]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddTag = (e) => {
    e.preventDefault();
    if (tagInput.trim() && !form.tags.includes(tagInput.trim())) {
      setForm(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setForm(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tagToRemove)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Set a default working product image if empty
    const finalImage = form.image.trim() || "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80";

    const payload = {
      ...form,
      image: finalImage,
      price: parseInt(form.price, 10),
      mrp: parseInt(form.mrp || form.price, 10)
    };

    if (productToEdit) {
      updateProduct(productToEdit.id, payload);
    } else {
      addProduct(payload);
    }

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={productToEdit ? `Edit Formulation: ${productToEdit.id}` : "Formulate New Product"}
    >
      <form onSubmit={handleSubmit} style={styles.form}>
        <div className="form-group">
          <label className="form-label">Product Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. DermaCell Salicylic Foam Wash"
            className="form-input"
            required
          />
        </div>

        <div style={styles.row}>
          <div className="form-group" style={{ flex: 1 }}>
            <label className="form-label">Category Range</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">Select Range</option>
              {categories.map((c) => (
                <option key={c.id} value={c.slug}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group" style={{ flex: 1 }}>
            <label className="form-label">Formulation Type</label>
            <input
              type="text"
              name="subCategory"
              value={form.subCategory}
              onChange={handleChange}
              placeholder="e.g. Cleansing Gel, Daily Capsule"
              className="form-input"
              required
            />
          </div>
        </div>

        <div style={styles.row}>
          <div className="form-group" style={{ flex: 1 }}>
            <label className="form-label">Price (INR)</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="499"
              className="form-input text-mono"
              required
            />
          </div>

          <div className="form-group" style={{ flex: 1 }}>
            <label className="form-label">MRP (Discount Anchor)</label>
            <input
              type="number"
              name="mrp"
              value={form.mrp}
              onChange={handleChange}
              placeholder="599"
              className="form-input text-mono"
            />
          </div>
        </div>

        <div style={styles.row}>
          <div className="form-group" style={{ flex: 1 }}>
            <label className="form-label">Volume / Dosage Pack</label>
            <input
              type="text"
              name="dosage"
              value={form.dosage}
              onChange={handleChange}
              placeholder="e.g. 50ml, 60 Capsules"
              className="form-input text-mono"
              required
            />
          </div>

          <div className="form-group" style={{ flex: 1, display: 'flex', alignItems: 'center', paddingTop: '24px' }}>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="inStock"
                checked={form.inStock}
                onChange={handleChange}
                style={styles.checkbox}
              />
              <span style={{ fontWeight: 'bold' }}>Instock Availability</span>
            </label>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Image Unsplash URL</label>
          <input
            type="url"
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="https://images.unsplash.com/photo-..."
            className="form-input text-mono"
          />
        </div>

        {/* Tags Block */}
        <div className="form-group">
          <label className="form-label">Quality Tags</label>
          <div style={styles.tagInputBlock}>
            <input
              type="text"
              placeholder="e.g. Vegan, Bestseller, Cruelty-Free"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              className="form-input"
              style={{ flex: 1 }}
            />
            <button type="button" onClick={handleAddTag} className="btn btn-secondary btn-sm">
              Add Tag
            </button>
          </div>
          <div style={styles.tagsContainer}>
            {form.tags.map((tag) => (
              <span key={tag} className="prescription-tag text-mono" style={styles.tag}>
                {tag}
                <button type="button" onClick={() => handleRemoveTag(tag)} style={styles.removeTagBtn}>×</button>
              </span>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Short Advisory Sentence</label>
          <input
            type="text"
            name="shortDescription"
            value={form.shortDescription}
            onChange={handleChange}
            placeholder="Clinical strength foaming wash..."
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Detailed Molecular Ingredients & Action</label>
          <textarea
            name="fullDescription"
            value={form.fullDescription}
            onChange={handleChange}
            placeholder="Formulated specifically by pharmacists..."
            rows="3"
            className="form-textarea"
            required
          />
        </div>

        <div style={styles.formBtns}>
          <button type="button" onClick={onClose} style={styles.cancelBtn}>
            Cancel
          </button>
          <Button type="submit" variant="primary" style={styles.submitBtn}>
            {productToEdit ? "Apply Changes" : "Formulate & Catalog"}
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
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '13px',
    color: 'var(--color-ink)',
    cursor: 'pointer'
  },
  checkbox: {
    accentColor: 'var(--color-teal-700)',
    width: '18px',
    height: '18px'
  },
  tagInputBlock: {
    display: 'flex',
    gap: '8px',
    marginBottom: '8px'
  },
  tagsContainer: {
    display: 'flex',
    gap: '6px',
    flexWrap: 'wrap',
    minHeight: '24px'
  },
  tag: {
    fontSize: '11px',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '2px 8px',
    borderColor: 'var(--color-teal-700)',
    color: 'var(--color-teal-700)',
    backgroundColor: 'var(--color-sage-100)'
  },
  removeTagBtn: {
    border: 'none',
    background: 'none',
    color: 'var(--color-danger)',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '12px'
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
    maxWidth: '180px'
  }
};
