import { File } from './file';
import Log from './log';

interface IAppconfig {
  server: string;
  totem: string;
  gpio: number;
}

export class AppConfig implements IAppconfig {
  private fileValue: File;
  public get server(): string {
    return this.read().server;
  }
  public set server(v: string) {
    const data = this.read();
    data.server = v;
    this.write(data);
  }
  
  public get totem(): string {
    return this.read().totem;
  }
  public set totem(v: string) {
    const data = this.read();
    data.totem = v;
    this.write(data);
  }
  
  public get gpio(): number {
    return this.read().gpio;
  }
  public set gpio(v: number) {
    const data = this.read();
    data.gpio = v;
    this.write(data);
  }

  public constructor() {
    this.fileValue = new File('./appconfig.json');
    if (!this.fileValue.exist) {
      const data: IAppconfig = {
        server: '--HOST--',
        totem: '--IP Totem--',
        gpio: 4
      };

      this.write(data);
      Log.er('appconfig.json no encontrado!')
      Log.ln('se ha creado una nueva copia, configúrela y vuelva a iniciar el programa.')
    }
  }

  private read(): IAppconfig {
    const rawData = this.fileValue.readTextSync();
    return JSON.parse(rawData);
  }

  private write(v: IAppconfig) {
    const rawData = JSON.stringify(v, null, '  ');
    this.fileValue.writeTextSync(rawData);
  }
}