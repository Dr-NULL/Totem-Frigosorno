using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

using Client.Tool;
using Client.Tool.Http;

namespace Client.Server.Controller {
    class PrintRut: Tool.Http.EndPoint {
        public override string Method => Tool.Http.Method.Get;

        public override string Path => "print/rut/:param";

        public override Func<
            HttpListenerRequest, 
            HttpListenerResponse,
            Task
        > Callback => async (req, res) => {
            await this.Print(req.RawUrl);
            res.Send("DONE");
            _ = View.Snack.Show("Impresión realizada con Éxito", 2500);
        };

        private async Task Print(string url) {
            Regex reg = new Regex(@"[^0-9k]", RegexOptions.ECMAScript & RegexOptions.IgnoreCase);
            string[] parts = url.Split("/".ToCharArray()[0]);
            string rut = reg.Replace(parts[parts.Length - 1], "");

            Voucher voucher = await Voucher.New(rut);
            voucher.Generate();
        }
    }
}
