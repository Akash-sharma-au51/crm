import Users from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import type { Request, Response } from "express";
import dotenv from 'dotenv'

dotenv.config()

//registerUser

const registerUser = async(req:Request,res:Response)=>{
    try {
        const {username,email,password} = req.body

        if(!username || !email || !password){
            return res.status(400).json({message:'Please fill all the fields'
            ,success:false})
        }

        const user = await Users.findOne({email})
        if(user){
            return res.status(400).json({message:'User already exists'
            ,success:false})
        }

        const salt = await bcrypt.genSalt(12)

        const hashedpassword = await bcrypt.hash(password,salt)

        const newuser = await Users.create({
            username,
            email,
            password:hashedpassword
        })
        await newuser.save()

        const token = jwt.sign({id:newuser._id},process.env.JWT_SECRET as string,{
            expiresIn:'7d'
        })

        //register success

        res.status(201).json({message:"user registered successfully",success:true,token})

        
    } catch (error) {
        res.status(500).json({message:'Internal server error'
            ,success:false
            ,error})
        
    }
}
const loginUser = async(req:Request,res:Response)=>{
    try {
        const {email,password} = req.body

        if(!email || !password){
            return res.status(400).json({message:'Please fill all the fields'
            ,success:false})
        }
        const user = await Users.findOne({email})
        if(!user){
            return res.status(400).json({message:'User does not exist'
            ,success:false})
        }

        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({message:'Invalid credentials'
            ,success:false})
        }
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET as string,{
            expiresIn:'7d'
        })
        //login success
        res.status(200).json({message:"user logged in successfully",success:true,token})
        
    } catch (error) {
        res.status(500).json({message:'Internal server error'
            ,success:false
            ,error})
    }
}
const getallUsers = async(req:Request,res:Response)=>{
    try {
        const users = await Users.find().select('-password').limit(10).sort({createdAt:-1})
        res.status(200).json({message:"Users fetched successfully",success:true,users})
    } catch (error) {
        res.status(500).json({message:'Internal server error'
            ,success:false
            ,error})
    }
}
const logoutUser = async(req:Request,res:Response)=>{
    try {
        res.clearCookie("token")
        res.status(200).json({message:"User logged out successfully",success:true})
    } catch (error) {
        res.status(500).json({message:'Internal server error'
            ,success:false
            ,error})
    }
}

export {registerUser,loginUser,getallUsers,logoutUser}

