using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Text;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;
using System.Windows;

namespace Client.Tool {
    public class FontLoader {
        public static Font Load(string path, int size, System.Drawing.FontStyle style) {
            PrivateFontCollection sysFonts = new PrivateFontCollection();
            sysFonts.AddFontFile(path);
            Font output = new Font(sysFonts.Families[0], size, style);
            sysFonts.Dispose();
            return output;
        }
    }
}
