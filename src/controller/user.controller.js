import jwt from "jsonwebtoken";
import { usermodel } from "../models/user.model.js";


const loginUser = async (req, res) => {
    try {
        const { correo, contrasena } = req.body
        if (!correo || !contrasena) {
            return res.status(400).json({ message: "Correo y contraseña son requeridos" });
        }
        const { user } = await usermodel.login(correo, contrasena)
        console.log(user, "que paso?")
        const token = jwt.sign(user, "az_AZ", { expiresIn: "60m" })
        console.log(token)
        res.status(200).json({ token })

    } catch (error) {
        console.log(error);
        res.status(error.code || 500).send(error)
    }
}

const registerUser = async (req, res) => {
    try {
        const usuario = req.body;
        console.log(usuario)
        await usermodel.register(usuario)
        console.log("paso el modelo")
        res.status(201).send("Usuario registrado");
    } catch (error) {
        res.status(500).send(error)
        console.log("error al registrar usuario")

    }
}
const updateUser = async (req, res) => {
  try {
    const rut = req.params.rut;

    // Obtener los datos del cuerpo y añadir la imagen si se subió
    const datosActualizados = {
      ...req.body,
      imagen: req.file?.filename,
    };

    // Filtrar campos vacíos (que no llegaron)
    Object.keys(datosActualizados).forEach((key) => {
      if (datosActualizados[key] === undefined || datosActualizados[key] === "") {
        delete datosActualizados[key];
      }
    });

    const consulta = await usermodel.update(rut, datosActualizados);

    if (!consulta) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json({ message: "Usuario actualizado correctamente", usuario: consulta });
  } catch (error) {
    console.error("Error en controlador updateUser:", error);
    res.status(500).json({ error: "Error al actualizar usuario" });
  }
};

const getAllUser = async (req, res) => {
    try {
        const consulta = await usermodel.getAll()
        res.json(consulta)
    } catch (error) {
        res.status(500).send(error)
        console.log("error al obtener usuario")
    }
}
const searchByIdUser = async (req, res) => {
    try {
        const rut = req.params.rut
        //falta un metodo que valide que es un rut
        const consulta = await usermodel.searchById(rut)
        if (!consulta) return res.status(404).json({ error: 'usuario no encontrado' });
        console.log(consulta)
        res.json(consulta)
    } catch (error) {
        res.status(500).send(error)
        console.log("error al registrar usuario")
    }
}

const deleteUser = async (req, res) => {
    try {
        const rut = req.params.rut
        const consulta = await usermodel.destroy(rut)
        res.status(200).json({ message: "usuario eliminado" })
    } catch (error) {
        res.status(500).send(error)
        console.log("error al eliminar usuario")
    }
}

export const userControllers = { loginUser, registerUser, searchByIdUser, deleteUser, getAllUser, updateUser }