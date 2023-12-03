import Proyecto from "../models/Proyecto.js"

const obtenerProyectos = async (req, res) => {

}

const nuevosProyectos = async (req, res) => {
  const proyecto = new Proyecto(req.body)
  proyecto.creador = req.usuario._id

  console.log(proyecto)
  console.log(proyecto.creador)

  try {
    const proyectoAlmacenado = await proyecto.save()
    res.json(proyectoAlmacenado);
  } catch (error) {
    console.log(error)
  }
}

const obtenerProyecto = async (req, res) => {

}

const editarProyectos = async (req, res) => {

}

const eliminarProyectos = async (req, res) => {

}

const agregarColaborador = async (req, res) => {

}

const eliminarColaborador = async (req, res) => {

}

const obtenerTareas = async (req, res) => {

}

export {
  obtenerProyectos,
  nuevosProyectos,
  obtenerProyecto,
  editarProyectos,
  eliminarProyectos,
  agregarColaborador,
  eliminarColaborador,
  obtenerTareas
};
