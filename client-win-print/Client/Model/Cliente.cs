using System;

namespace Client.Model {
    public class Cliente {
        public int Id { get; set; }
        public string Rut { get; set; }
        public string Nombres { get; set; }
        public string ApellidoP { get; set; }
        public string ApellidoM { get; set; }
        public DateTime FechaNac { get; set; }
        public long Telefono { get; set; }
    }
}
