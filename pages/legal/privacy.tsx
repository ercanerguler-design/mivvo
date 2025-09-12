import Navbar from "../../components/Navbar";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <main>
      <Navbar />
      
      <div className="legal-page">
        <div className="container">
          <div className="legal-header">
            <h1>Gizlilik Politikası</h1>
            <div className="breadcrumb">
              <Link href="/">Ana Sayfa</Link>
              <span>/</span>
              <span>Gizlilik Politikası</span>
            </div>
            <p className="last-updated">Son güncellenme: 15 Ocak 2025</p>
          </div>

          <div className="legal-content">
            <div className="legal-nav">
              <ul>
                <li><a href="#overview">1. Genel Bakış</a></li>
                <li><a href="#data-collection">2. Veri Toplama</a></li>
                <li><a href="#data-usage">3. Veri Kullanımı</a></li>
                <li><a href="#data-sharing">4. Veri Paylaşımı</a></li>
                <li><a href="#data-security">5. Veri Güvenliği</a></li>
                <li><a href="#user-rights">6. Kullanıcı Hakları</a></li>
                <li><a href="#cookies">7. Çerezler</a></li>
                <li><a href="#international">8. Uluslararası Transfer</a></li>
                <li><a href="#updates">9. Politika Güncellemeleri</a></li>
                <li><a href="#contact">10. İletişim</a></li>
              </ul>
            </div>

            <div className="legal-text">
              <section id="overview">
                <h2>1. Genel Bakış</h2>
                <p>
                  Mivvo AI olarak, kullanıcılarımızın gizliliğini korumak bizim için en önemli önceliktir. 
                  Bu gizlilik politikası, kişisel verilerinizi nasıl topladığımızı, kullandığımızı ve koruduğumuzu açıklar.
                </p>
                <div className="highlight-box">
                  <h3>🔒 Gizlilik Taahhüdümüz</h3>
                  <ul>
                    <li>Verilerinizi asla üçüncü taraflarla paylaşmayız</li>
                    <li>Tüm veriler şifreli olarak saklanır</li>
                    <li>KVKK ve GDPR uyumlu çalışırız</li>
                    <li>Verilerinizi dilediğiniz zaman silebilirsiniz</li>
                  </ul>
                </div>
              </section>

              <section id="data-collection">
                <h2>2. Veri Toplama</h2>
                <p>
                  Hizmetlerimizi sunabilmek için aşağıdaki verileri topluyoruz:
                </p>
                
                <h3>Hesap Bilgileri</h3>
                <ul>
                  <li><strong>Kimlik Bilgileri:</strong> Ad, soyad, email adresi</li>
                  <li><strong>Profil Bilgileri:</strong> Profil fotoğrafı (isteğe bağlı)</li>
                  <li><strong>İletişim Bilgileri:</strong> Telefon numarası (isteğe bağlı)</li>
                  <li><strong>Hesap Tercihleri:</strong> Dil, bildirim ayarları</li>
                </ul>

                <h3>Analiz Verileri</h3>
                <ul>
                  <li><strong>VIN Numaraları:</strong> Araç kimlik numaraları</li>
                  <li><strong>Araç Fotoğrafları:</strong> Boya analizi için yüklenen görseller</li>
                  <li><strong>Ses Kayıtları:</strong> Motor sesi analizi için ses dosyaları</li>
                  <li><strong>Analiz Sonuçları:</strong> Oluşturulan raporlar ve değerlendirmeler</li>
                </ul>

                <h3>Teknik Veriler</h3>
                <ul>
                  <li><strong>Kullanım Verileri:</strong> Sayfa görüntülemeleri, tıklamalar</li>
                  <li><strong>Cihaz Bilgileri:</strong> IP adresi, tarayıcı bilgileri</li>
                  <li><strong>Log Verileri:</strong> Hata kayıtları, performans verileri</li>
                  <li><strong>Çerez Verileri:</strong> Oturum ve tercih bilgileri</li>
                </ul>

                <h3>Ödeme Bilgileri</h3>
                <ul>
                  <li><strong>Fatura Bilgileri:</strong> Ad, adres, vergi bilgileri</li>
                  <li><strong>Ödeme Geçmişi:</strong> İşlem tarihleri ve tutarlar</li>
                  <li><strong>Kredi Kartı Bilgileri:</strong> Güvenli ödeme sağlayıcıları tarafından işlenir</li>
                </ul>
              </section>

              <section id="data-usage">
                <h2>3. Veri Kullanımı</h2>
                <p>
                  Topladığımız verileri aşağıdaki amaçlarla kullanırız:
                </p>
                
                <h3>Hizmet Sağlama</h3>
                <ul>
                  <li>AI analizlerini gerçekleştirmek</li>
                  <li>Raporları oluşturmak ve sunmak</li>
                  <li>Hesap yönetimi ve kimlik doğrulama</li>
                  <li>Müşteri desteği sağlamak</li>
                </ul>

                <h3>Hizmet İyileştirme</h3>
                <ul>
                  <li>AI modellerimizi geliştirmek</li>
                  <li>Platform performansını optimize etmek</li>
                  <li>Yeni özellikler geliştirmek</li>
                  <li>Hataları tespit etmek ve düzeltmek</li>
                </ul>

                <h3>İletişim</h3>
                <ul>
                  <li>Analiz sonuçlarını bildirimek</li>
                  <li>Önemli güncellemeler hakkında bilgi vermek</li>
                  <li>Müşteri desteği sağlamak</li>
                  <li>Pazarlama iletişimi (onay verilen durumlarda)</li>
                </ul>

                <h3>Yasal Yükümlülükler</h3>
                <ul>
                  <li>Vergi ve muhasebe kayıtları</li>
                  <li>Yasal düzenlemelere uyum</li>
                  <li>Güvenlik ve dolandırıcılık önleme</li>
                  <li>Mahkeme kararları ve resmi talepler</li>
                </ul>
              </section>

              <section id="data-sharing">
                <h2>4. Veri Paylaşımı</h2>
                <p>
                  Kişisel verilerinizi aşağıdaki sınırlı durumlar dışında üçüncü taraflarla paylaşmayız:
                </p>
                
                <h3>Hizmet Sağlayıcıları</h3>
                <div className="service-providers">
                  <div className="provider-card">
                    <h4>💳 Ödeme Sağlayıcıları</h4>
                    <p>Stripe, PayTR - Güvenli ödeme işlemleri için</p>
                  </div>
                  <div className="provider-card">
                    <h4>☁️ Bulut Hizmetleri</h4>
                    <p>AWS, Google Cloud - Veri saklama ve işleme</p>
                  </div>
                  <div className="provider-card">
                    <h4>📧 Email Hizmetleri</h4>
                    <p>SendGrid, Mailgun - Bildirim emailları</p>
                  </div>
                  <div className="provider-card">
                    <h4>📊 Analitik Hizmetleri</h4>
                    <p>Google Analytics - Anonim kullanım istatistikleri</p>
                  </div>
                </div>

                <h3>Yasal Gereklilikler</h3>
                <ul>
                  <li>Mahkeme kararları ve celpler</li>
                  <li>Kolluk kuvvetleri talepleri</li>
                  <li>Vergi dairesi ve resmi kurumlar</li>
                  <li>Yasal düzenlemelere uyum zorunlulukları</li>
                </ul>

                <h3>İş Transferleri</h3>
                <ul>
                  <li>Şirket birleşme veya satın alma durumlarında</li>
                  <li>İş varlıklarının devri halinde</li>
                  <li>Tüm veriler aynı koruma seviyesinde korunur</li>
                </ul>
              </section>

              <section id="data-security">
                <h2>5. Veri Güvenliği</h2>
                <p>
                  Verilerinizin güvenliği için endüstri standardında önlemler alıyoruz:
                </p>
                
                <h3>Teknik Güvenlik</h3>
                <ul>
                  <li><strong>Şifreleme:</strong> TLS 1.3 ile veri aktarımı, AES-256 ile veri saklama</li>
                  <li><strong>Erişim Kontrolü:</strong> İki faktörlü kimlik doğrulama ve rol tabanlı yetkilendirme</li>
                  <li><strong>Güvenlik Duvarı:</strong> DDoS koruması ve saldırı tespit sistemleri</li>
                  <li><strong>Yedekleme:</strong> Düzenli otomatik yedekleme ve felaket kurtarma planları</li>
                </ul>

                <h3>Operasyonel Güvenlik</h3>
                <ul>
                  <li><strong>Personel Eğitimi:</strong> Gizlilik ve güvenlik konularında düzenli eğitim</li>
                  <li><strong>Erişim Denetimi:</strong> Minimum yetki prensibi ve düzenli denetim</li>
                  <li><strong>Güvenlik Testleri:</strong> Penetrasyon testleri ve güvenlik açığı taramaları</li>
                  <li><strong>İzleme:</strong> 7/24 güvenlik izleme ve olay müdahale</li>
                </ul>

                <h3>Uyumluluk</h3>
                <ul>
                  <li><strong>KVKK:</strong> Türkiye Kişisel Verilerin Korunması Kanunu</li>
                  <li><strong>GDPR:</strong> Avrupa Genel Veri Koruma Yönetmeliği</li>
                  <li><strong>ISO 27001:</strong> Bilgi güvenliği yönetim sistemi</li>
                  <li><strong>SOC 2:</strong> Güvenlik, kullanılabilirlik ve gizlilik denetimleri</li>
                </ul>
              </section>

              <section id="user-rights">
                <h2>6. Kullanıcı Hakları</h2>
                <p>
                  KVKK ve GDPR kapsamında aşağıdaki haklarınız bulunmaktadır:
                </p>
                
                <div className="rights-grid">
                  <div className="right-card">
                    <h4>📖 Bilgi Alma Hakkı</h4>
                    <p>Hangi verilerinizin işlendiğini öğrenme</p>
                  </div>
                  <div className="right-card">
                    <h4>🔍 Erişim Hakkı</h4>
                    <p>Verilerinizin kopyasını alma</p>
                  </div>
                  <div className="right-card">
                    <h4>✏️ Düzeltme Hakkı</h4>
                    <p>Yanlış verileri düzeltme</p>
                  </div>
                  <div className="right-card">
                    <h4>🗑️ Silme Hakkı</h4>
                    <p>Verilerinizi silme ("Unutulma Hakkı")</p>
                  </div>
                  <div className="right-card">
                    <h4>⏸️ Sınırlama Hakkı</h4>
                    <p>Veri işlemeyi sınırlama</p>
                  </div>
                  <div className="right-card">
                    <h4>📤 Taşınabilirlik Hakkı</h4>
                    <p>Verilerinizi başka hizmete transfer</p>
                  </div>
                </div>

                <h3>Hak Kullanım Süreci</h3>
                <ol className="process-list">
                  <li>
                    <strong>Talep Oluşturma:</strong>
                    privacy@mivvo.ai adresine email gönderin
                  </li>
                  <li>
                    <strong>Kimlik Doğrulama:</strong>
                    Talebinizi işleme almak için kimliğinizi doğrulayın
                  </li>
                  <li>
                    <strong>İşleme:</strong>
                    Talebiniz en geç 30 gün içinde yanıtlanır
                  </li>
                  <li>
                    <strong>Sonuçlandırma:</strong>
                    Talep edilen işlem gerçekleştirilir ve size bilgi verilir
                  </li>
                </ol>
              </section>

              <section id="cookies">
                <h2>7. Çerezler (Cookies)</h2>
                <p>
                  Web sitemiz deneyiminizi iyileştirmek için çerezler kullanır:
                </p>
                
                <h3>Çerez Türleri</h3>
                <div className="cookie-types">
                  <div className="cookie-card essential">
                    <h4>🔒 Zorunlu Çerezler</h4>
                    <p>Sitenin temel işlevleri için gerekli</p>
                    <span className="cookie-status">Devre dışı bırakılamaz</span>
                  </div>
                  <div className="cookie-card functional">
                    <h4>⚙️ İşlevsel Çerezler</h4>
                    <p>Tercihlerinizi hatırlama</p>
                    <span className="cookie-status">İsteğe bağlı</span>
                  </div>
                  <div className="cookie-card analytics">
                    <h4>📊 Analitik Çerezler</h4>
                    <p>Kullanım istatistikleri toplama</p>
                    <span className="cookie-status">İsteğe bağlı</span>
                  </div>
                  <div className="cookie-card marketing">
                    <h4>🎯 Pazarlama Çerezleri</h4>
                    <p>Kişiselleştirilmiş reklamlar</p>
                    <span className="cookie-status">İsteğe bağlı</span>
                  </div>
                </div>

                <h3>Çerez Yönetimi</h3>
                <ul>
                  <li>Tarayıcı ayarlarından çerezleri yönetebilirsiniz</li>
                  <li>Çerez tercihlerinizi site üzerinden güncelleyebilirsiniz</li>
                  <li>Çerezleri silmek bazı özelliklerin çalışmamasına neden olabilir</li>
                </ul>
              </section>

              <section id="international">
                <h2>8. Uluslararası Veri Transferi</h2>
                <p>
                  Verileriniz aşağıdaki durumlarda uluslararası düzeyde transfer edilebilir:
                </p>
                
                <h3>Transfer Durumları</h3>
                <ul>
                  <li>Bulut hizmetleri sağlayıcıları (AWS, Google Cloud)</li>
                  <li>Global CDN ağları (Cloudflare)</li>
                  <li>Uluslararası ödeme sağlayıcıları (Stripe)</li>
                  <li>Email ve analitik hizmetleri</li>
                </ul>

                <h3>Koruma Önlemleri</h3>
                <ul>
                  <li><strong>Adequacy Decisions:</strong> AB Komisyonu tarafından uygun bulunan ülkeler</li>
                  <li><strong>Standard Contractual Clauses:</strong> Avrupa Komisyonu standart sözleşme maddeleri</li>
                  <li><strong>Privacy Shield:</strong> ABD şirketleri için gizlilik kalkanı programı</li>
                  <li><strong>Binding Corporate Rules:</strong> Kurumsal bağlayıcı kurallar</li>
                </ul>
              </section>

              <section id="updates">
                <h2>9. Politika Güncellemeleri</h2>
                <p>
                  Bu gizlilik politikası gerektiğinde güncellenir:
                </p>
                
                <h3>Güncelleme Süreci</h3>
                <ul>
                  <li><strong>Bildirim:</strong> Önemli değişiklikler email ile bildirilir</li>
                  <li><strong>Yayınlama:</strong> Güncel politika web sitemizde yayınlanır</li>
                  <li><strong>Yürürlük:</strong> Yeni politika belirtilen tarihte yürürlüğe girer</li>
                  <li><strong>İtiraz:</strong> Değişikliklere itiraz etme hakkınız vardır</li>
                </ul>

                <h3>Versiyon Geçmişi</h3>
                <div className="version-history">
                  <div className="version-item">
                    <div className="version-date">15 Ocak 2025</div>
                    <div className="version-changes">v2.0 - KVKK uyumlu tam revizyon</div>
                  </div>
                  <div className="version-item">
                    <div className="version-date">01 Ekim 2024</div>
                    <div className="version-changes">v1.1 - Çerez politikası güncellendi</div>
                  </div>
                  <div className="version-item">
                    <div className="version-date">15 Temmuz 2024</div>
                    <div className="version-changes">v1.0 - İlk yayın</div>
                  </div>
                </div>
              </section>

              <section id="contact">
                <h2>10. İletişim</h2>
                <p>
                  Gizlilik konularında bizimle iletişime geçin:
                </p>
                <div className="contact-info">
                  <div>
                    <strong>🔐 Veri Koruma Sorumlusu:</strong>
                    <span>privacy@mivvo.ai</span>
                  </div>
                  <div>
                    <strong>📞 Telefon:</strong>
                    <span>+90 (212) 123 45 67</span>
                  </div>
                  <div>
                    <strong>📧 Genel İletişim:</strong>
                    <span>info@mivvo.ai</span>
                  </div>
                  <div>
                    <strong>📍 Adres:</strong>
                    <span>İstanbul, Türkiye</span>
                  </div>
                </div>

                <div className="data-controller-info">
                  <h3>Veri Sorumlusu Bilgileri</h3>
                  <p>
                    <strong>Mivvo AI Teknoloji A.Ş.</strong><br/>
                    Veri Sorumlusu sıfatıyla faaliyet göstermektedir.<br/>
                    KVKK Kanunu kapsamında kayıtlı veri sorumlusudur.
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .legal-page {
          min-height: 100vh;
          background: #f8fafc;
          padding: 40px 0;
        }
        
        .legal-header {
          text-align: center;
          margin-bottom: 48px;
        }
        
        .legal-header h1 {
          font-size: 48px;
          font-weight: 900;
          color: var(--ink);
          margin-bottom: 16px;
        }
        
        .breadcrumb {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-bottom: 16px;
          color: var(--muted);
        }
        
        .breadcrumb a {
          color: var(--primary);
          text-decoration: none;
        }
        
        .breadcrumb a:hover {
          text-decoration: underline;
        }
        
        .last-updated {
          color: var(--muted);
          font-size: 14px;
        }
        
        .legal-content {
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 48px;
          align-items: start;
        }
        
        .legal-nav {
          background: white;
          padding: 32px;
          border-radius: 20px;
          box-shadow: var(--shadow-sm);
          position: sticky;
          top: 100px;
        }
        
        .legal-nav ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .legal-nav li {
          margin-bottom: 12px;
        }
        
        .legal-nav a {
          display: block;
          padding: 8px 12px;
          border-radius: 8px;
          color: var(--muted);
          text-decoration: none;
          transition: all 0.2s ease;
          font-size: 14px;
          line-height: 1.4;
        }
        
        .legal-nav a:hover {
          background: #f1f5f9;
          color: var(--primary);
        }
        
        .legal-text {
          background: white;
          padding: 48px;
          border-radius: 20px;
          box-shadow: var(--shadow-sm);
          line-height: 1.7;
        }
        
        .legal-text section {
          margin-bottom: 48px;
        }
        
        .legal-text section:last-child {
          margin-bottom: 0;
        }
        
        .legal-text h2 {
          font-size: 28px;
          font-weight: 800;
          color: var(--ink);
          margin-bottom: 24px;
          padding-bottom: 12px;
          border-bottom: 2px solid var(--ring);
        }
        
        .legal-text h3 {
          font-size: 20px;
          font-weight: 700;
          color: var(--ink);
          margin: 32px 0 16px 0;
        }
        
        .legal-text h4 {
          font-size: 16px;
          font-weight: 600;
          color: var(--ink);
          margin: 20px 0 8px 0;
        }
        
        .legal-text p {
          color: var(--slate-700);
          margin-bottom: 16px;
          font-size: 16px;
        }
        
        .legal-text ul {
          margin: 16px 0 24px 0;
          padding-left: 0;
        }
        
        .legal-text li {
          list-style: none;
          position: relative;
          padding: 8px 0 8px 32px;
          color: var(--slate-700);
        }
        
        .legal-text li:before {
          content: "✓";
          position: absolute;
          left: 0;
          top: 8px;
          color: var(--primary);
          font-weight: bold;
          width: 20px;
          height: 20px;
          background: #f0f9ff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
        }
        
        .legal-text strong {
          color: var(--ink);
          font-weight: 600;
        }
        
        .highlight-box {
          background: #f0f9ff;
          border: 2px solid var(--primary);
          border-radius: 16px;
          padding: 24px;
          margin: 24px 0;
        }
        
        .highlight-box h3 {
          color: var(--primary);
          margin-top: 0;
          margin-bottom: 16px;
        }
        
        .service-providers {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          margin: 20px 0;
        }
        
        .provider-card {
          background: #f8fafc;
          padding: 20px;
          border-radius: 12px;
          border: 1px solid var(--ring);
        }
        
        .provider-card h4 {
          margin-top: 0;
          margin-bottom: 8px;
          color: var(--ink);
        }
        
        .provider-card p {
          margin-bottom: 0;
          font-size: 14px;
          color: var(--muted);
        }
        
        .rights-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          margin: 20px 0;
        }
        
        .right-card {
          background: #f8fafc;
          padding: 20px;
          border-radius: 12px;
          border: 1px solid var(--ring);
          text-align: center;
        }
        
        .right-card h4 {
          margin-top: 0;
          margin-bottom: 8px;
          color: var(--primary);
        }
        
        .right-card p {
          margin-bottom: 0;
          font-size: 14px;
          color: var(--muted);
        }
        
        .process-list {
          counter-reset: step-counter;
          list-style: none;
          padding: 0;
        }
        
        .process-list li {
          counter-increment: step-counter;
          background: #f8fafc;
          padding: 20px;
          border-radius: 12px;
          margin-bottom: 16px;
          border-left: 4px solid var(--primary);
        }
        
        .process-list li:before {
          content: counter(step-counter);
          background: var(--primary);
          color: white;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: bold;
          margin-right: 12px;
          position: static;
          left: auto;
          top: auto;
        }
        
        .cookie-types {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          margin: 20px 0;
        }
        
        .cookie-card {
          background: #f8fafc;
          padding: 20px;
          border-radius: 12px;
          border: 2px solid var(--ring);
          position: relative;
        }
        
        .cookie-card.essential {
          border-color: #ef4444;
        }
        
        .cookie-card.functional {
          border-color: #3b82f6;
        }
        
        .cookie-card.analytics {
          border-color: #10b981;
        }
        
        .cookie-card.marketing {
          border-color: #8b5cf6;
        }
        
        .cookie-card h4 {
          margin-top: 0;
          margin-bottom: 8px;
        }
        
        .cookie-card p {
          margin-bottom: 8px;
          font-size: 14px;
          color: var(--muted);
        }
        
        .cookie-status {
          display: inline-block;
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          background: var(--primary);
          color: white;
        }
        
        .version-history {
          background: #f8fafc;
          border-radius: 12px;
          padding: 24px;
          margin: 20px 0;
        }
        
        .version-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
          border-bottom: 1px solid var(--ring);
        }
        
        .version-item:last-child {
          border-bottom: none;
        }
        
        .version-date {
          font-weight: 600;
          color: var(--primary);
          min-width: 120px;
        }
        
        .version-changes {
          color: var(--slate-700);
        }
        
        .contact-info {
          background: #f8fafc;
          padding: 24px;
          border-radius: 12px;
          margin-top: 24px;
        }
        
        .contact-info > div {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 0;
          border-bottom: 1px solid var(--ring);
        }
        
        .contact-info > div:last-child {
          border-bottom: none;
        }
        
        .contact-info strong {
          color: var(--ink);
          min-width: 180px;
        }
        
        .contact-info span {
          color: var(--primary);
          font-weight: 500;
        }
        
        .data-controller-info {
          background: #f0f9ff;
          border: 2px solid var(--primary);
          border-radius: 12px;
          padding: 24px;
          margin-top: 32px;
        }
        
        .data-controller-info h3 {
          color: var(--primary);
          margin-top: 0;
        }
        
        .data-controller-info p {
          margin-bottom: 0;
        }
        
        @media (max-width: 1024px) {
          .legal-content {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          
          .legal-nav {
            position: static;
            order: 2;
          }
          
          .legal-nav ul {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 8px;
          }
          
          .service-providers,
          .rights-grid,
          .cookie-types {
            grid-template-columns: 1fr;
          }
        }
        
        @media (max-width: 768px) {
          .legal-header h1 {
            font-size: 36px;
          }
          
          .legal-text {
            padding: 32px 24px;
          }
          
          .legal-text h2 {
            font-size: 24px;
          }
          
          .breadcrumb {
            flex-wrap: wrap;
          }
          
          .legal-nav ul {
            grid-template-columns: 1fr;
          }
          
          .version-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 4px;
          }
        }
        
        @media (max-width: 480px) {
          .legal-header h1 {
            font-size: 28px;
          }
          
          .legal-text {
            padding: 24px 20px;
          }
          
          .legal-text h2 {
            font-size: 20px;
          }
          
          .legal-text h3 {
            font-size: 18px;
          }
        }
      `}</style>
    </main>
  );
}
