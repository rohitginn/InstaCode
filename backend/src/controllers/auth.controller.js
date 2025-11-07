import { generateToken } from '../config/generateToken.js';
import {User} from '../models/user.models.js';
import bcrypt from 'bcrypt';

export const register = async (req, res) => {
    const {username, email, password} = req.body;

    if(!username || !email || !password) {
        return res.status(400).json({message: 'All fields are required'});
    }
    const userExists = await User.findOne({email});

    if(userExists) {
        return res.status(400).json({message: 'User already exists'});
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create ({
            username,
            email,
            password: hashedPassword
        });
        if(user) {
            const token = generateToken(user._id);
            res.cookie("jwt", token, {
                httpOnly: true,
                maxAge: 3 * 24 * 60 * 60 * 1000,
                sameSite: "None",
                secure: true,
            });

            res.status(201).json({
                _id: user._id,
                username: user.username,
                email: user.email,
                token
            });
        } else {
            res.status(400).json({message: 'Invalid user data'});
        }
        console.log(req.body);
        
    } catch (error) {
    
        res.status(500).json({ message: 'Registration failed', error: error.message });
    }
}

export const login = async (req, res) => {
    const {email, password} = req.body;

    if(!email || !password) {
        return res.status(400).json({message: 'All fields are required'});
    }

    const user  =  await User.findOne({email});
    if (!user) {
        return res.status(400).json({message: 'User not found with this email'});
    }
    if (user && (await bcrypt.compare(password, user.password))) {
        const token = generateToken(user._id);
        res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: 3 * 24 * 60 * 60 * 1000,
            sameSite: "None",
            secure: true,
        });

        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token
        });
    } else {
        res.status(400).json({message: 'Invalid credentials email or password'});
    }
};

export const logout = (req, res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        maxAge: 1,
        sameSite: "None",
        secure: true,
    });
    res.status(200).json({message: 'Logout successful'});
};
