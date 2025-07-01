import cloudinary from "../lib/cloudinary.js";
import { generateAuthToken } from "../lib/utils.js";
import User from "../models/user.js";
import bcrypt from "bcryptjs";

// controller for user signup
export const signup = async (req, res) => {
    const { fullName, email, password, bio } = req.body;

    try {

        if( !fullName || !email || !password ) {
            return res.json({ success: false, message: "Missing Details" });
        }

        const user = await User.findOne({ email });

        if(user) {
            return res.json({ success: false, message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            fullName,
            email,
            password: hashedPassword,
            bio: bio || "",
        });

        const token = generateAuthToken(newUser._id);

        res.json({
            success: true,
            userData: newUser,
            token,
            message: "User created successfully",
        });

    } catch (error) {
        console.error("Error in signup:", error.message);
        res.json({
            success: false,
            message: error.message,
        });
    }
        
}

// controller for user login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        const token = generateAuthToken(user._id);

        res.json({
            success: true,
            userData: user,
            token,
            message: "Login successful",
        });

    } catch (error) {
        console.error("Error in login:", error.message);
        res.json({
            success: false,
            message: error.message,
        });
    }
        
}

// Controller to check if user is authenticated
export const checkAuth = async (req, res) => {
    res.json({
        success: true,
        user: req.user,
    });
}

// Controller to update user profile

export const updateProfile = async (req, res) => {
    try {
        const { profilePic, bio, fullName } = req.body;
        const userId = req.user._id;

        let updatedUser;
        if(!profilePic) {
            updatedUser = await User.findByIdAndUpdate(userId, {
                fullName,   
                bio,
            }, { new: true });
        } else {
            const upload = await cloudinary.uploader.upload(profilePic);

            updatedUser = await User.findByIdAndUpdate(userId, {
                fullName,
                bio,
                profilePic: upload.secure_url,
            }, { new: true });
       }  
       
       res.json({
            success: true,
            userData: updatedUser,
            message: "Profile updated successfully",
        });
    } catch (error) {
        console.error("Error in updateProfile:", error.message);
        res.json({
            success: false,
            message: error.message,
        });
    }
}
