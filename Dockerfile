# Usar la imagen oficial de Node.js
FROM node:18

# Crear directorio de trabajo
WORKDIR /app

# Copiar archivos del proyecto
COPY . .

# Instalar dependencias
RUN npm install

# Construir la aplicación
RUN npm run build

# Usar una imagen de servidor web para servir el contenido estático
FROM nginx:alpine
COPY --from=0 /app/dist /usr/share/nginx/html

# Exponer el puerto en el que corre el servidor
EXPOSE 80

# Comando para iniciar NGINX
CMD ["nginx", "-g", "daemon off;"]
