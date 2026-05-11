import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, LayoutGrid, Home as HomeIcon } from 'lucide-react';
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
  const { getCartCount } = useContext(ShopContext);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-brand">
          Narcha@5
          <span>Explore Plus</span>
        </Link>
        
        <div className="search-bar">
          <input 
            type="text" 
            className="search-input" 
            placeholder="Search for products, brands and more" 
          />
          <button className="search-btn">
            <Search size={20} />
          </button>
        </div>

        <div className="nav-links">
          <Link to="/" className="nav-link">
            <HomeIcon size={20} />
            Home
          </Link>
          <Link to="/login" className="login-btn">Login</Link>
          <Link to="/collection" className="nav-link">
            <LayoutGrid size={20} />
            Collection
          </Link>
          <Link to="/cart" className="nav-link" style={{ position: 'relative' }}>
            <ShoppingCart size={20} />
            Cart
            <span style={{ 
              position: 'absolute', 
              top: '-8px', 
              right: '-12px', 
              background: '#fb641b', 
              color: 'white', 
              borderRadius: '50%', 
              padding: '2px 6px', 
              fontSize: '10px', 
              fontWeight: 'bold' 
            }}>
              {getCartCount()}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
