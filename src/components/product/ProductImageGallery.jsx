import React, { useState } from 'react';

export default function ProductImageGallery({ primaryImage }) {
  const [activeImage, setActiveImage] = useState(primaryImage);

  // Gallery of 3 images: primary image + 2 supplementary botanical/clinical lifestyle shots
  const images = [
    primaryImage,
    "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80"
  ];

  return (
    <div style={styles.container}>
      {/* Thumbnails Sidebar */}
      <div style={styles.thumbnailCol}>
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveImage(img)}
            style={{
              ...styles.thumbBtn,
              borderColor: activeImage === img ? 'var(--color-teal-700)' : 'var(--color-border)'
            }}
          >
            <img src={img} alt={`Thumbnail ${idx + 1}`} style={styles.thumbImg} />
          </button>
        ))}
      </div>

      {/* Main Image View */}
      <div className="apothecary-card main-img-card" style={styles.mainCol}>
        <img src={activeImage} alt="Product Active view" style={styles.mainImg} />
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    gap: '16px',
    width: '100%',
    '@media (max-width: 576px)': {
      flexDirection: 'column-reverse'
    }
  },
  thumbnailCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    flexShrink: 0
  },
  thumbBtn: {
    width: '64px',
    height: '64px',
    borderRadius: 'var(--radius-sm)',
    border: '2px solid var(--color-border)',
    overflow: 'hidden',
    cursor: 'pointer',
    padding: 0,
    backgroundColor: 'var(--color-white)',
    transition: 'border-color 0.15s ease'
  },
  thumbImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  mainCol: {
    flex: 1,
    height: '420px',
    overflow: 'hidden',
    padding: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'var(--color-white)',
    '--notch-bg': 'var(--color-mist-50)'
  },
  mainImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '2px',
    border: '1px solid var(--color-border)'
  }
};
