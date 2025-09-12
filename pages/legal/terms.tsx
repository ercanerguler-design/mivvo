import Navbar from "../../components/Navbar";
import Link from "next/link";

export default function TermsOfService() {
  return (
    <main>
      <Navbar />
      
      <div className="legal-page">
        <div className="container">
          <div className="legal-header">
            <h1>Kullanım Şartları</h1>
            <div className="breadcrumb">
              <Link href="/">Ana Sayfa</Link>
              <span>/</span>
              <span>Kullanım Şartları</span>
            </div>
            <p className="last-updated">Son güncellenme: 15 Ocak 2025</p>
          </div>

          <div className="legal-content">
            <div className="legal-nav">
              <ul>
                <li><a href="#acceptance">1. Şartların Kabulü</a></li>
                <li><a href="#services">2. Hizmet Tanımı</a></li>
                <li><a href="#user-responsibilities">3. Kullanıcı Sorumlulukları</a></li>
                <li><a href="#payments">4. Ödeme ve Faturalama</a></li>
                <li><a href="#intellectual-property">5. Fikri Mülkiyet</a></li>
                <li><a href="#privacy">6. Gizlilik</a></li>
                <li><a href="#limitations">7. Sorumluluk Sınırlamaları</a></li>
                <li><a href="#termination">8. Fesih</a></li>
                <li><a href="#changes">9. Şart Değişiklikleri</a></li>
                <li><a href="#contact">10. İletişim</a></li>
              </ul>
            </div>

            <div className="legal-text">
              <section id="acceptance">
                <h2>1. Şartların Kabulü</h2>
                <p>
                  Mivvo AI hizmetlerini kullanarak, aşağıdaki kullanım şartlarını kabul etmiş sayılırsınız. 
                  Bu şartları kabul etmiyorsanız, lütfen hizmetlerimizi kullanmayın.
                </p>
                <ul>
                  <li>Bu şartlar tüm kullanıcılar için bağlayıcıdır</li>
                  <li>Hizmet kullanımı bu şartların kabul edildiği anlamına gelir</li>
                  <li>Şartlar periyodik olarak güncellenebilir</li>
                </ul>
              </section>

              <section id="services">
                <h2>2. Hizmet Tanımı</h2>
                <p>
                  Mivvo AI, araç analizi ve değerlendirme hizmetleri sunan bir platformdur:
                </p>
                <ul>
                  <li><strong>VIN Analizi:</strong> Araç kimlik numarası ile kapsamlı araç bilgileri</li>
                  <li><strong>Boya Analizi:</strong> Görsel analiz ile araç hasar ve boya tespiti</li>
                  <li><strong>Motor Sesi Analizi:</strong> Ses analizi ile motor durumu değerlendirmesi</li>
                  <li><strong>Raporlama:</strong> Detaylı analiz raporları ve önerileri</li>
                </ul>
                <p>
                  Hizmetlerimiz AI teknolojisi kullanarak çalışır ve %98+ doğruluk oranına sahiptir.
                </p>
              </section>

              <section id="user-responsibilities">
                <h2>3. Kullanıcı Sorumlulukları</h2>
                <p>Hizmetlerimizi kullanırken aşağıdaki kurallara uymanız gerekmektedir:</p>
                
                <h3>Doğru Bilgi Sağlama</h3>
                <ul>
                  <li>Analizler için sağlanan bilgilerin doğru ve güncel olması</li>
                  <li>VIN numaralarının geçerli ve okunabilir olması</li>
                  <li>Fotoğraf ve ses dosyalarının kaliteli ve net olması</li>
                </ul>

                <h3>Yasal Kullanım</h3>
                <ul>
                  <li>Hizmetlerin yalnızca yasal amaçlarla kullanılması</li>
                  <li>Başkalarının haklarına saygı gösterilmesi</li>
                  <li>Sahte veya yanıltıcı bilgi sağlanmaması</li>
                </ul>

                <h3>Hesap Güvenliği</h3>
                <ul>
                  <li>Hesap bilgilerinizi güvenli tutma</li>
                  <li>Şifrenizi düzenli olarak güncelleme</li>
                  <li>Şüpheli aktiviteleri derhal bildirme</li>
                </ul>
              </section>

              <section id="payments">
                <h2>4. Ödeme ve Faturalama</h2>
                
                <h3>Kredi Sistemi</h3>
                <p>
                  Mivvo AI kredi tabanlı bir sistem kullanır. Her analiz için 1 kredi harcanır:
                </p>
                <ul>
                  <li><strong>Başlangıç Paketi:</strong> 2 kredi - ₺199</li>
                  <li><strong>Profesyonel Paket:</strong> 5 kredi - ₺399</li>
                  <li><strong>Kurumsal Paket:</strong> Özel fiyatlandırma</li>
                </ul>

                <h3>Ödeme Yöntemleri</h3>
                <ul>
                  <li>Kredi kartı (Visa, Mastercard)</li>
                  <li>PayTR ile güvenli ödeme</li>
                  <li>Stripe ile uluslararası ödemeler</li>
                </ul>

                <h3>İade Politikası</h3>
                <ul>
                  <li>Kullanılmamış krediler için 14 gün içinde iade talebi</li>
                  <li>Teknik sorunlar nedeniyle başarısız analizler için otomatik iade</li>
                  <li>İade işlemleri 5-10 iş günü içinde gerçekleşir</li>
                </ul>
              </section>

              <section id="intellectual-property">
                <h2>5. Fikri Mülkiyet</h2>
                <p>
                  Mivvo AI platformundaki tüm içerik, teknoloji ve fikri mülkiyet haklarımıza aittir:
                </p>
                <ul>
                  <li>AI algoritmaları ve analiz teknolojisi</li>
                  <li>Raporlar ve analiz sonuçları</li>
                  <li>Platform tasarımı ve kullanıcı arayüzü</li>
                  <li>Marka, logo ve kurumsal kimlik</li>
                </ul>
                <p>
                  Kullanıcılar, yalnızca kişisel kullanım için analiz sonuçlarını kullanabilir.
                </p>
              </section>

              <section id="privacy">
                <h2>6. Gizlilik</h2>
                <p>
                  Kişisel verilerinizin korunması bizim için önceliklidir:
                </p>
                <ul>
                  <li>Tüm veriler şifreli olarak saklanır</li>
                  <li>Üçüncü taraflarla veri paylaşımı yapılmaz</li>
                  <li>KVKK ve GDPR uyumlu veri işleme</li>
                  <li>Kullanıcı verilerinin silinme hakkı</li>
                </ul>
                <p>
                  Detaylı bilgi için <Link href="/legal/privacy">Gizlilik Politikamızı</Link> inceleyin.
                </p>
              </section>

              <section id="limitations">
                <h2>7. Sorumluluk Sınırlamaları</h2>
                <p>
                  Mivvo AI hizmetlerinin kullanımında aşağıdaki sınırlamalar geçerlidir:
                </p>
                
                <h3>Hizmet Sınırları</h3>
                <ul>
                  <li>Analizler %98+ doğruluk oranına sahip olup, %100 garantisi yoktur</li>
                  <li>Sonuçlar yalnızca bilgi amaçlıdır, kesin teşhis değildir</li>
                  <li>Teknik sorunlar nedeniyle geçici hizmet kesintileri olabilir</li>
                </ul>

                <h3>Sorumluluk Reddi</h3>
                <ul>
                  <li>Analiz sonuçlarına dayalı alınacak kararlardan sorumlu değiliz</li>
                  <li>Araç alım-satım işlemlerindeki zararlar kapsamımız dışındadır</li>
                  <li>Üçüncü taraf hizmetlerin aksakslıklarından sorumlu değiliz</li>
                </ul>
              </section>

              <section id="termination">
                <h2>8. Fesih</h2>
                <p>
                  Bu sözleşme aşağıdaki durumlarda feshedilebilir:
                </p>
                
                <h3>Kullanıcı Tarafından</h3>
                <ul>
                  <li>İstediğiniz zaman hesabınızı kapatabilirsiniz</li>
                  <li>Kalan kredileriniz için iade talep edebilirsiniz</li>
                  <li>Verilerinizin silinmesini isteyebilirsiniz</li>
                </ul>

                <h3>Platform Tarafından</h3>
                <ul>
                  <li>Kullanım şartlarının ihlal edilmesi durumunda</li>
                  <li>Sahte bilgi sağlanması veya dolandırıcılık tespit edilmesi</li>
                  <li>Yasal olmayan faaliyetlerde bulunulması</li>
                </ul>
              </section>

              <section id="changes">
                <h2>9. Şart Değişiklikleri</h2>
                <p>
                  Bu kullanım şartları gerektiğinde güncellenebilir:
                </p>
                <ul>
                  <li>Önemli değişiklikler email ile bildirilecektir</li>
                  <li>Güncel şartlar platform üzerinde yayınlanacaktır</li>
                  <li>Hizmet kullanımına devam etmek güncel şartları kabul anlamına gelir</li>
                </ul>
              </section>

              <section id="contact">
                <h2>10. İletişim</h2>
                <p>
                  Bu şartlarla ilgili sorularınız için bizimle iletişime geçin:
                </p>
                <div className="contact-info">
                  <div>
                    <strong>Email:</strong>
                    <span>legal@mivvo.ai</span>
                  </div>
                  <div>
                    <strong>Telefon:</strong>
                    <span>+90 (212) 123 45 67</span>
                  </div>
                  <div>
                    <strong>Adres:</strong>
                    <span>İstanbul, Türkiye</span>
                  </div>
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
          min-width: 80px;
        }
        
        .contact-info span {
          color: var(--primary);
          font-weight: 500;
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
