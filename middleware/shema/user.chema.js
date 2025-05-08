import Joi from "joi";

const registerSchema = Joi.object({
  rut: Joi.string().required().label("RUT"),
  name: Joi.string().required().label("Nombre"),
  email: Joi.string().email().required().label("Correo electrónico"),
  password: Joi.string().required().label("Contraseña"),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required().label("Confirmar contraseña")
    .messages({ 'any.only': 'Las contraseñas no coinciden' }),
  day: Joi.string().required().label("Día de nacimiento"),
  month: Joi.string().required().label("Mes de nacimiento"),
  year: Joi.string().required().label("Año de nacimiento"),
  tipo_usuario: Joi.string().optional().allow('').label("Tipo de usuario"),
  profesion: Joi.string().optional().allow('').label("Profesión"),
  direccion: Joi.string().optional().allow('').label("Dirección"),
});


export {registerSchema};