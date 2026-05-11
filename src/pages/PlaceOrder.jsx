import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  });
  
  const { getCartAmount, token, cartItems, setCartItems } = useContext(ShopContext);
  const navigate = useNavigate();

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData(data => ({ ...data, [name]: value }));
  }

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (!token) {
      toast.error('Please login to place an order');
      navigate('/login');
      return;
    }

    // Here you would normally send formData and cartItems to your backend API
    console.log("Order Data:", { address: formData, items: cartItems, paymentMethod: method, total: getCartAmount() + 10 });
    
    toast.success(`Order Placed Successfully! Will be shipped to: ${formData.street}, ${formData.city}`);
    
    // Clear the cart
    setCartItems({});
    navigate('/');
  };

  return (
    <form onSubmit={onSubmitHandler} className="page-content" style={{ marginTop: '20px' }}>
      <div className="ecommerce-section" style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
        
        {/* Delivery Information */}
        <div style={{ flex: '1', minWidth: '300px' }}>
          <h2 className="section-header" style={{ marginBottom: '20px' }}>Delivery Information</h2>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
            <input required onChange={onChangeHandler} name="firstName" value={formData.firstName} type="text" placeholder="First name" className="form-input" style={{ border: '1px solid var(--border)', padding: '10px' }} />
            <input required onChange={onChangeHandler} name="lastName" value={formData.lastName} type="text" placeholder="Last name" className="form-input" style={{ border: '1px solid var(--border)', padding: '10px' }} />
          </div>
          <input required onChange={onChangeHandler} name="email" value={formData.email} type="email" placeholder="Email address" className="form-input" style={{ border: '1px solid var(--border)', padding: '10px', marginBottom: '15px' }} />
          <input required onChange={onChangeHandler} name="street" value={formData.street} type="text" placeholder="Street" className="form-input" style={{ border: '1px solid var(--border)', padding: '10px', marginBottom: '15px' }} />
          <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
            <input required onChange={onChangeHandler} name="city" value={formData.city} type="text" placeholder="City" className="form-input" style={{ border: '1px solid var(--border)', padding: '10px' }} />
            <input required onChange={onChangeHandler} name="state" value={formData.state} type="text" placeholder="State" className="form-input" style={{ border: '1px solid var(--border)', padding: '10px' }} />
          </div>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
            <input required onChange={onChangeHandler} name="zipcode" value={formData.zipcode} type="number" placeholder="Zipcode" className="form-input" style={{ border: '1px solid var(--border)', padding: '10px' }} />
            <input required onChange={onChangeHandler} name="country" value={formData.country} type="text" placeholder="Country" className="form-input" style={{ border: '1px solid var(--border)', padding: '10px' }} />
          </div>
          <input required onChange={onChangeHandler} name="phone" value={formData.phone} type="number" placeholder="Phone" className="form-input" style={{ border: '1px solid var(--border)', padding: '10px' }} />
        </div>

        {/* Right Side - Cart Totals & Payment */}
        <div style={{ flex: '1', minWidth: '300px' }}>
          <div style={{ marginBottom: '40px' }}>
            <h2 className="section-header" style={{ marginBottom: '20px' }}>Cart Totals</h2>
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
          </div>

          <div>
            <h2 className="section-header" style={{ marginBottom: '20px' }}>Payment Method</h2>
            <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
              <div 
                onClick={() => setMethod('stripe')} 
                style={{ display: 'flex', alignItems: 'center', gap: '10px', border: method === 'stripe' ? '2px solid var(--primary)' : '1px solid var(--border)', padding: '10px 20px', cursor: 'pointer', borderRadius: '4px' }}
              >
                <div style={{ width: '14px', height: '14px', border: '1px solid #ccc', borderRadius: '50%', background: method === 'stripe' ? 'var(--primary)' : 'transparent' }}></div>
                <img src={assets.stripe_logo} alt="Stripe" style={{ height: '20px' }} />
              </div>
              <div 
                onClick={() => setMethod('razorpay')} 
                style={{ display: 'flex', alignItems: 'center', gap: '10px', border: method === 'razorpay' ? '2px solid var(--primary)' : '1px solid var(--border)', padding: '10px 20px', cursor: 'pointer', borderRadius: '4px' }}
              >
                <div style={{ width: '14px', height: '14px', border: '1px solid #ccc', borderRadius: '50%', background: method === 'razorpay' ? 'var(--primary)' : 'transparent' }}></div>
                <img src={assets.razorpay_logo} alt="Razorpay" style={{ height: '20px' }} />
              </div>
              <div 
                onClick={() => setMethod('cod')} 
                style={{ display: 'flex', alignItems: 'center', gap: '10px', border: method === 'cod' ? '2px solid var(--primary)' : '1px solid var(--border)', padding: '10px 20px', cursor: 'pointer', borderRadius: '4px' }}
              >
                <div style={{ width: '14px', height: '14px', border: '1px solid #ccc', borderRadius: '50%', background: method === 'cod' ? 'var(--primary)' : 'transparent' }}></div>
                <p style={{ fontWeight: '500', color: 'var(--text-main)', fontSize: '14px' }}>CASH ON DELIVERY</p>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '30px', textAlign: 'right' }}>
            <button type="submit" className="auth-btn" style={{ width: 'auto', padding: '15px 40px', fontSize: '16px' }}>
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
