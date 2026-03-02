import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import DashboardPage from "./modules/dashboard/DashboardPage";
import ClientsPage from "./modules/clients/ClientsPage";
import TasksPage from "./modules/tasks/TasksPage";
import InvoicesPage from "./modules/invoices/InvoicesPage";
import AnalyticsPage from "./modules/analytics/AnalyticsPage";
import SettingsPage from "./modules/settings/SettingsPage";
import {
  initialAttachments,
  initialClients,
  initialInvoices,
  initialPasswords,
  initialSettings,
  initialTasks,
  taskTemplates
} from "./data/mockData";
import { hasSupabaseEnv } from "./lib/supabaseClient";

function buildStats(clients, tasks, invoices) {
  const today = new Date().toISOString().slice(0, 10);
  const openTasks = tasks.filter((task) => task.status !== "done");
  const overdueTasks = openTasks.filter((task) => task.endDate && task.endDate < today).length;
  const billedAmount = invoices.filter((invoice) => invoice.type !== "receipt").reduce((sum, invoice) => sum + invoice.amount, 0);
  const collectedAmount = invoices.filter((invoice) => invoice.status === "paid" || invoice.type === "receipt").reduce((sum, invoice) => sum + invoice.amount, 0);

  return {
    totalClients: clients.length,
    openTasks: openTasks.length,
    overdueTasks,
    monthlyRevenue: billedAmount,
    collectionRate: billedAmount ? Math.round((collectedAmount / billedAmount) * 100) : 0,
    unpaidCount: invoices.filter((invoice) => invoice.status === "unpaid").length,
    riskyClients: clients.filter((client) => client.health !== "healthy").length
  };
}

