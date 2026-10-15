const express = require("express");
const cors = require("cors");

const app = express();

// CORS: en Render se define CLIENTE_URL.
//  - "*" (o sin definir)  -> permite cualquier origen (solo para probar)
//  - URL de Vercel        -> solo tu frontend puede usar la API (produccion final)
const CLIENTE_URL = (process.env.CLIENTE_URL || "*").trim().replace(/\/$/, "");
app.use(cors(CLIENTE_URL === "*" ? {} : { origin: CLIENTE_URL }));
app.use(express.json());

// Datos en memoria (luego los cambiamos por una base de datos)
let tareas = [
  { id: 1, titulo: "Aprender React", completada: false },
  { id: 2, titulo: "Conectar con Node.js", completada: false },
];
let siguienteId = 3;

// Ruta raiz: solo para no ver "Cannot GET /" al abrir la URL de Render
app.get("/", (req, res) => {
  res.send("API de tareas funcionando. Prueba /api/tareas");
});

// GET - Obtener todas las tareas
app.get("/api/tareas", (req, res) => {
  res.json(tareas);
});

// POST - Crear una tarea
app.post("/api/tareas", (req, res) => {
  const { titulo } = req.body;
  if (!titulo || !titulo.trim()) {
    return res.status(400).json({ error: "El titulo es obligatorio" });
  }
  const nueva = { id: siguienteId++, titulo: titulo.trim(), completada: false };
  tareas.push(nueva);
  res.status(201).json(nueva);
});

// PUT - Completar / descompletar
app.put("/api/tareas/:id", (req, res) => {
  const tarea = tareas.find((t) => t.id === Number(req.params.id));
  if (!tarea) return res.status(404).json({ error: "Tarea no encontrada" });
  tarea.completada = req.body.completada ?? !tarea.completada;
  res.json(tarea);
});

// DELETE - Eliminar
app.delete("/api/tareas/:id", (req, res) => {
  const existe = tareas.some((t) => t.id === Number(req.params.id));
  if (!existe) return res.status(404).json({ error: "Tarea no encontrada" });
  tareas = tareas.filter((t) => t.id !== Number(req.params.id));
  res.status(204).send();
});

// Render asigna el puerto mediante process.env.PORT
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`API en el puerto ${PORT}`));
