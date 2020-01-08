using System;
using System.Net;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Client.Tool.Http {

    abstract class Router {
        abstract public EndPoint[] Routes { get; }

        public async Task ReadRequest(HttpListenerRequest req, HttpListenerResponse res) {
            // Saltar Métodos OPTIONS
            if (req.HttpMethod == Method.Options) {
                return;
            }

            // Buscar EndPoint
            bool found = false;
            Regex regPath = new Regex(@":([a-z]|[0-9])+\/?", 
                RegexOptions.ECMAScript & 
                RegexOptions.IgnoreCase
            );
            foreach (EndPoint endPoint in this.Routes) {
                string pathReq = this.PathFormat(req.RawUrl);
                string pathApp = this.PathFormat(regPath.Replace(endPoint.Path, ""));

                if (pathReq.StartsWith(pathApp)) {
                    found = true;

                    if (req.HttpMethod == endPoint.Method) {
                        try {
                            await endPoint.Callback(req, res);

                            res.StatusCode = 200;
                            res.StatusDescription = "OK";

                        } catch (Exception) {
                            res.StatusCode = 500;
                            res.StatusDescription = "Internal Server Error";

                        }
                    } else {
                        res.StatusCode = 400;
                        res.StatusDescription = "Bad Request";
                    }
                    
                    return;
                }
            }

            if (!found) {
                res.StatusCode = 404;
                res.StatusDescription = "Not Found";
            }
        }

        private string PathFormat(string path) {
            if (!path.StartsWith("/")) {
                path = "/" + path;
            }

            if (!path.EndsWith("/")) {
                path = path + "/";
            }

            return path.ToLower();
        }
    }
}
