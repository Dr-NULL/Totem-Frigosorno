using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Threading;
using System.Web;
using System.Windows;

namespace Client.Http {
    class Daemon {
        private static Task Rest;
        public static bool IsListening;

        public static void Deploy() {
            IsListening = true;
            Rest = Task.Run(Listen);
        }

        private static void Listen() {
            Tool.WinAsync.UIInvoke(async () => { 
                while (IsListening) {
                    Window msg = new View.Snack("Aplicación Iniciada!");
                    
                    msg.Show();
                    await Task.Delay(2500);
                    msg.Close();
                    await Task.Delay(1000);
                }
            });
        }
    }
}
