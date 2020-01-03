using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Drawing;
using System.Threading;
using System.Windows.Media.Animation;
using System.Windows.Resources;
using System.Windows.Forms;

namespace Client.View {
    /// <summary>
    /// Lógica de interacción para Snack.xaml
    /// </summary>
    public partial class Snack : Window {
        Tool.WinFade Anime;
        
        public Snack(string msg, int? ms = null) {
            InitializeComponent();
            // Posicionar en pantalla
            Rectangle screen = Screen.PrimaryScreen.WorkingArea;
            this.Top = screen.Height - 128;
            this.Left = (screen.Width / 2) - (this.Width / 2) + screen.X;

            // Configuración visual
            this.LblMsg.Content = msg;
            this.Anime = new Tool.WinFade(this, 150);

            // Configurar Temporizador
            if (ms != null) {
                Task.Run(async () => {
                    await Task.Delay(TimeSpan.FromMilliseconds((int)ms));
                    Tool.WinAsync.UIInvoke(() => {
                        this.Close();
                    });
                });

                this.Show();
            }
        }

        private void Button_Click(object sender, RoutedEventArgs e) {
            this.Close();
        }
    }
}
