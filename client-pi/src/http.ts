import { AppConfig } from './tool/appconfig';
import { Log } from './tool/log';
import { get } from 'http';

export function nextCorrelat() {
  const CONFIG = new AppConfig();
  const URL = `${CONFIG.server}/api/correlat/serve/${CONFIG.totem}`;

  Log.ev('Iniciando Petición al servidor...')
  const req = get(URL, (res) => {
    res.on('error', () => {
      Log.er('El servidor devolvió un estado de error!');
    });
  
    let data = Buffer.from([]);
    res.on('data', (chunk: Buffer) => {
      data = Buffer.concat([ data, chunk ]);
    });

    res.on('end', () => {
      Log.ok('Petición Correcta!\n');
    });
  });

  req.on('error', () => {
    Log.er('No se puede comunicar con el servidor remoto!\n');
  });
}