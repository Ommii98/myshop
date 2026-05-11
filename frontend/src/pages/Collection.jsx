import React from 'react';
import { Link } from 'react-router-dom';
import { products } from '../assets/assets';

const Collection = () => {
  return (
    <div className="page-content">
      <div className="ecommerce-section">
        <h2 className="section-header">All Collections</h2>
        
        <div className="products-grid">
          {products.map((product) => (
            <Link key={product._id} to={`/product/${product._id}`} className="product-card" style={{ color: 'inherit' }}>
              <div className="product-image-container">
                <img src={product.image[0]} alt={product.name} className="product-image" />
              </div>
              <h3 className="product-title">{product.name}</h3>
              <div className="product-price">${product.price}</div>
              <button className="product-add-btn">Add to Cart</button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
