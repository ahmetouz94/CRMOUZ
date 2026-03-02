export const initialSettings = {
  theme: "professional",
  density: "standard",
  liveAlerts: true,
  defaultView: "dashboard",
  showAdvancedInsights: true,
  firmName: "Ouz CRM Cloud",
  firmEmail: "info@ouzcrm.app",
  firmPhone: "+30 690 000 00 99",
  nextInvoiceNo: 104,
  importedAt: ""
};

export const initialClients = [
  {
    id: "c1",
    name: "Ayse Demir",
    company: "Demir Tarim",
    afm: "123456789",
    phone: "+30 690 000 00 01",
    email: "ayse@demirtarim.gr",
    contactPerson: "Ayse Demir",
    type: "Ciftci",
    status: "Takip Gerekiyor",
    health: "attention",
    balance: 320,
    totalRevenue: 860,
    collectionRate: 74,
    tags: ["E1", "Tarim", "Esli"],
    address: "Komotini / Rodopi",
    note: "Belgeleri genelde ay ortasinda getiriyor.",
    gender: "female",
    spouseClientId: "c4",
    attachmentsCount: 6,
    passwordsCount: 2,
    latestDocument: "E1 2025",
    nextAction: "E1 donem evraklarini tamamla"
  },
  {
    id: "c2",
    name: "Mehmet Yilmaz",
    company: "Yilmaz Logistics",
    afm: "987654321",
    phone: "+30 690 000 00 02",
    email: "mehmet@yilmazlogistics.gr",
    contactPerson: "Mehmet Yilmaz",
    type: "Sirket",
    status: "Saglikli",
    health: "healthy",
    balance: 0,
    totalRevenue: 2140,
    collectionRate: 100,
    tags: ["KDV", "Lojistik"],
    address: "Thessaloniki",
    note: "Aylik KDV ve bordro isi var.",
    gender: "male",
    spouseClientId: "",
    attachmentsCount: 11,
    passwordsCount: 4,
    latestDocument: "KDV 02/2026",
    nextAction: "Aylik KDV kapanisini tamamla"
  },
  {
    id: "c3",
    name: "Elif Kaya",
    company: "Kaya Store",
    afm: "456123789",
    phone: "+30 690 000 00 03",
    email: "elif@kayastore.gr",
    contactPerson: "Elif Kaya",
    type: "E-ticaret",
    status: "Kritik",
    health: "critical",
    balance: 110,
    totalRevenue: 540,
    collectionRate: 58,
    tags: ["Tahsilat", "Eksik Bilgi"],
    address: "Alexandroupoli",
    note: "Tahsilat ve eksik evrak birlikte takip edilmeli.",
    gender: "female",
    spouseClientId: "",
    attachmentsCount: 3,
    passwordsCount: 1,
    latestDocument: "Hizmet Faturasi 01/2026",
    nextAction: "Tahsilat aramasi yap"
  },
  {
    id: "c4",
    name: "Ali Demir",
    company: "",
    afm: "123456700",
    phone: "+30 690 000 00 04",
    email: "ali.demir@outlook.com",
    contactPerson: "Ali Demir",
    type: "Sahis",
    status: "Takip Gerekiyor",
    health: "attention",
    balance: 90,
    totalRevenue: 300,
    collectionRate: 68,
    tags: ["Esli", "E1"],
    address: "Komotini / Rodopi",
    note: "Ayse Demir ile es bagli.",
    gender: "male",
    spouseClientId: "c1",
    attachmentsCount: 2,
    passwordsCount: 1,
    latestDocument: "E1 2025",
    nextAction: "Es evrak grubunda kontrol et"
  }
];

