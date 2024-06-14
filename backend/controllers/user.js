import { User } from "../models/User.js";
import sendMail from "../middleware/sendMail.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import TryCatch from "../middleware/TryCatch.js";

export const register = TryCatch(async(req,res) => {
    const { email, name, password } = req.body;
        let user = await User.findOne({ email });

        if (user)
            return res.status(400).json({
                message: "User Already Exists"
            });

        const hashPassword = await bcrypt.hash(password, 10);

        user = {
            name,
            email,
            password: hashPassword
        };

        const otp = Math.floor(Math.random() * 1000000);

        const activationToken = jwt.sign({
            user,
            otp
        },
            process.env.Activation_Secret,
            {
                expiresIn: "5m",
            });

        await sendMail({
            email,
            subject: "E Learning",
            name,
            otp
        });

        res.status(200).json({
            message: "OTP sent to your email.",
            activationToken,
        });
})
   


export const verifyUser =  TryCatch(async(req,res) => {
    const {otp, activationToken} = req.body ;

    const verify = jwt.verify(activationToken,process.env.Activation_Secret)

    if(!verify)
        return res.status(400).json({
            message :"Otp Expired"
    });
    if(verify.otp !== otp)
        return res.status(400).json({
        message:"Wrong Otp"
    });

    await User.create({
        name : verify.user.name,
        email : verify.user.email,
        password : verify.user.password,

    });

    res.json({
        message: "User Registered ",
    });
}) ;



export const loginUser = TryCatch(async(req,res) =>{
    const  { email , password} = req.body ;

    const user = await User.findOne({email});

    if(!user)
        return res.status(400).json({
        message : "No User with this email ."
    });
    
    const matchPassowrd =  await bcrypt.compare(password,user.password)

    if(!matchPassowrd)
        return res.status(400).json({
            message : "Wrong Password ."
    });

    const token = jwt.sign({_id : user._id}, process.env.Jwt_Secret, {
        expiresIn : "15d"
    });

    res.json({
        message: `Welcome Back ${user.name}`,
        token,
        user,
    });
    
})


export const myProfile = async (req, res) => {
    const user = await User.findById(req.user._id);
    res.json({ user });
};