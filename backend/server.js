'use strict';

const express    = require('express');
const cors       = require('cors');
const helmet     = require('helmet');
const rateLimit  = require('express-rate-limit');
const compression = require('compression');
const nodemailer = require('nodemailer');

// ─── App setup ────────────────────────────────────────────────────────────────
const app  = express();
const PORT = process.env.PORT || 3000;

// ─── Allowed origins ──────────────────────────────────────────────────────────
// In production this is your Render static-site URL; locally it's localhost:5173
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || 'http://localhost:5173').split(',');

// ─── Security & performance middleware ────────────────────────────────────────
app.use(helmet());
app.use(compression());
app.use(express.json());

app.use(cors({
  origin: (origin, cb) => {
    // Allow non-browser tools (Postman, Render health checks) and listed origins
    if (!origin || ALLOWED_ORIGINS.some(o => origin.startsWith(o.trim()))) {
      return cb(null, true);
    }
    cb(new Error(`CORS: ${origin} not allowed`));
  },
  credentials: true,
}));

// ─── Rate limiter – 60 requests / minute per IP ───────────────────────────────
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests – slow down.' },
});
app.use('/api', limiter);

// ─── Health check ─────────────────────────────────────────────────────────────
app.get('/health', (_req, res) => res.json({ status: 'ok', ts: new Date().toISOString() }));

// ─── OTP store (replace with Redis in production) ─────────────────────────────
const otpStore = {};

// ─── Nodemailer – Ethereal test account (swap for real SMTP via env vars) ─────
let transporter;
nodemailer.createTestAccount((err, account) => {
  if (err) { console.error('Nodemailer test-account error:', err.message); return; }
  transporter = nodemailer.createTransport({
    host:   account.smtp.host,
    port:   account.smtp.port,
    secure: account.smtp.secure,
    auth:   { user: account.user, pass: account.pass },
  });
  console.log('Nodemailer ready (Ethereal)');
});

// ─── Routes ───────────────────────────────────────────────────────────────────

// Collection (example data – wire to a real DB later)
const collectionItems = [
  { id: 1, title: 'Collection Item 1', price: '$199.00', image: 'myphoto1.jpeg' },
  { id: 2, title: 'Collection Item 2', price: '$299.00', image: 'myphoto2.jpeg' },
  { id: 3, title: 'Collection Item 3', price: '$149.00', image: 'myphoto5.jpeg' },
];
app.get('/api/collection', (_req, res) => res.json(collectionItems));

// Send OTP
app.post('/api/send-otp', async (req, res) => {
  const { contact, method } = req.body;
  if (!contact || !method) {
    return res.status(400).json({ success: false, message: 'contact and method are required' });
  }

  const otp = Math.floor(1000 + Math.random() * 9000).toString();
  otpStore[contact] = { otp, expiresAt: Date.now() + 5 * 60 * 1000 };

  if (method === 'email') {
    if (!transporter) {
      return res.status(503).json({ success: false, message: 'Email service not ready yet – retry in a moment' });
    }
    try {
      const info = await transporter.sendMail({
        from:    '"Narcha@5" <noreply@narchashop.com>',
        to:      contact,
        subject: 'Your Narcha@5 Login OTP',
        text:    `Your OTP is: ${otp}  (valid 5 min)`,
        html:    `<p>Your OTP for <b>Narcha@5</b> is: <b style="color:#2874f0">${otp}</b></p><p>Valid for 5 minutes.</p>`,
      });
      const previewUrl = nodemailer.getTestMessageUrl(info);
      console.log('Email preview:', previewUrl);
      return res.json({ success: true, message: 'OTP sent to your email', previewUrl });
    } catch (err) {
      console.error('Email send error:', err);
      return res.status(500).json({ success: false, message: 'Failed to send email' });
    }
  }

  if (method === 'phone') {
    // Production: replace with Twilio / MSG91
    console.log(`\n[SMS SIM] OTP for ${contact}: ${otp}\n`);
    return res.json({ success: true, message: `OTP sent to ${contact}` });
  }

  return res.status(400).json({ success: false, message: 'method must be email or phone' });
});

// Verify OTP
app.post('/api/verify-otp', (req, res) => {
  const { contact, otp } = req.body;
  if (!contact || !otp) {
    return res.status(400).json({ success: false, message: 'contact and otp are required' });
  }

  const record = otpStore[contact];
  if (!record) {
    return res.status(400).json({ success: false, message: 'No OTP found – request a new one' });
  }
  if (Date.now() > record.expiresAt) {
    delete otpStore[contact];
    return res.status(400).json({ success: false, message: 'OTP expired – request a new one' });
  }
  if (record.otp !== otp) {
    return res.status(400).json({ success: false, message: 'Invalid OTP' });
  }

  delete otpStore[contact];
  return res.json({
    success: true,
    message: 'OTP verified',
    token: `mock_jwt_${contact}_${Date.now()}`,   // replace with real JWT later
  });
});

// 404 handler for unknown API routes
app.use('/api', (_req, res) => res.status(404).json({ success: false, message: 'API route not found' }));

// ─── Global error handler ─────────────────────────────────────────────────────
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ success: false, message: err.message || 'Internal server error' });
});

// ─── Start ────────────────────────────────────────────────────────────────────
app.listen(PORT, () => console.log(`Backend API listening on port ${PORT}`));
