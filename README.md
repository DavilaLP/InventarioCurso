# Sistema de Control de Inventario y Stock - Guía de Instalación y Configuración

Esta es la guía paso a paso para configurar e instalar el proyecto localmente, incluyendo tanto el Backend (servidor Node.js con Express y MongoDB) como el Frontend (aplicación React).

---

## Requisitos Previos para que funcione el proyecto



Antes de comenzar, asegúrate de tener instalado:
1. **Node.js** (versión v16 o superior recomendada)
2. **NPM** (incluido con Node.js)
3. **MongoDB** (una base de datos local instalada o una cuenta en MongoDB Atlas para base de datos en la nube)
4. **Git** (opcional, para clonar el proyecto)

---

## 1. Configuración del Backend

El backend gestiona la base de datos, autenticación de usuarios mediante JWT, carga de imágenes y el envío de correos.

### Paso 1.1: Navegar al directorio del backend
Abre tu terminal y dirígete a la carpeta `inventario-eli-backend`:
```bash
cd inventario-eli-backend
```

### Paso 1.2: Instalar dependencias
Instala todos los paquetes requeridos por el backend ejecutando:
```bash
npm install
```

### Paso 1.3: Configurar variables de entorno (`.env`)
Crea un archivo llamado `.env` en la raíz del directorio `inventario-eli-backend` (si no existe) y define las siguientes variables:

```env
PORT=5001
NODE_ENV=development
MONGO_URI=tu_uri_de_conexion_de_mongodb
JWT_SECRET=tu_clave_secreta_para_jwt
FRONTEND_URL=http://localhost:3000

# Configuración del Correo (para recuperación de contraseña)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=465
EMAIL_SECURE=true
EMAIL_USER=tu_correo@gmail.com
EMAIL_PASS=tu_contrasena_de_aplicacion_gmail

# Configuración de Cloudinary (para almacenamiento de imágenes de productos)
CLOUDINARY_URL=cloudinary://tu_api_key:tu_api_secret@tu_cloud_name
```

> **Nota sobre `MONGO_URI`**: Si usas **MongoDB Atlas**, la cadena de conexión se verá similar a:
> `mongodb+srv://<usuario>:<password>@cluster0.xxxxx.mongodb.net/<nombre_bd>?retryWrites=true&w=majority`
>
> **Nota sobre `EMAIL_PASS`**: Para Gmail, debes generar una "Contraseña de Aplicación" en la configuración de seguridad de tu cuenta de Google.

### Paso 1.4: Iniciar el backend
Puedes iniciar el servidor en modo desarrollo usando nodemon (se reiniciará automáticamente al guardar cambios) con el comando:
```bash
npm run backend
```
O iniciar el servidor de manera estándar:
```bash
npm start
```
El backend estará escuchando en el puerto configurado (ej: `http://localhost:5001`).

---

## 2. Configuración del Frontend

El frontend es una interfaz de usuario interactiva creada con React, Redux Toolkit y Sass.

### Paso 2.1: Navegar al directorio del frontend
En una nueva pestaña de la terminal, dirígete a la carpeta `inventario-eli-frontend`:
```bash
cd ../inventario-eli-frontend
```

### Paso 2.2: Instalar dependencias
Ejecuta el siguiente comando para instalar todos los módulos necesarios:
```bash
npm install
```

### Paso 2.3: Configurar variables de entorno (`.env`)
Crea un archivo llamado `.env` en la raíz del directorio `inventario-eli-frontend` y define la URL de conexión al backend:

```env
REACT_APP_BACKEND_URL=http://localhost:5001
```

*Nota: Asegúrate de que el puerto coincida con el puerto en el que se ejecuta tu Backend.*

### Paso 2.4: Iniciar el frontend
Para iniciar el servidor de desarrollo de React:
```bash
npm start
```
La aplicación se abrirá automáticamente en tu navegador web en `http://localhost:3000`.

---

## Comandos Útiles

### Backend:
- `npm run backend`: Inicia el servidor usando `nodemon` (para desarrollo).
- `npm start`: Inicia el servidor de producción usando `node server.js`.

### Frontend:
- `npm start`: Inicia la aplicación React en modo de desarrollo local.
- `npm run build`: Compila la aplicación en un paquete optimizado para producción en la carpeta `build`.
