using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Client.Tool.Http;

namespace Client.Server {
    class Routing: Router {
        public override EndPoint[] Routes => new EndPoint[]{
            new Controller.PrintNum(),
            new Controller.PrintRut()
        };
    }
}
