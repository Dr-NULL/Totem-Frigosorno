using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Drawing.Printing;

namespace Client.Tool {
    class Impresora {
        public static List<string> GetPrinters() {
            PrinterSettings.StringCollection data = PrinterSettings.InstalledPrinters;

            List<string> output = new List<string>();
            for (int i = 0; i < data.Count; i++) {
                output.Add(data[i]);
            }

            return output;
        }
    }
}
