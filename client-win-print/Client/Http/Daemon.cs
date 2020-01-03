using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Threading;
using System.Web;
using System.Windows;
using System.Net;

namespace Client.Http {
    class Daemon {
        private static Task Rest;
        private static HttpListener api;
        public static bool IsListening;

        public static void Deploy() {
            IsListening = true;
            Rest = Task.Run(Listen);
        }

        private async static void Listen() {
            // Levantar Mensaje de Inicio
            Tool.WinAsync.UIInvoke(() => {
                new View.Snack(
                    "Iniciando Demonio...", 
                    1500
                );
            });

            await Task.Delay(2000);
            try {
                // Configurar HTTP Listener
                api = new HttpListener();
                api.Prefixes.Add("http://localhost:8888/printer");
                api.AuthenticationSchemes = AuthenticationSchemes.Anonymous;

                // Levantar HTTP Listener
                api.Start();
                api.BeginGetContext(new AsyncCallback(GetRequest), api);

                // Mantener proceso con vida
                while (IsListening) { }
            
            } catch (Exception err) {
                // Mostrar mensaje de Error
                new View.Snack(
                    err.Message,
                    5000
                );
                await Task.Delay(5500);
            }
        }

        private static void GetRequest(IAsyncResult result) {

        }
    }
}
