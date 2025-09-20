import express from 'express'
import Users from '../models/userModel.js'
import type { Request, Response } from 'express'
import type { NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

// Extend Express Request interface to include 'user'
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

const isUserAuthenticated = async (req:Request,res:Response,next:NextFunction) => {
    const token = req.cookies.token
    if(!token){
        return res.status(401).json({message:'Unauthorized',success:false})
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string)
        const userId = typeof decoded === 'object' && decoded !== null && 'id' in decoded ? (decoded as any).id : null
        if (!userId) {
            return res.status(401).json({message:'Unauthorized',success:false})
        }
        req.user = await Users.findById(userId).select('-password')
        next()
    } catch (error) {
        return res.status(401).json({message:'Unauthorized',success:false})
    }
}

const isUserAdmin = (req:Request,res:Response,next:NextFunction)=>{
    try {
        if (!req.user || req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Forbidden', success: false })
        }
        next()
    } catch (error) {
        
    }
}

export {isUserAuthenticated,isUserAdmin}


