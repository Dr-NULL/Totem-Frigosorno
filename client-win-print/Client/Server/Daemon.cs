using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Threading;
using System.Web;
using System.Windows;
using System.Net;

namespace Client.Server {
    class Daemon {
        private static Task Rest;
        private static HttpListener api;
        public static bool IsListening;

        public static void Deploy() {
            IsListening = true;
            Rest = Task.Run(Listen);
        }

        private async static Task Listen() {
            await Task.Delay(2000);
            try {
                // Configurar HTTP Listener
                api = new HttpListener();
                api.Prefixes.Add("http://localhost:8888/");
                api.AuthenticationSchemes = AuthenticationSchemes.Anonymous;

                // Levantar HTTP Listener
                api.Start();
                api.BeginGetContext(
                    new AsyncCallback(GetRequest),
                    api
                );

                // Mantener proceso con vida
                while (IsListening) { }
            
            } catch (Exception err) {
                // Mostrar mensaje de Error
                _ = View.Snack.Show(err.Message, 4000);
            }
        }

        private static async void GetRequest(IAsyncResult result) {
            //Abrir otra conexión en paralelo
            api.BeginGetContext(
                new AsyncCallback(GetRequest),
                api
            );

            // Instanciar Contexto de la Llamada
            HttpListenerContext context = api.EndGetContext(result);
            HttpListenerRequest req = context.Request;
            HttpListenerResponse res = context.Response;

            // Configurar Headers
            res.AppendHeader("Access-Control-Allow-Headers", "Content-Type, Accept, set-cookie, access-control-allow-origin");
            res.AppendHeader("Access-Control-Allow-Methods", "GET, POST");
            res.AppendHeader("Access-Control-Allow-Origin", "*");
            res.ContentType = "application/vnd.api+json";

            // Buscar el Endpoint asociado
            Routing routing = new Routing();
            await routing.ReadRequest(req, res);

            // Cerrar Conexión
            res.Close();
        }
    }
}
