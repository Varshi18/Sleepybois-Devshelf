import User from "../model/user.model.js";  //this will be the new user database
import bcryptjs from "bcryptjs"

export const signup = async (req, res)=>{
    try {
        const {email, password} = req.body;
        const user =await User.findOne({email});
        if(user){
            if (!user.password) {
                // User exists but password is empty
                const hashPassword = await bcryptjs.hash(password, 8);
                user.password = hashPassword;
                await user.save();
                return res.status(200).json({ message: "Password set successfully", user: { _id: user._id, email: user.email } });
            }
            return res.status(400).json({message:"User already exists"})
        }
        else{
            return res.status(401).json({message:"Not Authorized"})
        }

    } catch (error) {
        console.log("error:",+ error.message)
        res.status(500).json({message:"Internal server error"})
    }
};

export const login = async(req, res)=>{
    try {
        const {email, password} = req.body;
        const user =await User.findOne({email});
        const isMatch= await bcryptjs.compare(password, user.password) //the user.password is from the database which is compared with the input password
        if(!user || !isMatch){
            //check if user.password is empty here
            return res.status(400).json({message:"Invalid username or Password"});
        }
        else{
            res.status(200).json({message:"Login successful", user:{
                _id:user._id,  //can use this ID for checking cart
                email:user.email 
            }});
        }
    } catch (error) {
        console.log("error:", +error.message);
        res.status(500).json({message:"Internal server error"})
    }
}

// at 3:28:00 we merge this user authentication with frontend
