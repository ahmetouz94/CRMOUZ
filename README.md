# CRM Cloud App

Bu proje mevcut `index.HTML` dosyasına dokunmadan, PC ve telefondan ortak kullanılabilecek yeni nesil bir CRM iskeleti olarak kuruldu.

## Kurulum

```bash
npm install
npm run dev
```

`.env.example` dosyasını `.env` olarak kopyalayıp Supabase bilgilerini girin.

## Moduller

- Dashboard
- Musteriler
- Gorevler
- Faturalar
- Ayarlar

## Not

Supabase baglantisi yoksa uygulama mock veri ile acilir. Gercek veri modeli icin `supabase/schema.sql` dosyasini kullanin.
