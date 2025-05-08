import pool from "../../config/data/conection.db.js";
import bcrypt from "bcryptjs";

const login = async (correo, contrasenaIngresada) => {
  console.log(correo);
  try {
    const values = [correo];
    const consulta = "SELECT * FROM usuario WHERE correo = $1";
    const { rows, rowCount } = await pool.query(consulta, values);
    const usuario = rows[0];

    //    if (!usuario || rowCount ===0) throw { code: 401, message: "Usuario no encontrado" };

    const { contrasena: passwordEncriptada, ...usuarioSinPassword } = usuario;
    console.log(contrasenaIngresada, passwordEncriptada);

    // const resultado = bcrypt.compareSync(contrasenaIngresada, passwordEncriptada);
    //console.log(resultado)
    //if (!resultado || !rowCount) {
    //   console.log("Contraseña incorrecta o usuario no encontrado");
    //    throw { code: 401, message: "Email o contraseña incorrecta" };
    // }

    return { user: usuarioSinPassword };
  } catch (error) {
    console.log("error -->", error);
    throw error;
  }
};

const register = async (user) => {
  try {
    let {
      rut,
      nombre,
      fecha_nacimiento,
      correo,
      contrasena,
      vendedor,
      oficio,
      direccion,
      imagen,
      telefono,
      experiencia,
      comuna_id
    } = user;
    const passwordEncriptado = bcrypt.hashSync(contrasena, 10);
    const values = [
      rut,
      nombre,
      fecha_nacimiento,
      correo,
      passwordEncriptado,
      vendedor,
      oficio,
      direccion,
      imagen,
      telefono,
      experiencia,
      comuna_id
    ];
    const query = `INSERT INTO usuario (rut,nombre,fecha_nacimiento,correo,contrasena,vendedor,oficio,direccion,imagen,telefono,experiencia,comuna_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)`;
    await pool.query(query, values);
    console.log("usuario registrado");
  } catch (error) {
    console.log("error al registrar usuario", error);
    throw error;
  }
};

const getAll = async () => {
  try {
    const query =
      "SELECT rut ,nombre,fecha_nacimiento,correo,tipo_usuario,profesion,direccion FROM usuario";
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.log("error al buscar usuario", error);
    throw error;
  }
};

const update = async (rut, usuario) => {
  try {
    const {
      nombre,
      fecha_nacimiento,
      correo,
      contrasena,
      tipo_usuario,
      profesion,
      direccion,
      imagen,
      telefono,
      experiencia,
      comuna_id
    } = usuario;
    const result = await pool.query(
      `UPDATE usuario SET nombre = $1, fecha_nacimiento = $2, correo = $3, tipo_usuario = $4,profesion =$5,direccion =$6, imagen=$7, telefono=$8, experencia=$9, comuna_id=$10
       WHERE rut = $11 RETURNING *`,
      [
        nombre,
        fecha_nacimiento,
        correo,
        tipo_usuario,
        profesion,
        direccion,
        imagen,
        telefono,
        experiencia,
        comuna_id,
        rut,
      ]
    );
    return result.rows[0];
  } catch (error) {
    console.log("error al actualizar usuario", error);
    throw error;
  }
};

const searchById = async (rut) => {
  try {
    const query =
      "SELECT rut,nombre,fecha_nacimiento,correo,tipo_usuario,profesion,direccion FROM usuario WHERE rut = $1";
    const result = await pool.query(query, [rut]);
    return result.rows[0];
  } catch (error) {
    console.log("error al buscar usuario", error);
    throw error;
  }
};

const destroy = async (rut) => {
  try {
    const query = "DELETE FROM usuario WHERE rut = $1 RETURNING  *";
    const result = await pool.query(query, [rut]);
    return result.rows[0];
  } catch (error) {
    console.log("error al eliminar");
    throw error;
  }
};

export const usermodel = {
  register,
  login,
  searchById,
  destroy,
  getAll,
  update,
};
