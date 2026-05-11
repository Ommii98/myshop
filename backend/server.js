const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// In-memory store for OTPs (in production, use Redis or a database)
const otpStore = {};

// Simulated database
const collectionItems = [
  {
    id: 1,
    title: "Collection Item 1",
    price: "$199.00",
    image: "myphoto1.jpeg" // Frontend will map this
  },
  {
    id: 2,
    title: "Collection Item 2",
    price: "$299.00",
    image: "myphoto2.jpeg"
  },
  {
    id: 3,
    title: "Collection Item 3",
    price: "$149.00",
    image: "myphoto5.jpeg"
  }
];

app.get('/api/collection', (req, res) => {
  res.json(collectionItems);
});

// Create a Nodemailer transporter using Ethereal Email (for testing)
let transporter;
nodemailer.createTestAccount((err, account) => {
  if (err) {
    console.error('Failed to create a testing account. ' + err.message);
    return;
  }
  transporter = nodemailer.createTransport({
    host: account.smtp.host,
    port: account.smtp.port,
    secure: account.smtp.secure,
    auth: { user: account.user, pass: account.pass }
  });
});

app.post('/api/send-otp', async (req, res) => {
  const { contact, method } = req.body;
  const otp = Math.floor(1000 + Math.random() * 9000).toString(); // Generate 4 digit OTP
  
  // Store OTP with an expiry time of 5 minutes
  otpStore[contact] = { otp, expiresAt: Date.now() + 5 * 60 * 1000 };

  if (method === 'email') {
    if (!transporter) {
      return res.status(500).json({ success: false, message: "Email service not ready" });
    }
    try {
      let info = await transporter.sendMail({
        from: '"Narcha@5" <noreply@narchashop.com>',
        to: contact,
        subject: "Your Login OTP",
        text: `Your OTP for Narcha@5 is: ${otp}. It is valid for 5 minutes.`,
        html: `<b>Your OTP for Narcha@5 is: <span style="color: blue;">${otp}</span></b><br>It is valid for 5 minutes.`
      });
      // The Ethereal email gives a URL to view the sent email
      const previewUrl = nodemailer.getTestMessageUrl(info);
      console.log("Email sent! Preview URL: %s", previewUrl);
      
      res.json({ success: true, message: `OTP sent successfully.`, previewUrl });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Failed to send email" });
    }
  } else if (method === 'phone') {
    // For real SMS, you need an API like Twilio.
    console.log(`\n\n--- SMS SIMULATION ---`);
    console.log(`To: ${contact}`);
    console.log(`Message: Your OTP for Narcha@5 is: ${otp}`);
    console.log(`----------------------\n\n`);
    res.json({ success: true, message: `OTP sent to ${contact}` });
  } else {
    res.status(400).json({ success: false, message: "Invalid method" });
  }
});

app.post('/api/verify-otp', (req, res) => {
  const { contact, otp } = req.body;
  const record = otpStore[contact];

  if (!record) {
    return res.status(400).json({ success: false, message: "No OTP found for this contact" });
  }

  if (Date.now() > record.expiresAt) {
    delete otpStore[contact];
    return res.status(400).json({ success: false, message: "OTP has expired" });
  }

  if (record.otp === otp) {
    delete otpStore[contact];
    res.json({ success: true, message: "OTP Verified", token: "mock_jwt_token_" + contact });
  } else {
    res.status(400).json({ success: false, message: "Invalid OTP" });
  }
});

const path = require('path');

// Serve frontend static files in production
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Catch-all route to serve index.html for React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Backend server listening at port ${port}`);
});
