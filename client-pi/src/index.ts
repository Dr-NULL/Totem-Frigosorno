import { AppConfig } from './tool/appconfig';
import { nextCorrelat } from './http';
import { Gpio } from 'onoff';
import { Log } from './tool/log';

const CONFIG = new AppConfig();
const BUTTON = new Gpio(CONFIG.gpio, 'in', 'falling', { debounceTimeout: 10 });

Log.title('Tótem - Raspberry PI')
BUTTON.watch(() => {
  nextCorrelat();
});

process.on('SIGINT', () => {
  BUTTON.unexport();
});