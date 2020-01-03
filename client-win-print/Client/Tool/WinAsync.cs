using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;


namespace Client.Tool {
    public class WinAsync {
        public static Task Initialize(Window win) {
            return Task.Run(async () => {
                bool isActive = true;

                Application.Current.Dispatcher.Invoke(() => {
                    win.Closed += new EventHandler((object me, EventArgs ev) => {
                        isActive = false;
                        });

                    win.Show();
                });

                await Task.Run(() => {
                    while (isActive) { }
                });
            });
        }

        public static void UIInvoke(Action fn) {
            Application.Current.Dispatcher.Invoke(fn);
        }
    }
}
