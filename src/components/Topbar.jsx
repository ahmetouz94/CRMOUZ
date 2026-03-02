const labels = {
  dashboard: "Yonetim Ozeti",
  clients: "Musteri Kontrol Merkezi",
  tasks: "CRM Operasyon Merkezi",
  invoices: "Belge ve Tahsilat",
  analytics: "Analiz ve Raporlama",
  settings: "Ayar Merkezi"
};

export default function Topbar({ onlineMode, activeView, stats }) {
  return (
    <header className="topbar">
      <div>
        <h1>{labels[activeView] || "CRM Cloud"}</h1>
        <p>
          {stats.totalClients} musteri, {stats.openTasks} acik gorev, {stats.unpaidCount} tahsilat bekleyen belge.
        </p>
      </div>
      <div className="topbar-side">
        <div className="quick-stat">
          <span className="muted-text">Riskli Portfoy</span>
          <strong>{stats.riskyClients}</strong>
        </div>
        <div className={onlineMode ? "status-pill online" : "status-pill offline"}>
          {onlineMode ? "Supabase bagli" : "Mock veri modu"}
        </div>
      </div>
    </header>
  );
}
