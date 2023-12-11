import express from 'express';
import checkAuth from "../middleware/checkAuth.js";
import { 
  obtenerProyectos,
  nuevosProyectos,
  obtenerProyecto,
  editarProyectos,
  eliminarProyectos,
  agregarColaborador,
  eliminarColaborador,
} from '../controllers/proyectoController.js';

const router = express.Router();

router.route("/")
  .get(checkAuth, obtenerProyectos)
  .post( checkAuth, nuevosProyectos);

router.route("/:id")
  .get(checkAuth, obtenerProyecto)
  .put(checkAuth, editarProyectos)
  .delete(checkAuth, eliminarProyectos);

router.post("/agregar-colaborador/:id", checkAuth, agregarColaborador);
router.post("/eliminar-colaborador/:id", checkAuth, eliminarColaborador);

export default router;
