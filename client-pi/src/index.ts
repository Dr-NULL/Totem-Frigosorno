import { AppConfig } from './tool/appconfig';
import { nextCorrelat } from './http';
import { Gpio } from 'onoff';
import { Log } from './tool/log';

const CONFIG = new AppConfig();
const BUTTON = new Gpio(CONFIG.gpio, 'in', 'falling', { debounceTimeout: 10 });
const TIMEOUT = 1000
let waiting = false

Log.title('Tótem - Raspberry PI')
BUTTON.watch(() => {
  if (!waiting) {
    nextCorrelat();
    setTimeout(() => {
      waiting = false
    }, TIMEOUT);
  }

  waiting = true
});

process.on('SIGINT', () => {
  BUTTON.unexport();
});