// adminController.js

const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

const adminRouter = express.Router();
adminRouter.use(bodyParser.json());

const secretKey = 'your-secret-key'; // Replace with a strong secret key

// Sample in-memory admin database for demonstration purposes
const admins = [
  {
    id: 1,
    username: 'admin',
    password: '$2b$10$0a3lVo0OhwV6zq1ZbP3SRO7WWeW1WfZdBkT5a9v56nvl0bKABFt7a', // bcrypt hash for 'adminpassword'
  },
];

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized - Missing token' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized - Invalid token' });
    }

    req.user = decoded;
    next();
  });
};

// Login endpoint for admin
adminRouter.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Find admin in the database
  const admin = admins.find((a) => a.username === username);

  if (!admin || !bcrypt.compareSync(password, admin.password)) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Generate and return JWT token
  const token = jwt.sign({ id: admin.id, username: admin.username, role: 'admin' }, secretKey, { expiresIn: '1h' });

  res.json({ token });
});

// Logout endpoint (not really necessary for JWT, as it's stateless)
adminRouter.post('/logout', verifyToken, (req, res) => {
  res.json({ message: 'Logout successful' });
});

// CRUD operations for admin (protected by JWT)
adminRouter.use(verifyToken);

// Sample CRUD routes (replace with your actual CRUD logic)
adminRouter.get('/api/admin/data', (req, res) => {
  res.json({ message: 'Get admin data - Admin only' });
});

adminRouter.post('/api/admin/data', (req, res) => {
  res.json({ message: 'Create admin data - Admin only' });
});

adminRouter.put('/api/admin/data/:id', (req, res) => {
  res.json({ message: 'Update admin data - Admin only' });
});

adminRouter.delete('/api/admin/data/:id', (req, res) => {
  res.json({ message: 'Delete admin data - Admin only' });
});

module.exports = adminRouter;
