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
            await this.Print();
            res.Send("DONE");
            _ = View.Snack.Show("Impresión realizada con Éxito", 2500);
        };

        private async Task Print() {
            Voucher voucher = await Voucher.New();
            voucher.Generate();
        }
    }
}