export const initialTasks = [
  {
    id: "t1",
    clientId: "c1",
    clientName: "Ayse Demir",
    clientAfm: "123456789",
    title: "E1 Evrak Takibi",
    notes: "Gelir evraklari, banka hareketleri ve es belgeleri birlikte toplanacak.",
    startDate: "2026-04-01",
    endDate: "2026-04-30",
    status: "open",
    type: "Evrak",
    priority: "Yuksek",
    recurrence: "none",
    fee: 30,
    invoiced: false,
    completedAt: "",
    linkedCount: 2
  },
  {
    id: "t2",
    clientId: "c2",
    clientName: "Mehmet Yilmaz",
    clientAfm: "987654321",
    title: "Aylik KDV Hazirligi",
    notes: "Sube faturalarini kontrol et, masraf belgelerini kapat.",
    startDate: "2026-03-05",
    endDate: "2026-03-15",
    status: "in_progress",
    type: "Evrak",
    priority: "Orta",
    recurrence: "monthly",
    fee: 75,
    invoiced: false,
    completedAt: "",
    linkedCount: 0
  },
  {
    id: "t3",
    clientId: "c3",
    clientName: "Elif Kaya",
    clientAfm: "456123789",
    title: "Tahsilat Aramasi",
    notes: "Acil bakiye tahsilat gorusmesi.",
    startDate: "2026-03-01",
    endDate: "2026-03-03",
    status: "waiting_client",
    type: "Odeme",
    priority: "Yuksek",
    recurrence: "none",
    fee: 20,
    invoiced: false,
    completedAt: "",
    linkedCount: 1
  },
  {
    id: "t4",
    clientId: "",
    clientName: "Kayitsiz Yeni Potansiyel",
    clientAfm: "000111222",
    title: "On gorusme ve belge listesi",
    notes: "Musteri henuz kayitli degil, potansiyel acilis isi.",
    startDate: "2026-03-10",
    endDate: "2026-03-18",
    status: "open",
    type: "Telefon",
    priority: "Orta",
    recurrence: "none",
    fee: 0,
    invoiced: false,
    completedAt: "",
    linkedCount: 0
  },
  {
    id: "t5",
    clientId: "c4",
    clientName: "Ali Demir",
    clientAfm: "123456700",
    title: "E1 Es Evrak Kontrolu",
    notes: "Ayse + Ali es grubu tek paket kapanacak.",
    startDate: "2026-04-01",
    endDate: "2026-04-30",
    status: "done",
    type: "Evrak",
    priority: "Orta",
    recurrence: "none",
    fee: 25,
    invoiced: true,
    completedAt: "2026-03-01T14:20:00",
    linkedCount: 1
  }
];

export const initialInvoices = [
  {
    id: "i1",
    clientId: "c4",
    clientName: "Ali Demir",
    amount: 25,
    status: "unpaid",
    type: "service",
    date: "2026-03-01",
    taskId: "t5",
    notes: "Gorev tamamlaninca otomatik olustu."
  },
  {
    id: "i2",
    clientId: "c2",
    clientName: "Mehmet Yilmaz",
    amount: 240,
    status: "paid",
    type: "invoice",
    date: "2026-02-26",
    taskId: "",
    notes: "Aylik hizmet paketi."
  },
  {
    id: "i3",
    clientId: "c1",
    clientName: "Ayse Demir",
    amount: 90,
    status: "paid",
    type: "receipt",
    date: "2026-02-18",
    taskId: "",
    notes: "Tahsilat makbuzu."
  }
];

export const taskTemplates = [
  {
    id: "tpl-e1",
    name: "E1 Evrak Takibi",
    type: "Evrak",
    priority: "Yuksek",
    recurrence: "none",
    fee: 30,
    notes: "Gelir, masraf, banka ve es belgelerini topla."
  },
  {
    id: "tpl-kdv",
    name: "Aylik KDV Kontrolu",
    type: "Evrak",
    priority: "Yuksek",
    recurrence: "monthly",
    fee: 75,
    notes: "Aylik KDV belgelerini topla, kontrol et ve beyan hazirla."
  },
  {
    id: "tpl-tahsilat",
    name: "Tahsilat Hatirlatma",
    type: "Odeme",
    priority: "Yuksek",
    recurrence: "none",
    fee: 20,
    notes: "Bakiye icin arama ve odeme plani olustur."
  }
];

export const initialAttachments = [
  {
    id: "a1",
    clientId: "c1",
    name: "E1 2025 Dosyasi",
    type: "E1",
    date: "2026-02-12",
    notes: "Es gelir belgeleriyle birlikte.",
    url: "cloud://attachments/e1-2025"
  },
  {
    id: "a2",
    clientId: "c2",
    name: "KDV 02-2026",
    type: "KDV",
    date: "2026-02-28",
    notes: "Sube faturalarini icerir.",
    url: "cloud://attachments/kdv-022026"
  }
];

export const initialPasswords = [
  {
    id: "p1",
    clientId: "c1",
    service: "TAXIS",
    username: "aysedemir123",
    password: "demo-pass-123",
    note: "Ana e-devlet hesabi"
  },
  {
    id: "p2",
    clientId: "c2",
    service: "Gov.gr",
    username: "mehmety",
    password: "demo-pass-456",
    note: "Lojistik belge yukleme"
  }
];
