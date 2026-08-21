# Reporte de Estructura y Arquitectura del Proyecto

Este documento proporciona un informe completo sobre la estructura de directorios, la arquitectura del software y el modelado de la base de datos (MongoDB) para el sistema de control de inventarios.

---

## 1. Arquitectura General del proyecto

El proyecto sigue una arquitectura **MERN** (MongoDB, Express, React, Node.js), dividida físicamente en dos repositorios/carpetas independientes:
- **Backend (`inventario-eli-backend`)**: API REST construida en Node.js y Express. Se encarga de la lógica de negocio, autenticación, envío de correos y persistencia en MongoDB mediante Mongoose.
- **Frontend (`inventario-eli-frontend`)**: Aplicación cliente tipo SPA (Single Page Application) desarrollada en React 18, gestionando el estado con Redux Toolkit y los estilos mediante Sass y CSS.

---

## 2. Estructura de Directorios

A continuación se detalla la jerarquía de directorios de ambas partes:

```text
InventarioCurso/
├── README.md                          # Guía de instalación y configuración general
├── PROJECT_STRUCTURE.md                # Este informe técnico
│
├── inventario-eli-backend/            # Backend (Node.js/Express)
│   ├── .env                           # Variables de entorno locales
│   ├── package.json                   # Dependencias y scripts del servidor
│   ├── server.js                      # Punto de entrada principal (Express Server)
│   ├── controllers/                   # Controladores (Lógica de negocio y procesamiento de peticiones)
│   │   ├── contactController.js       # Envío de mensajes y soporte
│   │   ├── historyController.js       # Registro de historial de movimientos de inventario
│   │   ├── productController.js       # CRUD de productos y cálculo de stock
│   │   ├── reportController.js        # Generación de reportes de inventario
│   │   ├── saleController.js          # Registro de ventas de productos
│   │   └── userController.js          # Registro, login y perfiles de usuarios
│   ├── models/                        # Modelos de datos (Mongoose schemas)
│   │   ├── historyModel.js            # Esquema para auditoría/historial
│   │   ├── productModel.js            # Esquema de Productos
│   │   ├── reportModel.js             # Esquema de Informes guardados
│   │   ├── saleModel.js               # Esquema de Ventas realizadas
│   │   ├── tokenModel.js              # Esquema de tokens de restablecimiento de contraseña
│   │   └── userModel.js               # Esquema de Usuarios y credenciales
│   ├── routes/                        # Rutas de la API (Rutas HTTP mapeadas a controladores)
│   │   ├── contactRoute.js
│   │   ├── historyRoutes.js
│   │   ├── productRoute.js
│   │   ├── reportRoutes.js
│   │   ├── saleRoutes.js
│   │   └── userRoute.js
│   ├── middleWare/                    # Middlewares (Autenticación JWT, control de errores)
│   └── utils/                         # Utilidades (Carga de archivos con Multer/Cloudinary, envío de emails)
│
└── inventario-eli-frontend/           # Frontend (React)
    ├── .env                           # Dirección de conexión a la API
    ├── package.json                   # Dependencias y scripts de la app React
    ├── public/                        # Archivos estáticos e index.html
    └── src/                           # Código fuente React
        ├── index.js                   # Punto de entrada de la aplicación
        ├── App.js                     # Configuración de enrutamiento (React Router DOM)
        ├── index.css                  # Hoja de estilos global y variables CSS
        ├── assets/                    # Imágenes estáticas y logos
        ├── customHook/                # Hooks personalizados (redirigir si no está logueado, etc.)
        ├── data/                      # Datos estáticos (estructura de menús del sidebar)
        ├── redux/                     # Manejo de Estado Global (Redux Toolkit)
        │   ├── store.js               # Tienda global de Redux
        │   └── features/              # Divisiones de estado (Slices)
        │       ├── auth/              # Estado y acciones de Autenticación
        │       └── product/           # Estado de Productos y filtros
        ├── services/                  # Servicios de comunicación con la API (Axios calls)
        ├── components/                # Componentes Reutilizables de Interfaz
        │   ├── card/                  # Contenedores con sombra
        │   ├── changePassword/        # Formulario para cambiar contraseña
        │   ├── footer/                # Pie de página
        │   ├── header/                # Encabezado (Saludo de usuario y Logout)
        │   ├── layout/                # Contenedor de layouts de página
        │   ├── loader/                # Spinners y pantallas de carga
        │   ├── product/               # Detalle, formularios, listas y badges de productos
        │   ├── protect/               # Enlaces protegidos basados en rol/login
        │   ├── reports/               # Componentes de reportes
        │   ├── sales/                 # Componentes de ventas y gráficos
        │   ├── search/                # Barra de búsqueda
        │   └── sidebar/               # Barra de navegación lateral colapsable
        └── pages/                     # Páginas / Vistas completas de la app
            ├── Home/                  # Landing page pública
            ├── addProduct/            # Vista para agregar nuevo producto
            ├── auth/                  # Páginas de Login, Registro y Password Reset
            ├── contact/               # Formulario de contacto
            ├── dashboard/             # Panel principal (Resumen e Inventario)
            ├── editProduct/           # Vista para editar producto
            ├── history/               # Historial de auditoría
            ├── profile/               # Perfil de usuario y edición
            ├── reports/               # Vista de generación de informes
            └── sales/                 # Dashboard de ventas realizadas
```

