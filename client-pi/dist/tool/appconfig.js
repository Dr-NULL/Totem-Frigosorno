"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const file_1 = require("./file");
const log_1 = __importDefault(require("./log"));
class AppConfig {
    constructor() {
        this.fileValue = new file_1.File('./appconfig.json');
        if (!this.fileValue.exist) {
            const data = {
                server: '--HOST--',
                totem: '--IP Totem--',
                gpioBtn: 4,
                gpioLed: 27
            };
            this.write(data);
            log_1.default.er('appconfig.json no encontrado!');
            log_1.default.ln('se ha creado una nueva copia, configúrela y vuelva a iniciar el programa.');
        }
    }
    get server() {
        return this.read().server;
    }
    set server(v) {
        const data = this.read();
        data.server = v;
        this.write(data);
    }
    get totem() {
        return this.read().totem;
    }
    set totem(v) {
        const data = this.read();
        data.totem = v;
        this.write(data);
    }
    get gpioBtn() {
        return this.read().gpioBtn;
    }
    set gpioBtn(v) {
        const data = this.read();
        data.gpioBtn = v;
        this.write(data);
    }
    get gpioLed() {
        return this.read().gpioLed;
    }
    set gpioLed(v) {
        const data = this.read();
        data.gpioLed = v;
        this.write(data);
    }
    read() {
        const rawData = this.fileValue.readTextSync();
        return JSON.parse(rawData);
    }
    write(v) {
        const rawData = JSON.stringify(v, null, '  ');
        this.fileValue.writeTextSync(rawData);
    }
}
exports.AppConfig = AppConfig;
