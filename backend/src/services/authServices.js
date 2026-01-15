import usermodel from "../models/user.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'


export const registerService = async(req, res) =>{
    try{
        const{name, email, password} = req.body

        if(!name || !email || !password){
            return res.status(400).json({
                success: false,
                message : "Provide all required credentials"
            })
        }
        
        const existingUser = await usermodel.findOne({email})

        if(existingUser){
            return res.status(400).json({
                success: false,
                message : "User already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new usermodel({
            name, 
            email,
            password : hashedPassword
        })

        await newUser.save()

        const token = jwt.sign(
            {id : newUser._id},
            process.env.JWT_SECRET,
            {expiresIn: "7d"}
        )

        return res.status(201).json({
            success: true,
            message: "New user registered",
            token,
            user: {
                id : newUser._id,
                name : newUser.name,
                email: newUser.email
            }
        })
    }
    catch(err){
        console.log("Registration error : ", err)
        res.status(500).json({
            success: false,
            message: "server error, try again"
        })
    }
}

export const loginService = async(req, res) =>{
    try{
        const {email, password} = req.body

        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "Missing Credentials"
            })
        }
        const existing = await usermodel.findOne({email})

        if(!existing){
            return res.status(400).json({
                success : false,
                message: "User doesn't exists"
            })
        }

        const isMatch = await bcrypt.compare(password, existing.password)

        if(!isMatch){
            return res.status(400).json({
                success: false,
                message: "Wrong Password"
            })
        }

        const token = jwt.sign(
            {id: existing._id},
            process.env.JWT_SECRET,
            {expiresIn : "7d"}
        )

        return res.status(200).json({
            success: true,
            message: "Login Successful",
            token,
            user: {
                id: existing._id,
                name: existing.name,
                email: existing.email,
            }
        })


    }
    catch(err){
        console.log("Login error :", err);
        res.status(500).json({
            success: false,
            message: "Server error, try again"
        })
    }
}