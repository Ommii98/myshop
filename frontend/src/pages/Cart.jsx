import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { products, assets } from '../assets/assets';
import { toast } from 'react-toastify';

const Cart = () => {
  const { cartItems, updateQuantity, getCartAmount, token } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const tempData = [];
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems]);

  const handleCheckout = () => {
    if (!token) {
      toast.error('Please login to proceed to checkout');
      navigate('/login');
    } else {
      navigate('/place-order');
    }
  };

  return (
    <div className="page-content" style={{ marginTop: '20px' }}>
      <div className="ecommerce-section">
        <h2 className="section-header">Your Cart</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {cartData.map((item, index) => {
            const productData = products.find((product) => product._id === item._id);
            return (
              <div 
                key={index} 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '20px', 
                  borderBottom: '1px solid var(--border)', 
                  paddingBottom: '20px' 
                }}
              >
                <img src={productData.image[0]} alt="" style={{ width: '80px', height: '80px', objectFit: 'contain' }} />
                
                <div style={{ flex: '1' }}>
                  <p style={{ fontWeight: '500', fontSize: '16px' }}>{productData.name}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginTop: '10px' }}>
                    <p style={{ fontWeight: '500', color: 'var(--text-main)' }}>${productData.price}</p>
                    <p style={{ background: 'var(--bg-color)', padding: '4px 10px', fontSize: '12px', border: '1px solid var(--border)' }}>
                      Size: {item.size}
                    </p>
                  </div>
                </div>

                <input 
                  onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(e.target.value))}
                  type="number" 
                  min="1" 
                  defaultValue={item.quantity} 
                  style={{ width: '50px', padding: '5px', border: '1px solid var(--border)', outline: 'none' }}
                />

                <img 
                  onClick={() => updateQuantity(item._id, item.size, 0)}
                  src={assets.bin_icon} 
                  style={{ width: '20px', cursor: 'pointer' }} 
                  alt="delete" 
                />
              </div>
            );
          })}
        </div>

        {cartData.length > 0 ? (
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '40px' }}>
            <div style={{ width: '100%', maxWidth: '400px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '500', marginBottom: '20px' }}>Cart Totals</h2>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                <p>Subtotal</p>
                <p>${getCartAmount()}.00</p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                <p>Shipping Fee</p>
                <p>$10.00</p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', fontWeight: 'bold', fontSize: '18px' }}>
                <p>Total</p>
                <p>${getCartAmount() + 10}.00</p>
              </div>
              <button onClick={handleCheckout} className="auth-btn" style={{ marginTop: '20px' }}>
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
            Your cart is currently empty.
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