export default function App() {
  const [activeView, setActiveView] = useState(initialSettings.defaultView);
  const [settings, setSettings] = useState(initialSettings);
  const [clients, setClients] = useState(initialClients);
  const [tasks, setTasks] = useState(initialTasks);
  const [invoices, setInvoices] = useState(initialInvoices);
  const [attachments, setAttachments] = useState(initialAttachments);
  const [passwords, setPasswords] = useState(initialPasswords);
  const [selectedClientId, setSelectedClientId] = useState(initialClients[0]?.id || "");

  const stats = buildStats(clients, tasks, invoices);

  useEffect(() => {
    document.body.dataset.theme = settings.theme;
    document.body.dataset.density = settings.density;
  }, [settings.theme, settings.density]);

  function handleCreateTask(form) {
    const client = clients.find((item) => item.id === form.clientId);
    const task = {
      id: `t_${Date.now()}`,
      clientId: form.clientId,
      clientName: client ? client.name : form.clientName,
      clientAfm: client ? client.afm : form.clientAfm,
      title: form.title,
      notes: form.notes,
      startDate: form.startDate,
      endDate: form.endDate,
      status: form.status,
      type: form.type,
      priority: form.priority,
      recurrence: form.recurrence,
      fee: Number(form.fee) || 0,
      invoiced: false,
      completedAt: form.status === "done" ? new Date().toISOString() : "",
      linkedCount: 0
    };
    setTasks((current) => [task, ...current]);
    if (task.status === "done") {
      handleAutoInvoiceForTask(task);
    }
  }

  function handleUpdateTask(taskId, updates) {
    let autoInvoiceTask = null;
    setTasks((current) => current.map((task) => {
      if (task.id !== taskId) return task;
      const client = clients.find((item) => item.id === updates.clientId);
      const nextTask = {
        ...task,
        ...updates,
        clientName: client ? client.name : updates.clientName,
        clientAfm: client ? client.afm : updates.clientAfm
      };
      if (task.status !== "done" && nextTask.status === "done") {
        nextTask.completedAt = new Date().toISOString();
        autoInvoiceTask = nextTask;
      }
      return nextTask;
    }));
    if (autoInvoiceTask) handleAutoInvoiceForTask(autoInvoiceTask);
  }

  function handleAutoInvoiceForTask(task) {
    if (!task.clientId || !task.fee) return;
    setInvoices((current) => [
      {
        id: `i_${Date.now()}`,
        clientId: task.clientId,
        clientName: task.clientName,
        amount: task.fee,
        status: "unpaid",
        type: "service",
        date: new Date().toISOString().slice(0, 10),
        taskId: task.id,
        notes: `${task.title} tamamlandigi icin otomatik olustu.`
      },
      ...current
    ]);
    setTasks((current) => current.map((item) => item.id === task.id ? { ...item, invoiced: true } : item));
    setClients((current) => current.map((client) => client.id === task.clientId ? { ...client, balance: client.balance + task.fee } : client));
    setSettings((current) => ({ ...current, nextInvoiceNo: current.nextInvoiceNo + 1 }));
  }

  function handleCompleteTask(taskId) {
    const task = tasks.find((item) => item.id === taskId);
    if (!task) return;
    handleUpdateTask(taskId, { ...task, status: "done" });
  }

  function handleSaveClient(clientId, updates) {
    if (!clientId) {
      const nextClient = {
        id: `c_${Date.now()}`,
        name: updates.name,
        company: updates.company,
        afm: updates.afm,
        phone: updates.phone,
        email: updates.email,
        contactPerson: updates.name,
        type: updates.type,
        status: updates.status,
        health: updates.status === "Kritik" ? "critical" : updates.status === "Takip Gerekiyor" ? "attention" : "healthy",
        balance: 0,
        totalRevenue: 0,
        collectionRate: 0,
        tags: [],
        address: "",
        note: updates.note,
        gender: "",
        spouseClientId: "",
        attachmentsCount: 0,
        passwordsCount: 0,
        latestDocument: "-",
        nextAction: "Profil tamamla"
      };
      setClients((current) => [nextClient, ...current]);
      setSelectedClientId(nextClient.id);
      return;
    }

    setClients((current) => current.map((client) => (
      client.id === clientId
        ? {
            ...client,
            ...updates,
            health: updates.status === "Kritik" ? "critical" : updates.status === "Takip Gerekiyor" ? "attention" : "healthy"
          }
        : client
    )));
  }

  function handleAddAttachment(clientId, payload) {
    const nextAttachment = {
      id: `a_${Date.now()}`,
      clientId,
      name: payload.name,
      type: payload.type,
      date: payload.date,
      notes: payload.notes,
      url: payload.url
    };
    setAttachments((current) => [nextAttachment, ...current]);
  }

  function handleAddPassword(clientId, payload) {
    const nextPassword = {
      id: `p_${Date.now()}`,
      clientId,
      service: payload.service,
      username: payload.username,
      password: payload.password,
      note: payload.note
    };
    setPasswords((current) => [nextPassword, ...current]);
  }

  function handleImportPayload(payload) {
    if (Array.isArray(payload.clients)) setClients(payload.clients);
    if (Array.isArray(payload.tasks)) setTasks(payload.tasks);
    if (Array.isArray(payload.invoices)) setInvoices(payload.invoices);
    if (Array.isArray(payload.attachments)) setAttachments(payload.attachments);
    if (Array.isArray(payload.passwords)) setPasswords(payload.passwords);
    setSettings((current) => ({ ...current, importedAt: new Date().toISOString() }));
  }

  function handleCreateInvoice(form) {
    const client = clients.find((item) => item.id === form.clientId);
    if (!client) return;
    const nextInvoice = {
      id: `i_${Date.now()}`,
      clientId: client.id,
      clientName: client.name,
      amount: Number(form.amount) || 0,
      status: form.status,
      type: form.type,
      date: form.date || new Date().toISOString().slice(0, 10),
      taskId: "",
      notes: form.notes
    };
    setInvoices((current) => [nextInvoice, ...current]);
    setClients((current) => current.map((item) => {
      if (item.id !== client.id) return item;
      if (nextInvoice.type === "receipt") return { ...item, balance: Math.max(0, item.balance - nextInvoice.amount) };
      return { ...item, balance: item.balance + nextInvoice.amount };
    }));
  }

  const pages = {
    dashboard: (
      <DashboardPage
        stats={stats}
        tasks={tasks}
        clients={clients}
        invoices={invoices}
        onOpenView={setActiveView}
      />
    ),
    clients: (
      <ClientsPage
        clients={clients}
        tasks={tasks}
        invoices={invoices}
        attachments={attachments}
        passwords={passwords}
        selectedClientId={selectedClientId}
        onSelectClient={setSelectedClientId}
        onSaveClient={handleSaveClient}
        onAddAttachment={handleAddAttachment}
        onAddPassword={handleAddPassword}
      />
    ),
    tasks: (
      <TasksPage
        tasks={tasks}
        clients={clients}
        taskTemplates={taskTemplates}
        onCreateTask={handleCreateTask}
        onUpdateTask={handleUpdateTask}
        onCompleteTask={handleCompleteTask}
      />
    ),
    invoices: (
      <InvoicesPage
        invoices={invoices}
        clients={clients}
        onCreateInvoice={handleCreateInvoice}
      />
    ),
    analytics: (
      <AnalyticsPage
        stats={stats}
        clients={clients}
        tasks={tasks}
        invoices={invoices}
      />
    ),
    settings: (
      <SettingsPage
        onlineMode={hasSupabaseEnv}
        settings={settings}
        onUpdateSettings={(patch) => setSettings((current) => ({ ...current, ...patch }))}
        onImportPayload={handleImportPayload}
      />
    )
  };

  return (
    <div className="app-shell">
      <Sidebar activeView={activeView} onChange={setActiveView} />
      <main className="main-shell">
        <Topbar onlineMode={hasSupabaseEnv} activeView={activeView} stats={stats} />
        {pages[activeView]}
      </main>
    </div>
  );
}
