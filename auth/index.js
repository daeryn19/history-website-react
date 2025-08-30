// Import required packages
const express = require('express'); // Express framework for building the API
const cors = require('cors'); // Middleware to allow cross-origin requests
const bcrypt = require('bcryptjs'); // For hashing and comparing passwords
const jwt = require('jsonwebtoken'); // For creating and verifying JWT tokens
const mongoose = require('mongoose'); // MongoDB object modeling tool

// Initialize the Express app
const app = express();

// Enable CORS so your frontend can talk to this backend
app.use(cors());
// Enable JSON body parsing for incoming requests
app.use(express.json());

// Connect to MongoDB database
mongoose.connect('mongodb://localhost:27017/history-users', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// In-memory user store (for demo purposes only; use a database in production)
const users = [];
// Secret key for signing JWT tokens (keep this safe in production!)
const SECRET_KEY = 'your_secret_key';

// User schema and model
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: String,
  date: String,
  country: String,
  phone: String,
});
const User = mongoose.model('User', userSchema);

// Signup endpoint: creates a new user
app.post('/api/signup', async (req, res) => {
  const { username, password, email, date, country, phone } = req.body;
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword, email, date, country, phone });
  await user.save();
  res.json({ message: 'Signup successful' });
});

// Login endpoint: authenticates a user and returns a JWT token
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ token });
});

// Check email endpoint: checks if an email is already registered
app.post('/api/check-email', async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  res.json({ exists: !!user });
});

// Start the server on port 5000
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
