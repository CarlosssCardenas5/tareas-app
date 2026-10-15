# ✅ App de Tareas — React + Node.js

Aplicación full-stack: frontend en **React (Vite)** y backend con **Node.js + Express** (API REST con CRUD de tareas).

## 🌐 Despliegue en vivo
- **Frontend (Vercel):** https://TU-APP.vercel.app
- **API (Render):** https://TU-API.onrender.com/api/tareas

> La API está en el plan gratuito de Render: tras 15 min sin uso se "duerme" y la primera petición tarda ~1 min.

## 🧱 Estructura
```
tareas-app/
├── server/   ← Backend (Node.js + Express)
└── client/   ← Frontend (React + Vite)
```

## 💻 Ejecución local (dos terminales)
Requisito: Node.js v18 o superior (`node -v`).

**Terminal 1 — Backend**
```bash
cd server
npm install
npm run dev        # http://localhost:3001
```
**Terminal 2 — Frontend**
```bash
cd client
npm install
npm run dev        # http://localhost:5173
```

## 🔌 Endpoints
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | /api/tareas | Lista todas las tareas |
| POST | /api/tareas | Crea una tarea |
| PUT | /api/tareas/:id | Completa / descompleta |
| DELETE | /api/tareas/:id | Elimina una tarea |

Prueba rápida: `curl http://localhost:3001/api/tareas`

## ⚙️ Variables de entorno
| Dónde | Variable | Valor |
|-------|----------|-------|
| Render (backend) | `CLIENTE_URL` | `*` al inicio; luego la URL de Vercel (sin `/` final) |
| Vercel (frontend) | `VITE_API_URL` | `https://TU-API.onrender.com/api/tareas` |

Local: copia `client/.env.example` a `client/.env` si quieres apuntar a otra API. El `.env` nunca se sube al repositorio.

## 🚀 Cómo se desplegó
**Backend en Render:** New → Web Service → repositorio → Root Directory `server` · Build `npm install` · Start `node index.js` · Instance Free · variable `CLIENTE_URL`.

**Frontend en Vercel:** Add New → Project → repositorio → Root Directory `client` · Build `npm run build` · Output `dist` · variable `VITE_API_URL`.

Cada `git push` a `main` redespliega automáticamente ambos servicios.

## 📸 Capturas
_(agrega aquí: panel de Render, panel de Vercel y la app en vivo con datos creados)_

## ⚠️ Limitación conocida
Las tareas viven en memoria RAM: se pierden al reiniciar el servidor. Siguiente paso: base de datos (MongoDB Atlas).
