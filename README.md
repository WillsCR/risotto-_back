# 🧠 Backend 
Este backend está construido con **NestJS** y utiliza **MongoDB** como base de datos. Se ejecuta dentro de un contenedor **Docker** para facilitar su despliegue y portabilidad.

---

## ✅ Requisitos

- [Docker](https://www.docker.com/) instalado
- [Docker Compose](https://docs.docker.com/compose/) instalado

---

## ⚙️ Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```env
PORT=3001
SALT_ROUNDS=10
API GOOGLE CLIENT ID para ocupar OAuth2Client de google
GOOGLE_CLIENT_ID=165174662934-b59vpj3f6oor8rjs7johfsq6s8k3lvog.apps.googleusercontent.com
MONGO_URI=mongodb://mongo:27017/miappdb