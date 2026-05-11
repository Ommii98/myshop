import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';

const Product = () => {
  const { id } = useParams();
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');
  const { addToCart } = useContext(ShopContext);

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === id) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [id, products]);

  if (!productData) {
    return <div className="page-content" style={{ opacity: 0 }}></div>;
  }

  return (
    <div className="page-content" style={{ marginTop: '20px' }}>
      <div className="ecommerce-section" style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
        
        {/* Product Images */}
        <div style={{ flex: '1', minWidth: '300px', display: 'flex', gap: '15px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {productData.image.map((item, index) => (
              <img 
                src={item} 
                key={index} 
                onClick={() => setImage(item)}
                className="product-thumbnail"
                style={{ 
                  width: '60px', 
                  height: '60px', 
                  objectFit: 'contain', 
                  cursor: 'pointer', 
                  border: image === item ? '2px solid var(--primary)' : '1px solid var(--border)',
                  padding: '5px'
                }} 
              />
            ))}
          </div>
          <div style={{ flex: '1', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid var(--border)', padding: '20px' }}>
            <img src={image} style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'contain' }} />
          </div>
        </div>

        {/* Product Details */}
        <div style={{ flex: '1', minWidth: '300px', display: 'flex', flexDirection: 'column' }}>
          <h1 style={{ fontSize: '24px', fontWeight: '500', marginBottom: '15px' }}>{productData.name}</h1>
          <div style={{ fontSize: '28px', fontWeight: '500', color: 'var(--text-main)', marginBottom: '20px' }}>
            ${productData.price}
          </div>
          <p style={{ color: 'var(--text-muted)', marginBottom: '30px', lineHeight: '1.6' }}>
            {productData.description}
          </p>
          
          <div style={{ marginBottom: '30px' }}>
            <p style={{ fontWeight: '500', marginBottom: '10px' }}>Select Size</p>
            <div style={{ display: 'flex', gap: '10px' }}>
              {productData.sizes.map((item, index) => (
                <button 
                  key={index} 
                  onClick={() => setSize(item)}
                  style={{ 
                    border: size === item ? '1px solid var(--secondary)' : '1px solid var(--border)', 
                    background: size === item ? 'rgba(251, 100, 27, 0.1)' : 'var(--white)', 
                    padding: '8px 16px', 
                    fontSize: '14px',
                    transition: 'all 0.2s'
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <button 
            onClick={() => addToCart(productData._id, size)}
            className="auth-btn" 
            style={{ width: 'auto', padding: '15px 40px', fontSize: '16px' }}
          >
            ADD TO CART
          </button>
          
          <hr style={{ margin: '30px 0', border: 'none', borderTop: '1px solid var(--border)' }} />
          <div style={{ color: 'var(--text-muted)', fontSize: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Product;
