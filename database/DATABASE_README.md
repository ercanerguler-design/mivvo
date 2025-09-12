# Database Setup - MySQL

Bu dosyalar projenizi SQLite'tan MySQL'e geçirmeniz için hazırlanmıştır.

## Değişiklikler

### 1. Prisma Schema Güncellemeleri
- `prisma/schema.prisma` dosyasında datasource provider'ı `mysql` olarak değiştirildi
- MySQL için uygun veri tipleri eklendi:
  - `@db.Text` OAuth token'ları için
  - `@db.LongText` JSON verileri için

### 2. Package.json Güncellemeleri
- `mysql2` paketi eklendi (Prisma'nın MySQL ile çalışması için gerekli)

### 3. Çevre Değişkenleri
- `.env.example` dosyasında MySQL bağlantı string'i formatı güncellendi

## Kurulum Adımları

### 1. MySQL Sunucusu Kurulumu
```bash
# Windows için (MySQL Installer kullanarak)
# https://dev.mysql.com/downloads/installer/ adresinden indirin

# veya Docker kullanarak
docker run --name mysql-mivvo -e MYSQL_ROOT_PASSWORD=yourpassword -e MYSQL_DATABASE=mivvo -p 3306:3306 -d mysql:8.0
```

### 2. Veritabanı Oluşturma
```sql
-- MySQL'e root kullanıcısı ile bağlanın
mysql -u root -p

-- Veritabanını oluşturun
CREATE DATABASE mivvo CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Kullanıcı oluşturun (opsiyonel)
CREATE USER 'mivvo_user'@'localhost' IDENTIFIED BY 'strong_password';
GRANT ALL PRIVILEGES ON mivvo.* TO 'mivvo_user'@'localhost';
FLUSH PRIVILEGES;
```

### 3. Çevre Değişkenlerini Ayarlayın
`.env` dosyanızı oluşturun ve aşağıdaki gibi düzenleyin:

```bash
# MySQL bağlantı string'i
DATABASE_URL="mysql://username:password@localhost:3306/mivvo"

# Örnek:
# DATABASE_URL="mysql://root:yourpassword@localhost:3306/mivvo"
# veya
# DATABASE_URL="mysql://mivvo_user:strong_password@localhost:3306/mivvo"
```

### 4. Tabloları Oluşturun

#### Seçenek A: SQL Script ile (Manuel)
```bash
# MySQL'e bağlanın ve script'i çalıştırın
mysql -u username -p mivvo < database/mysql_setup.sql
```

#### Seçenek B: Prisma ile (Önerilen)
```bash
# Bağımlılıkları yükleyin
npm install

# Prisma client'ı oluşturun
npx prisma generate

# Veritabanı şemasını uygulayın
npx prisma db push

# veya migration kullanın
npx prisma migrate dev --name init
```

### 5. Veri Transferi (SQLite'tan geçiyorsanız)
Eğer mevcut SQLite veritabanınızda veri varsa:

```bash
# Mevcut verileri export edin
npx prisma studio # veya başka bir tool kullanın

# Yeni MySQL veritabanına import edin
# Bu işlem manuel olarak yapılmalıdır
```

## Test Etme

Kurulum sonrası test etmek için:

```bash
# Development server'ı başlatın
npm run dev

# Prisma Studio ile veritabanını kontrol edin
npx prisma studio
```

## Troubleshooting

### Bağlantı Sorunları
- MySQL sunucusunun çalıştığından emin olun
- Bağlantı string'inin doğru olduğunu kontrol edin
- Firewall ayarlarını kontrol edin

### Karakter Seti Sorunları
- MySQL'in `utf8mb4` karakter setini kullandığından emin olun
- Türkçe karakterler için `utf8mb4_unicode_ci` collation önemlidir

### Performance
- Büyük veri setleri için `mysql_setup.sql` dosyasındaki indexleri kullanın
- Connection pooling için Prisma ayarlarını optimizleyin

## Dosya Yapısı

```
database/
├── mysql_setup.sql          # Manuel MySQL kurulum scripti
└── DATABASE_README.md       # Bu dosya

prisma/
├── schema.prisma           # Güncellenmiş Prisma şeması
└── migrations/             # Prisma migration dosyaları (oluşturulacak)
```
