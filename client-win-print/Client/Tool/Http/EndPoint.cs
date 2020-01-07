using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace Client.Tool.Http {
    abstract class EndPoint {
        abstract public string Method { get; }
        abstract public string Path { get; }
        
        abstract public Func<
            HttpListenerRequest, 
            HttpListenerResponse,
            Task
        > Callback { get; }
    }
}
