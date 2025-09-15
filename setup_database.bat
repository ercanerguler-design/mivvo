@echo off
REM MIVVO Database Setup Script for Windows
REM Bu script arkadaşınızın Windows localinde veritabanını sıfırlayıp yeniden oluşturur

echo 🚀 MIVVO Veritabanı Kurulum Scripti Başlatılıyor...
echo.

REM MySQL bağlantı bilgileri
set /p MYSQL_USER="MySQL kullanıcı adınızı girin: "
set /p MYSQL_PASSWORD="MySQL şifrenizi girin: "

REM MySQL sunucusu bilgileri
set /p MYSQL_HOST="MySQL sunucu adresi (varsayılan: localhost): "
if "%MYSQL_HOST%"=="" set MYSQL_HOST=localhost

set /p MYSQL_PORT="MySQL port (varsayılan: 3306): "
if "%MYSQL_PORT%"=="" set MYSQL_PORT=3306

echo.
echo 📋 Kurulum bilgileri:
echo    Sunucu: %MYSQL_HOST%:%MYSQL_PORT%
echo    Kullanıcı: %MYSQL_USER%
echo    Veritabanı: mivvo
echo.

set /p CONFIRM="Devam etmek istiyor musunuz? (y/n): "
if /i not "%CONFIRM%"=="y" (
    echo ❌ Kurulum iptal edildi.
    pause
    exit /b 1
)

echo.
echo 🗑️  Mevcut veritabanı siliniyor...
mysql -h %MYSQL_HOST% -P %MYSQL_PORT% -u %MYSQL_USER% -p%MYSQL_PASSWORD% -e "DROP DATABASE IF EXISTS mivvo;"

if %errorlevel% neq 0 (
    echo ❌ MySQL bağlantısında hata oluştu!
    echo MySQL servisinin çalıştığından ve bilgilerin doğru olduğundan emin olun.
    pause
    exit /b 1
)

echo 📦 Yeni veritabanı oluşturuluyor...
mysql -h %MYSQL_HOST% -P %MYSQL_PORT% -u %MYSQL_USER% -p%MYSQL_PASSWORD% < database\full_setup.sql

if %errorlevel% equ 0 (
    echo.
    echo ✅ Veritabanı başarıyla oluşturuldu!
    echo.
    echo 🔧 Şimdi Prisma'yı çalıştırın:
    echo    npm run prisma:generate
    echo    npm run prisma:push
    echo.
    echo 🚀 Uygulamayı başlatın:
    echo    npm run dev
) else (
    echo.
    echo ❌ Veritabanı oluşturulurken hata oluştu!
    echo MySQL bağlantı bilgilerinizi kontrol edin.
)

echo.
pause
