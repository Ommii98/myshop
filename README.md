# Narcha@5 - Premium E-Commerce Website 🛒✨

![Narcha@5 Banner](src/assets/myphoto/myphoto1.jpeg)

**Narcha@5** is a fully functional, mobile-responsive e-commerce web application built from the ground up to provide a premium shopping experience. Inspired by modern top-tier e-commerce platforms, it features a sleek React frontend powered by Vite and a robust Node.js backend.

## 🚀 Features

* **Dynamic Product Catalog**: A robust catalog featuring 52 distinct products, perfectly mapped to the frontend, complete with full image galleries, pricing, and descriptions.
* **Smart Shopping Cart**: A globally-managed `ShopContext` tracks exactly what's in your cart. It intelligently prevents adding items without selecting a size, tallies up subtotals, applies shipping fees, and allows for real-time quantity adjustments.
* **OTP Authentication System**: Features a secure login system. Request an OTP via Email (using a live Ethereal SMTP server backend) or Phone Number (terminal simulation) to authenticate before placing an order.
* **Complete Checkout Flow**: A dedicated `PlaceOrder` page captures delivery addresses securely and offers mock payment selections including Stripe, Razorpay, and Cash on Delivery.
* **100% Mobile Responsive**: Built with flexible CSS layouts and media queries ensuring the shop looks stunning on smartphones, tablets, and desktop displays.

## 💻 Tech Stack

* **Frontend**: React.js, Vite, React Router DOM, React Toastify, Lucide React (Icons)
* **Backend**: Node.js, Express.js, Nodemailer (for actual Email OTPs), CORS
* **Styling**: Vanilla CSS (Flipkart-inspired custom design system)

## 🛠️ Local Development & Setup

Follow these steps to run Narcha@5 locally:

### 1. Start the Backend Server (Handles OTP Generation & Emailing)
```bash
cd backend
npm install
node server.js
```
*The backend will run on `http://localhost:3000`.*

### 2. Start the Frontend (Vite Server)
Open a new terminal window:
```bash
# Return to the root /shop directory
cd .. 
npm install
npm run dev
```
*The frontend will be accessible at `http://localhost:5173` (or 5174/5175 if the port is in use).*

## 📧 Testing the Email OTP Logic
Because the project uses a secure testing environment (`Ethereal`), you can actually receive the OTP emails!
1. Go to the Login page and select **Email ID**.
2. Type any email address and click "Request OTP".
3. A toast notification will appear saying "Email sent!". **Click the link** inside that notification.
4. You will be redirected to an HTML viewer showing the actual generated 4-digit code.
5. Use that code to log in!

## 📸 Screenshots

*(You can capture screenshots of your mobile and desktop UI and link them here!)*

---
**Crafted with ❤️ for Narcha@5**
