"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appconfig_1 = require("./tool/appconfig");
const http_1 = require("./http");
const onoff_1 = require("onoff");
const log_1 = require("./tool/log");
const CONFIG = new appconfig_1.AppConfig();
const BUTTON = new onoff_1.Gpio(CONFIG.gpio, 'in', 'falling', { debounceTimeout: 10 });
const TIMEOUT = 1000;
let waiting = false;
log_1.Log.title('Tótem - Raspberry PI');
BUTTON.watch(() => {
    if (!waiting) {
        http_1.nextCorrelat();
        setTimeout(() => {
            waiting = false;
        }, TIMEOUT);
    }
    waiting = true;
});
process.on('SIGINT', () => {
    BUTTON.unexport();
});
