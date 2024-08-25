const User = require('../models/User'); // Adjust the path according to your file structure
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new user
exports.registerUser = async (req, res) => {
    try {
        const { First_Name, Last_Name, Phone_Number, password, Date_Of_Birth, Gender } = req.body;

        // Check if the user already exists
        let user = await User.findOne({ Phone_Number });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        user = new User({
            First_Name,
            Last_Name,
            Phone_Number,
            password: hashedPassword,
            Date_Of_Birth,
            Gender,
        });

        await user.save();

        res.status(201).json({ msg: 'User registered successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};

// Login user
exports.loginUser = async (req, res) => {
    try {
        const { Phone_Number, password } = req.body;

        // Check if the user exists
        let user = await User.findOne({ Phone_Number });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Check if the password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Create and return a JWT token
        const payload = {
            user: {
                id: user.id,
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};

// Get user by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};

// Update user
exports.updateUser = async (req, res) => {
    try {
        const { First_Name, Last_Name, Phone_Number, Date_Of_Birth, Gender, Wishlist, Cart, Vouchers, Addresses } = req.body;

        let user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Update the fields
        user.First_Name = First_Name || user.First_Name;
        user.Last_Name = Last_Name || user.Last_Name;
        user.Phone_Number = Phone_Number || user.Phone_Number;
        user.Date_Of_Birth = Date_Of_Birth || user.Date_Of_Birth;
        user.Gender = Gender || user.Gender;
        user.Wishlist = Wishlist || user.Wishlist;
        user.Cart = Cart || user.Cart;
        user.Vouchers = Vouchers || user.Vouchers;
        user.Addresses = Addresses || user.Addresses;

        await user.save();

        res.json({ msg: 'User updated successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};

// Delete user
exports.deleteUser = async (req, res) => {
    try {
        let user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        await user.remove();

        res.json({ msg: 'User deleted successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};
