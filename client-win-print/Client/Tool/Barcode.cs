using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Client.Tool {
    public class Barcode {
        public static string To128(string input) {
            // No Admitir Cadenas Vacías
            if (input.Length == 0) {
                return "";
            }

            // No admitir carácteres incompatibles
            char[] chars = input.ToCharArray();
            for (int i = 0; i < chars.Length; i++) {
                if (
                    (chars[i] < 32 || chars[i] > 126) &&
                    (chars[i] != 203)
                ) {
                    return "";
                }
            }

            // Comprobar si es compatible con Tabla C
            Func<int, bool> isTableC = (int i) => {
                if (i >= (input.Length - 1)) {
                    return false;
                } else {
                    bool resp = true;
                    char[] pairs = input.Substring(i, 2).ToCharArray();

                    foreach (char ch in pairs) {
                        if (resp) {
                            if ((ch < 48) || (ch > 57)) {
                                resp = false;
                            }
                        }
                    }

                    return resp;
                }
            };

            string output = "";
            bool tableC = false;
            for (int i = 0; i < input.Length; i++) {
                // Table C
                if (isTableC(i)) {
                    // Table C
                    int num = int.Parse(input.Substring(i, 2));
                    if (num < 95) {
                        num = num + 32;
                    } else {
                        num = num + 105;
                    }

                    // Prefijo Table C
                    if (i == 0) {
                        output += Convert.ToString((char)210);
                    } else if (!tableC) {
                        output += Convert.ToString((char)204);
                    }

                    tableC = true;
                    output += Convert.ToString((char)num);
                    i++;
                } else {
                    // Prefijo Table B
                    if (i == 0) {
                        output += Convert.ToString((char)209);
                    } else if (tableC) {
                        output += Convert.ToString((char)205);
                    }

                    tableC = false;
                    output += input.Substring(i, 1);
                }
            }

            // Calcular Dígito de Control
            int checksum = 0;
            chars = output.ToCharArray();
            for (int i = 0; i < chars.Length; i++) {
                int ascii = (int)chars[i];
                if (ascii < 127) {
                    ascii = (ascii - 32);
                } else {
                    ascii = ascii - 105;
                }

                if (i == 0) {
                    checksum = ascii;
                } else {
                    checksum = (checksum + i * ascii) % 103;
                }
            }

            // Buscar equivalencia en ASCII
            if (checksum < 95) {
                checksum += 32;
            } else {
                checksum += 105;
            }

            // Concatenar checksum
            output += Convert.ToString((char)checksum);
            output += Convert.ToString((char)211);
            return output;
        }
    }
}
