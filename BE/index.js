import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import conectarDB from './config/db.js';
import usuarioRoutes from './routes/usuarioRoutes.js';
import proyectoRoutes from './routes/proyectoRoutes.js';
import tareaRoutes from './routes/tareaRoutes.js';

const app = express();
app.use(express.json());

dotenv.config();

conectarDB();

// config cors
const whiteList = ['http://localhost:5173'];

const corsOptions = {
  origin: function(origin, callback) {
    if(whiteList.includes(origin)){
      callback(null, true);
    } else {
      callback(new Error('Error de Cors'));
    }
  }
}

app.use(cors(corsOptions));

// Routing
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/proyectos", proyectoRoutes);
app.use("/api/tareas", tareaRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log("servidor levantado")
});
