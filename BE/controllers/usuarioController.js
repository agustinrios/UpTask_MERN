import Usuario from "../models/Usuario.js";
import generarId from "../helpers/generarId.js"
import generarJWT from "../helpers/generarJWT.js"
import { json } from "express";

const registrar = async (req, res) => {
  //Evitar registros duplicados
  const { email } = req.body;
  const existeUsuario = await Usuario.findOne({email});

  if (existeUsuario) {
    const error = new Error('Usuario ya registrado');
    return res.status(400).json({msg: error.message});
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

  // comprobar si el user existe
  const usuario = await Usuario.findOne({email});
  if(!usuario){
    const error = new Error("El usuario no existe");
    return res.status(404).json({msg: error.message})
  }

  // comprobar si el usuario esta confirmado
  if(!usuario.confirm){
    const error = new Error("Tu cuenta no ha sido confirmada");
    return res.status(403).json({msg: error.message})
  }

  // confirmar password
  if( await usuario.comprobarPassword(password)){
    res.json({
      _id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      token: generarJWT(usuario._id),
    })
  } else {
    const error = new Error("El password es incorrecto");
    return res.status(403).json({msg: error.message})
  }
}

const confirmar = async (req, res) => {
  const { token } = req.params;
  const usuarioConfirmar = await Usuario.findOne({token});

  if(!usuarioConfirmar){
    const error = new Error("Token no valido");
    return res.status(404).json({msg: error.message})
  }

  try {
    usuarioConfirmar.confirm = true;
    usuarioConfirmar.token = "";
    await usuarioConfirmar.save();
    res.json({msg: "Usuario confirmado correctamente"})
  } catch (error) {
    console.log(error);
  }
}

const restaurarPassword = async (req, res) => {
  const { email } = req.body;
  const usuario = await Usuario.findOne({email});

  if(!usuario){
    const error = new Error("El usuario no existe");
    return res.status(404).json({msg: error.message})
  }

  try {
    usuario.token = generarId();
    await usuario.save();
    res.json({msg: "Hemos enviado un email con las instrucciones"})
  } catch (error) {
    console.log(error);
  }

}

export { registrar, autenticar, confirmar, restaurarPassword };
