import User from "../model/Auth.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"; 

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};


export async function register(req,res){
    const {name,email,password} = req.body ;
    
    try{
        const userExists = await User.findOne({email});
        console.log(userExists)
        if (userExists){
            return res.status(400).json({message:"User Already Exists"})
        }
        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(password, salt);
        const user = await User.create({name,email,password:hashpassword})
        console.log("new user",user)

        if(user){
           return res.status(201).json({
                _id:user._id,
                name:user.name,
                email:user.email,
                token:generateToken(user._id)
            })
        }       
        if (!user) {
  return res.status(400).json({ message: "User creation failed" });
}
    } catch (error) {
        res.status(500).json({ message: "Server error during registration" });
    }
}

    export const loginUser = async(req,res)=>{
        const {email,password} = req.body;

        try {
            console.log("Finding user...");  

            const user = await User.findOne({email})
                console.log("User found:", user); 

            if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
            }
            
                const isPasswordCorrect = await bcrypt.compare(password, user.password);
                console.log("Password checked"); 

            if (isPasswordCorrect) {
                res.json({
                    _id:user._id,
                    name:user.name,
                    email:user.email,
                    token:generateToken(user._id)

                })

            }
            else {
                res.status(401).json({ message: "Invalid email or password" });
            }
        } catch (error) {
                console.error("Login Error:", error);
                res.status(500).json({ message: "Server error during login" });
            
        }

    }


