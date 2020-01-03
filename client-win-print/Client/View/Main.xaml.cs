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
using System.Windows.Shapes;

namespace Client.View {
    /// <summary>
    /// Lógica de interacción para FrmMain.xaml
    /// </summary>
    public partial class Main : Window {
        public Main() {
        }

        private void Window_Loaded(object sender, RoutedEventArgs e) {
            List<string> data = Tool.Impresora.GetPrinters();
            data.ForEach(item => { 
                this.LstPrint.Items.Add(item);
            });

            this.BtnSave.IsEnabled = false;
            string printer = Tool.Config.printerName;
            this.LstPrint.SelectionMode = SelectionMode.Single;

            if (printer != null) {
                for (int i = 0; i < data.Count; i++) {
                    if (printer == data[i]) {
                        this.LstPrint.SelectedIndex = i;
                        this.BtnSave.IsEnabled = true;
                        break;
                    }
                }
            }
        }

        private void LstPrint_SelectionChanged(object sender, SelectionChangedEventArgs e) {
            this.BtnSave.IsEnabled = true;
        }

        private void BtnSave_Click(object sender, RoutedEventArgs e) {
            Tool.Config.printerName = this.LstPrint.SelectedItem.ToString();
            Snack snack = new Snack("Cambios guardados correctamente!");
            snack.Show();

            // Cerrar Snack automáticamente
            Task.Run(async () => {
                await Task.Delay(1500);

                Tool.WinAsync.UIInvoke(() => {
                    snack.Close();
                });
            });
        }
    }
}
