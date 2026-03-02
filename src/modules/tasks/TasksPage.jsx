import { useEffect, useState } from "react";
import SectionCard from "../../components/SectionCard";

const blankTask = {
  clientId: "",
  clientName: "",
  clientAfm: "",
  title: "",
  notes: "",
  startDate: "",
  endDate: "",
  status: "open",
  type: "Evrak",
  priority: "Orta",
  recurrence: "none",
  fee: 0
};

export default function TasksPage({
  tasks,
  clients,
  taskTemplates,
  onCreateTask,
  onUpdateTask,
  onCompleteTask
}) {
  const [editingTaskId, setEditingTaskId] = useState("");
  const [form, setForm] = useState(blankTask);
  const activeTasks = tasks.filter((task) => task.status !== "done");
  const historyTasks = tasks.filter((task) => task.status === "done");

  useEffect(() => {
    if (!editingTaskId) {
      setForm(blankTask);
      return;
    }
    const task = tasks.find((item) => item.id === editingTaskId);
    if (!task) return;
    setForm({
      clientId: task.clientId || "",
      clientName: task.clientId ? "" : task.clientName || "",
      clientAfm: task.clientId ? "" : task.clientAfm || "",
      title: task.title || "",
      notes: task.notes || "",
      startDate: task.startDate || "",
      endDate: task.endDate || "",
      status: task.status || "open",
      type: task.type || "Evrak",
      priority: task.priority || "Orta",
      recurrence: task.recurrence || "none",
      fee: task.fee || 0
    });
  }, [editingTaskId, tasks]);

  function applyTemplate(templateId) {
    const template = taskTemplates.find((item) => item.id === templateId);
    if (!template) return;
    setForm((current) => ({
      ...current,
      title: template.name,
      type: template.type,
      priority: template.priority,
      recurrence: template.recurrence,
      fee: template.fee,
      notes: template.notes
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!form.title) return;
    if (!form.clientId && !form.clientName) return;

    if (editingTaskId) {
      onUpdateTask(editingTaskId, form);
    } else {
      onCreateTask(form);
    }
    setEditingTaskId("");
    setForm(blankTask);
  }

  return (
    <div className="page-stack">
      <div className="workspace-grid">
        <SectionCard
          title={editingTaskId ? "Gorev Duzenle" : "Yeni CRM Gorevi"}
          subtitle="Kayitli veya kayitsiz kisiye gorev ac, donem ve ucret tanimla."
        >
          <div className="template-row">
            {taskTemplates.map((template) => (
              <button key={template.id} type="button" className="ghost-btn" onClick={() => applyTemplate(template.id)}>
                {template.name}
              </button>
            ))}
          </div>

          <form className="form-grid" onSubmit={handleSubmit}>
            <label>
              Kayitli Musteri
              <select value={form.clientId} onChange={(event) => setForm({ ...form, clientId: event.target.value })}>
                <option value="">Musteri secilmedi</option>
                {clients.map((client) => (
                  <option key={client.id} value={client.id}>{client.name} • {client.afm}</option>
                ))}
              </select>
            </label>
            <label>
              Kayitsiz Isim
              <input value={form.clientName} onChange={(event) => setForm({ ...form, clientName: event.target.value })} />
            </label>
            <label>
              AFM
              <input value={form.clientAfm} onChange={(event) => setForm({ ...form, clientAfm: event.target.value })} />
            </label>
            <label>
              Baslik
              <input value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} />
            </label>
            <label>
              Baslangic
              <input type="date" value={form.startDate} onChange={(event) => setForm({ ...form, startDate: event.target.value })} />
            </label>
            <label>
              Bitis
              <input type="date" value={form.endDate} onChange={(event) => setForm({ ...form, endDate: event.target.value })} />
            </label>
            <label>
              Tip
              <select value={form.type} onChange={(event) => setForm({ ...form, type: event.target.value })}>
                <option>Evrak</option>
                <option>Telefon</option>
                <option>E-posta</option>
                <option>Odeme</option>
                <option>Diger</option>
              </select>
            </label>
            <label>
              Oncelik
              <select value={form.priority} onChange={(event) => setForm({ ...form, priority: event.target.value })}>
                <option>Dusuk</option>
                <option>Orta</option>
                <option>Yuksek</option>
              </select>
            </label>
            <label>
              Tekrar
              <select value={form.recurrence} onChange={(event) => setForm({ ...form, recurrence: event.target.value })}>
                <option value="none">Tek seferlik</option>
                <option value="weekly">Haftalik</option>
                <option value="monthly">Aylik</option>
              </select>
            </label>
            <label>
              Ucret
              <input type="number" value={form.fee} onChange={(event) => setForm({ ...form, fee: Number(event.target.value) || 0 })} />
            </label>
            <label>
              Durum
              <select value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value })}>
                <option value="open">Acik</option>
                <option value="in_progress">Devam ediyor</option>
                <option value="waiting">Beklemede</option>
                <option value="waiting_client">Musteriden bilgi bekleniyor</option>
                <option value="done">Tamamlandi</option>
              </select>
            </label>
            <label className="full-width">
              Aciklama
              <textarea value={form.notes} onChange={(event) => setForm({ ...form, notes: event.target.value })} />
            </label>
            <div className="full-width action-row">
              {editingTaskId ? <button type="button" className="ghost-btn" onClick={() => setEditingTaskId("")}>Yeni Goreve Don</button> : null}
              <button type="submit" className="primary-btn">{editingTaskId ? "Guncelle" : "Gorev Kaydet"}</button>
            </div>
          </form>
        </SectionCard>

        <SectionCard
          title="Hmerologio"
          subtitle="Aktif gorevler, tamamla ve duzenle aksiyonlari."
        >
          <div className="task-stack">
            {activeTasks.map((task) => (
              <article key={task.id} className="task-card">
                <div className="task-card-head">
                  <div>
                    <strong>{task.title}</strong>
                    <div className="muted-text">{task.clientName || "Kayitsiz kisi"} • {task.type}</div>
                  </div>
                  <span className={`status-badge ${task.status}`}>{task.status}</span>
                </div>
                <div className="task-card-meta">
                  <span>{task.startDate || "-"} - {task.endDate || "-"}</span>
                  <span>{task.priority}</span>
                  <span>{task.fee ? `${task.fee} EUR` : "Bedelsiz"}</span>
                </div>
                <p className="task-card-note">{task.notes}</p>
                <div className="action-row">
                  <button className="primary-btn" onClick={() => onCompleteTask(task.id)}>Tamamla</button>
                  <button className="ghost-btn" onClick={() => setEditingTaskId(task.id)}>Duzenle</button>
                </div>
              </article>
            ))}
          </div>
        </SectionCard>
      </div>

      <SectionCard
        title="Istoriko"
        subtitle="Tamamlanan gorevler burada tutulur. Ucretli isler otomatik borca dusurulebilir."
      >
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Musteri</th>
                <th>Gorev</th>
                <th>Donem</th>
                <th>Ucret</th>
                <th>Belge</th>
              </tr>
            </thead>
            <tbody>
              {historyTasks.map((task) => (
                <tr key={task.id}>
                  <td>{task.clientName || "Kayitsiz"}</td>
                  <td>{task.title}</td>
                  <td>{task.startDate} - {task.endDate}</td>
                  <td>{task.fee ? `${task.fee} EUR` : "-"}</td>
                  <td>{task.invoiced ? "Otomatik yazildi" : "Opsiyonel"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}
