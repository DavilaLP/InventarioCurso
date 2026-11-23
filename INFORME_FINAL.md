# INFORME FINAL DE PROYECTO

---

<br>

<div align="center">

# SISTEMA WEB DE GESTIÓN DE INVENTARIOS, CONTROL DE STOCK Y FACTURACIÓN
## "INVENTARIO ELI"

<br>

### **PROYECTO DE DESARROLLO DE SOFTWARE**
**Arquitectura MERN Stack, CI/CD y Contenerización**

<br>

**INTEGRANTES:**
<br>
**Duvan Davila Guerra**  
**Jose Mercado Chuctaya**

<br>

**AÑO:**
**2026**

</div>

---

<div style="page-break-after: always;"></div>

# ÍNDICE GENERAL

1. [RESUMEN EJECUTIVO](#1-resumen-ejecutivo)
2. [INTRODUCCIÓN Y PLANTEAMIENTO DEL PROBLEMA](#2-introducción-y-planteamiento-del-problema)
   - 2.1. Contexto de la Problemática
   - 2.2. Justificación del Proyecto
3. [OBJETIVOS DEL PROYECTO](#3-objetivos-del-proyecto)
   - 3.1. Objetivo General
   - 3.2. Objetivos Específicos
   - 3.3. Alcance y Limitaciones
4. [REQUERIMIENTOS DEL SISTEMA](#4-requerimientos-del-sistema)
   - 4.1. Requerimientos Funcionales (RF)
   - 4.2. Requerimientos No Funcionales (RNF)
5. [ARQUITECTURA TECNOLÓGICA DEL SOFTWARE](#5-arquitectura-tecnológica-del-software)
   - 5.1. Patrón Arquitectónico (Cliente-Servidor / REST API)
   - 5.2. Stack Tecnológico (MERN)
   - 5.3. Servicios Externos e Infraestructura Cloud
6. [DISEÑO Y MODELADO DE BASE DE DATOS](#6-diseño-y-modelado-de-base-de-datos)
   - 6.1. Diagrama Entidad-Relación y Colecciones en MongoDB
   - 6.2. Diccionario de Datos Detallado
7. [DESCRIPCIÓN DE MÓDULOS DEL SISTEMA](#7-descripción-de-módulos-del-sistema)
   - 7.1. Módulo 1: Seguridad, Autenticación y Perfil
   - 7.2. Módulo 2: Gestión de Inventario y Almacén (CRUD)
   - 7.3. Módulo 3: Registro y Procesamiento de Ventas
   - 7.4. Módulo 4: Auditoría e Historial de Movimientos
   - 7.5. Módulo 5: Generación y Exportación de Informes (PDF / CSV)
8. [DEVOPS: INTEGRACIÓN Y DESPLIEGUE CONTINUO (CI/CD)](#8-devops-integración-y-despliegue-continuo-cicd)
   - 8.1. Integración Continua (CI) con GitHub Actions
   - 8.2. Despliegue Continuo (CD) con Vercel y Render
9. [CONTENERIZACIÓN CON DOCKER](#9-contenerización-con-docker)
   - 9.1. Justificación de Uso de Contenedores
   - 9.2. Arquitectura de Servicios Docker
   - 9.3. Orquestación con Docker Compose
10. [GUÍA DE INSTALACIÓN, EJECUCIÓN Y PRUEBAS](#10-guía-de-instalación-ejecución-y-pruebas)
    - 10.1. Requisitos Previos
    - 10.2. Variables de Entorno Requeridas
    - 10.3. Ejecución en Modo Desarrollo
    - 10.4. Ejecución de Pruebas Automatizadas
11. [CONCLUSIONES Y RECOMENDACIONES](#11-conclusiones-y-recomendaciones)
    - 11.1. Conclusiones
    - 11.2. Recomendaciones Futuras

---

<div style="page-break-after: always;"></div>

# 1. RESUMEN EJECUTIVO

El presente informe documenta el diseño, desarrollo, pruebas e implantación del sistema web **"Inventario Eli"**, una solución tecnológica orientada a la administración integral, control de existencias, comercialización y auditoría de inventarios para pequeñas y medianas empresas comerciales.

El sistema fue desarrollado bajo el stack tecnológico **MERN** (*MongoDB, Express.js, React.js y Node.js*), adoptando una arquitectura desacoplada basada en una API RESTful y una aplicación web cliente reactiva de tipo SPA (*Single Page Application*). Se integraron mecanismos de seguridad basados en tokens criptográficos **JSON Web Tokens (JWT)** transmitidos mediante cookies seguras HTTP-Only, almacenamiento de multimedia en la nube con **Cloudinary**, envío de correos transaccionales con **Nodemailer**, y generación de reportes ejecutivos en formatos **PDF** y **CSV**.

Adicionalmente, se incorporaron estándares modernos de ingeniería de software y DevOps mediante la implementación de un flujo de **Integración Continua (CI)** con **GitHub Actions** y **Despliegue Continuo (CD)** alojado en las plataformas cloud **Vercel** (Frontend) y **Render** (Backend), complementado con una arquitectura de contenedores portables mediante **Docker** y **Docker Compose**.

---

# 2. INTRODUCCIÓN Y PLANTEAMIENTO DEL PROBLEMA

## 2.1. Contexto de la Problemática
En la actualidad, una gran cantidad de negocios comerciales y microempresas gestionan sus almacenes e inventarios mediante métodos tradicionales, tales como planillas manuales de papel o libros de cálculo en Excel sin validación centralizada. Este esquema operativo presenta graves debilidades:
- **Discrepancias de existencias:** Falta de sincronización en tiempo real entre las ventas efectuadas y el stock disponible en almacén, provocando roturas de inventario o compromisos de venta sin stock disponible.
- **Vulnerabilidad y pérdida de trazabilidad:** Ausencia de registros de auditoría sobre quién modificó un precio, eliminó un producto o alteró las cantidades de inventario.
- **Procesos manuales propensos a error humano:** Cálculos manuales erróneos de utilidades, inventario total valorizado y márgenes comerciales.
- **Inseguridad de acceso:** Carencia de control de sesiones y pérdida de confidencialidad de datos financieros o de clientes.

## 2.2. Justificación del Proyecto
El desarrollo de **"Inventario Eli"** nace como respuesta directa a esta problemática, proporcionando una plataforma web moderna, rápida y centralizada que permite a las empresas:
1. Automatizar el registro de entradas y salidas de mercadería.
2. Descontar stock de forma atómica e instantánea ante cada venta registrada.
3. Auditar cada acción de forma cronológica (creación, edición, eliminación y ventas).
4. Exportar reportes analíticos para la toma de decisiones contables y tributarias.
5. Acceder de forma segura desde cualquier navegador web sin requerir instalaciones locales complejas.

---

# 3. OBJETIVOS DEL PROYECTO

## 3.1. Objetivo General
Diseñar, desarrollar e implementar un sistema web integral de control de inventarios, gestión de stock y ventas utilizando la arquitectura MERN, implementando prácticas de DevOps mediante CI/CD y contenerización Docker para garantizar un despliegue ágil, seguro y escalable.

## 3.2. Objetivos Específicos
1. **Desarrollar una API REST robusta y modular:** Empleando Node.js y Express para la gestión de productos, ventas, historiales, reportes y autenticación.
2. **Construir una interfaz de usuario reactiva y amigable:** Empleando React 18, Redux Toolkit y Sass para garantizar una navegación fluida sin recargas completas de página.
3. **Garantizar la persistencia y atomicidad de datos:** Diseñando esquemas optimizados en MongoDB para evitar inconsistencias durante el despacho de pedidos.
4. **Implementar seguridad por capas:** Integrando cifrado de contraseñas con Bcrypt, tokens JWT con cookies HttpOnly y protección contra ataques CSRF y CORS.
5. **Configurar un pipeline de CI/CD:** Diseñando flujos automáticos con GitHub Actions para ejecución de pruebas unitarias y despliegue continuo hacia Vercel y Render.
6. **Contenerizar la solución con Docker:** Estructurar imágenes livianas y un archivo orquestador Docker Compose para permitir la ejecución del sistema en cualquier entorno con un único comando.

## 3.3. Alcance y Limitaciones
* **Alcance:** El sistema cubre el ciclo operativo completo: autenticación de usuarios, registro y categorización de productos con imágenes, actualización en lote o granular de existencias, módulo de punto de venta, comprobantes, gráficos estadísticos y reportes en PDF/CSV.
* **Limitaciones:** En su versión actual, el sistema procesa transacciones de contado y efectivo/transferencia sin pasarela de pagos integrada de tarjetas de crédito directa (Stripe/PayPal), quedando esta funcionalidad planteada como escalabilidad futura.

---

# 4. REQUERIMIENTOS DEL SISTEMA

## 4.1. Requerimientos Funcionales (RF)

| Código | Requerimiento Funcional | Descripción |
| :--- | :--- | :--- |
| **RF-01** | Registro de Usuarios | El sistema permite crear nuevas cuentas con nombre, email y contraseña segura. |
| **RF-02** | Autenticación Segura (Login) | Validación de credenciales con hashing Bcrypt y emisión de cookie JWT con expiración controlada. |
| **RF-03** | Recuperación de Contraseña | Generación de tokens seguros y envío de enlaces transaccionales vía correo electrónico con expiración de 30 minutos. |
| **RF-04** | Gestión de Productos (CRUD) | Creación, lectura, edición y eliminación de productos con atributos de nombre, SKU, categoría, precio, cantidad y descripción. |
| **RF-05** | Carga de Imágenes a la Nube | Subida de fotografías de productos optimizadas y servidas desde CDN mediante Cloudinary. |
| **RF-06** | Ajuste Rápido de Stock | Botones de adición rápida (`+`) en tabla y confirmación de stock modificado sin abrir el formulario completo. |
| **RF-07** | Búsqueda y Paginación Dinámica | Filtrado reactivo en tiempo real por texto y paginación configurable por bloques de 5 o más productos. |
| **RF-08** | Registro de Ventas Multiproducto | Selección de múltiples artículos del inventario, cálculo automático de importes y descuento atómico del almacén. |
| **RF-09** | Emisión de Comprobantes | Despliegue de resumen de venta tras la transacción con detalle de artículos, subtotales y total general. |
| **RF-10** | Historial de Auditoría | Registro inmutable de cada acción relevante (agregado, editado, eliminado, venta) con usuario, fecha y detalle. |
| **RF-11** | Exportación de Ventas (CSV y PDF) | Descarga instantánea del registro histórico de transacciones en hojas de cálculo y documentos de lectura. |
| **RF-12** | Generación de Informes Ejecutivos | Módulo con membrete empresarial (RUC, Razón Social, Dirección, Teléfono), rango de fechas y resumen estadístico descargable en PDF. |

## 4.2. Requerimientos No Funcionales (RNF)

| Código | Categoría | Descripción |
| :--- | :--- | :--- |
| **RNF-01** | Seguridad | Contraseñas cifradas con salt rounds de Bcrypt; tokens JWT firmados con clave secreta; protección CORS por listas blancas. |
| **RNF-02** | Rendimiento | Tiempo de respuesta de peticiones API inferior a 400ms bajo condiciones normales de red. |
| **RNF-03** | Disponibilidad | Arquitectura desacoplada en la nube con disponibilidad operativa garantizada superior al 99.5%. |
| **RNF-04** | Responsividad | Diseño adaptativo con CSS Grid y Flexbox funcional en computadoras de escritorio, tablets y dispositivos móviles. |
| **RNF-05** | Portabilidad | Empaquetamiento en imágenes de contenedores Docker basadas en Alpine Linux para portabilidad absoluta entre SO. |
| **RNF-06** | Mantenibilidad | Separación estricta de responsabilidades bajo arquitectura Modelo-Controlador-Ruta y Redux Toolkit modular. |

---

# 5. ARQUITECTURA TECNOLÓGICA DEL SOFTWARE

## 5.1. Patrón Arquitectónico
El sistema implementa una **Arquitectura en Capas Basada en Servicios REST**, desacoplando totalmente la lógica de presentación de la lógica de negocio y persistencia:

```text
[ NAVEGADOR DEL CLIENTE ]
          │ (HTTPS / JSON / JWT Cookies)
          ▼
┌────────────────────────────────────────────────────────┐
│               CAPA DE PRESENTACIÓN (CLIENTE)           │
│  React.js 18 + Redux Toolkit + React Router + Sass    │
└────────────────────────────────────────────────────────┘
          │ (Llamadas API REST via Axios)
          ▼
┌────────────────────────────────────────────────────────┐
│            CAPA DE SERVICIOS / API (BACKEND)           │
│      Node.js 20 + Express.js + Middlewares JWT        │
│   ┌────────────────────────────────────────────────┐   │
│   │ Rutas -> Controladores -> Modelos Mongoose     │   │
│   └────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────┘
     │                            │                 │
     ▼                            ▼                 ▼
[ MongoDB Atlas ]       [ Cloudinary CDN ]     [ SMTP Gmail ]
(Base de Datos NoSQL)   (Imágenes en Nube)     (Emails Transacc.)
```

## 5.2. Stack Tecnológico (MERN)

### Backend (Servidor):
- **Node.js (v20 LTS):** Entorno de ejecución asíncrono y de alto rendimiento impulsado por eventos.
- **Express.js (v4.18):** Framework web minimalista para la estructuración de la API REST, enrutamiento y middlewares.
- **Mongoose (v8.2):** Modelado de objetos (ODM) para MongoDB, proveyendo validación estricta de tipos, esquemas y relaciones de clave foránea (`ref`).
- **JSON Web Token (v9.0) & Bcrypt.js:** Generación de credenciales seguras de sesión y hashing irreversible de contraseñas.
- **Multer:** Procesamiento de datos de formulario multipart para la recepción de archivos multimedia.

### Frontend (Cliente):
- **React.js (v18.3):** Biblioteca para la construcción de interfaces de usuario interactivas basadas en componentes reactivos.
- **Redux Toolkit (v2.2):** Gestión del estado global de la aplicación (productos, filtros, usuario autenticado).
- **React Router DOM (v6.23):** Enrutamiento declarativo del lado del cliente sin recargar la página.
- **Sass (Syntactically Awesome Style Sheets):** Preprocesador CSS con anidamiento, variables y mixins para modularidad de diseño.
- **jsPDF & AutoTable:** Motor para la construcción vectorial e impresión de documentos ejecutivos PDF directamente en el navegador.

## 5.3. Servicios Externos e Infraestructura Cloud
- **MongoDB Atlas:** Cluster de base de datos NoSQL distribuida en la nube con backups automáticos.
- **Cloudinary:** Almacenamiento y optimización de imágenes en la nube servidas vía CDN global.
- **Nodemailer + Gmail SMTP:** Servidor de mensajería para notificación de restablecimiento de accesos.
- **Vercel:** Plataforma de borde (*edge deployment*) optimizada para aplicaciones React.
- **Render.com:** Plataforma en la nube para contenedores y servicios web Node.js.

---

# 6. DISEÑO Y MODELADO DE BASE DE DATOS

## 6.1. Diagrama Conceptual de Colecciones
El sistema implementa 6 colecciones principales en MongoDB:

```text
┌──────────────┐         1:N        ┌──────────────┐
│     USER     │ ────────────────── │   PRODUCT    │
└──────────────┘                    └──────────────┘
       │                                   │
       │ 1:N                         1:N   │
       ▼                                   ▼
┌──────────────┐                    ┌──────────────┐
│     SALE     │                    │   HISTORY    │
└──────────────┘                    └──────────────┘
       │ 1:N                               ▲
       ▼                                   │
┌──────────────┐                           │
│    REPORT    │ ──────────────────────────┘
└──────────────┘
```

## 6.2. Diccionario de Datos Detallado

### Colección: `users`
Almacena las credenciales y datos de perfil de los administradores y usuarios del sistema.

| Campo | Tipo | Requerido | Descripción |
| :--- | :--- | :--- | :--- |
| `_id` | ObjectId | Sí (PK) | Identificador único autogenerado. |
| `name` | String | Sí | Nombre completo del usuario. |
| `email` | String | Sí (Unique) | Correo electrónico corporativo o personal. |
| `password` | String | Sí | Hash criptográfico generado mediante Bcrypt. |
| `photo` | String | No | URL de imagen de perfil (default asignado). |
| `phone` | String | No | Número telefónico de contacto (+51...). |
| `bio` | String | No | Breve descripción informativa del usuario. |
| `createdAt` | Date | Sí | Fecha y hora de registro. |
| `updatedAt` | Date | Sí | Fecha y hora de última modificación. |

### Colección: `products`
Almacena los artículos y mercaderías registrados en el almacén.

| Campo | Tipo | Requerido | Descripción |
| :--- | :--- | :--- | :--- |
| `_id` | ObjectId | Sí (PK) | Identificador único del producto. |
| `user` | ObjectId | Sí (FK) | Referencia al usuario propietario (`User._id`). |
| `name` | String | Sí | Nombre comercial del producto (Indexado y trimmed). |
| `sku` | String | Sí | Código de referencia o SKU único de control. |
| `category` | String | Sí | Categoría a la que pertenece el producto. |
| `quantity` | String / Number | Sí | Unidades físicas disponibles en almacén. |
| `price` | String / Number | Sí | Precio unitario de comercialización en Soles (S/). |
| `description` | String | Sí | Especificaciones y detalles del artículo. |
| `image` | Object | No | Metadatos de imagen (`fileName`, `filePath`, `fileType`, `fileSize`). |
| `createdAt` | Date | Sí | Fecha de alta en inventario. |

### Colección: `sales`
Registra cada una de las transacciones comerciales ejecutadas.

| Campo | Tipo | Requerido | Descripción |
| :--- | :--- | :--- | :--- |
| `_id` | ObjectId | Sí (PK) | Identificador único de la transacción. |
| `user` | ObjectId | Sí (FK) | Usuario/cajero que registró la venta. |
| `date` | Date | Sí | Marca de tiempo exacta de la transacción (Default: `Date.now`). |
| `items` | Array [Subdoc] | Sí | Lista de artículos incluidos en la venta. |
| `items.product`| ObjectId | Sí (FK) | Referencia al producto comercializado. |
| `items.quantity`| Number | Sí | Unidades descontadas y despachadas. |
| `items.price` | Number | Sí | Precio unitario histórico al momento de la venta. |
| `total` | Number | Sí | Importe monetario global de la transacción. |

### Colección: `histories`
Pista de auditoría obligatoria para trazabilidad de existencias.

| Campo | Tipo | Requerido | Descripción |
| :--- | :--- | :--- | :--- |
| `_id` | ObjectId | Sí (PK) | Identificador único del evento de auditoría. |
| `product` | ObjectId | Sí (FK) | Producto afectado por la acción. |
| `user` | ObjectId | Sí (FK) | Responsable que ejecutó la operación. |
| `action` | Enum | Sí | Valores permitidos: `['agregado', 'editado', 'eliminado', 'venta']`. |
| `details` | String | Sí | Glosa descriptiva detallando la variación de stock o precios. |
| `date` | Date | Sí | Fecha y hora exacta del suceso. |

### Colección: `reports`
Almacena los informes consolidados generados por el módulo contable.

| Campo | Tipo | Requerido | Descripción |
| :--- | :--- | :--- | :--- |
| `_id` | ObjectId | Sí (PK) | Identificador único del informe. |
| `user` | ObjectId | Sí (FK) | Creador del informe. |
| `nombreInforme`| String | Sí | Título descriptivo (ej: "Informe de Ventas Noviembre"). |
| `periodo` | Object | Sí | Rango analizado (`desde`, `hasta`). |
| `datosEmpresa` | Object | Sí | RUC, Razón Social, Dirección y Teléfono de la empresa. |
| `resumen` | Object | Sí | Totales analizados, producto más vendido y categoría líder. |
| `pdfBase64` | String | No | Contenido binario del documento en base64 para descarga diferida. |

### Colección: `tokens`
Tokens transitorios criptográficos para el flujo de recuperación de accesos.

| Campo | Tipo | Requerido | Descripción |
| :--- | :--- | :--- | :--- |
| `_id` | ObjectId | Sí (PK) | Identificador único del token. |
| `userId` | ObjectId | Sí (FK) | Usuario asociado a la solicitud de recuperación. |
| `token` | String | Sí | Hash SHA-256 del token aleatorio temporal. |
| `expiresAt` | Date | Sí | Tiempo de expiración estricto (30 minutos tras solicitud). |

---

# 7. DESCRIPCIÓN DE MÓDULOS DEL SISTEMA

## 7.1. Módulo 1: Seguridad, Autenticación y Perfil
* **Controlador:** `userController.js` | **Rutas:** `/api/users/*`
* **Funcionalidad:**
  - Registro de usuarios con validación de contraseñas de al menos 6 caracteres.
  - Generación de token JWT firmado con algoritmo HMAC-SHA256 y persistido en una cookie segura (`httpOnly: true`, `sameSite: "none"`, `secure: true`).
  - Verificación de sesión en tiempo real mediante el endpoint `/api/users/loggedin` con captura de excepciones para evitar caídas por expiración de token.
  - Edición de información de perfil (nombre, teléfono, bio e imagen) y actualización segura de contraseñas.

## 7.2. Módulo 2: Gestión de Inventario y Almacén (CRUD)
* **Controlador:** `productController.js` | **Rutas:** `/api/products/*`
* **Funcionalidad:**
  - Creación de artículos con subida de fotografía hacia Cloudinary.
  - Dashboard analítico con tarjetas métricas en tiempo real:
    * **Productos Totales:** Sumatoria de artículos registrados.
    * **Invertido Total:** Cálculo dinámico `∑ (Precio × Cantidad)`.
    * **Fuera de Stock:** Conteo de productos con cantidad igual a cero.
    * **Categorías:** Agrupación y cuenta de categorías únicas.
  - Lista de productos con actualización rápida de stock mediante botones interactivos `+` y guardado parcial sin alterar otros campos.
  - Alerta visual para productos con stock crítico (menor o igual a 5 unidades).

## 7.3. Módulo 3: Registro y Procesamiento de Ventas
* **Controlador:** `saleController.js` | **Rutas:** `/api/sales/*`
* **Funcionalidad:**
  - Carrito multiproducto con validación previa de disponibilidad física en bodega.
  - Descuento atómico del inventario: si el artículo tenía 10 unidades y se venden 2, el stock pasa automáticamente a 8 en base de datos.
  - Generación simultánea de registros en la colección de `sales` y en el `history` para fines de trazabilidad.
  - Visualización del comprobante digital de venta tras finalizar la operación.

## 7.4. Módulo 4: Auditoría e Historial de Movimientos
* **Controlador:** `historyController.js` | **Rutas:** `/api/history/*`
* **Funcionalidad:**
  - Tabla de eventos cronológicos ordenada de forma descendente.
  - Auditoría detallada por tipo de evento con etiquetas semánticas (`agregado`, `editado`, `eliminado`, `venta`).
  - Buscador reactivo por texto y opción de depuración segura de historial (`DELETE /api/history`).

## 7.5. Módulo 5: Generación y Exportación de Informes (PDF / CSV)
* **Páginas / Servicios:** `InformeVentas.js`, `SaleHistory.js`, `reportController.js`
* **Funcionalidad:**
  - **Exportación en CSV:** Permite bajar el historial de ventas completo estructurado en columnas para procesamiento en Microsoft Excel.
  - **Generación Vectorial PDF:** Construcción en cliente mediante `jsPDF` con tablas formateadas, totales, resumen ejecutivo y cálculo del artículo más vendido y la categoría líder según el rango de fechas.

---

# 8. DEVOPS: INTEGRACIÓN Y DESPLIEGUE CONTINUO (CI/CD)

El proyecto cuenta con un pipeline automatizado de **CI/CD** que asegura que cada línea de código enviada al repositorio pase pruebas de calidad y se publique sin intervención manual.

```text
       [ Desarrollador ]
              │ (git push origin master)
              ▼
    [ GitHub Repository ]
              │
              ├──► [ GitHub Actions: CI ]
              │     ├── Job 1: Backend (Node 20, npm install, npm test)
              │     └── Job 2: Frontend (Node 20, npm install, npm test, npm run build)
              │
              └──► [ Webhooks de Despliegue: CD ]
                    ├──► [ Render ]: Compila y actualiza Backend API
                    └──► [ Vercel ]: Compila y publica Frontend SPA
```

## 8.1. Integración Continua (CI) con GitHub Actions
Archivo de configuración: [`.github/workflows/main.yml`](file:///c:/Users/Usuario/Documents/InventarioCurso/.github/workflows/main.yml)

El workflow se activa ante eventos `push` y `pull_request` sobre la rama `master`:
1. **Job `backend-ci`:**
   - Despliega una máquina virtual Ubuntu Latest.
   - Instala Node.js 20 con caché de paquetes npm.
   - Ejecuta `npm install` en `inventario-eli-backend`.
   - Corre la suite de pruebas unitarias y de integridad: `npm test` ([`test.js`](file:///c:/Users/Usuario/Documents/InventarioCurso/inventario-eli-backend/test.js)).
2. **Job `frontend-ci`:**
   - Instala dependencias en `inventario-eli-frontend`.
   - Corre las pruebas unitarias automáticas con Jest: `npm test -- --watchAll=false --passWithNoTests` ([`smoke.test.js`](file:///c:/Users/Usuario/Documents/InventarioCurso/inventario-eli-frontend/src/smoke.test.js)).
   - Ejecuta la compilación de producción: `CI=false npm run build`.
   - Empaqueta el artefacto resultante (`frontend-production-build`) para trazabilidad de entregables.

## 8.2. Despliegue Continuo (CD) con Vercel y Render
- **Frontend en Vercel:** Conectado mediante webhook directo al repositorio. Al aprobarse los tests de CI, Vercel compila los assets estáticos y los distribuye a través de su CDN global con soporte HTTPS automático.
- **Backend en Render:** Servicio web configurado en Node.js conectado a la rama principal. Al recibir los cambios, Render ejecuta `npm install`, compila e inicializa el proceso Express (`node server.js`).
- **Políticas CORS Dinámicas:** El backend fue configurado para admitir orígenes dinámicos terminados en `*.vercel.app` y `localhost`, garantizando que tanto en desarrollo como en producción las peticiones y cookies circulen de manera transparente.

---

# 9. CONTENERIZACIÓN CON DOCKER

## 9.1. Justificación de Uso de Contenedores
Para resolver la clásica problemática de *"en mi máquina sí funciona"*, se incorporó Docker como tecnología de virtualización a nivel de sistema operativo:
- **Aislamiento absoluto:** Ni el evaluador ni el servidor de producción requieren tener Node.js instalado en su máquina host.
- **Homogeneidad de entornos:** Las versiones de librerías, dependencias del sistema y módulos nativos son exactamente idénticas en cualquier computadora.
- **Eficiencia:** A diferencia de una máquina virtual tradicional, los contenedores Docker comparten el kernel del host, consumiendo menos del 5% de memoria y CPU.

## 9.2. Arquitectura de Servicios Docker
El sistema se compone de dos contenedores principales comunicados en una red interna virtual:

1. **Contenedor `backend`:**
   - Imagen base: `node:20-alpine` (ligera y segura).
   - Expone el puerto `5001`.
   - Contiene la API Express, variables de entorno de conexión y controladores.
2. **Contenedor `frontend`:**
   - Construcción multi-etapa (*Multi-stage build*):
     * *Etapa 1 (Builder):* Compila la aplicación React con Node 20 generando los archivos estáticos en `/build`.
     * *Etapa 2 (Production):* Emplea un servidor ultra liviano **Nginx Alpine** para despachar los archivos HTML, CSS y JS con soporte de enrutamiento SPA.
   - Expone el puerto `3000` mapeado hacia el host.

## 9.3. Orquestación con Docker Compose
Mediante el archivo [`docker-compose.yml`](file:///c:/Users/Usuario/Documents/InventarioCurso/docker-compose.yml), todo el ecosistema (cliente y servidor) se inicializa de forma sincronizada mediante una sola instrucción de terminal:
```bash
docker compose up --build
```

---

# 10. GUÍA DE INSTALACIÓN, EJECUCIÓN Y PRUEBAS

## 10.1. Requisitos Previos
Para ejecutar el proyecto de forma local estándar (sin Docker), se requiere:
- **Node.js:** Versión 18 o 20 LTS instalada.
- **NPM:** Versión 9 o 10.
- **MongoDB:** Instancia local de MongoDB Community Server (puerto 27017) o una cuenta en MongoDB Atlas.
- **Navegador web moderno:** Google Chrome, Microsoft Edge, Firefox.

## 10.2. Variables de Entorno Requeridas

### Backend (`inventario-eli-backend/.env`):
```env
PORT=5001
NODE_ENV=development
MONGO_URI=mongodb+srv://<usuario>:<password>@cluster0.xxxxx.mongodb.net/projecto-tesis?retryWrites=true&w=majority&authSource=admin
JWT_SECRET=tu_clave_secreta_jwt
FRONTEND_URL=http://localhost:3000

# Servicios de Correo
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=465
EMAIL_SECURE=true
EMAIL_USER=tu_correo@gmail.com
EMAIL_PASS=tu_password_de_aplicacion

# Cloudinary
CLOUDINARY_URL=cloudinary://<api_key>:<api_secret>@<cloud_name>
```

### Frontend (`inventario-eli-frontend/.env`):
```env
REACT_APP_BACKEND_URL=http://localhost:5001
CI=false
```

## 10.3. Ejecución en Modo Desarrollo

### Terminal 1 - Backend:
```bash
cd inventario-eli-backend
npm install
npm run backend
```
*Salida esperada:* `server Corriendo en el puerto 5001`.

### Terminal 2 - Frontend:
```bash
cd inventario-eli-frontend
npm install
npm start
```
*Salida esperada:* Apertura automática en `http://localhost:3000`.

## 10.4. Ejecución de Pruebas Automatizadas
Para verificar el estado de salud del sistema previo a un commit:
- **Pruebas de Backend:**
  ```bash
  cd inventario-eli-backend
  npm test
  ```
- **Pruebas de Frontend:**
  ```bash
  cd inventario-eli-frontend
  npm test -- --watchAll=false
  ```

---

# 11. CONCLUSIONES Y RECOMENDACIONES

## 11.1. Conclusiones
1. **Éxito en la Arquitectura MERN:** La implementación del stack MERN demostró ser altamente eficiente para el procesamiento concurrente de pedidos e inventario, permitiendo tiempos de respuesta de milisegundos gracias a la naturaleza no bloqueante de Node.js y la flexibilidad documental de MongoDB.
2. **Garantía de Integridad y Trazabilidad:** La incorporación de la colección `History` vinculada a cada operación de producto y venta erradicó por completo el problema de inconsistencias de stock, proveyendo a los administradores una bitácora inmutable de eventos.
3. **Robustez mediante DevOps:** El establecimiento del pipeline de Integración Continua con GitHub Actions y el Despliegue Continuo hacia Vercel y Render elevó el nivel de madurez del proyecto a estándares de la industria, previniendo regresiones de código mediante validaciones automáticas.
4. **Independencia de Entorno:** La contenerización con Docker garantiza que el sistema pueda ser trasladado, evaluado y puesto en marcha en servidores corporativos sin conflictos de versiones ni configuraciones manuales complejas.

## 11.2. Recomendaciones Futuras
1. **Módulo de Roles y Permisos (RBAC):** Extender el modelo de usuario para soportar roles específicos (ej: `Administrador`, `Vendedor`, `Almacenero`) con accesos restringidos a los balances financieros e informes de ventas.
2. **Pasarela de Pagos Digital:** Integrar Webhooks de servicios como Mercado Pago, Stripe o Niubiz para el cobro automático de ventas con tarjeta de crédito/débito.
3. **Lector de Código de Barras / QR:** Adaptar un lector óptico para la búsqueda y despacho de artículos mediante lectura de SKU desde cámaras web o pistolas lectoras USB.

---

<br>
<div align="center">
<b>FIN DEL INFORME TÉCNICO</b>
<br>
<i>Sistema Web Inventario Eli © 2026 - Desarrollado por Duvan Davila Guerra y Jose Mercado Chuctaya</i>
</div>
