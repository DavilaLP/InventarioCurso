# ==========================================
# Etapa 1: Compilación de la aplicación React
# ==========================================
FROM node:20-alpine AS build

WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar código fuente
COPY . .

# Desactivar treat warnings as errors y compilar versión de producción
ENV CI=false
RUN npm run build

# ==========================================
# Etapa 2: Servidor Web Nginx de Producción
# ==========================================
FROM nginx:alpine

# Copiar build generado en la etapa anterior a la carpeta pública de Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Copiar configuración personalizada de Nginx para soportar React Router (SPA)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer puerto HTTP estándar
EXPOSE 80

# Iniciar Nginx en primer plano
CMD ["nginx", "-g", "daemon off;"]
