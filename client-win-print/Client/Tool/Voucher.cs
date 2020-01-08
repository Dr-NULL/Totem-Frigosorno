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
            // Agregar RUT en caso necesario
            string url = "http://localhost/api/corr/next/";
            if (rut != null) {
                url += rut;
            }

            // Generar nuevo correlativo
            Voucher obj = null;
            Http.AjaxSuccess<Model.Venta> venta = null;
            try {
                venta = await Tool.Ajax.Get<Model.Venta>(url);
            } catch (Exception) {
                venta = await Tool.Ajax.Get<Model.Venta>(url.Replace(rut, ""));
            }

            obj = new Voucher {
                Rut = venta.Data.Cliente.Rut,
                Tipo = venta.Data.TipoAte.Cod,
                Correlat = venta.Data.Correlat
            };
            return obj;
        }

        public void Generate() {
            // Agregar ceros a la izquierda
            string title = this.Correlat.ToString();
            while (title.Length < 4) { title = "0" + title; }
            title = this.Tipo + title;

            // Crear cola de dibujado
            string barcode = Barcode.To128(this.Rut);

            Printer.Impresora imp = new Printer.Impresora {
                Tail = new List<Printer.Label> {
                    new Printer.Label{
                        X = this.GetCenter(title, 10, 35),
                        Y = 0,
                        Text = title,
                        FontSize = 45
                    },
                    new Printer.Label{
                        X = this.GetCenter(barcode, (float)5.28, 31),
                        Y = 20,
                        Text = barcode,
                        Font = new System.Drawing.Font(
                            "Code 128",
                            50,
                            System.Drawing.FontStyle.Regular
                        )
                    },
                    new Printer.Label{
                        X = this.GetCenter(this.Rut, (float)4.5, 34),
                        Y = 40,
                        Text = this.Rut,
                        FontSize = 24
                    }
                }
            };

            imp.Print();
        }

        private float GetCenter(string txt, float exp, float offset) {
            float len = txt.ToString().Length;
            len *= exp;
            len /= 2;

            return (float)(offset - len);
        }
    }
}
