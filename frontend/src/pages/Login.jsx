import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';
import { apiUrl } from '../api';

const Login = () => {
  const [loginMethod, setLoginMethod] = useState('phone'); // 'email' or 'phone'
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [contact, setContact] = useState('');
  const { setToken } = useContext(ShopContext);
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!contact) {
      toast.error("Please enter your details");
      return;
    }
    
    try {
      const response = await fetch(apiUrl('/api/send-otp'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contact, method: loginMethod })
      });
      const data = await response.json();
      
      if (data.success) {
        setOtpSent(true);
        toast.success(data.message);
        if (data.previewUrl) {
          // For testing, log the Ethereal URL to console so you can view the email
          console.log("Email sent! View it here:", data.previewUrl);
          toast.info(
            <div>
              Email sent! <a href={data.previewUrl} target="_blank" rel="noopener noreferrer" style={{color:'blue', textDecoration:'underline'}}>Click here to view it</a>
            </div>, 
            { autoClose: false }
          );
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to connect to server");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(apiUrl('/api/verify-otp'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contact, otp })
      });
      const data = await response.json();

      if (data.success) {
        setToken(data.token);
        toast.success("Login Successful!");
        navigate('/');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to connect to server");
    }
  };

  return (
    <div className="page-content">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-sidebar">
            <h2>Login</h2>
            <p>Get access to your Orders, Wishlist and Recommendations</p>
          </div>
          
          <div className="auth-form-container">
            {!otpSent ? (
              <>
                <div className="auth-tabs">
                  <button 
                    className={`auth-tab ${loginMethod === 'phone' ? 'active' : ''}`}
                    onClick={() => setLoginMethod('phone')}
                  >
                    Phone Number
                  </button>
                  <button 
                    className={`auth-tab ${loginMethod === 'email' ? 'active' : ''}`}
                    onClick={() => setLoginMethod('email')}
                  >
                    Email ID
                  </button>
                </div>

                <form onSubmit={handleSendOtp}>
                  <div className="form-group">
                    <input 
                      type={loginMethod === 'email' ? "email" : "tel"} 
                      className="form-input" 
                      placeholder={`Enter ${loginMethod === 'email' ? 'Email Address' : 'Phone Number'}`}
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      required 
                    />
                  </div>

                  <button type="submit" className="auth-btn">
                    Request OTP
                  </button>
                </form>
              </>
            ) : (
              <form onSubmit={handleVerifyOtp}>
                <div style={{ marginBottom: '20px' }}>
                  <p style={{ color: 'var(--text-muted)' }}>Enter the OTP sent to <b>{contact}</b></p>
                  <button type="button" onClick={() => setOtpSent(false)} style={{ color: 'var(--primary)', background: 'transparent', fontSize: '12px', marginTop: '5px' }}>Change</button>
                </div>

                <div className="form-group">
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Enter 4-digit OTP" 
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength="4"
                    required 
                  />
                </div>

                <button type="submit" className="auth-btn">
                  Verify & Login
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
