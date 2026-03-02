const items = [
  ["dashboard", "Dashboard"],
  ["clients", "Musteriler"],
  ["tasks", "CRM / Gorevler"],
  ["invoices", "Faturalar"],
  ["analytics", "Istatistikler"],
  ["settings", "Ayarlar"]
];

export default function Sidebar({ activeView, onChange }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">C</div>
        <div>
          <strong>CRM Cloud</strong>
          <div className="muted-text">Eski panelin bulut versiyonu</div>
        </div>
      </div>
      <nav className="nav">
        {items.map(([id, label]) => (
          <button
            key={id}
            type="button"
            className={activeView === id ? "nav-item active" : "nav-item"}
            onClick={() => onChange(id)}
          >
            {label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
