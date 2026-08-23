import React, { useContext, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AdminDataContext } from '../../context/AdminDataContext';
import ProductImageGallery from '../../components/product/ProductImageGallery';
import ProductInfoPanel from '../../components/product/ProductInfoPanel';
import ProductTabs from '../../components/product/ProductTabs';
import RelatedProducts from '../../components/product/RelatedProducts';
import StickyAddToCartBar from '../../components/product/StickyAddToCartBar';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import EmptyState from '../../components/common/EmptyState';
import { Clipboard } from 'lucide-react';

export default function ProductDetails() {
  const { productId } = useParams();
  const { products } = useContext(AdminDataContext);

  const product = products.find(p => p.id === productId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);

  if (!product) {
    return (
      <div className="container" style={{ padding: '80px 0' }}>
        <EmptyState
          icon={Clipboard}
          title="Product Formulation Not Found"
          message="The SKU or product ID you requested is not recognized in our database. It may have been retired or updated."
          actionLink="/shop"
          actionText="Back to Shop Catalog"
        />
      </div>
    );
  }

  const formatCategoryName = (slug) => {
    return slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="product-details-page bg-mist" style={{ paddingBottom: '100px' }}>
      <div className="container">
        {/* Breadcrumb Path */}
        <Breadcrumbs 
          paths={[
            { name: 'Shop', url: '/shop' },
            { name: formatCategoryName(product.category), url: `/shop/${product.category}` },
            { name: product.name, url: `/product/${product.id}` }
          ]} 
        />

        {/* Core Presentation Grid */}
        <div style={styles.grid}>
          <div style={styles.leftCol}>
            <ProductImageGallery primaryImage={product.image} />
          </div>
          <div style={styles.rightCol}>
            <ProductInfoPanel product={product} />
          </div>
        </div>

        {/* Tab Detail Panels */}
        <ProductTabs product={product} />

        {/* Recommended Alignments */}
        <RelatedProducts currentProductId={product.id} categorySlug={product.category} />
      </div>

      {/* Sticky floating purchase console */}
      <StickyAddToCartBar product={product} />
    </div>
  );
}

const styles = {
  grid: {
    display: 'flex',
    gap: '48px',
    marginTop: '24px',
    flexWrap: 'wrap',
    alignItems: 'flex-start'
  },
  leftCol: {
    flex: '1 1 500px'
  },
  rightCol: {
    flex: '1 1 450px'
  }
};
