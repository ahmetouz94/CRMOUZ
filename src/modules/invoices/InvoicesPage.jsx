import { useState } from "react";
import SectionCard from "../../components/SectionCard";

const blankInvoice = {
  clientId: "",
  type: "service",
  status: "unpaid",
  amount: 0,
  date: "",
  notes: ""
};

export default function InvoicesPage({ invoices, clients, onCreateInvoice }) {
  const [form, setForm] = useState(blankInvoice);
  const totals = {
    billed: invoices.filter((item) => item.type !== "receipt").reduce((sum, item) => sum + item.amount, 0),
    collected: invoices.filter((item) => item.status === "paid" || item.type === "receipt").reduce((sum, item) => sum + item.amount, 0),
    unpaid: invoices.filter((item) => item.status === "unpaid").reduce((sum, item) => sum + item.amount, 0)
  };

  function handleSubmit(event) {
    event.preventDefault();
    if (!form.clientId || !form.amount) return;
    onCreateInvoice(form);
    setForm(blankInvoice);
  }

  return (
    <div className="page-stack">
      <div className="kpi-grid">
        <KpiBlock label="Toplam Fatura" value={`${totals.billed} EUR`} />
        <KpiBlock label="Tahsilat" value={`${totals.collected} EUR`} />
        <KpiBlock label="Bekleyen" value={`${totals.unpaid} EUR`} />
      </div>

      <div className="workspace-grid">
        <SectionCard title="Yeni Belge" subtitle="Fatura, hizmet faturasi veya makbuz olustur.">
          <form className="form-grid" onSubmit={handleSubmit}>
            <label>
              Musteri
              <select value={form.clientId} onChange={(event) => setForm({ ...form, clientId: event.target.value })}>
                <option value="">Musteri sec</option>
                {clients.map((client) => (
                  <option key={client.id} value={client.id}>{client.name}</option>
                ))}
              </select>
            </label>
            <label>
              Belge Turu
              <select value={form.type} onChange={(event) => setForm({ ...form, type: event.target.value })}>
                <option value="invoice">Fatura</option>
                <option value="service">Hizmet Faturasi</option>
                <option value="receipt">Makbuz</option>
              </select>
            </label>
            <label>
              Durum
              <select value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value })}>
                <option value="unpaid">Odenmedi</option>
                <option value="paid">Odendi</option>
                <option value="draft">Taslak</option>
              </select>
            </label>
            <label>
              Tutar
              <input type="number" value={form.amount} onChange={(event) => setForm({ ...form, amount: Number(event.target.value) || 0 })} />
            </label>
            <label>
              Tarih
              <input type="date" value={form.date} onChange={(event) => setForm({ ...form, date: event.target.value })} />
            </label>
            <label className="full-width">
              Not
              <textarea value={form.notes} onChange={(event) => setForm({ ...form, notes: event.target.value })} />
            </label>
            <div className="full-width action-row">
              <button type="submit" className="primary-btn">Belge Kaydet</button>
            </div>
          </form>
        </SectionCard>

        <SectionCard title="Belge Akisi" subtitle="Son olusan belge ve tahsilatlar.">
          <div className="invoice-grid">
            {invoices.map((invoice) => (
              <article key={invoice.id} className="invoice-card">
                <div className="invoice-top">
                  <strong>{invoice.clientName}</strong>
                  <span>{invoice.amount} EUR</span>
                </div>
                <div className="muted-text">{invoice.date || "-"}</div>
                <div className="invoice-meta">
                  <span>{invoice.type}</span>
                  <span>{invoice.status}</span>
                </div>
                {invoice.notes ? <p className="task-card-note">{invoice.notes}</p> : null}
              </article>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

function KpiBlock({ label, value }) {
  return (
    <section className="panel-card mini-panel">
      <div className="muted-text">{label}</div>
      <strong className="big-inline">{value}</strong>
    </section>
  );
}
