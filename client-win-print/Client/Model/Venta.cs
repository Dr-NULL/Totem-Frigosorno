using System;

namespace Client.Model {
    public class Venta {
        public int Id { get; set; }
        public int Correlat { get; set; }
        public DateTime Fecha { get; set; }
        public TipoAte TipoAte { get; set; }
        public Cliente Cliente { get; set; }
        public Totem Totem { get; set; }
    }
}
