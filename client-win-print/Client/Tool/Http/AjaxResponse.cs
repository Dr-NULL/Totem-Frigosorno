using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Client.Tool.Http {
    public class AjaxMeta {
        public string Brand { get; set; }
        public string Country { get; set; }
        public string[] Authors { get; set; }
    }

    public class AjaxError { 
        public string Status { get; set; }
        public string Title { get; set; }
        public string Details { get; set; }
        public string Stack { get; set; }
        public AjaxErrorSource Source { get; set; }
    }

    public class AjaxErrorSource { 
        public string Pointer { get; set; }
        public KeyValuePair<string, object> Parameter { get; set; }
    }

    public class AjaxSuccess<T> { 
        public T Data { get; set; }
        public AjaxError[] Errors { get; set; }
        public AjaxMeta Meta { get; set; }
    }
}
