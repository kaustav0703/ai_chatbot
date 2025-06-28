import jwt from "jsonwebtoken";
import { hash, compare } from "bcrypt";
import User from "../models/user.js";
import dotenv from "dotenv";
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

async function postUserSignin(req, res) {
    if (!JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in environment variables.");
    }

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "User not found", message: "Please sign up" });
        }

        const isPasswordValid = await compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: "Invalid password" });
        }

        const token = jwt.sign(
            {
                _id: user._id,
                username: user.username,
                email: user.email,
            },
            JWT_SECRET, // 🔐 Replace with environment variable in production
            { expiresIn: "1h" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 3600000, // 1 hour
        });
        req.user = { username: user.username, email: user.email };
        res.status(200).json({ message: "User signed in successfully" });
    } catch (error) {
        console.error("Signin error:", error);
        res
            .status(500)
            .json({ error: "An error occurred while signing in the user" });
    }
}

async function postUserSignUp(req, res) {


    try {
        const { username, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        // 1. Hash the password
        const hashedPassword = await hash(password, 10);

        // 2. Create new user with hashed password
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        // 3. Generate JWT (Do NOT include password in token)
        const token = jwt.sign(
            {
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email,
            },
            JWT_SECRET, // 🔐 Replace with environment variable in production
            { expiresIn: "1h" }
        );

        // 4. Set JWT as an HTTP-only cookie
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 3600000, // 1 hour
        });
        req.user = { username, email };
        // 5. Send success response
        res.status(201).json({ message: "User created successfully", user: { username, email } });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ error: "Server error" });
    }
}

export { postUserSignUp, postUserSignin };
