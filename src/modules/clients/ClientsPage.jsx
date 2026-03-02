import { useEffect, useState } from "react";
import SectionCard from "../../components/SectionCard";

const emptyForm = {
  name: "",
  company: "",
  afm: "",
  phone: "",
  email: "",
  type: "",
  note: "",
  status: "Saglikli"
};

export default function ClientsPage({
  clients,
  tasks,
  invoices,
  attachments,
  passwords,
  selectedClientId,
  onSelectClient,
  onSaveClient,
  onAddAttachment,
  onAddPassword
}) {
  const selectedClient = clients.find((client) => client.id === selectedClientId) || null;
  const [form, setForm] = useState(emptyForm);
  const [attachmentForm, setAttachmentForm] = useState({ name: "", type: "E1", date: "", notes: "", url: "" });
  const [passwordForm, setPasswordForm] = useState({ service: "", username: "", password: "", note: "" });

  useEffect(() => {
    if (!selectedClient) {
      setForm(emptyForm);
      return;
    }
    setForm({
      name: selectedClient.name || "",
      company: selectedClient.company || "",
      afm: selectedClient.afm || "",
      phone: selectedClient.phone || "",
      email: selectedClient.email || "",
      type: selectedClient.type || "",
      note: selectedClient.note || "",
      status: selectedClient.status || "Saglikli"
    });
  }, [selectedClient]);

  const spotlight = {
    total: clients.length,
    debtors: clients.filter((client) => client.balance > 0).length,
    missingInfo: clients.filter((client) => !client.email || !client.phone || !client.afm).length
  };

  const selectedTasks = tasks.filter((task) => task.clientId === (selectedClient && selectedClient.id));
  const selectedInvoices = invoices.filter((invoice) => invoice.clientId === (selectedClient && selectedClient.id));
  const selectedAttachments = attachments.filter((item) => item.clientId === (selectedClient && selectedClient.id));
  const selectedPasswords = passwords.filter((item) => item.clientId === (selectedClient && selectedClient.id));

  function handleSubmit(event) {
    event.preventDefault();
    onSaveClient(selectedClient ? selectedClient.id : "", form);
  }

  function handleAttachmentSubmit(event) {
    event.preventDefault();
    if (!selectedClient || !attachmentForm.name) return;
    onAddAttachment(selectedClient.id, attachmentForm);
    setAttachmentForm({ name: "", type: "E1", date: "", notes: "", url: "" });
  }

  function handlePasswordSubmit(event) {
    event.preventDefault();
    if (!selectedClient || !passwordForm.service) return;
    onAddPassword(selectedClient.id, passwordForm);
    setPasswordForm({ service: "", username: "", password: "", note: "" });
  }

  return (
    <div className="page-stack">
      <div className="kpi-grid">
        <SectionCard title="Musteri Istihbarati" subtitle="Portfoy ve veri kalitesi ozetleri.">
          <div className="mini-kpi-row">
            <div><strong>{spotlight.total}</strong><span>Musteri</span></div>
            <div><strong>{spotlight.debtors}</strong><span>Borclu</span></div>
            <div><strong>{spotlight.missingInfo}</strong><span>Eksik kart</span></div>
          </div>
        </SectionCard>
        <SectionCard title="Komut Cubugu" subtitle="Profil sec, duzenle ve kontrol et.">
          <div className="command-inline">
            <button className="primary-btn" onClick={() => onSelectClient(clients[0]?.id || "")}>Ilk Profili Ac</button>
            <button className="ghost-btn" onClick={() => { onSelectClient(""); setForm(emptyForm); }}>Yeni Form</button>
          </div>
        </SectionCard>
      </div>

      <div className="workspace-grid">
        <SectionCard title="Musteri Listesi" subtitle="Satira tikla, profil ve kontrol merkezi acilsin.">
          <div className="client-list">
            {clients.map((client) => (
              <button
                key={client.id}
                type="button"
                className={selectedClient && selectedClient.id === client.id ? "client-row active" : "client-row"}
                onClick={() => onSelectClient(client.id)}
              >
                <div>
                  <strong>{client.name}</strong>
                  <div className="muted-text">{client.company || client.type} • {client.afm}</div>
                </div>
                <div className="client-row-right">
                  <strong>{client.balance} EUR</strong>
                  <span className={`status-badge ${client.health}`}>{client.status}</span>
                </div>
              </button>
            ))}
          </div>
        </SectionCard>

        <SectionCard
          title={selectedClient ? `${selectedClient.name} Kontrol Merkezi` : "Musteri Kontrol Merkezi"}
          subtitle="Profil, notlar, spouse ve operasyon bilgisi."
        >
          {selectedClient ? (
            <div className="page-stack">
              <div className="profile-grid">
                <div className="profile-box">
                  <div className="muted-text">Genel Bilgi</div>
                  <strong>{selectedClient.company || selectedClient.name}</strong>
                  <p>{selectedClient.address}</p>
                  <div className="tag-row">
                    {selectedClient.tags.map((tag) => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="profile-box">
                  <div className="muted-text">Bilgi Havuzu</div>
                  <strong>{selectedClient.attachmentsCount} dosya • {selectedClient.passwordsCount} sifre</strong>
                  <p>Son belge: {selectedClient.latestDocument}</p>
                  <p>Sonraki aksiyon: {selectedClient.nextAction}</p>
                </div>
                <div className="profile-box">
                  <div className="muted-text">Es ve iliski</div>
                  <strong>{selectedClient.spouseClientId ? "Es bagli" : "Tek profil"}</strong>
                  <p>{selectedClient.spouseClientId ? clients.find((item) => item.id === selectedClient.spouseClientId)?.name : "Es baglantisi yok"}</p>
                </div>
              </div>

              <form className="form-grid" onSubmit={handleSubmit}>
                <label>
                  Isim
                  <input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
                </label>
                <label>
                  Sirket
                  <input value={form.company} onChange={(event) => setForm({ ...form, company: event.target.value })} />
                </label>
                <label>
                  AFM
                  <input value={form.afm} onChange={(event) => setForm({ ...form, afm: event.target.value })} />
                </label>
                <label>
                  Telefon
                  <input value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} />
                </label>
                <label>
                  E-posta
                  <input value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
                </label>
                <label>
                  Tip
                  <input value={form.type} onChange={(event) => setForm({ ...form, type: event.target.value })} />
                </label>
                <label>
                  Durum
                  <select value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value })}>
                    <option>Saglikli</option>
                    <option>Takip Gerekiyor</option>
                    <option>Kritik</option>
                  </select>
                </label>
                <label className="full-width">
                  Ozel Not
                  <textarea value={form.note} onChange={(event) => setForm({ ...form, note: event.target.value })} />
                </label>
                <div className="full-width">
                  <button type="submit" className="primary-btn">Profilden Kaydet</button>
                </div>
              </form>

              <div className="workspace-grid">
                <div className="panel-subcard">
                  <strong>Gorev Akisi</strong>
                  {selectedTasks.map((task) => (
                    <div key={task.id} className="list-line">
                      <span>{task.title}</span>
                      <span>{task.startDate} - {task.endDate}</span>
                    </div>
                  ))}
                </div>
                <div className="panel-subcard">
                  <strong>Finans</strong>
                  {selectedInvoices.map((invoice) => (
                    <div key={invoice.id} className="list-line">
                      <span>{invoice.type}</span>
                      <span>{invoice.amount} EUR</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="workspace-grid">
                <SectionCard title="Belgeler" subtitle="Elektronik dosya ve link havuzu.">
                  <form className="form-grid" onSubmit={handleAttachmentSubmit}>
                    <label>
                      Belge Adi
                      <input value={attachmentForm.name} onChange={(event) => setAttachmentForm({ ...attachmentForm, name: event.target.value })} />
                    </label>
                    <label>
                      Tur
                      <select value={attachmentForm.type} onChange={(event) => setAttachmentForm({ ...attachmentForm, type: event.target.value })}>
                        <option>E1</option>
                        <option>KDV</option>
                        <option>Aitisi</option>
                        <option>Sozlesme</option>
                        <option>Diger</option>
                      </select>
                    </label>
                    <label>
                      Tarih
                      <input type="date" value={attachmentForm.date} onChange={(event) => setAttachmentForm({ ...attachmentForm, date: event.target.value })} />
                    </label>
                    <label>
                      Link
                      <input value={attachmentForm.url} onChange={(event) => setAttachmentForm({ ...attachmentForm, url: event.target.value })} />
                    </label>
                    <label className="full-width">
                      Not
                      <textarea value={attachmentForm.notes} onChange={(event) => setAttachmentForm({ ...attachmentForm, notes: event.target.value })} />
                    </label>
                    <div className="full-width action-row">
                      <button type="submit" className="primary-btn">Belge Ekle</button>
                    </div>
                  </form>
                  <div className="document-list">
                    {selectedAttachments.map((item) => (
                      <div key={item.id} className="list-line">
                        <span>{item.name} • {item.type}</span>
                        <span>{item.date || "-"}</span>
                      </div>
                    ))}
                  </div>
                </SectionCard>

                <SectionCard title="Sifreler" subtitle="Musteriye ait servis sifre havuzu.">
                  <form className="form-grid" onSubmit={handlePasswordSubmit}>
                    <label>
                      Servis
                      <input value={passwordForm.service} onChange={(event) => setPasswordForm({ ...passwordForm, service: event.target.value })} />
                    </label>
                    <label>
                      Kullanici
                      <input value={passwordForm.username} onChange={(event) => setPasswordForm({ ...passwordForm, username: event.target.value })} />
                    </label>
                    <label>
                      Sifre
                      <input value={passwordForm.password} onChange={(event) => setPasswordForm({ ...passwordForm, password: event.target.value })} />
                    </label>
                    <label className="full-width">
                      Not
                      <textarea value={passwordForm.note} onChange={(event) => setPasswordForm({ ...passwordForm, note: event.target.value })} />
                    </label>
                    <div className="full-width action-row">
                      <button type="submit" className="primary-btn">Sifre Kaydet</button>
                    </div>
                  </form>
                  <div className="document-list">
                    {selectedPasswords.map((item) => (
                      <div key={item.id} className="list-line">
                        <span>{item.service} • {item.username || "-"}</span>
                        <span>{item.password}</span>
                      </div>
                    ))}
                  </div>
                </SectionCard>
              </div>
            </div>
          ) : (
            <div className="muted-text">Musteri secilmedi.</div>
          )}
        </SectionCard>
      </div>
    </div>
  );
}
