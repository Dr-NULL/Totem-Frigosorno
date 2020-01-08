using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.RegularExpressions;
using System.Drawing;
using System.Drawing.Text;

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
            string url = "http://192.168.20.218:8081/api/corr/next/";
            if (rut != null) {
                url += rut;
            }

            // Generar nuevo correlativo
            Tool.Log.Ev("AJAX -> " + url);
            Voucher obj = null;
            Http.AjaxSuccess<Model.Venta> venta = await Tool.Ajax.Get<Model.Venta>(url);
            if (
                (rut != null) &&
                (venta.Errors != null)
            ) {
                if (venta.Errors[0].Status == "406") {
                    venta = await Tool.Ajax.Get<Model.Venta>(url.Replace(rut, ""));
                    if (venta.Errors != null) {
                        Tool.Log.Er(venta.Errors[0].Details);
                        throw new Exception(venta.Errors[0].Details);
                    }
                } else {
                    Tool.Log.Er(venta.Errors[0].Details);
                    throw new Exception(venta.Errors[0].Details);
                }
            } else if (venta.Errors != null) {
                Tool.Log.Er(venta.Errors[0].Details);
                throw new Exception(venta.Errors[0].Details);
            }

            obj = new Voucher {
                Rut = venta.Data.Cliente.Rut,
                Tipo = venta.Data.TipoAte.Cod,
                Correlat = venta.Data.Correlat
            };

            Tool.Log.Ok("Datos obtenidos");
            return obj;
        }

        public void Generate() {
            Tool.Log.Ev("Iniciando Impresión");

            // Agregar ceros a la izquierda
            string title = this.Correlat.ToString();
            while (title.Length < 4) { title = "0" + title; }
            title = this.Tipo + title;

            // Crear cola de dibujado
            string barcode = Barcode.To128(this.Rut);
            Tool.Log.Ln("Code 128 instanciado");

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
                        Font = new Font(
                            "Code 128",
                            50, FontStyle.Regular
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

            try {
                Tool.Log.Ev("Imprimiendo...");
                imp.Print();
                Tool.Log.Ok("Impresión Completada!");
            } catch (Exception err) {
                Tool.Log.Er(err.Message);
                Tool.Log.Ln(err.StackTrace);
            }
        }

        private float GetCenter(string txt, float exp, float offset) {
            float len = txt.ToString().Length;
            len *= exp;
            len /= 2;

            return (float)(offset - len);
        }
    }
}
