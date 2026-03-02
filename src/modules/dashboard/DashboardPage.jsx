import KpiCard from "../../components/KpiCard";
import SectionCard from "../../components/SectionCard";

export default function DashboardPage({ stats, tasks, clients, invoices, onOpenView }) {
  const spotlightClients = clients.slice().sort((a, b) => b.balance - a.balance).slice(0, 3);
  const activeTasks = tasks.filter((task) => task.status !== "done").slice(0, 5);

  return (
    <div className="page-stack">
      <div className="kpi-grid">
        <KpiCard label="Toplam Musteri" value={stats.totalClients} note="Aktif portfoy" />
        <KpiCard label="Acik Gorev" value={stats.openTasks} note={`${stats.overdueTasks} geciken gorev`} />
        <KpiCard label="Aylik Gelir" value={`${stats.monthlyRevenue} EUR`} note="Kesilen belgeler uzerinden" />
        <KpiCard label="Tahsilat Orani" value={`${stats.collectionRate}%`} note="Faturalanan tutar uzerinden" />
      </div>

      <div className="workspace-grid">
        <SectionCard
          title="Hizli Komutlar"
          subtitle="Eski paneldeki ana akislari bulut versiyonunda hizli sekilde ac."
        >
          <div className="command-grid">
            <button className="command-card" onClick={() => onOpenView("tasks")}>
              <strong>Yeni Gorev</strong>
              <span>Ucretli, donemli ve duzenlenebilir CRM gorevi ac.</span>
            </button>
            <button className="command-card" onClick={() => onOpenView("clients")}>
              <strong>Musteri 360</strong>
              <span>Profil, spouse, not, bakiye ve kontrol merkezi.</span>
            </button>
            <button className="command-card" onClick={() => onOpenView("invoices")}>
              <strong>Belge Uret</strong>
              <span>Fatura, hizmet faturasi veya makbuz olustur.</span>
            </button>
            <button className="command-card" onClick={() => onOpenView("analytics")}>
              <strong>Analiz Ac</strong>
              <span>Portfoy, risk, tahsilat ve operasyon gorunumu.</span>
            </button>
          </div>
        </SectionCard>

        <SectionCard
          title="Canli Operasyon"
          subtitle="Yakin donem gorevleri ve otomatik borc yazma mantigi."
        >
          <div className="timeline-list">
            {activeTasks.map((task) => (
              <article key={task.id} className="timeline-item">
                <div>
                  <strong>{task.title}</strong>
                  <div className="muted-text">{task.clientName || "Kayitsiz kisi"} • {task.type}</div>
                </div>
                <div className="timeline-side">
                  <div className="timeline-range">{task.startDate} - {task.endDate}</div>
                  <div className="muted-text">{task.fee ? `${task.fee} EUR` : "Bedelsiz"}</div>
                </div>
              </article>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="workspace-grid">
        <SectionCard
          title="Odak Musteriler"
          subtitle="Bakiye veya risk nedeniyle onde tutulmasi gereken portfoy."
        >
          <div className="spotlight-list">
            {spotlightClients.map((client) => (
              <div key={client.id} className="spotlight-item">
                <div>
                  <strong>{client.name}</strong>
                  <div className="muted-text">{client.company || client.type}</div>
                </div>
                <div className="spotlight-right">
                  <strong>{client.balance} EUR</strong>
                  <span className={`status-badge ${client.health}`}>{client.status}</span>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard
          title="Son Belgeler"
          subtitle="Otomatik veya manuel olusan son finans hareketleri."
        >
          <div className="invoice-grid compact">
            {invoices.slice(0, 4).map((invoice) => (
              <article key={invoice.id} className="invoice-card compact">
                <div className="invoice-top">
                  <strong>{invoice.clientName}</strong>
                  <span>{invoice.amount} EUR</span>
                </div>
                <div className="muted-text">{invoice.date}</div>
                <div className="invoice-meta">
                  <span>{invoice.type}</span>
                  <span>{invoice.status}</span>
                </div>
              </article>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
