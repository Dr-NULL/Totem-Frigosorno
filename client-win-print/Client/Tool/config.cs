using System;
using System.Configuration;
using System.Reflection;
using System.Windows;

namespace Client.Tool {
    class Config {
        private static string Read(string param) {
            ConfigurationManager.RefreshSection("appSettings");

            try {
                string[] values = ConfigurationManager.AppSettings.GetValues(param);
                return values[0];

            } catch (System.NullReferenceException) {
                return null;
            }
        }

        private static void Write(string param, string value) {
            //Declare Route
            string root = System.IO.Directory.GetCurrentDirectory();
            string asmb = Assembly.GetEntryAssembly().GetName().Name;

            //Declare Mapping
            ExeConfigurationFileMap exeFM = new ExeConfigurationFileMap {
                ExeConfigFilename = root + @"\" + asmb + ".exe.config",
                LocalUserConfigFilename = root + @"\" + asmb + ".exe.config",
                RoamingUserConfigFilename = root + @"\" + asmb + ".exe.config"
            };
            Configuration config = ConfigurationManager.OpenMappedExeConfiguration(exeFM, ConfigurationUserLevel.None);
            ConfigurationManager.RefreshSection("appSettings");

            //Write Setting
            if (config.AppSettings.Settings[param] != null) {
                config.AppSettings.Settings[param].LockItem = false;
                config.AppSettings.Settings[param].Value = value;
            } else {
                config.AppSettings.Settings.Add(param, value);
            }

            try {
                config.Save(ConfigurationSaveMode.Full);
                ConfigurationManager.RefreshSection("appSettings");
            } catch (Exception) {
                
                System.Windows.MessageBox.Show(
                    "Imposible guardar la nueva configuración. Reinténtelo abriendo la aplicación como Administrador.",
                    "Error de Configuración"
                );
                Application.Current.Shutdown();
            }
        }

        public static string printerName { 
            get => Read("printerName"); 
            set => Write("printerName", value); 
        }
    }
}
