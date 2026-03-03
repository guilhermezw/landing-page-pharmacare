import "./Problema.css";

function Problema() {
  return (
    <section className="problema container">
      <h1>O Desafio da Gestão Farmacêutica</h1>

      <div className="problema-grid">
        <div className="soft-card">
          <h3>Polifarmácia</h3>
          <p>Uso simultâneo de múltiplos medicamentos sem controle adequado.</p>
        </div>

        <div className="soft-card">
          <h3>Interações Medicamentosas</h3>
          <p>Riscos não identificados comprometem o tratamento.</p>
        </div>

        <div className="soft-card">
          <h3>Ausência de Histórico</h3>
          <p>Dados clínicos dispersos dificultam decisões seguras.</p>
        </div>
      </div>
    </section>
  );
}

export default Problema;