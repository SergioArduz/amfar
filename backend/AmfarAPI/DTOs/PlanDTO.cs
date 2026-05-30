namespace AmfarAPI.DTOs
{
    public class PlanDTO
    {
        public string Codigo { get; set; }
        public string NombrePlan { get; set; }
        public decimal Monto { get; set; }
        public int HorasSemanales { get; set; }
        public int HorasMensuales { get; set; }
        public bool EsIndividual { get; set; }
    }
}
