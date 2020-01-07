using System.IO;
using System.Net;
using System.Threading.Tasks;
using System.Text;

using System.Web.Script.Serialization;
using System.Text.Json;
using System;

namespace Client.Tool {
    public class Ajax {
        public static async Task<T> Get<T>(string url) where T : class {
            //Definir Petición
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
            request.AutomaticDecompression = DecompressionMethods.GZip | DecompressionMethods.Deflate;

            //Preparar Response
            using (HttpWebResponse response = (HttpWebResponse)await request.GetResponseAsync())
            using (Stream stream = response.GetResponseStream())
            using (StreamReader reader = new StreamReader(stream)) {
                string receive = await reader.ReadToEndAsync();

                //Parsear
                try {
                    T output = JsonSerializer.Deserialize<T>(receive, new JsonSerializerOptions {
                        PropertyNameCaseInsensitive = true
                    });
                    return output;

                } catch (Exception) {
                    return null;
                }
            }
        }
        public static async Task<T> Post<T>(string url, object data) where T : class {
            //Serializar data
            string raw = JsonSerializer.Serialize(
                data,
                new JsonSerializerOptions {
                    PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                    WriteIndented = true
                }
            );
            byte[] byteData = Encoding.UTF8.GetBytes(raw);

            //Definir Petición
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
            request.AutomaticDecompression = DecompressionMethods.GZip | DecompressionMethods.Deflate;
            request.ContentLength = byteData.Length;
            request.ContentType = "application/json";
            request.Method = "POST";

            //Escribir data en el body
            using (Stream requestBody = request.GetRequestStream()) {
                requestBody.Write(byteData, 0, byteData.Length);
            }

            //Preparar Response
            using (HttpWebResponse response = (HttpWebResponse)await request.GetResponseAsync())
            using (Stream stream = response.GetResponseStream())
            using (StreamReader reader = new StreamReader(stream)) {
                string receive = await reader.ReadToEndAsync();

                //Parsear
                try {
                    T output = JsonSerializer.Deserialize<T>(receive, new JsonSerializerOptions {
                        PropertyNameCaseInsensitive = true,
                        IgnoreReadOnlyProperties = false
                    });
                    return output;

                } catch (Exception) {
                    return null;
                }
            }
        }
    }
}
