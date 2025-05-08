import Joi from "joi";

// Esquema principal
const registerSchema = Joi.object({
  rut: Joi.string().max(12).required().label("RUT"),
  name: Joi.string().max(100).required().label("Nombre"),
  email: Joi.string().email().max(100).required().label("Correo electrónico"),
  password: Joi.string().max(255).required().label("Contraseña"),
  confirmPassword: Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .label("Confirmar contraseña")
    .messages({ 'any.only': 'Las contraseñas no coinciden' }),

  year: Joi.string().pattern(/^\d{4}$/).required().label("Año de nacimiento"),
  month: Joi.string().pattern(/^\d{1,2}$/).required().label("Mes de nacimiento"),
  day: Joi.string().pattern(/^\d{1,2}$/).required().label("Día de nacimiento"),

  vendedor: Joi.boolean().required().label("¿Es vendedor?"),

  oficio: Joi.string().max(100)
    .when('vendedor', { is: true, then: Joi.required(), otherwise: Joi.optional().allow('') })
    .label("Oficio"),

  direccion: Joi.string().max(255)
    .when('vendedor', { is: true, then: Joi.required(), otherwise: Joi.optional().allow('') })
    .label("Dirección"),

  imagen: Joi.string().max(255)
    .when('vendedor', { is: true, then: Joi.required(), otherwise: Joi.optional().allow('') })
    .label("Imagen de perfil"),

  telefono: Joi.string().max(255)
    .when('vendedor', { is: true, then: Joi.required(), otherwise: Joi.optional().allow('') })
    .label("Teléfono"),

  experiencia: Joi.string().max(255)
    .when('vendedor', { is: true, then: Joi.required(), otherwise: Joi.optional().allow('') })
    .label("Experiencia"),

  comuna_id: Joi.number().integer()
    .when('vendedor', { is: true, then: Joi.required(), otherwise: Joi.optional() })
    .label("ID de comuna"),
})
// Validación combinada para fecha
.custom((value, helpers) => {
  const { day, month, year } = value;
  const fecha = new Date(`${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`);
  if (isNaN(fecha.getTime())) {
    return helpers.message("La fecha de nacimiento no es válida");
  }
  return value;
});

export { registerSchema };
