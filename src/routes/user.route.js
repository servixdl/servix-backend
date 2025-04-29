import {Router} from 'express';
import { permission } from '../utils/auth.js';
import { userControllers } from '../controller/user.controller.js';
const userRoute = Router()

userRoute.post("/login", userControllers.loginUser)

userRoute.get("/",permission.verifyToken,userControllers.getAllUser)

userRoute.get("/:rut",permission.verifyToken,userControllers.searchByIdUser)

userRoute.put("/:rut",permission.verifyToken,userControllers.updateUser)

userRoute.delete("/:rut",permission.verifyToken,userControllers.deleteUser)

userRoute.post("/",userControllers.registerUser)

export default userRoute;