import SectionCard from "../../components/SectionCard";

export default function AnalyticsPage({ stats, clients, tasks, invoices }) {
  const byStatus = [
    ["Saglikli", clients.filter((client) => client.health === "healthy").length],
    ["Takip", clients.filter((client) => client.health === "attention").length],
    ["Kritik", clients.filter((client) => client.health === "critical").length]
  ];

  return (
    <div className="page-stack">
      <div className="kpi-grid">
        <section className="panel-card mini-panel"><div className="muted-text">Musteri Sayisi</div><strong className="big-inline">{stats.totalClients}</strong></section>
        <section className="panel-card mini-panel"><div className="muted-text">Acik Gorev</div><strong className="big-inline">{stats.openTasks}</strong></section>
        <section className="panel-card mini-panel"><div className="muted-text">Geciken</div><strong className="big-inline">{stats.overdueTasks}</strong></section>
        <section className="panel-card mini-panel"><div className="muted-text">Tahsilat Orani</div><strong className="big-inline">{stats.collectionRate}%</strong></section>
      </div>

      <div className="workspace-grid">
        <SectionCard title="Portfoy Dagilimi" subtitle="Saglik durumuna gore musteri segmentleri.">
          <div className="analytics-bars">
            {byStatus.map(([label, value]) => (
              <div key={label} className="analytics-row">
                <span>{label}</span>
                <div className="analytics-bar-track">
                  <div className="analytics-bar-fill" style={{ width: `${clients.length ? Math.round((value / clients.length) * 100) : 0}%` }} />
                </div>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="En Degerli Portfoy" subtitle="Gelir, bakiye ve is yuku birlikte.">
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Musteri</th>
                  <th>Gelir</th>
                  <th>Bakiye</th>
                  <th>Acik Is</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client) => (
                  <tr key={client.id}>
                    <td>{client.name}</td>
                    <td>{client.totalRevenue} EUR</td>
                    <td>{client.balance} EUR</td>
                    <td>{tasks.filter((task) => task.clientId === client.id && task.status !== "done").length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Belge Performansi" subtitle="Fatura ve makbuz akislarinin toplu gorunumu.">
        <div className="invoice-grid compact">
          {invoices.map((invoice) => (
            <article key={invoice.id} className="invoice-card compact">
              <div className="invoice-top">
                <strong>{invoice.clientName}</strong>
                <span>{invoice.amount} EUR</span>
              </div>
              <div className="invoice-meta">
                <span>{invoice.type}</span>
                <span>{invoice.status}</span>
              </div>
            </article>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
