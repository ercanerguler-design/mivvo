import Navbar from "../components/Navbar";
import Link from "next/link";
import { useState } from "react";

export default function FAQ() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const categories = [
    { id: 'all', name: 'Tüm Sorular', icon: '📋' },
    { id: 'general', name: 'Genel', icon: '❓' },
    { id: 'analysis', name: 'Analizler', icon: '🔬' },
    { id: 'payment', name: 'Ödeme', icon: '💳' },
    { id: 'technical', name: 'Teknik', icon: '⚙️' },
    { id: 'account', name: 'Hesap', icon: '👤' }
  ];

  const faqs = [
    {
      id: 1,
      category: 'general',
      question: 'Mivvo AI nedir ve nasıl çalışır?',
      answer: 'Mivvo AI, araç alım-satım sürecinde yapay zeka teknolojisi kullanarak kapsamlı araç analizleri yapan bir platformdur. VIN analizi, boya tespiti ve motor sesi analizi gibi hizmetlerle araçların gerçek durumunu ortaya çıkarıyoruz. AI algoritmalarımız %98+ doğruluk oranıyla çalışır ve size detaylı raporlar sunar.'
    },
    {
      id: 2,
      category: 'general',
      question: 'Mivvo AI\'ı kimler kullanabilir?',
      answer: 'Mivvo AI hem bireysel kullanıcılar hem de kurumsal müşteriler tarafından kullanılabilir. Araç alım-satımı yapan herkes, galeri sahipleri, ekspertiz şirketleri, sigorta şirketleri ve araç değerlendirmesi yapmak isteyen herkes platformumuzu kullanabilir.'
    },
    {
      id: 3,
      category: 'analysis',
      question: 'VIN analizi nedir ve hangi bilgileri sağlar?',
      answer: 'VIN (Araç Kimlik Numarası) analizi ile araç hakkında kapsamlı bilgiler elde edebilirsiniz: \n• Araç markası, modeli ve yılı\n• Motor özellikleri ve yakıt tipi\n• Üretim yeri ve tarihı\n• Hasar kayıtları (varsa)\n• Sahiplik geçmişi\n• Orijinal özellikler ve donanımlar\n• Piyasa değeri tahmini'
    },
    {
      id: 4,
      category: 'analysis',
      question: 'Boya analizi nasıl yapılır?',
      answer: 'Boya analizi için aracın fotoğraflarını yüklemeniz yeterlidir. AI sistemimiz: \n• Boyalı panelleri tespit eder\n• Renk uyumsuzluklarını analiz eder\n• Hasar izlerini belirler\n• Orijinal boya ile değişen kısımları ayırır\n• %95+ doğrulukla sonuç verir\n\nEn iyi sonuçlar için fotoğrafların gündüz ışığında, net ve yüksek çözünürlükte olması önerilir.'
    },
    {
      id: 5,
      category: 'analysis',
      question: 'Motor sesi analizi güvenilir mi?',
      answer: 'Motor sesi analizimiz gelişmiş akustik AI algoritmaları kullanır ve %97 doğruluk oranına sahiptir. Analiz şu sorunları tespit edebilir:\n• Motor iç parça aşınmaları\n• Yağlama sistemi sorunları\n• Timing kayışı/zincir problemleri\n• Egzoz sistemi arızaları\n• Titreşim kaynaklı sorunlar\n\nAnaliz için motor sesinin 30-60 saniye boyunca kaydedilmesi önerilir.'
    },
    {
      id: 6,
      category: 'payment',
      question: 'Kredi sistemi nasıl çalışır?',
      answer: 'Mivvo AI kredi tabanlı bir sistemle çalışır:\n• Her analiz 1 kredi harcar\n• Başlangıç paketi: 2 kredi - ₺199\n• Profesyonel paket: 5 kredi - ₺399\n• Krediler süresi yoktur, istediğiniz zaman kullanabilirsiniz\n• Başarısız analizlerde kredi iade edilir\n• Toplu kredi paketlerinde indirimler mevcuttur'
    },
    {
      id: 7,
      category: 'payment',
      question: 'Hangi ödeme yöntemlerini kabul ediyorsunuz?',
      answer: 'Güvenli ödeme seçeneklerimiz:\n• Kredi kartı (Visa, Mastercard)\n• Banka kartı\n• PayTR ile güvenli ödeme\n• Stripe ile uluslararası ödemeler\n• Havale/EFT (kurumsal müşteriler için)\n\nTüm ödemeler SSL şifreleme ile korunur ve PCI DSS standartlarına uygun olarak işlenir.'
    },
    {
      id: 8,
      category: 'payment',
      question: 'İade politikanız nedir?',
      answer: 'İade politikamız şu şekildedir:\n• Kullanılmamış krediler için 14 gün içinde tam iade\n• Teknik sorunlar nedeniyle başarısız analizler otomatik iade edilir\n• İade talebi için destek@mivvo.ai adresine başvurabilirsiniz\n• İadeler 5-10 iş günü içinde aynı ödeme yöntemiyle gerçekleşir\n• Kısmi kullanım durumlarında kalan krediler için orantılı iade yapılır'
    },
    {
      id: 9,
      category: 'technical',
      question: 'Hangi dosya formatlarını destekliyorsunuz?',
      answer: 'Desteklenen dosya formatları:\n\n**Fotoğraflar (Boya Analizi):**\n• JPG, JPEG, PNG, WebP\n• Maksimum dosya boyutu: 10MB\n• Önerilen çözünürlük: En az 1920x1080\n\n**Ses Dosyaları (Motor Analizi):**\n• MP3, WAV, M4A, OGG\n• Maksimum dosya boyutu: 50MB\n• Önerilen süre: 30-60 saniye'
    },
    {
      id: 10,
      category: 'technical',
      question: 'Analiz sonuçları ne kadar sürede hazır olur?',
      answer: 'Analiz süreleri:\n• VIN Analizi: 30 saniye - 2 dakika\n• Boya Analizi: 2-5 dakika\n• Motor Sesi Analizi: 3-7 dakika\n\nYoğun dönemlerde süreler uzayabilir. Analiz tamamlandığında email bildirimi gönderilir. Dashboard\'unuzdan da anlık durumu takip edebilirsiniz.'
    },
    {
      id: 11,
      category: 'technical',
      question: 'Raporları nasıl indirebilirim?',
      answer: 'Raporları indirmek çok kolay:\n• Dashboard\'unuza giriş yapın\n• "Analizlerim" sekmesine gidin\n• Tamamlanan analizlerin yanındaki "Rapor İndir" butonuna tıklayın\n• PDF formatında detaylı rapor indirilir\n• Raporlar 90 gün boyunca sistemde saklanır\n• Email ile de otomatik olarak gönderilir'
    },
    {
      id: 12,
      category: 'account',
      question: 'Hesabımı nasıl oluşturabilirim?',
      answer: 'Hesap oluşturma çok basit:\n• "Giriş Yap" butonuna tıklayın\n• Google hesabınızla tek tıkla kayıt olabilirsiniz\n• Veya email ile manuel kayıt yapabilirsiniz\n• Email doğrulaması yapın\n• Dashboard\'unuza erişim sağlayın\n\nKayıt ücretsizdir ve hemen kullanmaya başlayabilirsiniz.'
    },
    {
      id: 13,
      category: 'account',
      question: 'Şifremi unuttum, ne yapmalıyım?',
      answer: 'Şifre sıfırlama adımları:\n• Giriş sayfasında "Şifremi Unuttum" linkine tıklayın\n• Email adresinizi girin\n• Gelen emaildeki sıfırlama linkine tıklayın\n• Yeni şifrenizi oluşturun\n• Güçlü bir şifre seçmeyi unutmayın\n\nGoogle ile giriş yapıyorsanız Google hesabınızdan şifre sıfırlama yapabilirsiniz.'
    },
    {
      id: 14,
      category: 'account',
      question: 'Hesabımı nasıl silebilirim?',
      answer: 'Hesap silme işlemi:\n• Dashboard\'da "Profil" sekmesine gidin\n• "Hesap Ayarları" bölümünde "Hesabı Sil" butonuna tıklayın\n• Silme nedeninizi belirtin (isteğe bağlı)\n• İşlemi onaylayın\n• 7 gün içinde geri alma şansınız vardır\n• 7 gün sonra tüm verileriniz kalıcı olarak silinir'
    },
    {
      id: 15,
      category: 'general',
      question: 'Mivvo AI\'ın avantajları nelerdir?',
      answer: 'Mivvo AI\'ın öne çıkan avantajları:\n• %98+ doğruluk oranıyla güvenilir sonuçlar\n• 7/24 erişilebilir online platform\n• Hızlı analiz süreleri (dakikalar içinde)\n• Uzman ekspertiz maliyetinin çok altında fiyat\n• Detaylı PDF raporlar\n• Mobil uyumlu kullanım\n• Türkçe müşteri desteği\n• KVKK uyumlu veri korunması'
    },
    {
      id: 16,
      category: 'technical',
      question: 'Mobil cihazlarda kullanabilir miyim?',
      answer: 'Elbette! Mivvo AI tam mobil uyumludur:\n• Web tarayıcısından iOS ve Android\'de çalışır\n• Responsive tasarım ile optimize edilmiştir\n• Kamera ile doğrudan fotoğraf çekip yükleyebilirsiniz\n• Mikrofon ile motor sesi kaydı yapabilirsiniz\n• Tüm özellikler mobilde mevcuttur\n• Mobil uygulamamız yakında App Store ve Google Play\'de!'
    }
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFAQ = (id: number) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  return (
    <main>
      <Navbar />
      
      <div className="faq-page">
        <div className="container">
          <div className="faq-header">
            <h1>Sıkça Sorulan Sorular</h1>
            <p>Mivvo AI hakkında merak ettiğiniz her şey burada. Sorunuza cevap bulamazsanız bizimle iletişime geçin.</p>
          </div>

          {/* Search Bar */}
          <div className="search-section">
            <div className="search-bar">
              <div className="search-icon">🔍</div>
              <input
                type="text"
                placeholder="Soru ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="category-filter">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
              >
                <span className="category-icon">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>

          {/* FAQ List */}
          <div className="faq-content">
            {filteredFAQs.length > 0 ? (
              <div className="faq-list">
                {filteredFAQs.map((faq) => (
                  <div key={faq.id} className={`faq-item ${expandedFAQ === faq.id ? 'expanded' : ''}`}>
                    <button
                      className="faq-question"
                      onClick={() => toggleFAQ(faq.id)}
                    >
                      <span className="question-text">{faq.question}</span>
                      <span className={`expand-icon ${expandedFAQ === faq.id ? 'rotated' : ''}`}>
                        ▼
                      </span>
                    </button>
                    <div className="faq-answer">
                      <div className="answer-content">
                        {faq.answer.split('\n').map((line, index) => (
                          <p key={index}>{line}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-results">
                <div className="no-results-icon">🤷‍♂️</div>
                <h3>Sonuç bulunamadı</h3>
                <p>Aradığınız kriterlere uygun soru bulunamadı. Lütfen farklı bir arama terimi deneyin.</p>
              </div>
            )}
          </div>

          {/* Help Section */}
          <div className="help-section">
            <div className="help-card">
              <h2>Cevap bulamadınız mı?</h2>
              <p>Sorularınız için uzman ekibimizle iletişime geçin. Size yardımcı olmaktan memnuniyet duyarız.</p>
              <div className="help-actions">
                <Link href="/contact" className="btn btn-primary">
                  <span>💬</span>
                  İletişime Geçin
                </Link>
                <a href="mailto:destek@mivvo.ai" className="btn btn-secondary">
                  <span>📧</span>
                  Email Gönderin
                </a>
              </div>
            </div>
          </div>

          {/* Popular Topics */}
          <div className="popular-topics">
            <h2>Popüler Konular</h2>
            <div className="topics-grid">
              <div className="topic-card">
                <div className="topic-icon">🚗</div>
                <h3>VIN Analizi</h3>
                <p>Araç kimlik numarası ile kapsamlı araç bilgileri</p>
                <Link href="#" onClick={() => {setActiveCategory('analysis'); setSearchTerm('VIN')}}>
                  Daha fazla bilgi →
                </Link>
              </div>
              <div className="topic-card">
                <div className="topic-icon">🎨</div>
                <h3>Boya Tespiti</h3>
                <p>AI ile boyalı panel ve hasar analizi</p>
                <Link href="#" onClick={() => {setActiveCategory('analysis'); setSearchTerm('boya')}}>
                  Daha fazla bilgi →
                </Link>
              </div>
              <div className="topic-card">
                <div className="topic-icon">🔊</div>
                <h3>Motor Sesi</h3>
                <p>Akustik analiz ile motor durumu değerlendirmesi</p>
                <Link href="#" onClick={() => {setActiveCategory('analysis'); setSearchTerm('motor')}}>
                  Daha fazla bilgi →
                </Link>
              </div>
              <div className="topic-card">
                <div className="topic-icon">💳</div>
                <h3>Ödeme & Kredi</h3>
                <p>Kredi sistemi ve ödeme yöntemleri</p>
                <Link href="#" onClick={() => {setActiveCategory('payment'); setSearchTerm('')}}>
                  Daha fazla bilgi →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .faq-page {
          min-height: 100vh;
          background: #f8fafc;
          padding: 40px 0;
        }
        
        .faq-header {
          text-align: center;
          margin-bottom: 48px;
        }
        
        .faq-header h1 {
          font-size: 48px;
          font-weight: 900;
          color: var(--ink);
          margin-bottom: 16px;
        }
        
        .faq-header p {
          font-size: 18px;
          color: var(--muted);
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }
        
        .search-section {
          margin-bottom: 32px;
          display: flex;
          justify-content: center;
        }
        
        .search-bar {
          position: relative;
          max-width: 500px;
          width: 100%;
        }
        
        .search-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 18px;
          color: var(--muted);
        }
        
        .search-bar input {
          width: 100%;
          padding: 16px 16px 16px 50px;
          border: 2px solid var(--ring);
          border-radius: 50px;
          font-size: 16px;
          background: white;
          transition: all 0.2s ease;
        }
        
        .search-bar input:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
        }
        
        .category-filter {
          display: flex;
          gap: 8px;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 48px;
        }
        
        .category-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 20px;
          border: 2px solid var(--ring);
          background: white;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-weight: 600;
          color: var(--muted);
        }
        
        .category-btn:hover,
        .category-btn.active {
          border-color: var(--primary);
          background: var(--primary);
          color: white;
        }
        
        .category-icon {
          font-size: 16px;
        }
        
        .faq-content {
          max-width: 800px;
          margin: 0 auto;
        }
        
        .faq-list {
          space-y: 16px;
        }
        
        .faq-item {
          background: white;
          border-radius: 16px;
          box-shadow: var(--shadow-sm);
          overflow: hidden;
          margin-bottom: 16px;
          transition: all 0.3s ease;
        }
        
        .faq-item:hover {
          box-shadow: var(--shadow-md);
        }
        
        .faq-question {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px 32px;
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          transition: all 0.2s ease;
        }
        
        .faq-question:hover {
          background: #f8fafc;
        }
        
        .question-text {
          font-size: 18px;
          font-weight: 700;
          color: var(--ink);
          flex: 1;
          margin-right: 16px;
          line-height: 1.4;
        }
        
        .expand-icon {
          font-size: 16px;
          color: var(--primary);
          transition: transform 0.3s ease;
          min-width: 20px;
          text-align: center;
        }
        
        .expand-icon.rotated {
          transform: rotate(180deg);
        }
        
        .faq-answer {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease;
          background: #f8fafc;
        }
        
        .faq-item.expanded .faq-answer {
          max-height: 1000px;
        }
        
        .answer-content {
          padding: 0 32px 32px 32px;
        }
        
        .answer-content p {
          color: var(--slate-700);
          line-height: 1.7;
          margin-bottom: 16px;
          font-size: 16px;
        }
        
        .answer-content p:last-child {
          margin-bottom: 0;
        }
        
        .no-results {
          text-align: center;
          padding: 60px 40px;
          background: white;
          border-radius: 20px;
          box-shadow: var(--shadow-sm);
        }
        
        .no-results-icon {
          font-size: 60px;
          margin-bottom: 20px;
        }
        
        .no-results h3 {
          font-size: 24px;
          font-weight: 700;
          color: var(--ink);
          margin-bottom: 12px;
        }
        
        .no-results p {
          color: var(--muted);
          font-size: 16px;
        }
        
        .help-section {
          margin-top: 80px;
          margin-bottom: 80px;
        }
        
        .help-card {
          background: linear-gradient(135deg, var(--primary), #1e40af);
          color: white;
          padding: 48px;
          border-radius: 24px;
          text-align: center;
          max-width: 600px;
          margin: 0 auto;
        }
        
        .help-card h2 {
          font-size: 32px;
          font-weight: 800;
          margin-bottom: 16px;
        }
        
        .help-card p {
          font-size: 18px;
          opacity: 0.9;
          margin-bottom: 32px;
          line-height: 1.6;
        }
        
        .help-actions {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
        }
        
        .help-actions .btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 16px 24px;
          border-radius: 12px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        
        .btn-primary {
          background: white;
          color: var(--primary);
        }
        
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }
        
        .btn-secondary {
          background: rgba(255,255,255,0.1);
          color: white;
          border: 2px solid rgba(255,255,255,0.3);
        }
        
        .btn-secondary:hover {
          background: rgba(255,255,255,0.2);
          border-color: rgba(255,255,255,0.5);
        }
        
        .popular-topics {
          margin-top: 80px;
        }
        
        .popular-topics h2 {
          text-align: center;
          font-size: 32px;
          font-weight: 800;
          color: var(--ink);
          margin-bottom: 48px;
        }
        
        .topics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 24px;
        }
        
        .topic-card {
          background: white;
          padding: 32px 24px;
          border-radius: 20px;
          box-shadow: var(--shadow-sm);
          text-align: center;
          transition: all 0.3s ease;
          border: 1px solid var(--ring);
        }
        
        .topic-card:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-lg);
          border-color: var(--primary);
        }
        
        .topic-icon {
          font-size: 48px;
          margin-bottom: 20px;
        }
        
        .topic-card h3 {
          font-size: 20px;
          font-weight: 700;
          color: var(--ink);
          margin-bottom: 12px;
        }
        
        .topic-card p {
          color: var(--muted);
          font-size: 15px;
          line-height: 1.5;
          margin-bottom: 20px;
        }
        
        .topic-card a {
          color: var(--primary);
          font-weight: 600;
          text-decoration: none;
          transition: color 0.2s ease;
        }
        
        .topic-card a:hover {
          color: #1e40af;
        }
        
        @media (max-width: 768px) {
          .faq-header h1 {
            font-size: 36px;
          }
          
          .category-filter {
            flex-direction: column;
            align-items: center;
          }
          
          .category-btn {
            width: 100%;
            max-width: 200px;
            justify-content: center;
          }
          
          .faq-question {
            padding: 20px 24px;
          }
          
          .question-text {
            font-size: 16px;
          }
          
          .answer-content {
            padding: 0 24px 24px 24px;
          }
          
          .help-card {
            padding: 32px 24px;
            margin: 0 20px;
          }
          
          .help-card h2 {
            font-size: 24px;
          }
          
          .help-actions {
            flex-direction: column;
          }
          
          .help-actions .btn {
            justify-content: center;
          }
          
          .topics-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }
        
        @media (max-width: 480px) {
          .faq-header h1 {
            font-size: 28px;
          }
          
          .search-bar {
            margin: 0 20px;
          }
          
          .faq-question {
            padding: 16px 20px;
          }
          
          .question-text {
            font-size: 15px;
          }
          
          .answer-content {
            padding: 0 20px 20px 20px;
          }
          
          .help-card {
            padding: 24px 20px;
            margin: 0 10px;
          }
        }
      `}</style>
    </main>
  );
}
