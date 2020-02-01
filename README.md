# Totem Frigosorno

Este documento explica cómo implementar el proyecto. A grandes razgos, está programado en TypeScript, y el Frontend está hecho en Angular 8, y usa TypeORM para la base de datos.

## Implementación

Para que el proyecto funcione, es necesario generar el frontend, transpilar el backend, configurar el servidor, desplegar la base de datos y levantar el servidor:

### Cliente
Posicionarse en la carpeta del cliente
```cmd
cd .\client-web\
```
Descargar dependencias
```cmd
npm install
```
Generar proyecto
```cmd
npm run build
```

### Servidor
Instalar TypeScript de forma global
```cmd
npm install -g typescript
```
Posicionarse en la carpeta del servidor
```cmd
cd .\server\
```
Descargar dependencias
```cmd
npm install
```
Transpilar proyecto
```cmd
tsc
```

### Configuración (server)
Ejecutar servidor
```cmd
npm start
```
Esto nos generará 2 archivos JSON, los cuales debe de configurar:
- appconfig.json
```json
{
    "folder": {
        "angular": "client-web/dist/client-web",
        "session": "data/session",
        "pdf": "data/pdf"
    },
    "server": {
        "port": 80
    }
}
```
- ormconfig.json
```json
{
    "type": "mssql",
    "host": "--IP SERVIDOR--",
    "port": 1433,
    "username": "--USER DB--",
    "password": "--PASS DB--",
    "database": "SYS_TOTEM",
    "syncronize": true,
    "logging": false,
    "entities": [
        "dist/models/**/*.js"
    ],
    "migrations": [
        "dist/migrations/**/*.js"
    ],
    "cli": {
        "entitiesDir": "src/models",
        "migrationsDir": "src/migrations",
        "subscribersDir": "src/subscribers"
    }
}
```

### Generar Base de datos

En SQL Server, primero debe crear una base de datos vacía con el mismo nombre que declaró en el archivo `ormconfig.json`
```sql
USE master
DROP DATABASE IF EXISTS SYS_TOTEM
CREATE DATABASE SYS_TOTEM
GO
```

Estando dentro de la carpeta `.\server\`, ejecutar:
```cmd
npx orm mg clear
npx orm mg add New-DB
npm start seeds
npm start
```