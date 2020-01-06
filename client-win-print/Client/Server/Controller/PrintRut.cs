using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

using Client.Tool;

namespace Client.Server.Controller {
    class PrintRut: Tool.Http.EndPoint {
        public override string Method => Tool.Http.Method.Get;

        public override string Path => "print/rut/:param";

        public override Action<
            HttpListenerRequest, 
            HttpListenerResponse
        > Callback => (req, res) => { 
        
        };
    }
}
