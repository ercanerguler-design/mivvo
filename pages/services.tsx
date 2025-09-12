import Link from "next/link";
import Navbar from "../components/Navbar";
import { useState } from "react";

export default function Services() {
  const [activeTab, setActiveTab] = useState(0);
  
  const services = [
    {
      id: "vin-analysis",
      icon: "🔎",
      title: "VIN (Şase) Analizi",
      subtitle: "Otomatik Araç Tanıma Sistemi",
      description: "17 haneli VIN kodunuz ile aracınızın tüm teknik detaylarını otomatik olarak tespit ediyoruz.",
      features: [
        "Marka, model, yıl otomatik tanıma",
        "Motor tipi ve güç bilgileri", 
        "Donanım seviyesi tespiti",
        "Üretim yeri ve tarihi",
        "Recall bilgileri kontrolü",
        "Pazar değeri tahmini"
      ],
      process: [
        "VIN kodunu girin",
        "Otomatik sistem taraması", 
        "Detaylı araç raporu",
        "PDF çıktı alma"
      ],
      price: "₺50",
      duration: "30 saniye",
      accuracy: "%99.8"
    },
    {
      id: "paint-analysis", 
      icon: "🖌️",
      title: "Boya & Göçük Analizi",
      subtitle: "AI Destekli Görsel Denetim",
      description: "Gelişmiş görüntü işleme teknolojisi ile aracınızın boya durumunu milimetrik hassasiyette analiz ediyoruz.",
      features: [
        "Panel bazında boya tespiti",
        "Orijinal/boyalı alan ayırımı",
        "Çizik ve göçük tespiti",
        "Renk uyumsuzluğu analizi", 
        "Hasar seviyesi skorlama",
        "Tamir maliyet tahmini"
      ],
      process: [
        "Araç fotoğrafları yükleyin",
        "AI görüntü analizi",
        "Panel bazında skorlama", 
        "Detaylı hasar raporu"
      ],
      price: "₺75",
      duration: "2 dakika", 
      accuracy: "%96.5"
    },
    {
      id: "audio-analysis",
      icon: "🎧", 
      title: "Motor Sesi Analizi",
      subtitle: "Akustik Anomali Tespiti",
      description: "Mikrofonla kaydedilen motor sesinin frekans analizi yapılarak gizli arızalar tespit edilir.",
      features: [
        "Motor ritim analizi",
        "Vuruntu tespiti",
        "Titreşim ölçümü", 
        "Egzoz sesi kontrolü",
        "Rulman problemi tespiti",
        "Arıza olasılık skorlama"
      ],
      process: [
        "Motor sesini kaydedin",
        "Frekans spektrumu analizi",
        "Anomali tespiti",
        "Arıza risk raporu"
      ],
      price: "₺100",
      duration: "90 saniye",
      accuracy: "%94.2"
    }
  ];

  const packages = [
    {
      name: "Temel Paket",
      price: "₺199",
      credits: 2,
      services: ["VIN Analizi", "Temel Rapor"],
      popular: false
    },
    {
      name: "Profesyonel Paket", 
      price: "₺399",
      credits: 5,
      services: ["Tüm Analizler", "Detaylı Rapor", "Priorite Destek"],
      popular: true
    },
    {
      name: "Kurumsal Paket",
      price: "₺999", 
      credits: 15,
      services: ["Sınırsız Analiz", "API Erişimi", "7/24 Destek", "Özel Entegrasyon"],
      popular: false
    }
  ];

  return (
    <main>
      <Navbar />
      
      {/* Hero Section */}
      <section className="services-hero">
        <div className="container">
          <div className="services-hero-content">
            <h1>AI Destekli Araç <span className="text-highlight">Ekspertiz Hizmetleri</span></h1>
            <p>
              Geleneksel ekspertiz yöntemlerinden 10x daha hızlı, hassas ve kapsamlı analizler. 
              Teknoloji ile güçlendirilmiş çözümlerimizi keşfedin.
            </p>
            <div className="hero-features">
              <div className="hero-feature">
                <span>⚡</span>
                <div>
                  <strong>Anında Sonuç</strong>
                  <small>Dakikalar içinde rapor</small>
                </div>
              </div>
              <div className="hero-feature">
                <span>🎯</span>
                <div>
                  <strong>Yüksek Doğruluk</strong>
                  <small>%96+ doğruluk oranı</small>
                </div>
              </div>
              <div className="hero-feature">
                <span>📊</span>
                <div>
                  <strong>Detaylı Rapor</strong>
                  <small>Profesyonel PDF çıktı</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Detail */}
      <section className="services-detail">
        <div className="container">
          <div className="services-tabs">
            {services.map((service, index) => (
              <button 
                key={index}
                className={`tab-button ${activeTab === index ? 'active' : ''}`}
                onClick={() => setActiveTab(index)}
              >
                <span className="tab-icon">{service.icon}</span>
                <span className="tab-text">{service.title}</span>
              </button>
            ))}
          </div>

          <div className="service-content">
            {services.map((service, index) => (
              <div 
                key={index} 
                className={`service-panel ${activeTab === index ? 'active' : ''}`}
              >
                <div className="service-header">
                  <div className="service-info">
                    <div className="service-icon">{service.icon}</div>
                    <div>
                      <h2>{service.title}</h2>
                      <p className="service-subtitle">{service.subtitle}</p>
                    </div>
                  </div>
                  <div className="service-stats">
                    <div className="stat">
                      <div className="stat-value">{service.price}</div>
                      <div className="stat-label">Başlangıç</div>
                    </div>
                    <div className="stat">
                      <div className="stat-value">{service.duration}</div>
                      <div className="stat-label">Süre</div>
                    </div>
                    <div className="stat">
                      <div className="stat-value">{service.accuracy}</div>
                      <div className="stat-label">Doğruluk</div>
                    </div>
                  </div>
                </div>

                <div className="service-body">
                  <div className="service-description">
                    <h3>Hizmet Detayları</h3>
                    <p>{service.description}</p>
                  </div>

                  <div className="service-grid">
                    <div className="service-section">
                      <h4>Özellikler</h4>
                      <ul className="feature-list">
                        {service.features.map((feature, idx) => (
                          <li key={idx}>
                            <span className="check-icon">✅</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="service-section">
                      <h4>Süreç Adımları</h4>
                      <div className="process-steps">
                        {service.process.map((step, idx) => (
                          <div key={idx} className="process-step">
                            <div className="step-number">{idx + 1}</div>
                            <div className="step-text">{step}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="service-cta">
                    <Link href="/panel" className="btn btn-primary btn-large">
                      {service.title} Başlat
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="comparison-section">
        <div className="container">
          <div className="section-header">
            <h2>Hizmet Karşılaştırması</h2>
            <p>Geleneksel ekspertiz ile Mivvo AI karşılaştırması</p>
          </div>
          
          <div className="comparison-table">
            <div className="table-header">
              <div className="table-cell"></div>
              <div className="table-cell">Geleneksel Ekspertiz</div>
              <div className="table-cell highlight">Mivvo AI</div>
            </div>
            
            <div className="table-row">
              <div className="table-cell feature">⏱️ Süre</div>
              <div className="table-cell">2-4 saat</div>
              <div className="table-cell highlight">2-5 dakika</div>
            </div>
            
            <div className="table-row">
              <div className="table-cell feature">💰 Maliyet</div>
              <div className="table-cell">₺500-1500</div>
              <div className="table-cell highlight">₺50-200</div>
            </div>
            
            <div className="table-row">
              <div className="table-cell feature">🎯 Doğruluk</div>
              <div className="table-cell">%70-90</div>
              <div className="table-cell highlight">%94-99</div>
            </div>
            
            <div className="table-row">
              <div className="table-cell feature">📍 Lokasyon</div>
              <div className="table-cell">Ekspertiz merkezine gitme</div>
              <div className="table-cell highlight">Her yerden erişim</div>
            </div>
            
            <div className="table-row">
              <div className="table-cell feature">📊 Rapor</div>
              <div className="table-cell">Basit metin rapor</div>
              <div className="table-cell highlight">Detaylı PDF + görsel</div>
            </div>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="packages-section">
        <div className="container">
          <div className="section-header">
            <h2>Hizmet Paketleri</h2>
            <p>İhtiyacınıza uygun paketi seçin</p>
          </div>
          
          <div className="packages-grid">
            {packages.map((pkg, index) => (
              <div key={index} className={`package-card ${pkg.popular ? 'popular' : ''}`}>
                {pkg.popular && <div className="popular-badge">En Popüler</div>}
                
                <div className="package-header">
                  <h3>{pkg.name}</h3>
                  <div className="package-price">
                    <span className="price-amount">{pkg.price}</span>
                    <span className="price-credits">{pkg.credits} Kredi</span>
                  </div>
                </div>
                
                <ul className="package-features">
                  {pkg.services.map((service, idx) => (
                    <li key={idx}>
                      <span className="check-icon">✅</span>
                      {service}
                    </li>
                  ))}
                </ul>
                
                <Link 
                  href="/panel" 
                  className={`btn ${pkg.popular ? 'btn-primary' : 'btn-secondary'} btn-full`}
                >
                  Paketi Seç
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section">
        <div className="container">
          <div className="section-header">
            <h2>Sık Sorulan Sorular</h2>
            <p>Hizmetlerimiz hakkında merak ettikleriniz</p>
          </div>
          
          <div className="faq-grid">
            <div className="faq-item">
              <h4>VIN analizi ne kadar doğru?</h4>
              <p>VIN veritabanımız %99.8 doğruluk oranına sahiptir. Tüm marka ve modeller için güncel bilgiler sunuyoruz.</p>
            </div>
            <div className="faq-item">
              <h4>Boya analizi hangi hasarları tespit eder?</h4>
              <p>Boyalı paneller, çizikler, göçükler, renk uyumsuzlukları ve hasar derecelerini tespit ederiz.</p>
            </div>
            <div className="faq-item">
              <h4>Motor sesi analizi nasıl çalışır?</h4>
              <p>Ses kaydınızı frekans analizine tabi tutarak motor anomalilerini ve potansiel arızaları tespit ederiz.</p>
            </div>
            <div className="faq-item">
              <h4>Raporlar ne kadar detaylı?</h4>
              <p>Her rapor görsel içerikli PDF formatında, teknik detaylar ve önerilerle birlikte sunulur.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="services-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Aracınızı Hemen Analiz Edin</h2>
            <p>Profesyonel ekspertiz raporu için sadece birkaç dakika yeter</p>
            <div className="cta-buttons">
              <Link href="/panel" className="btn btn-primary btn-large">
                <span>🚀</span>
                Ücretsiz Başla
              </Link>
              <Link href="/contact" className="btn btn-secondary btn-large">
                <span>💬</span>
                Destek Al
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .services-hero {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 100px 0;
          text-align: center;
        }
        
        .services-hero h1 {
          font-size: 56px;
          font-weight: 900;
          margin-bottom: 24px;
          line-height: 1.2;
        }
        
        .text-highlight {
          background: linear-gradient(45deg, #fbbf24, #f59e0b);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .services-hero p {
          font-size: 20px;
          line-height: 1.6;
          margin-bottom: 48px;
          opacity: 0.9;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }
        
        .hero-features {
          display: flex;
          justify-content: center;
          gap: 48px;
          flex-wrap: wrap;
        }
        
        .hero-feature {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .hero-feature span {
          font-size: 32px;
        }
        
        .hero-feature div {
          text-align: left;
        }
        
        .hero-feature strong {
          display: block;
          font-size: 16px;
          margin-bottom: 4px;
        }
        
        .hero-feature small {
          font-size: 14px;
          opacity: 0.8;
        }
        
        .services-detail {
          padding: 100px 0;
          background: white;
        }
        
        .services-tabs {
          display: flex;
          justify-content: center;
          margin-bottom: 48px;
          gap: 8px;
        }
        
        .tab-button {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 16px 24px;
          border: 2px solid var(--ring);
          border-radius: 16px;
          background: white;
          color: var(--ink);
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 600;
        }
        
        .tab-button.active,
        .tab-button:hover {
          border-color: var(--primary);
          background: var(--primary);
          color: white;
        }
        
        .tab-icon {
          font-size: 20px;
        }
        
        .service-content {
          position: relative;
        }
        
        .service-panel {
          display: none;
          background: #f8fafc;
          border-radius: 24px;
          padding: 48px;
        }
        
        .service-panel.active {
          display: block;
        }
        
        .service-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 48px;
          flex-wrap: wrap;
          gap: 24px;
        }
        
        .service-info {
          display: flex;
          align-items: center;
          gap: 24px;
        }
        
        .service-icon {
          font-size: 64px;
        }
        
        .service-info h2 {
          font-size: 36px;
          font-weight: 800;
          margin-bottom: 8px;
          color: var(--ink);
        }
        
        .service-subtitle {
          font-size: 18px;
          color: var(--primary);
          font-weight: 600;
        }
        
        .service-stats {
          display: flex;
          gap: 32px;
        }
        
        .stat {
          text-align: center;
        }
        
        .stat-value {
          font-size: 24px;
          font-weight: 800;
          color: var(--primary);
          margin-bottom: 4px;
        }
        
        .stat-label {
          font-size: 14px;
          color: var(--muted);
        }
        
        .service-description {
          margin-bottom: 32px;
        }
        
        .service-description h3 {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 16px;
          color: var(--ink);
        }
        
        .service-description p {
          font-size: 18px;
          line-height: 1.6;
          color: var(--muted);
        }
        
        .service-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          margin-bottom: 48px;
        }
        
        .service-section h4 {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 24px;
          color: var(--ink);
        }
        
        .feature-list {
          list-style: none;
          padding: 0;
        }
        
        .feature-list li {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
          font-size: 16px;
          color: var(--ink);
        }
        
        .check-icon {
          font-size: 16px;
        }
        
        .process-steps {
          space-y: 16px;
        }
        
        .process-step {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 16px;
        }
        
        .step-number {
          width: 32px;
          height: 32px;
          background: var(--primary);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 14px;
        }
        
        .step-text {
          font-size: 16px;
          color: var(--ink);
        }
        
        .service-cta {
          text-align: center;
        }
        
        .comparison-section {
          padding: 100px 0;
          background: #f8fafc;
        }
        
        .comparison-table {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: var(--shadow-lg);
          max-width: 800px;
          margin: 0 auto;
        }
        
        .table-header,
        .table-row {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
        }
        
        .table-header {
          background: var(--primary);
          color: white;
          font-weight: 700;
        }
        
        .table-cell {
          padding: 20px;
          border-bottom: 1px solid var(--ring);
          text-align: center;
        }
        
        .table-cell.feature {
          font-weight: 600;
          text-align: left;
          background: #f8fafc;
        }
        
        .table-cell.highlight {
          background: #f0f9ff;
          color: var(--primary);
          font-weight: 600;
        }
        
        .packages-section {
          padding: 100px 0;
          background: white;
        }
        
        .packages-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
        }
        
        .package-card {
          background: white;
          border: 2px solid var(--ring);
          border-radius: 20px;
          padding: 32px;
          position: relative;
          transition: all 0.3s ease;
        }
        
        .package-card:hover,
        .package-card.popular {
          border-color: var(--primary);
          transform: translateY(-4px);
          box-shadow: var(--shadow-xl);
        }
        
        .popular-badge {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--gradient-primary);
          color: white;
          padding: 6px 20px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 600;
        }
        
        .package-header {
          text-align: center;
          margin-bottom: 32px;
        }
        
        .package-header h3 {
          font-size: 24px;
          font-weight: 800;
          margin-bottom: 16px;
          color: var(--ink);
        }
        
        .package-price {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }
        
        .price-amount {
          font-size: 36px;
          font-weight: 900;
          color: var(--primary);
        }
        
        .price-credits {
          font-size: 14px;
          color: var(--muted);
        }
        
        .package-features {
          list-style: none;
          margin-bottom: 32px;
          padding: 0;
        }
        
        .package-features li {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
          font-size: 16px;
          color: var(--ink);
        }
        
        .faq-section {
          padding: 100px 0;
          background: #f8fafc;
        }
        
        .faq-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 32px;
        }
        
        .faq-item {
          background: white;
          padding: 32px;
          border-radius: 16px;
          box-shadow: var(--shadow-sm);
        }
        
        .faq-item h4 {
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 12px;
          color: var(--ink);
        }
        
        .faq-item p {
          color: var(--muted);
          line-height: 1.6;
        }
        
        .services-cta {
          padding: 100px 0;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          text-align: center;
        }
        
        .services-cta h2 {
          font-size: 48px;
          font-weight: 800;
          margin-bottom: 16px;
        }
        
        .services-cta p {
          font-size: 20px;
          margin-bottom: 32px;
          opacity: 0.9;
        }
        
        .cta-buttons {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
        }
        
        @media (max-width: 768px) {
          .services-hero h1 {
            font-size: 36px;
          }
          
          .hero-features {
            flex-direction: column;
            align-items: center;
            gap: 24px;
          }
          
          .services-tabs {
            flex-direction: column;
            align-items: center;
          }
          
          .service-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          
          .comparison-table {
            font-size: 14px;
          }
          
          .packages-grid {
            grid-template-columns: 1fr;
          }
          
          .faq-grid {
            grid-template-columns: 1fr;
          }
          
          .cta-buttons {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </main>
  );
}
