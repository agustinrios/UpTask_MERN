import express from 'express';
import { 
  obtenerProyectos,
  nuevosProyectos,
  obtenerProyecto,
  editarProyectos,
  eliminarProyectos,
  agregarColaborador,
  eliminarColaborador,
  obtenerTareas,
} from '../controllers/proyectoController.js';
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.route("/")
  .get(checkAuth, obtenerProyectos)
  .post( checkAuth, nuevosProyectos);

router.route("/:id")
  .get(checkAuth, obtenerProyecto)
  .put(checkAuth, editarProyectos)
  .delete(checkAuth, eliminarProyectos);

router.get("/tareas/:id", checkAuth, obtenerTareas);
router.post("/agregar-colaborador/:id", checkAuth, agregarColaborador);
router.post("/eliminar-colaborador/:id", checkAuth, eliminarColaborador);

export default router;
