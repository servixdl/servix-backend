import jwt from 'jsonwebtoken'

const verifyToken = (req,res,next)=>{
    if (req.method === 'OPTIONS') {
        return next();
      }
    try{
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Credenciales no proporcionadas" });
        }

        const token = req.headers.authorization?.split(" ")[1];
        
        if(!token){return res.status(401).json({message: "Token no existe"})}
        const decoded = jwt.verify(token,"az_AZ")
        req.user =decoded
        next();
    }catch(error){return res.status(403).json({message: "Token invalido"})}

}

export const permission = {verifyToken}
