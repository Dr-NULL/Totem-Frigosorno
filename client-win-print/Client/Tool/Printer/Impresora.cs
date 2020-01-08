using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Drawing.Printing;
using System.Drawing;

namespace Client.Tool.Printer {
    public class Impresora {
        public static List<string> GetPrinters() {
            PrinterSettings.StringCollection data = PrinterSettings.InstalledPrinters;

            List<string> output = new List<string>();
            for (int i = 0; i < data.Count; i++) {
                output.Add(data[i]);
            }

            return output;
        }

        private GraphicsUnit Unit;
        public List<Label> Tail { get; set; }
        public int Width { get; set; }
        public int Height { get; set; }
        public string PrinterName { get; set; }

        public Impresora() {
            this.Unit = GraphicsUnit.Millimeter;
            this.Tail = new List<Label>();
            this.Width = 80;
            this.Height = 60;
            this.PrinterName = Config.printerName;
        }

        public void Print() {
            try { 
                // Controlando Errores
                if (this.Tail == null) {
                    throw new Exception("La cola de elementos a dibujar está vacía.");
                } else if (this.Tail.Count == 0) {
                    throw new Exception("No hay elementos en cola para agregar al espacio de dibujo.");
                }

                // Dibujando área de dibujo
                PrintDocument machine = new PrintDocument();
                machine.PrinterSettings.PrinterName = this.PrinterName;

                Margins margin = new Margins(0, 0, 0, 0);
                machine.DefaultPageSettings.Margins = margin;

                machine.PrintPage += new PrintPageEventHandler(Machine_PrintPage);
                machine.Print();
            } catch (Exception err) {
                Log.Er(err.Message);
                Log.Ln(err.StackTrace);
            }
        }

        private int MilimToCentInch(int length) {
            double lol = length / 25.4;
            lol *= 100;
            return (int)lol;
        }

        private void Machine_PrintPage(object sender, PrintPageEventArgs e) {
            try {
                e.Graphics.PageUnit = this.Unit;
                e.PageSettings.PaperSize = new PaperSize(
                    "custom",
                    MilimToCentInch(this.Width),
                    MilimToCentInch(this.Height)
                );

                foreach (Label item in this.Tail) {
                    e.Graphics.DrawString(
                        item.Text,
                        item.Font,
                        item.Brush,
                        item.X,
                        item.Y
                    );
                }

                e.Graphics.DrawLine(
                    new Pen(Color.Black, (float)0.25),

                    // Dot 1
                    16,
                    this.Height,

                    // Dot 2
                    56,
                    this.Height
                );
                e.HasMorePages = false;
            } catch (Exception err) {
                Log.Er(err.Message);
                Log.Ln(err.StackTrace);
            }
        }
    }
}
