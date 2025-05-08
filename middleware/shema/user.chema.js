import Joi from "joi";

const registerSchema = Joi.object({
  rut: Joi.string().max(12).required(),
  nombre: Joi.string().max(100).required(),
 fecha_nacimiento: Joi.string().required(),

correo: Joi.string().email().max(100).required(),
contrasena: Joi.string().max(255).required(),

  vendedor: Joi.boolean().optional().label("¿Es vendedor?"),

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
});

export { registerSchema };
