import User from '../models/UserModel.js';
import bcryptjs from 'bcryptjs';

export const signup = async (req, res) => {
    const { username, email, password } = req.body;

    if(!username || !email || !password) {
        return res.status(400).json({ message: 'Please fill all fields' });
    }

    const hashedPassword = bcryptjs.hashSync(password, 12);

    const newUser = new User({ 
        username, 
        email, 
        password: hashedPassword, 
    });

    try {
        await newUser.save();
        res.status(201).json({ message: 'User created' });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};