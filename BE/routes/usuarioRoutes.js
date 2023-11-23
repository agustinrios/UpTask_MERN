import express from "express";
import {
  registrar,
  autenticar,
  confirmar,
  restaurarPassword,
} from "../controllers/usuarioController.js";

const router = express.Router();

// autenticación, registro y confirmacion de usuarios
router.post("/", registrar);
router.post("/login", autenticar);
router.get("/confirmar/:token", confirmar);
router.post("/restaurar-password", restaurarPassword);

export default router;
