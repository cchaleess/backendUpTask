import Usuario from "../models/Usuario.js";
import generarJWT from "../helpers/generarJWT.js";
import generarId from "../helpers/generarId.js";

const registrar = async (req, res) => {
  //Evitar registro de usuarios duplicados
  const existeUsuario = await Usuario.findOne({ email: req.body.email });

  if (existeUsuario) {
    const error = new Error("Usuario ya registrado");
    return res.status(400).json({ msg: error.message });
  }

  try {
    const usuario = new Usuario(req.body);
    usuario.token = generarId();
    const usuarioAlmacenado = await usuario.save();
    res.json(usuarioAlmacenado);
  } catch (error) {
    console.log(error);
  }
};

const autenticar = async (req, res) => {
  const { email, password } = req.body;
  //Buscar el usuario por email
  const usuario = await Usuario.findOne({ email });
  if (!usuario) {
    const error = new Error("El usuario no existe");
    return res.status(404).json({ msg: error.message });
  }
  //Comprobar si el usuario esta confirmado
  if (!usuario.confirmado) {
    const error = new Error("El usuario no esta confirmado");
    return res.status(403).json({ msg: error.message });
  }
  //Comprobar si el password es correcto

  if (await usuario.comprobarPassword(password)) {
    res.json({
      _id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      token: generarJWT(usuario._id),
    });
  } else {
    const error = new Error("El password es incorrecto");
    return res.status(403).json({ msg: error.message });
  }
};

const confirmar = async (req, res) => {
  const { id } = req.params;
    console.log(id);
  const usuario = await Usuario.findOne({ id });
  if (!usuario) {
    const error = new Error("Token no valido");
    return res.status(404).json({ msg: error.message });
  }
  try {
    usuario.confirmado = true;
    //Token de un solo uso.Eliminar el token para que no se pueda volver a usar, ya que se ha confirmado.
    usuario.token = "";
    await usuario.save();
    res.json({ msg: "Usuario confirmado" });
  } catch (error) {
    console.log(error);
  }
};

const olvidePassword = async (req, res) => {
    const { email } = req.body;
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
        const error = new Error("El usuario no existe");
        return res.status(404).json({ msg: error.message });
    }
    try {
        usuario.token = generarId();
        await usuario.save();
        res.json({ msg: "Token con instrucciones enviado" });
    } catch (error) {
        console.log(error);
    }
};

const comprobacionToken = async (req, res) => {
    const { token } = req.params;
    const tokenValido = await Usuario.findOne({ token });
    if (!tokenValido) {
        const error = new Error("Token no valido");
        return res.status(404).json({ msg: error.message });
    }
    try {
        res.json({ msg: "Token válido, el usuario existe" });
    } catch (error) {
        console.log(error);
    }
};

const nuevoPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    const usuario = await Usuario.findOne({ token });
    if (!usuario) {
        const error = new Error("Token no valido");
        return res.status(404).json({ msg: error.message });
    }
    try {
        usuario.password = password;
        usuario.token = "";
        await usuario.save();
        res.json({ msg: "Password cambiado" });
    } catch (error) {
        console.log(error);
    }
};




export { registrar, autenticar, confirmar , olvidePassword, comprobacionToken, nuevoPassword};
