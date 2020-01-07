using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.RegularExpressions;

namespace Client.Tool {
    class Voucher {
        public int Correlat { get; set; }
        public string Tipo { get; set; }

        private string _rut;
        public string Rut { 
            get => this._rut;
            set {
                Regex reg = new Regex(
                    @"[^0-9k]", 
                    RegexOptions.ECMAScript & 
                    RegexOptions.IgnoreCase
                );
                this._rut = reg.Replace(value, "");
                this._rut = this._rut.ToUpper();
            } 
        }

        private Voucher() { }

        public static async Task<Voucher> New(string rut = null) {
            // Agregar RUT en caso ecesario
            string url = "http://localhost/api/corr/next/";
            if (rut != null) {
                url += rut;
            }
            
            // Generar nuevo correlativo
            Model.Venta venta = await Tool.Ajax.Get<Model.Venta>(url);
            Voucher obj = new Voucher {
                Rut = venta.Cliente.Rut,
                Tipo = venta.TipoAte.Cod,
                Correlat = venta.Correlat
            };

            return obj;
        }

        public void Generate() {
            // Agregar ceros a la izquierda
            string title = this.Correlat.ToString();
            while (title.Length < 4) { title = "0" + title; }

            // Crear cola de dibujado
            Printer.Impresora imp = new Printer.Impresora {
                Tail = new List<Printer.Label> {
                    new Printer.Label{
                        X = this.GetCenter(title, 10),
                        Y = 0,
                        Text = title,
                        FontSize = 45
                    }
                }
            };

            imp.Print();
        }

        private float GetCenter(string txt, int exp) {
            int len = txt.ToString().Length;
            len *= exp;
            len /= 2;

            return (float)(34 - len);
        }
    }
}
