import { usermodel } from '../src/models/user.model.js';
import { registerSchema } from "./shema/user.chema.js";

const createUserMiddleware = async (req, res, next) => {
  const { rut } = req.body;

  const { error } = registerSchema.validate(req.body);
  if (error) {
    return res.status(400).json(error.details.map((detail) => detail.message));
  }

  const user = await usermodel.findRutOnly(rut); 
  if (user) {
    return res.status(400).json({ message: "El usuario ya existe" });
  }

  next();
};

export { createUserMiddleware };
