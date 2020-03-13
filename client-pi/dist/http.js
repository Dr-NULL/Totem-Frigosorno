"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appconfig_1 = require("./tool/appconfig");
const log_1 = require("./tool/log");
const http_1 = require("http");
function nextCorrelat() {
    const CONFIG = new appconfig_1.AppConfig();
    const URL = `${CONFIG.server}/api/correlat/serve/${CONFIG.totem}`;
    log_1.Log.ev('Iniciando Petición al servidor...');
    const req = http_1.get(URL, (res) => {
        res.on('error', () => {
            log_1.Log.er('El servidor devolvió un estado de error!');
        });
        let data = Buffer.from([]);
        res.on('data', (chunk) => {
            data = Buffer.concat([data, chunk]);
        });
        res.on('end', () => {
            log_1.Log.ok('Petición Correcta!\n');
        });
    });
    req.on('error', () => {
        log_1.Log.er('No se puede comunicar con el servidor remoto!\n');
    });
}
exports.nextCorrelat = nextCorrelat;
