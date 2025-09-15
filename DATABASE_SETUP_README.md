# MIVVO Veritabanı Kurulum Rehberi

Bu rehber, MIVVO projesini localinde çalıştırmak isteyen arkadaşlarınız için hazırlanmıştır.

## 🚀 Hızlı Kurulum

### Windows Kullanıcıları için:
```bash
# 1. Batch scripti çalıştır
setup_database.bat

# 2. Prisma'yı çalıştır
npm run prisma:generate
npm run prisma:push

# 3. Uygulamayı başlat
npm run dev
```

### Linux/Mac Kullanıcıları için:
```bash
# 1. Script'i çalıştırılabilir yap
chmod +x setup_database.sh

# 2. Script'i çalıştır
./setup_database.sh

# 3. Prisma'yı çalıştır
npm run prisma:generate
npm run prisma:push

# 4. Uygulamayı başlat
npm run dev
```

## 📋 Gereksinimler

- **MySQL 8.0+** kurulu ve çalışır durumda
- **Node.js 18+** kurulu
- **npm** veya **yarn** kurulu

## 🔧 Manuel Kurulum

Eğer scriptler çalışmazsa, manuel olarak şu adımları takip edin:

### 1. MySQL'e Bağlan
```bash
mysql -u root -p
```

### 2. Veritabanını Sil ve Yeniden Oluştur
```sql
DROP DATABASE IF EXISTS mivvo;
CREATE DATABASE mivvo CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE mivvo;
```

### 3. SQL Script'ini Çalıştır
```bash
mysql -u root -p mivvo < database/full_setup.sql
```

### 4. Prisma'yı Çalıştır
```bash
npm run prisma:generate
npm run prisma:push
```

### 5. Uygulamayı Başlat
```bash
npm run dev
```

## 📁 Dosya Açıklamaları

- **`database/full_setup.sql`**: Tam veritabanı kurulum scripti
- **`setup_database.sh`**: Linux/Mac için otomatik kurulum scripti
- **`setup_database.bat`**: Windows için otomatik kurulum scripti

## 🗃️ Veritabanı Yapısı

Script aşağıdaki tabloları oluşturur:

- **User**: Kullanıcı bilgileri
- **Account**: NextAuth hesap bilgileri
- **Session**: NextAuth oturum bilgileri
- **Payment**: Ödeme bilgileri
- **Report**: Rapor verileri
- **ReportAccess**: Rapor erişim hakları

## 🔍 Sorun Giderme

### MySQL Bağlantı Hatası
- MySQL servisinin çalıştığından emin olun
- Kullanıcı adı ve şifrenizi kontrol edin
- Port numarasının doğru olduğundan emin olun

### Prisma Hatası
- `npm install` komutunu çalıştırın
- `.env` dosyasında `DATABASE_URL` değişkenini kontrol edin

### Veritabanı Zaten Var Hatası
- Script otomatik olarak mevcut veritabanını siler
- Manuel olarak `DROP DATABASE mivvo;` komutunu çalıştırabilirsiniz

## 📞 Destek

Herhangi bir sorun yaşarsanız:
1. Bu README'yi tekrar okuyun
2. MySQL ve Node.js versiyonlarınızı kontrol edin
3. Hata mesajlarını dikkatlice inceleyin

## ✅ Başarılı Kurulum Kontrolü

Kurulum başarılı olduğunda:
- `http://localhost:3000` adresinde uygulama açılmalı
- Veritabanında test kullanıcısı (`test@mivvo.com`) oluşturulmuş olmalı
- Tüm tablolar ve indexler oluşturulmuş olmalı

---

**Not**: Bu script sadece development ortamı için hazırlanmıştır. Production ortamında kullanmayın!
