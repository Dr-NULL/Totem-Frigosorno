using Client.Tool;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;

namespace Client.View {
    /// <summary>
    /// Lógica de interacción para FrmMain.xaml
    /// </summary>
    public partial class Main : Window {
        private System.Windows.Forms.NotifyIcon TrayIcon;

        private void Window_Loaded(object sender, RoutedEventArgs e) {
            // Instanciar Demonio
            Server.Daemon.Deploy();

            // Ocultar Formulario
            this.TrayIcon = new System.Windows.Forms.NotifyIcon();
            this.TrayIcon.DoubleClick += new EventHandler(TrayIcon_DoubleClick);
            this.TrayIcon.Icon = new System.Drawing.Icon(AppDomain.CurrentDomain.BaseDirectory + "icon.ico");
            this.TrayIcon.Visible = true;
            this.Visibility = Visibility.Hidden;

            // Leer impresoras existentes
            List<string> data = Tool.Printer.Impresora.GetPrinters();
            data.ForEach(item => {
                this.LstPrint.Items.Add(item);
            });

            // Configuración de elementos visuales
            this.BtnSave.IsEnabled = false;
            string printer = Tool.Config.printerName;
            this.LstPrint.SelectionMode = SelectionMode.Single;

            // Localizar Impresora actual
            if (printer != null) {
                for (int i = 0; i < data.Count; i++) {
                    if (printer == data[i]) {
                        this.LstPrint.SelectedIndex = i;
                        break;
                    }
                }
            }
        }

        private void LstPrint_SelectionChanged(object sender, SelectionChangedEventArgs e) {
            this.BtnSave.IsEnabled = true;
        }

        private void BtnSave_Click(object sender, RoutedEventArgs e) {
            this.BtnSave.IsEnabled = false;
            Tool.Config.printerName = this.LstPrint.SelectedItem.ToString();
            Snack.Show("Cambios guardados correctamente!", 1500);
        }

        private async void TrayIcon_DoubleClick(object sender, EventArgs e) {
            this.Visibility = Visibility.Visible;
            await Task.Delay(150);
            this.WindowState = WindowState.Normal;
            this.Topmost = true;
            this.Focus();
            this.Topmost = false;
        }

        private void Window_StateChanged(object sender, EventArgs e) {
            if (this.WindowState == WindowState.Minimized) {
                this.Visibility = Visibility.Hidden;
                this.WindowStartupLocation = WindowStartupLocation.CenterScreen;
                this.ShowInTaskbar = false;
                this.TrayIcon.Visible = true;
            } else {
                this.ShowInTaskbar = true;
                this.TrayIcon.Visible = false;
            }
        }
    }
}
