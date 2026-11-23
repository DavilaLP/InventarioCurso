# Imagen base ligera de Node.js 20 en Alpine Linux
FROM node:20-alpine

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar archivos de dependencias primero para optimizar la caché de Docker
COPY package*.json ./

# Instalar dependencias limpias
RUN npm install

# Copiar todo el código fuente del backend
COPY . .

# Exponer el puerto configurado del servidor
EXPOSE 5001

# Comando por defecto para iniciar la API
CMD ["npm", "start"]
