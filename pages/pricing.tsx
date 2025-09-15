import Link from "next/link";
import Navbar from "../components/Navbar";
import { useState } from "react";

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);
  
  const plans = [
    {
      name: "Bireysel",
      subtitle: "Tek araç sahipleri için",
      icon: "👤",
      monthlyPrice: 199,
      annualPrice: 1990,
      credits: isAnnual ? 24 : 2,
      features: [
        "2 analiz kredisi",
        "VIN otomatik tanıma",
        "Boya & göçük analizi", 
        "Motor sesi kontrolü",
        "PDF rapor çıktısı",
        "Email destek"
      ],
      popular: false,
      buttonText: "Bireysel Başlat"
    },
    {
      name: "Profesyonel",
      subtitle: "Galeri ve ekspertizci için",
      icon: "🏢",
      monthlyPrice: 499,
      annualPrice: 4990,
      credits: isAnnual ? 60 : 5,
      features: [
        "5 analiz kredisi",
        "Tüm analiz türleri",
        "Priorite işlem",
        "Detaylı raporlar",
        "API erişimi (Beta)",
        "Telefon desteği",
        "Toplu işlem"
      ],
      popular: true,
      buttonText: "Profesyonel Başlat"
    },
    {
      name: "Kurumsal",
      subtitle: "Büyük işletmeler için",
      icon: "🏭",
      monthlyPrice: 1499,
      annualPrice: 14990,
      credits: isAnnual ? 200 : 20,
      features: [
        "20 analiz kredisi",
        "Sınırsız kullanıcı",
        "Özel API entegrasyonu",
        "7/24 premium destek",
        "Özel raporlama",
        "SLA garantisi",
        "Eğitim ve onboarding"
      ],
      popular: false,
      buttonText: "Satış Ekibi ile Görüş"
    }
  ];

  const addOns = [
    {
      name: "Ekstra Kredi Paketi",
      description: "Ek analiz kredileri",
      price: "₺50",
      unit: "per kredi"
    },
    {
      name: "API Premium",
      description: "Gelişmiş API özellikleri",
      price: "₺299",
      unit: "aylık"
    },
    {
      name: "Özel Entegrasyon",
      description: "Sistemlerinize özel entegrasyon",
      price: "₺2,999",
      unit: "tek seferlik"
    },
    {
      name: "Eğitim Paketi",
      description: "Ekibiniz için özel eğitim",
      price: "₺1,999",
      unit: "tek seferlik"
    }
  ];

  const faqs = [
    {
      question: "Ödeme planları nasıl çalışır?",
      answer: "Aylık veya yıllık ödeme seçenekleriniz var. Yıllık ödemede %17 indirim kazanırsınız. İstediğiniz zaman planınızı değiştirebilir veya iptal edebilirsiniz."
    },
    {
      question: "Kredi sistemi nasıl işliyor?",
      answer: "Her analiz türü 1 kredi tüketir. Kullanılmayan krediler bir sonraki aya aktarılır. Ek krediye ihtiyacınız olursa esnek paketlerimizden satın alabilirsiniz."
    },
    {
      question: "API erişimi dahil mi?",
      answer: "Profesyonel planda beta API erişimi, Kurumsal planda ise full API erişimi bulunmaktadır. API ile sistemlerinize entegre edebilirsiniz."
    },
    {
      question: "İptal politikası nedir?",
      answer: "İstediğiniz zaman iptal edebilirsiniz. İptal sonrası mevcut kredinizi kullanmaya devam edebilirsiniz. Yıllık ödemeler için pro-rata iade yapılır."
    },
    {
      question: "Toplu işlem nedir?",
      answer: "Profesyonel plan ile çoklu VIN kodlarını tek seferde yükleyip toplu analiz yapabilirsiniz. Excel/CSV formatında import/export desteği mevcuttur."
    },
    {
      question: "SLA garantisi ne kapsar?",
      answer: "Kurumsal planda %99.9 uptime garantisi, 1 saaat içinde destek yanıtı ve dedicated account manager hizmeti sunuyoruz."
    }
  ];

  return (
    <main>
      <Navbar />
      
      {/* Hero Section */}
      <section className="pricing-hero">
        <div className="container">
          <div className="pricing-hero-content">
            <h1>Şeffaf ve <span className="text-highlight">Adil Fiyatlandırma</span></h1>
            <p>
              İhtiyacınıza göre ölçeklenen paketler. Gizli maliyet yok, 
              istediğiniz zaman değiştirin veya iptal edin.
            </p>
            
            <div className="pricing-toggle">
              <span className={!isAnnual ? 'active' : ''}>Aylık</span>
              <button 
                className="toggle-button"
                onClick={() => setIsAnnual(!isAnnual)}
              >
                <div className={`toggle-slider ${isAnnual ? 'annual' : 'monthly'}`}></div>
              </button>
              <span className={isAnnual ? 'active' : ''}>
                Yıllık <span className="discount-badge">%17 İndirim</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="pricing-plans">
        <div className="container">
          <div className="plans-grid">
            {plans.map((plan, index) => (
              <div key={index} className={`plan-card ${plan.popular ? 'popular' : ''}`}>
                {plan.popular && <div className="popular-badge">En Popüler</div>}
                
                <div className="plan-header">
                  <div className="plan-icon">{plan.icon}</div>
                  <h3>{plan.name}</h3>
                  <p className="plan-subtitle">{plan.subtitle}</p>
                  
                  <div className="plan-price">
                    <div className="price-main">
                      <span className="currency">₺</span>
                      <span className="amount">
                        {isAnnual ? plan.annualPrice : plan.monthlyPrice}
                      </span>
                    </div>
                    <div className="price-period">
                      {isAnnual ? '/yıl' : '/ay'}
                    </div>
                    {isAnnual && (
                      <div className="price-savings">
                        ₺{(plan.monthlyPrice * 12) - plan.annualPrice} tasarruf
                      </div>
                    )}
                  </div>
                  
                  <div className="credit-info">
                    <strong>{plan.credits} analiz kredisi</strong>
                    <small>{isAnnual ? 'yıllık' : 'aylık'}</small>
                  </div>
                </div>
                
                <div className="plan-features">
                  <ul>
                    {plan.features.map((feature, idx) => (
                      <li key={idx}>
                        <span className="check-icon">✅</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="plan-cta">
                  {plan.name === 'Kurumsal' ? (
                    <Link href="/contact" className={`btn ${plan.popular ? 'btn-primary' : 'btn-secondary'} btn-full`}>
                      {plan.buttonText}
                    </Link>
                  ) : (
                    <Link href={`/checkout?plan=${plan.name.toLowerCase()}`} className={`btn ${plan.popular ? 'btn-primary' : 'btn-secondary'} btn-full`}>
                      {plan.buttonText}
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="pricing-note">
            <p>
              💳 Güvenli ödeme Stripe ve PayTR ile • 🔄 İstediğiniz zaman iptal edin • 
              📞 7/24 müşteri desteği
            </p>
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="addons-section">
        <div className="container">
          <div className="section-header">
            <h2>Ek Hizmetler</h2>
            <p>Planınızı özelleştirin ve ihtiyaçlarınıza göre genişletin</p>
          </div>
          
          <div className="addons-grid">
            {addOns.map((addon, index) => (
              <div key={index} className="addon-card">
                <div className="addon-info">
                  <h4>{addon.name}</h4>
                  <p>{addon.description}</p>
                </div>
                <div className="addon-price">
                  <span className="price">{addon.price}</span>
                  <span className="unit">{addon.unit}</span>
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
            <h2>Plan Karşılaştırması</h2>
            <p>Hangi plan sizin için uygun?</p>
          </div>
          
          <div className="comparison-table">
            <div className="table-scroll">
              <table>
                <thead>
                  <tr>
                    <th>Özellikler</th>
                    <th>Bireysel</th>
                    <th className="popular-column">Profesyonel</th>
                    <th>Kurumsal</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Aylık Kredi</td>
                    <td>2</td>
                    <td className="popular-column">5</td>
                    <td>20</td>
                  </tr>
                  <tr>
                    <td>VIN Analizi</td>
                    <td>✅</td>
                    <td className="popular-column">✅</td>
                    <td>✅</td>
                  </tr>
                  <tr>
                    <td>Boya Analizi</td>
                    <td>✅</td>
                    <td className="popular-column">✅</td>
                    <td>✅</td>
                  </tr>
                  <tr>
                    <td>Motor Sesi</td>
                    <td>✅</td>
                    <td className="popular-column">✅</td>
                    <td>✅</td>
                  </tr>
                  <tr>
                    <td>API Erişimi</td>
                    <td>❌</td>
                    <td className="popular-column">Beta</td>
                    <td>Full</td>
                  </tr>
                  <tr>
                    <td>Toplu İşlem</td>
                    <td>❌</td>
                    <td className="popular-column">✅</td>
                    <td>✅</td>
                  </tr>
                  <tr>
                    <td>Priorite Destek</td>
                    <td>❌</td>
                    <td className="popular-column">✅</td>
                    <td>7/24</td>
                  </tr>
                  <tr>
                    <td>SLA Garantisi</td>
                    <td>❌</td>
                    <td className="popular-column">❌</td>
                    <td>%99.9</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section">
        <div className="container">
          <div className="section-header">
            <h2>Sık Sorulan Sorular</h2>
            <p>Fiyatlandırma hakkında merak ettikleriniz</p>
          </div>
          
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <h4>{faq.question}</h4>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pricing-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Hemen Başlayın</h2>
            <p>Hesap oluşturun ve ilk analizinizi ücretsiz deneyin</p>
            <div className="cta-buttons">
              <Link href="/panel" className="btn btn-primary btn-large">
                <span>🚀</span>
                Ücretsiz Başla
              </Link>
              <Link href="/contact" className="btn btn-secondary btn-large">
                <span>💬</span>
                Satış Ekibi
              </Link>
            </div>
            <p className="cta-note">
              Kredi kartı gerektirmez • 30 saniyede kurulum • Anında kullanım
            </p>
          </div>
        </div>
      </section>

      <style jsx>{`
        .pricing-hero {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 100px 0;
          text-align: center;
        }
        
        .pricing-hero h1 {
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
        
        .pricing-hero p {
          font-size: 20px;
          line-height: 1.6;
          margin-bottom: 48px;
          opacity: 0.9;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }
        
        .pricing-toggle {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          background: rgba(255, 255, 255, 0.1);
          padding: 8px;
          border-radius: 12px;
          backdrop-filter: blur(10px);
          max-width: 400px;
          margin: 0 auto;
        }
        
        .pricing-toggle span {
          font-weight: 600;
          transition: all 0.3s ease;
        }
        
        .pricing-toggle span.active {
          color: white;
        }
        
        .pricing-toggle span:not(.active) {
          opacity: 0.7;
        }
        
        .toggle-button {
          position: relative;
          width: 60px;
          height: 30px;
          background: rgba(255, 255, 255, 0.2);
          border: none;
          border-radius: 15px;
          cursor: pointer;
        }
        
        .toggle-slider {
          position: absolute;
          top: 3px;
          left: 3px;
          width: 24px;
          height: 24px;
          background: white;
          border-radius: 50%;
          transition: transform 0.3s ease;
        }
        
        .toggle-slider.annual {
          transform: translateX(30px);
        }
        
        .discount-badge {
          background: #10b981;
          color: white;
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 600;
          margin-left: 8px;
        }
        
        .pricing-plans {
          padding: 100px 0;
          background: #f8fafc;
        }
        
        .plans-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .plan-card {
          background: white;
          border: 2px solid var(--ring);
          border-radius: 24px;
          padding: 32px;
          position: relative;
          transition: all 0.3s ease;
        }
        
        .plan-card:hover,
        .plan-card.popular {
          border-color: var(--primary);
          transform: translateY(-8px);
          box-shadow: var(--shadow-xl);
        }
        
        .popular-badge {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--gradient-primary);
          color: white;
          padding: 8px 20px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 600;
        }
        
        .plan-header {
          text-align: center;
          margin-bottom: 32px;
        }
        
        .plan-icon {
          font-size: 48px;
          margin-bottom: 16px;
        }
        
        .plan-header h3 {
          font-size: 28px;
          font-weight: 800;
          margin-bottom: 8px;
          color: var(--ink);
        }
        
        .plan-subtitle {
          color: var(--muted);
          margin-bottom: 24px;
        }
        
        .plan-price {
          margin-bottom: 16px;
        }
        
        .price-main {
          display: flex;
          align-items: baseline;
          justify-content: center;
          margin-bottom: 4px;
        }
        
        .currency {
          font-size: 24px;
          font-weight: 600;
          color: var(--primary);
        }
        
        .amount {
          font-size: 48px;
          font-weight: 900;
          color: var(--primary);
        }
        
        .price-period {
          color: var(--muted);
          font-size: 16px;
        }
        
        .price-savings {
          color: #10b981;
          font-size: 14px;
          font-weight: 600;
          margin-top: 4px;
        }
        
        .credit-info {
          background: #f0f9ff;
          padding: 12px 16px;
          border-radius: 12px;
          color: var(--primary);
        }
        
        .credit-info strong {
          display: block;
          font-weight: 700;
          margin-bottom: 2px;
        }
        
        .credit-info small {
          font-size: 12px;
          opacity: 0.8;
        }
        
        .plan-features {
          margin-bottom: 32px;
        }
        
        .plan-features ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .plan-features li {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
          font-size: 16px;
          color: var(--ink);
        }
        
        .check-icon {
          font-size: 16px;
        }
        
        .pricing-note {
          text-align: center;
          margin-top: 48px;
          padding: 24px;
          background: white;
          border-radius: 16px;
          color: var(--muted);
        }
        
        .addons-section {
          padding: 100px 0;
          background: white;
        }
        
        .addons-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }
        
        .addon-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #f8fafc;
          padding: 24px;
          border-radius: 16px;
          border: 1px solid var(--ring);
        }
        
        .addon-info h4 {
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 4px;
          color: var(--ink);
        }
        
        .addon-info p {
          color: var(--muted);
          font-size: 14px;
        }
        
        .addon-price {
          text-align: right;
        }
        
        .addon-price .price {
          display: block;
          font-size: 20px;
          font-weight: 800;
          color: var(--primary);
        }
        
        .addon-price .unit {
          font-size: 12px;
          color: var(--muted);
        }
        
        .comparison-section {
          padding: 100px 0;
          background: #f8fafc;
        }
        
        .table-scroll {
          overflow-x: auto;
          background: white;
          border-radius: 16px;
          box-shadow: var(--shadow-lg);
        }
        
        .comparison-table table {
          width: 100%;
          border-collapse: collapse;
        }
        
        .comparison-table th,
        .comparison-table td {
          padding: 16px;
          text-align: center;
          border-bottom: 1px solid var(--ring);
        }
        
        .comparison-table th {
          background: var(--primary);
          color: white;
          font-weight: 700;
        }
        
        .comparison-table th:first-child,
        .comparison-table td:first-child {
          text-align: left;
          font-weight: 600;
        }
        
        .popular-column {
          background: #f0f9ff !important;
          color: var(--primary) !important;
        }
        
        .faq-section {
          padding: 100px 0;
          background: white;
        }
        
        .faq-list {
          max-width: 800px;
          margin: 0 auto;
        }
        
        .faq-item {
          background: #f8fafc;
          padding: 32px;
          border-radius: 16px;
          margin-bottom: 24px;
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
        
        .pricing-cta {
          padding: 100px 0;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          text-align: center;
        }
        
        .pricing-cta h2 {
          font-size: 48px;
          font-weight: 800;
          margin-bottom: 16px;
        }
        
        .pricing-cta p {
          font-size: 20px;
          margin-bottom: 32px;
          opacity: 0.9;
        }
        
        .cta-buttons {
          display: flex;
          gap: 16px;
          justify-content: center;
          margin-bottom: 24px;
          flex-wrap: wrap;
        }
        
        .cta-note {
          font-size: 14px;
          opacity: 0.8;
        }
        
        @media (max-width: 768px) {
          .pricing-hero h1 {
            font-size: 36px;
          }
          
          .plans-grid {
            grid-template-columns: 1fr;
          }
          
          .addons-grid {
            grid-template-columns: 1fr;
          }
          
          .addon-card {
            flex-direction: column;
            text-align: center;
            gap: 16px;
          }
          
          .pricing-toggle {
            flex-direction: column;
            gap: 12px;
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
