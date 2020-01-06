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

        public override Action<
            HttpListenerRequest, 
            HttpListenerResponse
        > Callback => (req, res) => {
            this.Print();
            WinAsync.UIInvoke(() => {
                new View.Snack("Voucher Impreso Correctamente", 2000);
            });
            res.Send("DONE");
        };

        private void Print() {
            int num = 1;
            int len = num.ToString().Length + 1;
            len *= 10;
            len /= 2;

            Impresora imp = new Impresora { 
                Tail = new List<Label> {
                    new Label{
                        X = (float)(34 - len),
                        Y = 0,
                        Text = "A" + num.ToString(),
                        FontSize = 45
                    }
                }
            };

            imp.Print();
        }
    }
}
