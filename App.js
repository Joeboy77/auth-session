const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const app = express();

// Middleware
app.use(bodyParser.json());

// MongoDB Atlas connection
const dbURI = 'mongodb+srv://josephechtech:VanessaElinam66715@cluster0.qhtckrq.mongodb.net/';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

// Define User schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Create User Model
const User = mongoose.model('User', userSchema);

// Signup Endpoint
app.post('/signup', async (req, res) => {  // Fix the route path here
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password required" });
    }
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }
    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, 8);

    // Create new user
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
});

// Login Endpoint
app.post('/login', async (req, res) => {  // Fix the route path here
    const { username, password } = req.body;
    if (!username || !password) {  // Fix the condition here
        return res.status(400).json({ message: 'Username and password required' });
    }

    // Retrieve the user from the database
    const user = await User.findOne({ username });
    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
