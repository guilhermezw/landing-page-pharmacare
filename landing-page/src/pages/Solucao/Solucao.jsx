import "./Solucao.css";

function Solucao() {
  return (
    <section className="solucao container">
      <h1>Uma Plataforma Completa</h1>

      <div className="solucao-grid">
        <div className="soft-card">
          <h3>Controle de Tratamento</h3>
          <p>Acompanhamento contínuo da evolução terapêutica.</p>
        </div>

        <div className="soft-card">
          <h3>Registro de Reações</h3>
          <p>Monitoramento de eventos adversos.</p>
        </div>

        <div className="soft-card">
          <h3>Relatórios Detalhados</h3>
          <p>Documentação pronta para auditorias.</p>
        </div>
      </div>
    </section>
  );
}

export default Solucao;