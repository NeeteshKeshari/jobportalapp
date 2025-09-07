const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const User = require('./models/user');
dotenv.config();


const app = express();
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
	.then(() => console.log('MongoDB connected'))
	.catch((err) => console.log('MongoDB connection error:', err));


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
