export default function KpiCard({ label, value, note }) {
  return (
    <section className="kpi-card">
      <div className="kpi-label">{label}</div>
      <div className="kpi-value">{value}</div>
      <div className="kpi-note">{note}</div>
    </section>
  );
}
