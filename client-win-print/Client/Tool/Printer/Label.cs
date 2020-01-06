using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Client.Tool.Printer {
    public class Label {
        public float X { get; set; }
        public float Y { get; set; }
        public string Text { get; set; }
        public Brush Brush { get; set; }
        public Font Font { get; set; }
        public string FontFamily { 
            get => this.Font.FontFamily.Name;
            set {
                Font tmp = this.Font;
                this.Font = new Font(
                    value,
                    tmp.Size,
                    tmp.Style
                );
            } 
        }
        public float FontSize { 
            get => this.Font.Size; 
            set {
                Font tmp = this.Font;
                this.Font = new Font(
                    tmp.FontFamily, 
                    value, 
                    tmp.Style
                );
            }
        }
        public FontStyle FontStyle {
            get => this.Font.Style;
            set {
                Font tmp = this.Font;
                this.Font = new Font(
                    tmp.FontFamily,
                    tmp.Size,
                    value
                );
            }
        }

        public Label() {
            this.X = 0;
            this.Y = 0;
            this.Text = "";
            this.Brush = Brushes.Black;
            this.Font = new Font(
                "Arial",
                12,
                FontStyle.Regular
            );
        }
    }
}
