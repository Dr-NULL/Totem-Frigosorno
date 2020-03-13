"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path_1 = require("path");
class File {
    constructor(path) {
        this.path = path;
    }
    /**
     * Obtiene o estable la carpeta en donde está alojado el archivo. En caso de que éste exista, lo moverá de ubicación.
     */
    get folder() {
        return this.folderValue;
    }
    set folder(v) {
        // Format new Folder
        v = v.replace(/\\/gi, '/');
        if (!v.endsWith('/')) {
            v += '/';
        }
        if (v.match(/^(\.\/|\.\.\/)/gi) != null) {
            // Relative path
            if (this.folderValue == null) {
                v = path_1.resolve(v);
            }
            else {
                v = path_1.join(this.folderValue, v);
            }
            // Reformat
            v = v.replace(/\\/gi, '/');
        }
        const oldRef = {
            folder: this.folderValue,
            name: this.nameValue,
            ext: this.extValue
        };
        this.folderValue = v;
        this.move(oldRef.folder, oldRef.name, oldRef.ext);
    }
    /**
     * Obtiene o establece el nombre del archivo. En caso de que el archivo exista, lo renombrará.
     */
    get name() {
        return this.nameValue;
    }
    set name(v) {
        // Find filename
        let match = v.match(/[^\\\/]+(?=\.[^\.\\\/]+$)/gi);
        if (match == null) {
            match = v.match(/[^\\\/]+$/gi);
        }
        if (match != null) {
            const oldRef = {
                folder: this.folderValue,
                name: this.nameValue,
                ext: this.extValue
            };
            this.nameValue = match[0];
            this.move(oldRef.folder, oldRef.name, oldRef.ext);
        }
    }
    get ext() {
        return this.extValue;
    }
    set ext(v) {
        const oldRef = {
            folder: this.folderValue,
            name: this.nameValue,
            ext: this.extValue
        };
        if (v != null) {
            let match = v.match(/[^\\\/\.]+$/gi);
            if (match != null) {
                this.extValue = match[0];
            }
        }
        else {
            this.extValue = null;
        }
        this.move(oldRef.folder, oldRef.name, oldRef.ext);
    }
    get path() {
        if ((this.folderValue == null) ||
            (this.nameValue == null)) {
            return null;
        }
        else {
            let out = this.folderValue;
            out += this.nameValue;
            if (this.extValue != null) {
                out += '.' + this.extValue;
            }
            return out;
        }
    }
    set path(v) {
        v = v.replace(/\\/gi, '/');
        let folder = v.replace(/[^\/\\]+$/gi, '');
        let name = v.replace(new RegExp(`^${folder}`, 'gi'), '');
        const oldRef = {
            folder: this.folderValue,
            name: this.nameValue,
            ext: this.extValue
        };
        if (folder.match(/^(\.\/|\.\.\/)/gi) != null) {
            // Relative path
            if (this.folderValue == null) {
                folder = path_1.resolve(folder);
            }
            else {
                folder = path_1.join(this.folderValue, folder);
            }
        }
        // Reformat
        if (!folder.endsWith('/')) {
            folder += '/';
        }
        this.folderValue = folder.replace(/\\/gi, '/');
        this.nameValue = name.replace(/\.[^\\\/\.]+$/gi, '');
        this.extValue = name.replace(new RegExp(`^${this.nameValue}\.`, 'gi'), '');
        if (this.nameValue.startsWith(this.extValue)) {
            this.extValue = null;
        }
        this.move(oldRef.folder, oldRef.name, oldRef.ext);
    }
    get exist() {
        return fs.existsSync(this.path);
    }
    move(oldFolder, oldName, oldExt) {
        if ((this.folderValue == null) ||
            (this.nameValue == null) ||
            (oldFolder == null) ||
            (oldName == null)) {
            return;
        }
        else if ((this.folderValue == oldFolder) &&
            (this.nameValue == oldName) &&
            (this.extValue == oldExt)) {
            return;
        }
        // Replicar ruta antigua
        let oldPath = oldFolder + oldName;
        if (oldExt != null) {
            oldPath += '.' + oldExt;
        }
        // Comprobar existencia archivo actual
        if (!fs.existsSync(oldPath)) {
            this.folderValue = oldFolder;
            this.nameValue = oldName;
            this.extValue = oldExt;
            throw new Error(`Cannot move a file that doesn't exists.\nPath Origin -> "${oldPath}"`);
        }
        //Crear carpeta si es que no existe
        try {
            if (!fs.existsSync(this.folderValue)) {
                fs.mkdirSync(this.folderValue, { recursive: true });
            }
        }
        catch (err) {
            this.folderValue = oldFolder;
            this.nameValue = oldName;
            this.extValue = oldExt;
            throw new Error(`Cannot create the folders recursively.\n`
                + `Path Destin -> "${this.folderValue}"`);
        }
        //Copiar a Destino
        try {
            fs.copyFileSync(oldPath, this.path);
        }
        catch (err) {
            this.folderValue = oldFolder;
            this.nameValue = oldName;
            this.extValue = oldExt;
            throw new Error(`Cannot copy the file inside the new folder.\n`
                + `Path Origin -> "${oldPath}"\n`
                + `Path Destin -> "${this.path}"`);
        }
        try {
            //Eliminar de origen
            fs.unlinkSync(oldPath);
        }
        catch (err) {
            this.folderValue = oldFolder;
            this.nameValue = oldName;
            this.extValue = oldExt;
            throw new Error(`Cannot delete the original file.\n`
                + `Path Origin -> "${oldPath}"`);
        }
    }
    makeFolder() {
        if (!fs.existsSync(this.folderValue)) {
            fs.mkdirSync(this.folderValue, { recursive: true });
        }
    }
    copy(path) {
        const file = new File(path);
        try {
            file.makeFolder();
        }
        catch (err) {
            throw new Error(`Cannot create the folders recursively.\n`
                + `Path Destin -> "${file.folder}"`);
        }
        try {
            fs.copyFileSync(this.path, file.path);
        }
        catch (err) {
            throw new Error(`Cannot copy the file inside the new folder.\n`
                + `Path Origin -> "${this.path}"\n`
                + `Path Destin -> "${file.path}"`);
        }
    }
    delete() {
        if (!this.exist) {
            throw new Error(`Cannot delete a file that doesn't exists.\n`
                + `Path Origin -> "${this.path}"`);
        }
        try {
            fs.unlinkSync(this.path);
        }
        catch (err) {
            throw new Error(`Cannot delete the original file.\n`
                + `Path Origin -> "${this.path}"`);
        }
    }
    read() {
        return new Promise((resolve, reject) => {
            if (!this.exist) {
                reject(new Error(`Cannot read a file that doesn't exists.\n`
                    + `Path -> "${this.exist}"`));
            }
            fs.readFile(this.path, (fail, data) => {
                if (fail != null) {
                    reject(new Error(`Cannot read the file, probably it's corrupted or requires elevated privileges.\n`
                        + `Path -> "${this.exist}"`));
                }
                else {
                    resolve(data);
                }
            });
        });
    }
    readSync() {
        if (!this.exist) {
            throw new Error(`Cannot read a file that doesn't exists.\n`
                + `Path -> "${this.exist}"`);
        }
        try {
            return fs.readFileSync(this.path);
        }
        catch {
            throw new Error(`Cannot read the file, probably it's corrupted or requires elevated privileges.\n`
                + `Path -> "${this.exist}"`);
        }
    }
    readText() {
        return new Promise((resolve, reject) => {
            if (!this.exist) {
                reject(new Error(`Cannot read a file that doesn't exists.\n`
                    + `Path -> "${this.exist}"`));
            }
            fs.readFile(this.path, (fail, data) => {
                if (fail != null) {
                    reject(new Error(`Cannot read the file, probably it's corrupted or requires elevated privileges.\n`
                        + `Path -> "${this.path}"`));
                }
                else {
                    resolve(data.toString("utf8"));
                }
            });
        });
    }
    readTextSync() {
        if (!this.exist) {
            throw new Error(`Cannot read a file that doesn't exists.\n`
                + `Path -> "${this.exist}"`);
        }
        try {
            return fs.readFileSync(this.path).toString("utf8");
        }
        catch {
            throw new Error(`Cannot read the file, probably it's corrupted or requires elevated privileges.\n`
                + `Path -> "${this.path}"`);
        }
    }
    write(data) {
        return new Promise((resolve, reject) => {
            this.makeFolder();
            fs.writeFile(this.path, data, fail => {
                if (fail != null) {
                    reject(new Error(`Cannot write in the file, probably it's corrupted or requires elevated privileges.\n`
                        + `Path -> "${this.path}"`));
                }
                else {
                    resolve();
                }
            });
        });
    }
    writeSync(data) {
        try {
            this.makeFolder();
            fs.writeFileSync(this.path, data);
        }
        catch (err) {
            throw new Error(`Cannot write in the file, probably it's corrupted or requires elevated privileges.\n`
                + `Path -> "${this.path}"`);
        }
    }
    writeText(data) {
        return new Promise((resolve, reject) => {
            this.makeFolder();
            fs.writeFile(this.path, data, { encoding: "utf8" }, fail => {
                if (fail != null) {
                    reject(new Error(`Cannot write in the file, probably it's corrupted or requires elevated privileges.\n`
                        + `Path -> "${this.path}"`));
                }
                else {
                    resolve();
                }
            });
        });
    }
    writeTextSync(data) {
        try {
            this.makeFolder();
            fs.writeFileSync(this.path, data, { encoding: "utf8" });
        }
        catch {
            throw new Error(`Cannot write in the file, probably it's corrupted or requires elevated privileges.\n`
                + `Path -> "${this.path}"`);
        }
    }
}
exports.File = File;
