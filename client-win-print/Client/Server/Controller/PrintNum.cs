using System;
using System.Net;
using Client.Tool.Http;
using Client.Tool.Printer;
using System.Collections.Generic;
using Client.Tool;
using System.Threading.Tasks;

namespace Client.Server.Controller {
    class PrintNum : Tool.Http.EndPoint {
        public override string Method => Tool.Http.Method.Get;

        public override string Path => "print/num";

        public override Func<
            HttpListenerRequest, 
            HttpListenerResponse,
            Task
        > Callback => async (req, res) => {
            try {
                Tool.Log.Ln("URL = " + req.RawUrl);
                await this.Print();
                res.Send("DONE");

                Tool.Log.Ok("Voucher Impreso Correctamente!");
                _ = View.Snack.Show("Impresión realizada con Éxito", 2500);
            } catch (Exception err) {
                Tool.Log.Er("Fallo al generar Voucher!");
                Tool.Log.Ln(err.Message);
                Tool.Log.Ln(err.StackTrace + "\n");

                _ = View.Snack.Show(err.Message, 3000);
            }
        };

        private async Task Print() {
            Voucher voucher = await Voucher.New();
            voucher.Generate();
        }
    }
}
