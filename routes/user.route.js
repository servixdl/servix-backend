import {Router} from 'express';
import { verifyToken } from '../middleware/auth.js';
import { userControllers } from '../src/controller/user.controller.js';
import { createUserMiddleware } from '../middleware/user.middlewares.js'

const userRoute = Router()

userRoute.post("/login", userControllers.loginUser)

userRoute.get("/",verifyToken,userControllers.getAllUser)

userRoute.get("/:rut",verifyToken,userControllers.searchByIdUser)

userRoute.put("/:rut",verifyToken,userControllers.updateUser)

userRoute.delete("/:rut",verifyToken,userControllers.deleteUser)

userRoute.post("/", createUserMiddleware, userControllers.registerUser)

export default userRoute;