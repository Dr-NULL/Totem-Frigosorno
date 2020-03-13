"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appconfig_1 = require("./tool/appconfig");
const http_1 = require("./http");
const onoff_1 = require("onoff");
const log_1 = require("./tool/log");
const CONFIG = new appconfig_1.AppConfig();
const LED = new onoff_1.Gpio(CONFIG.gpioLed, 'out');
const BUTTON = new onoff_1.Gpio(CONFIG.gpioBtn, 'in', 'falling', { debounceTimeout: 10 });
const TIMEOUT = 1000;
let waiting = false;
log_1.Log.title('Tótem - Raspberry PI');
LED.writeSync(1);
BUTTON.watch(() => {
    if (!waiting) {
        http_1.nextCorrelat();
        LED.writeSync(0);
        setTimeout(() => {
            waiting = false;
            LED.writeSync(1);
        }, TIMEOUT);
    }
    waiting = true;
});
process.on('SIGINT', () => {
    LED.writeSync(1);
    LED.unexport();
    BUTTON.unexport();
});
