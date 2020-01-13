// INTERFACES DE CONFIGURACIÓN
interface iAppConfig {
    folder: iFolderconfig;
    server: iServerConfig;
}

interface iFolderconfig {
    root: string;
    angular: string;
    session: string;
    pdf: string;
}

interface iServerConfig {
    port: number;
}

// IMPLEMENTACIÓN DE ACCESO
import { Log } from './log';
import { File } from './file';
import { join, resolve } from 'path';

// GENERAR CONFIGURACIÓN
const root = resolve('..')
export function setup() {
    const app = new File(join(root, 'server', 'appconfig.json'))
    const orm = new File(join(root, 'server', 'ormconfig.json'))
    if ((app.exist) && (orm.exist)) {
        let rawJson: iAppConfig = JSON.parse(app.readTextSync())
        rawJson.folder.root = root
        rawJson.folder.angular = join(root, rawJson.folder.angular)
        rawJson.folder.session = join(root, rawJson.folder.session)

        return rawJson
    }

    Log.title('Totem Frigosorno')
    Log.er('No se han detectado archivos de configuración')
    
    if (!app.exist) {
        Log.ev('Generando "appconfig.json"')
        app.new()
    app.writeTextSync(`{
    "folder": {
        "angular": "client-web/dist/client-web",
        "session": "data/session",
        "pdf": "data/pdf"
    },
    "server": {
        "port": 80
    }
}`)
    }

    if (!orm.exist) {
        Log.ev('Generando "ormconfig.json"')
        orm.new()
    orm.writeTextSync(`{
    "type": "---mssql, mysql, etc---",
    "host": "---IP DEL SERVIDOR---",
    "port": 1433,
    "username": "---USUARIO---",
    "password": "---CONTRASEÑA---",
    "database": "---NOMBRE DB---",
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
}`)
    }
    Log.ok('Archivos generados!')
    process.exit()
}