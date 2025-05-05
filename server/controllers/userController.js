import User from "../models/user.js";
import bcrypt from 'bcryptjs';

export const registerUser = async(req,res)=>{
    const {username,email,password} = req.body;

    try{
        const exists = await User.findOne({email});

        if(exists){
            return res.status(400).json({message:"User already exists"})
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const newUser = new User({
            username,
            email,
            password:hashedPassword
        });

        await newUser.save();
        res.status(201).json({message:"User successfully created"});
    }catch(error){
        console.error(error);
        res.status(500).json({message:"Server Error"});
    }
};


export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
      
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

  
        req.session.userId = user._id;
        req.session.username = user.username;
        req.session.email = user.email;

        res.status(200).json({ message: "Login successful" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

export const logoutUser = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: "Failed to log out" });
        }
        res.status(200).json({ message: "Logged out successfully" });
    });
};


export const getCurrentUser = (req, res) => {
    if (req.session.userId) {
        return res.status(200).json({
            userId: req.session.userId,
            username: req.session.username,
            email: req.session.email
        });
    } else {
        res.status(401).json({ message: "No user logged in" });
    }
};