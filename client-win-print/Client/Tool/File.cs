using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO.Compression;
using System.IO;

namespace Client.Tool {
    public class File {
        private string _Path;
        public string Path {
            get => this._Path;
            set {
                //Refactor
                value = value.Replace("\\", "/");
                if (!value.EndsWith("/")) {
                    value += "/";
                }

                //Assing
                this._Path = value;
            }
        }

        private string _FileName;
        public string FileName {
            get => this._FileName;
            set {
                string oldPath = this._Path + this._FileName;

                //Refactor
                value = value.Replace("\\", "/");
                if (value.StartsWith("/")) {
                    value = value.Substring(1, value.Length - 1);
                }

                //Assign
                this._FileName = value;

                //Purge
                string newPath = this._Path + this._FileName;
                if (System.IO.File.Exists(newPath)) {
                    System.IO.File.Delete(newPath);
                }

                //Move
                System.IO.File.Move(
                    oldPath,
                    newPath
                );
            }
        }

        public string FullPath {
            get => this._Path + this._FileName;
        }

        private File(string path) {
            //Refactor Filename
            string[] folder = path.Replace("\\", "/").Split("/".ToCharArray()[0]);
            this._FileName = folder.Last();

            //Refactor Path
            this._Path = "";
            for (int i = 0; i < (folder.Length - 1); i++) {
                this._Path += folder[i];
                if (i < folder.Length - 1) {
                    this._Path += "/";
                }
            }
        }

        public static File Load(string path) {
            File tmp = new File(path);
            return tmp;
        }

        public static File Create(string path) {
            File tmp = new File(path);

            //Crea directorios
            System.IO.Directory.CreateDirectory(tmp.Path);

            //Crea nuevo archivo
            FileStream stream = System.IO.File.Create(tmp.FullPath);
            stream.Close();

            return tmp;
        }

        public void Delete() {
            System.IO.File.Delete(this.FullPath);
        }

        public File Copy(string path) {
            File tmp = new File(path);

            //Crea directorios
            System.IO.Directory.CreateDirectory(tmp.Path);

            if (System.IO.File.Exists(tmp.FullPath)) {

            }

            //Copia el archivo en la nueva ruta
            System.IO.File.Copy(
                this.FullPath,
                tmp.FullPath
            );

            return tmp;
        }

        public byte[] Read() {
            return System.IO.File.ReadAllBytes(this.FullPath);
        }

        public string ReadText() {
            string content = System.IO.File.ReadAllText(this.FullPath);
            return content;
        }

        public void WriteString(string content) {
            System.IO.File.WriteAllText(
                this.FullPath,
                content
            );
        }

        public void AppendString(string content) {
            System.IO.File.AppendAllText(
                this.FullPath,
                content
            );
        }

        public static bool Exists(string path) {
            return System.IO.File.Exists(path);
        }
    }
}