---

## 3. Estructura de la Base de Datos (Modelos Mongoose)

El sistema utiliza **MongoDB** para persistir la información. A continuación se detallan las colecciones creadas mediante Mongoose schemas:

### A. Usuarios (`userModel`)
Almacena la información de los usuarios autorizados para ingresar al sistema.
*   `name` (String, requerido): Nombre del usuario.
*   `email` (String, requerido, único): Correo electrónico (utilizado para login).
*   `password` (String, requerido): Contraseña cifrada con `bcryptjs`.
*   `photo` (String, por defecto imagen genérica): Enlace de la foto de perfil almacenada en Cloudinary.
*   `phone` (String, por defecto "+51"): Número telefónico.
*   `bio` (String, por defecto "Bio"): Biografía o información corta.

### B. Productos (`productModel`)
Almacena el catálogo de productos disponibles en el inventario.
*   `user` (ObjectId ref User, requerido): Identificador del usuario que registró el producto.
*   `name` (String, requerido): Nombre o título del producto.
*   `sku` (String, requerido): Código único identificador (Stock Keeping Unit).
*   `category` (String, requerido): Categoría a la que pertenece.
*   `quantity` (String, requerido): Cantidad en stock.
*   `price` (String, requerido): Precio unitario de compra/venta.
*   `description` (String, requerido): Descripción larga detallada.
*   `image` (Object): Detalles de la imagen subida (enlace a Cloudinary, tipo de archivo, peso).

### C. Ventas (`saleModel`)
Registra las transacciones/salidas de productos del inventario.
*   `products` (Array): Lista de productos vendidos. Contiene referencias a productos, cantidades y precios de venta.
*   `total` (Number): Monto total de la venta efectuada.
*   `createdAt` (Date): Fecha de la venta.

### D. Historial de Auditoría (`historyModel`)
Lleva un registro de los movimientos o cambios clave en el inventario (auditoría).
*   `action` (String): Acción realizada (Ej. "Creación", "Actualización", "Salida").
*   `details` (String): Descripción textual del movimiento realizado.
*   `createdAt` (Date): Fecha y hora de la acción.

### E. Informes (`reportModel`)
Configuraciones o datos históricos de reportes consolidados.
*   `reportType` (String): Tipo de informe generado (ej: "Ventas", "Inventario bajo").
*   `data` (Object): Datos del reporte en formato JSON.
*   `generatedBy` (ObjectId ref User): Usuario que solicitó la generación.

---

## 4. Flujo de Datos Típico

1.  **Petición**: El usuario realiza una acción en el Frontend de React (por ejemplo, registrar una venta).
2.  **Estado Global**: Se activa una acción asíncrona de Redux Toolkit (`createAsyncThunk`), la cual invoca un servicio Axios (`services/`).
3.  **Llamada API**: Axios realiza una petición HTTP estructurada (ej: `POST /api/sales/`) enviando la cookie de sesión (JWT).
4.  **Rutas y Middleware**: El servidor Express en `inventario-eli-backend` recibe la petición en `routes/saleRoutes.js`, verifica la sesión del usuario mediante el middleware de autenticación, y deriva el flujo a `controllers/saleController.js`.
5.  **Lógica y DB**: El controlador realiza las validaciones, descuenta el stock interactuando con el modelo de Producto (`models/productModel.js`), guarda la venta mediante el modelo de Venta (`models/saleModel.js`), y registra el movimiento en el historial (`models/historyModel.js`).
6.  **Respuesta**: El controlador responde con éxito al Frontend, Redux actualiza la UI de React, y se muestra una alerta visual al usuario (`react-toastify`).
