﻿using System;
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
#if DEBUG
            string url = "http://localhost/api/corr/next/";
#else
            string url = "http://192.168.20.218:8081/api/corr/next/";
#endif
            if (rut != null) {
                url += rut;
            }

            // Generar nuevo correlativo
            Tool.Log.Ev("AJAX -> " + url);
            Voucher obj = null;
            Http.AjaxSuccess<Model.Venta> venta = await Tool.Ajax.Get<Model.Venta>(url);
            if (
                (rut != null) &&
                (venta.Errors != null) && 
                (venta.Errors[0].Status == "406")
            ) {
                venta = await Tool.Ajax.Get<Model.Venta>(url.Replace(rut, ""));
                if (venta.Errors != null) {
                    throw new Exception(venta.Errors[0].Details);
                }
            } else {
                throw new Exception(venta.Errors[0].Details);
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
            Font code128 = Tool.FontLoader.Load(
                AppContext.BaseDirectory + "code128.ttf",
                50, FontStyle.Regular
            );

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
                        Font = code128
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
