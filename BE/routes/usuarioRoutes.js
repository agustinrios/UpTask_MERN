import express from "express";
import {
  registrar,
  autenticar,
  confirmar,
  restaurarPassword,
  comprobarToken,
  nuevoPassword,
  perfil,
} from "../controllers/usuarioController.js";

import checkAuth from "../middleware/checkAuth.js"

const router = express.Router();

// autenticación, registro y confirmación de usuarios
router.post("/", registrar);
router.post("/login", autenticar);
router.get("/confirmar/:token", confirmar);
router.post("/restaurar-password", restaurarPassword);

router.route("/restaurar-password/:token")
  .get(comprobarToken)
  .post(nuevoPassword);

router.get("/perfil", checkAuth, perfil);

export default router;
