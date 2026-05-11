import React from 'react';
import { Link } from 'react-router-dom';
import { products } from '../assets/assets';
import heroPhoto from '../assets/myphoto/myphoto1.jpeg'; // Using the user's photo for the entire screen banner

const Home = () => {
  // Use a slice of the products for the featured section
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="page-content" style={{ padding: 0, maxWidth: '100%' }}>
      {/* Full Screen Hero Section */}
      <div 
        className="home-hero-bg"
        style={{ 
          width: '100%', 
          height: 'calc(100vh - 60px)', 
          backgroundImage: `url(${heroPhoto})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          color: 'white',
          position: 'relative'
        }}
      >
        {/* Dark overlay to make text readable if needed */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.3)' }}></div>
        
        <div style={{ textAlign: 'center', zIndex: 1, padding: '20px' }}>
          <h1 style={{ fontSize: '4rem', marginBottom: '10px', fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>Narcha@5</h1>
          <p style={{ fontSize: '1.5rem', marginBottom: '20px', textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>Discover the latest trends and collections.</p>
          <Link to="/collection" style={{ background: '#2874f0', color: 'white', padding: '12px 30px', borderRadius: '4px', fontWeight: '600', fontSize: '16px', display: 'inline-block' }}>
            Shop Now
          </Link>
        </div>
      </div>

      {/* Featured Collection Section */}
      <div style={{ maxWidth: '1248px', margin: '0 auto', padding: '20px' }}>
        <section className="ecommerce-section" style={{ marginTop: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '15px', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: '500' }}>Best of Collection</h2>
            <Link to="/collection" style={{ background: '#2874f0', color: 'white', padding: '8px 20px', borderRadius: '2px', fontWeight: '500', fontSize: '14px' }}>
              VIEW ALL
            </Link>
          </div>
          
          <div className="products-grid">
            {featuredProducts.map((product) => (
              <Link key={product._id} to={`/product/${product._id}`} className="product-card" style={{ color: 'inherit' }}>
                <div className="product-image-container">
                  <img src={product.image[0]} alt={product.name} className="product-image" />
                </div>
                <h3 className="product-title">{product.name}</h3>
                <div style={{ color: 'green', fontSize: '14px', marginBottom: '5px' }}>Top Offer</div>
                <div className="product-price">${product.price}</div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
