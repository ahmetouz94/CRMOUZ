import SectionCard from "../../components/SectionCard";

import { useState } from "react";

export default function SettingsPage({ onlineMode, settings, onUpdateSettings, onImportPayload }) {
  const [importText, setImportText] = useState("");
  const [importMessage, setImportMessage] = useState("");

  function handleImport() {
    try {
      const parsed = JSON.parse(importText);
      onImportPayload(parsed);
      setImportMessage("Import tamamlandi.");
    } catch (error) {
      setImportMessage("JSON okunamadi. Gecerli bir export yapistir.");
    }
  }

  return (
    <div className="page-stack two-col">
      <SectionCard
        title="Gorunum ve Operasyon"
        subtitle="Tema, yogunluk ve operasyon ayarlari."
      >
        <div className="form-grid">
          <label>
            Tema
            <select value={settings.theme} onChange={(event) => onUpdateSettings({ theme: event.target.value })}>
              <option value="professional">Professional</option>
              <option value="graphite">Graphite</option>
              <option value="executive">Executive</option>
            </select>
          </label>
          <label>
            Yogunluk
            <select value={settings.density} onChange={(event) => onUpdateSettings({ density: event.target.value })}>
              <option value="standard">Standart</option>
              <option value="compact">Kompakt</option>
              <option value="comfortable">Rahat</option>
            </select>
          </label>
          <label className="toggle-line">
            <input type="checkbox" checked={settings.liveAlerts} onChange={(event) => onUpdateSettings({ liveAlerts: event.target.checked })} />
            <span>Canli CRM uyarilari aktif</span>
          </label>
          <label className="toggle-line">
            <input type="checkbox" checked={settings.showAdvancedInsights} onChange={(event) => onUpdateSettings({ showAdvancedInsights: event.target.checked })} />
            <span>Musteri icgoruleri acik gelsin</span>
          </label>
        </div>
      </SectionCard>

      <SectionCard
        title="Bulut Baglantisi"
        subtitle="Bu iskelet Supabase ile internet uzerinden ortak calisir."
      >
        <div className="settings-list">
          <div className="settings-row">
            <span>Ortam</span>
            <strong>{onlineMode ? "Canli veri" : "Mock veri"}</strong>
          </div>
          <div className="settings-row">
            <span>Firma</span>
            <strong>{settings.firmName}</strong>
          </div>
          <div className="settings-row">
            <span>E-posta</span>
            <strong>{settings.firmEmail}</strong>
          </div>
          <div className="settings-row">
            <span>Siradaki Fatura No</span>
            <strong>{settings.nextInvoiceNo}</strong>
          </div>
          <div className="settings-row">
            <span>Son Import</span>
            <strong>{settings.importedAt || "Henuz yapilmadi"}</strong>
          </div>
        </div>
      </SectionCard>

      <SectionCard
        title="Eski Sistem Import"
        subtitle="Eski panelden export edilen JSON verisini buraya yapistir."
      >
        <div className="page-stack">
          <textarea
            className="import-box"
            value={importText}
            onChange={(event) => setImportText(event.target.value)}
            placeholder='{"clients":[],"tasks":[],"invoices":[],"attachments":[],"passwords":[]}'
          />
          <div className="action-row">
            <button type="button" className="primary-btn" onClick={handleImport}>JSON Import Et</button>
            {importMessage ? <span className="muted-text">{importMessage}</span> : null}
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
