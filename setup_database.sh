#!/bin/bash
# MIVVO Database Setup Script
# Bu script arkadaşınızın localinde veritabanını sıfırlayıp yeniden oluşturur

echo "🚀 MIVVO Veritabanı Kurulum Scripti Başlatılıyor..."

# MySQL bağlantı bilgileri (arkadaşınız kendi bilgilerini girmeli)
read -p "MySQL kullanıcı adınızı girin: " MYSQL_USER
read -s -p "MySQL şifrenizi girin: " MYSQL_PASSWORD
echo ""

# MySQL sunucusu bilgileri
read -p "MySQL sunucu adresi (varsayılan: localhost): " MYSQL_HOST
MYSQL_HOST=${MYSQL_HOST:-localhost}

read -p "MySQL port (varsayılan: 3306): " MYSQL_PORT
MYSQL_PORT=${MYSQL_PORT:-3306}

echo ""
echo "📋 Kurulum bilgileri:"
echo "   Sunucu: $MYSQL_HOST:$MYSQL_PORT"
echo "   Kullanıcı: $MYSQL_USER"
echo "   Veritabanı: mivvo"
echo ""

read -p "Devam etmek istiyor musunuz? (y/n): " CONFIRM
if [ "$CONFIRM" != "y" ] && [ "$CONFIRM" != "Y" ]; then
    echo "❌ Kurulum iptal edildi."
    exit 1
fi

echo ""
echo "🗑️  Mevcut veritabanı siliniyor..."
mysql -h "$MYSQL_HOST" -P "$MYSQL_PORT" -u "$MYSQL_USER" -p"$MYSQL_PASSWORD" -e "DROP DATABASE IF EXISTS mivvo;"

echo "📦 Yeni veritabanı oluşturuluyor..."
mysql -h "$MYSQL_HOST" -P "$MYSQL_PORT" -u "$MYSQL_USER" -p"$MYSQL_PASSWORD" < database/full_setup.sql

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Veritabanı başarıyla oluşturuldu!"
    echo ""
    echo "🔧 Şimdi Prisma'yı çalıştırın:"
    echo "   npm run prisma:generate"
    echo "   npm run prisma:push"
    echo ""
    echo "🚀 Uygulamayı başlatın:"
    echo "   npm run dev"
else
    echo ""
    echo "❌ Veritabanı oluşturulurken hata oluştu!"
    echo "MySQL bağlantı bilgilerinizi kontrol edin."
    exit 1
fi
