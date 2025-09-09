const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken'); // Import JWT for token verification
dotenv.config();
const User = require('./models/user');
const { register, login } = require('./authController');


const app = express();
app.use(express.json());
app.use(cookieParser());

// Allow requests from your Next.js frontend
app.use(cors({
  origin: 'http://localhost:3000',  // ← Allow only this frontend URL
  credentials: true,                // Optional: if you want to allow cookies
}));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
	.then(() => console.log('MongoDB connected'))
	.catch((err) => console.log('MongoDB connection error:', err));


// JWT Authentication Middleware
const authenticateToken = (req, res, next) => {
const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Access Denied' });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid Token' });
    }
    req.user = user; // Attach user data to the request
    next();
  });
};


// ✅ Auth Routes
app.post('/auth/register', register);
app.post('/auth/login', authenticateToken, login);


app.post('/api/users', async (req, res) => {
	try {
		const { name, email, password } = req.body;
		const newUser = new User({ name, email, password });
		await newUser.save();
		res.status(201).json(newUser);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

app.get('/api/users', async (req, res) => {
	try {
		const users = await User.find();
		res.status(200).json(users);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

app.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
