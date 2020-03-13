import { AppConfig } from './tool/appconfig';
import { nextCorrelat } from './http';
import { Gpio } from 'onoff';
import { Log } from './tool/log';

const CONFIG = new AppConfig();
const LED = new Gpio(CONFIG.gpioLed, 'out')
const BUTTON = new Gpio(CONFIG.gpioBtn, 'in', 'falling', { debounceTimeout: 10 });
const TIMEOUT = 1000
let waiting = false

Log.title('Tótem - Raspberry PI')
LED.writeSync(1)

BUTTON.watch(() => {
  if (!waiting) {
    nextCorrelat();
    LED.writeSync(0)

    setTimeout(() => {
      waiting = false
      LED.writeSync(1)
    }, TIMEOUT);
  }

  waiting = true
});

process.on('SIGINT', () => {
  LED.writeSync(1)
  LED.unexport()
  BUTTON.unexport()
});