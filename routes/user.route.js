import {Router} from 'express';
import { permission } from '../src/utils/auth.js';
import { userControllers } from '../src/controller/user.controller.js';
import { createUserMiddleware } from '../middleware/user.middlewares.js'

const userRoute = Router()

userRoute.post("/login", userControllers.loginUser)

userRoute.get("/users",permission.verifyToken,userControllers.getAllUser)

userRoute.get("/:rut",permission.verifyToken,userControllers.searchByIdUser)

userRoute.put("/:rut",permission.verifyToken,userControllers.updateUser)

userRoute.delete("/:rut",permission.verifyToken,userControllers.deleteUser)

userRoute.post("/createUser", createUserMiddleware, userControllers.registerUser)

export default userRoute;