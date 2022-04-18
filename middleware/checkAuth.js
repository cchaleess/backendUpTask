import jsonwebtoken from "jsonwebtoken";
import Usuario from "../models/Usuario.js";

const checkAuth = async (req, res, next) => {
    
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){

        try {
              const token = req.headers.authorization.split(' ')[1];
              const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
              //Solo envio lo que necesito
                req.usuario = await Usuario.findById(decoded.id).select('-password -token -__v -confirmado -createdAt -updatedAt');
                return next();

        } catch (error) {
            return res.status(404).json({ msg: "Hubo un error" });
        }
      
    }else{
        res.status(401).json({msg: 'Token no válido'});
    }
}

export default checkAuth;