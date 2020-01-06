using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using System.Net;

namespace Client.Tool.Http {
    public static class Response {
        public static void Send(this HttpListenerResponse res, object data) {
            string raw = JsonSerializer.Serialize(
                data,
                new JsonSerializerOptions {
                    PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                    WriteIndented = true
                }
            );
            byte[] byteData = Encoding.UTF8.GetBytes(raw);
            res.ContentLength64 = byteData.Length;
            res.OutputStream.Write(byteData, 0, byteData.Length);
        }
    }
}
