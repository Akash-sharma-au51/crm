import express from 'express'
import { registerUser,loginUser,logoutUser,getallUsers } from "../controllers/userControllers.js";
import {isUserAuthenticated,isUserAdmin} from '../middlewares/authmiddleware.js'

const router = express.Router()


router.post('/register', registerUser)
router.post('/login', loginUser)    
router.get('/logout', isUserAuthenticated, logoutUser)
router.get('/getallusers',isUserAdmin, getallUsers)

export default router
