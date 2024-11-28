require('dotenv').config()

const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const mongoose = require('mongoose');


const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
  };

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        if (!email || !password) {
            throw error('Please enter all fields');
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw error('Incorrect email');
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw error('Incorrect password');
    }

    const token = createToken(user._id);
    res.status(200).json({ user, token });
    } catch (error) { 
        res.status(400).json({message: error.message});
    }
};

const signupUser = async (req, res) => {
    console.log(req.body);
    const { name, email, password, phone_number, gender, date_of_birth, membership_status } = req.body;
    try {
        if (!name || !email || !password || !phone_number || !gender || !date_of_birth || !membership_status) {
            throw new Error('Please enter all fields');
        }
        if (!validator.isEmail(email)) {
            throw new Error('Email is not valid');
        }
        if (!validator.isStrongPassword(password)) {
            throw new Error('Password is not strong enough');
        }

        const exists = await User.findOne({ email});
        if (exists) {
            throw new Error('User already exists');
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const user = await User.create({ name, email, password: hash, phone_number, gender, date_of_birth, membership_status });

        const token = createToken(user._id);
        res.status(200).json({ email, token });
    } catch (error) {
        console.error("Signup error: ", error.message);
        res.status(400).json({message: error.message});
    }
};

module.exports = { loginUser, signupUser };