using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Media.Animation;

namespace Client.Tool {
    public class WinFade {
        // Logic Reference
        private bool CanClose;
        private Window Win;

        // Animations
        DoubleAnimation FadeIn;
        DoubleAnimation FadeOut;

        /// <summary>
        /// Implementa una animación del tipo Fade In/Out para la apertura y cierre del Formulario.
        /// </summary>
        /// <param name="window">Instancia del formulario actual que se desea animar.</param>
        /// <param name="ms">Duración de la animación en Milisegundos.</param>
        public WinFade(Window window, int ms) {
            // Initialize
            this.CanClose = false;
            this.Win = window;

            // Setting
            this.Win.Visibility = Visibility.Visible;
            this.Win.Opacity = 0;
            this.Win.Closing += new System.ComponentModel.CancelEventHandler(Win_Closing);
            this.FadeIn = new DoubleAnimation(0, 1, TimeSpan.FromMilliseconds(ms));
            this.FadeOut = new DoubleAnimation(1, 0, TimeSpan.FromMilliseconds(ms));
            this.FadeOut.Completed += FadeOut_Completed;

            this.Win.BeginAnimation(
                UIElement.OpacityProperty,
                this.FadeIn
            );
        }

        private void FadeOut_Completed(object sender, EventArgs e) {
            this.Win.Close();
        }

        private void Win_Closing(object sender, System.ComponentModel.CancelEventArgs e) {
            if (!this.CanClose) {
                this.CanClose = true;
                e.Cancel = true;

                this.Win.BeginAnimation(
                    UIElement.OpacityProperty,
                    this.FadeOut
                );
            }
        }
    }
}
