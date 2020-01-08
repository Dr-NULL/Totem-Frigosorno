using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;

namespace Client.Tool {
    public class Log {
        private static readonly File _file = File.Load(AppDomain.CurrentDomain.BaseDirectory + @"LOG.txt");
        private static void Txt(string msg, string type = null) {
            DateTime now = DateTime.Now;
            string output = "";

            if (type != null) {
                output += now.ToString("yyyy/MM/dd HH:mm:ss");
                output += " -> [" + type + "] ";
            } else {
                output += "                   ";
                output += "           ";
            }

            if (!_file.Exists()) {
                _file.Create();
            }

            output += msg + "\n";
            _file.AppendString(output);
        }

        public static void Ev(string txt) {
            Txt(txt, " EV ");
        }

        public static void Ok(string txt) {
            Txt(txt, " OK ");
        }

        public static void Er(string txt) {
            Txt(txt, "FAIL");
        }

        public static void Ln(string txt) {
            Txt(txt);
        }

        public static void Sp() {
            if (!_file.Exists()) {
                _file.Create();
            }

            _file.AppendString("--------------------------------------\n");
        }
    }
}
