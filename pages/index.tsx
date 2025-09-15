import Navbar from "../components/Navbar";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const testimonials = [
    {
      name: "Ahmet K.",
      role: "Galeri Sahibi",
      text: "Mivvo AI sayesinde müşterilerime %100 güvenilir raporlar sunuyorum. İşimin kalitesi arttı!",
      rating: 5,
      image: "👨‍💼"
    },
    {
      name: "Elif S.",
      role: "İkinci El Araç Alıcısı", 
      text: "VIN analizi ile aldığım araçta gizli hasar yoktu. Tam 15.000 TL zararda kurtuldum!",
      rating: 5,
      image: "👩‍💻"
    },
    {
      name: "Murat T.",
      role: "Ekspertiz Şirketi",
      text: "AI teknolojisi ile analizlerimiz çok hızlandı. Müşteri memnuniyeti %98'e çıktı!",
      rating: 5,
      image: "🔧"
    }
  ];

  const stats = [
    { number: "50,000+", label: "Analiz Tamamlandı" },
    { number: "98.7%", label: "Doğruluk Oranı" },
    { number: "15dk", label: "Ortalama Süre" },
    { number: "24/7", label: "Kesintisiz Hizmet" }
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main>
      <Navbar />
      
      {/* Hero Section - Ultra Modern */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="floating-elements">
            <div className="floating-car">🚗</div>
            <div className="floating-ai">🤖</div>
            <div className="floating-check">✨</div>
            <div className="floating-gear">⚙️</div>
          </div>
        </div>
        
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-text">🚀 Türkiye'nin #1 AI Araç Analizi</span>
            </div>
            
            <h1 className={`hero-title ${isVisible ? 'fade-in' : ''}`}>
              Yapay Zeka ile
              <span className="gradient-text"> Araç Ekspertizi</span>
              <br />Dakikalar İçinde! ⚡
            </h1>
            
            <p className="hero-subtitle">
              VIN analizi, boya tespiti ve motor durumu kontrolü için 
              <strong> %98.7 doğrulukla</strong> çalışan AI teknolojisi.
              Artık <span className="highlight">pahalı ekspertize gerek yok!</span>
            </p>
            
            <div className="hero-actions">
              <Link href="/panel" className="btn btn-primary btn-large">
                <span className="btn-icon">🔬</span>
                <div className="btn-content">
                  <span className="btn-text">Analizi Başlat</span>
                  <span className="btn-subtext">2 dakikada sonuç</span>
                </div>
              </Link>
              
              <Link href="/services" className="btn btn-secondary btn-large">
                <span className="btn-icon">📋</span>
                <div className="btn-content">
                  <span className="btn-text">Nasıl Çalışır?</span>
                  <span className="btn-subtext">Demo videosu izle</span>
                </div>
              </Link>
            </div>
            
            <div className="hero-stats">
              {stats.map((stat, index) => (
                <div key={index} className="stat-item">
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="hero-visual">
            <div className="visual-container">
              <div className="main-dashboard">
                <div className="dashboard-header">
                  <div className="dashboard-dots">
                    <span></span><span></span><span></span>
                  </div>
                  <div className="dashboard-title">Mivvo AI Dashboard</div>
                </div>
                <div className="dashboard-content">
                  <div className="analysis-card active">
                    <div className="card-icon">🔍</div>
                    <div className="card-title">VIN Analizi</div>
                    <div className="card-status">✅ Tamamlandı</div>
                  </div>
                  <div className="analysis-card">
                    <div className="card-icon">🎨</div>
                    <div className="card-title">Boya Kontrolü</div>
                    <div className="card-status">⏳ İşleniyor</div>
                  </div>
                  <div className="analysis-card">
                    <div className="card-icon">🔊</div>
                    <div className="card-title">Motor Sesi</div>
                    <div className="card-status">📋 Bekliyor</div>
                  </div>
                </div>
              </div>
              
              <div className="floating-notifications">
                <div className="notification success">
                  <span>✅</span>
                  <div>
                    <strong>Analiz Tamamlandı!</strong>
                    <p>VIN: WDB463... temiz çıktı</p>
                  </div>
                </div>
                <div className="notification warning">
                  <span>⚠️</span>
                  <div>
                    <strong>Dikkat!</strong>
                    <p>Sol kapıda boyama tespit edildi</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Interactive */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">🎯 Özellikler</div>
            <h2>AI Destekli Araç Analizi Nasıl Çalışır?</h2>
            <p>3 basit adımda profesyonel ekspertiz raporu alın</p>
          </div>

          <div className="features-grid">
            <div className="feature-card hover-card">
              <div className="feature-icon">
                <div className="icon-wrapper">🔎</div>
                <div className="icon-pulse"></div>
              </div>
              <h3>VIN Kodu Analizi</h3>
              <p>17 haneli VIN kodunuzu girin, AI sistemi saniyeler içinde araç geçmişini, hasarları ve teknik detayları analiz etsin.</p>
              <div className="feature-demo">
                <div className="demo-input">WDB463244...</div>
                <div className="demo-arrow">→</div>
                <div className="demo-result">📊 Detaylı Rapor</div>
              </div>
            </div>

            <div className="feature-card hover-card">
              <div className="feature-icon">
                <div className="icon-wrapper">🖼️</div>
                <div className="icon-pulse"></div>
              </div>
              <h3>Boya & Hasar Tespiti</h3>
              <p>Araç fotoğraflarını yükleyin, gelişmiş görüntü işleme algoritması boyalı panelleri %97 doğrulukla tespit etsin.</p>
              <div className="feature-demo">
                <div className="demo-photos">📸 📸 📸</div>
                <div className="demo-arrow">→</div>
                <div className="demo-result">🎨 Boya Haritası</div>
              </div>
            </div>

            <div className="feature-card hover-card">
              <div className="feature-icon">
                <div className="icon-wrapper">🎧</div>
                <div className="icon-pulse"></div>
              </div>
              <h3>Motor Sesi Analizi</h3>
              <p>Motor sesini kaydedin, akustik AI teknolojisi motor durumunu analiz edip potansiel sorunları tespit etsin.</p>
              <div className="feature-demo">
                <div className="demo-audio">🎵 ~~~</div>
                <div className="demo-arrow">→</div>
                <div className="demo-result">⚙️ Motor Durumu</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Dynamic */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">💬 Müşteri Yorumları</div>
            <h2>Binlerce Memnun Kullanıcı</h2>
            <p>Mivvo AI kullanan müşterilerimizin deneyimleri</p>
          </div>

          <div className="testimonials-container">
            <div className="testimonial-card">
              <div className="testimonial-content">
                <div className="stars">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <span key={i}>⭐</span>
                  ))}
                </div>
                <p>"{testimonials[currentTestimonial].text}"</p>
                <div className="testimonial-author">
                  <div className="author-avatar">{testimonials[currentTestimonial].image}</div>
                  <div className="author-info">
                    <strong>{testimonials[currentTestimonial].name}</strong>
                    <span>{testimonials[currentTestimonial].role}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="testimonial-indicators">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`indicator ${index === currentTestimonial ? 'active' : ''}`}
                  onClick={() => setCurrentTestimonial(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section - Modern */}
      <section className="pricing-section">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">💰 Fiyatlandırma</div>
            <h2>Size Uygun Paketi Seçin</h2>
            <p>Geleneksel ekspertizin onda birine profesyonel analiz</p>
          </div>

          <div className="pricing-grid">
            <div className="pricing-card">
              <div className="pricing-header">
                <h3>Deneme</h3>
                <div className="price">
                  <span className="currency">₺</span>
                  <span className="amount">199</span>
                </div>
                <p>2 analiz kredisi</p>
              </div>
              <ul className="pricing-features">
                <li>✅ VIN analizi</li>
                <li>✅ Boya tespiti</li>
                <li>✅ Detaylı PDF rapor</li>
                <li>✅ 7/24 destek</li>
              </ul>
              <Link href="/pricing" className="btn btn-outline btn-full">Başla</Link>
            </div>

            <div className="pricing-card popular">
              <div className="popular-badge">En Popüler</div>
              <div className="pricing-header">
                <h3>Profesyonel</h3>
                <div className="price">
                  <span className="currency">₺</span>
                  <span className="amount">399</span>
                </div>
                <p>5 analiz kredisi</p>
              </div>
              <ul className="pricing-features">
                <li>✅ Tüm analiz türleri</li>
                <li>✅ Motor sesi analizi</li>
                <li>✅ Öncelikli işlem</li>
                <li>✅ Email raporlama</li>
              </ul>
              <Link href="/pricing" className="btn btn-primary btn-full">Seç</Link>
            </div>

            <div className="pricing-card">
              <div className="pricing-header">
                <h3>Kurumsal</h3>
                <div className="price">
                  <span className="amount">Özel</span>
                </div>
                <p>Sınırsız analiz</p>
              </div>
              <ul className="pricing-features">
                <li>✅ API entegrasyonu</li>
                <li>✅ Özel raporlama</li>
                <li>✅ Öncelikli destek</li>
                <li>✅ Eğitim & kurulum</li>
              </ul>
              <Link href="/contact" className="btn btn-outline btn-full">İletişim</Link>
            </div>
          </div>

          <div className="pricing-guarantee">
            <div className="guarantee-icon">🛡️</div>
            <div className="guarantee-text">
              <h4>%100 Memnuniyet Garantisi</h4>
              <p>Sonuçtan memnun kalmazsanız 14 gün içinde paramızı iade edin</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Powerful */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <div className="cta-text">
              <h2>Artık Pahalı Ekspertize Son!</h2>
              <p>
                Geleneksel ekspertiz: <span className="old-price">₺1,500 - ₺3,000</span><br/>
                Mivvo AI ile: <span className="new-price">₺199'dan başlayan fiyatlar</span>
              </p>
              <div className="cta-benefits">
                <div className="benefit">⚡ 15 dakikada sonuç</div>
                <div className="benefit">📱 Evden çıkmadan</div>
                <div className="benefit">🎯 %98.7 doğruluk</div>
              </div>
            </div>
            
            <div className="cta-actions">
              <Link href="/panel" className="btn btn-primary btn-xl">
                <span>🚀</span>
                Hemen Başla
                <div className="btn-shine"></div>
              </Link>
              <div className="cta-note">
                💳 Kredi kartı gerektirmez • 🔐 SSL güvenlik
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <h3>Mivvo AI</h3>
              <p className="footer-brand-desc">Türkiye'nin lider AI destekli araç analizi platformu</p>
              <div className="social-links" aria-hidden="false">
                <a href="#" aria-label="LinkedIn" className="social-link">💼</a>
                <a href="#" aria-label="Twitter" className="social-link">🐦</a>
                <a href="#" aria-label="Instagram" className="social-link">📸</a>
                <a href="#" aria-label="YouTube" className="social-link">🎥</a>
              </div>
            </div>
            
            <div className="footer-links">
              <div className="footer-group">
                <h4>Hizmetler</h4>
                <nav aria-label="Hizmetler">
                  <Link href="/analysis/vin">VIN Analizi</Link>
                  <Link href="/analysis/paint">Boya Kontrolü</Link>
                  <Link href="/analysis/audio">Motor Sesi</Link>
                  <Link href="/services">Tüm Hizmetler</Link>
                </nav>
              </div>
              <div className="footer-group">
                <h4>Şirket</h4>
                <nav aria-label="Şirket">
                  <Link href="/about">Hakkımızda</Link>
                  <Link href="/pricing">Fiyatlandırma</Link>
                  <Link href="/faq">SSS</Link>
                  <Link href="/contact">İletişim</Link>
                </nav>
              </div>
              <div className="footer-group">
                <h4>Yasal</h4>
                <nav aria-label="Yasal">
                  <Link href="/legal/terms">Kullanım Şartları</Link>
                  <Link href="/legal/privacy">Gizlilik Politikası</Link>
                  <Link href="/legal/terms">KVKK</Link>
                  <Link href="/contact">Destek</Link>
                </nav>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} Mivvo AI. Tüm hakları saklıdır.</p>
            <div className="footer-badges">
              <span className="badge">🔐 SSL Güvenlik</span>
              <span className="badge">🇹🇷 Türkiye Menşeli</span>
              <span className="badge">⚡ 7/24 Hizmet</span>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        /* Global Reset & Base Styles */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        /* Hero Section - Ultra Modern */
        .hero-section {
          position: relative;
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          overflow: hidden;
          display: flex;
          align-items: center;
        }

        .hero-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }

        .floating-elements {
          position: absolute;
          width: 100%;
          height: 100%;
        }

        .floating-car,
        .floating-ai,
        .floating-check,
        .floating-gear {
          position: absolute;
          font-size: 40px;
          opacity: 0.1;
          animation: float 6s ease-in-out infinite;
        }

        .floating-car {
          top: 20%;
          left: 10%;
          animation-delay: -1s;
        }

        .floating-ai {
          top: 30%;
          right: 15%;
          animation-delay: -3s;
        }

        .floating-check {
          bottom: 30%;
          left: 20%;
          animation-delay: -2s;
        }

        .floating-gear {
          bottom: 20%;
          right: 10%;
          animation-delay: -4s;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          position: relative;
          z-index: 2;
        }

        .hero-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
          min-height: 80vh;
        }

        .hero-badge {
          display: inline-flex;
          margin-bottom: 24px;
        }

        .badge-text {
          background: rgba(255, 255, 255, 0.15);
          color: white;
          padding: 12px 24px;
          border-radius: 50px;
          font-weight: 600;
          font-size: 14px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
        }

        .hero-title {
          font-size: 56px;
          font-weight: 900;
          line-height: 1.1;
          color: white;
          margin-bottom: 24px;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s ease;
        }

        .hero-title.fade-in {
          opacity: 1;
          transform: translateY(0);
        }

        .gradient-text {
          background: linear-gradient(45deg, #FFD700, #FFA500);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-subtitle {
          font-size: 20px;
          color: rgba(255, 255, 255, 0.9);
          line-height: 1.6;
          margin-bottom: 40px;
        }

        .hero-subtitle strong {
          color: #FFD700;
          font-weight: 700;
        }

        .highlight {
          background: linear-gradient(45deg, #FFD700, #FFA500);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: 700;
        }

        .hero-actions {
          display: flex;
          gap: 20px;
          margin-bottom: 60px;
        }

        .btn {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 16px 24px;
          border: none;
          border-radius: 16px;
          font-weight: 700;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .btn-large {
          padding: 20px 32px;
        }

        .btn-primary {
          background: linear-gradient(45deg, #FF6B6B, #FF8E53);
          color: white;
          box-shadow: 0 8px 32px rgba(255, 107, 107, 0.3);
        }

        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 40px rgba(255, 107, 107, 0.4);
        }

        .btn-secondary {
          background: rgba(255, 255, 255, 0.15);
          color: white;
          border: 2px solid rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(10px);
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.25);
          border-color: rgba(255, 255, 255, 0.5);
          transform: translateY(-3px);
        }

        .btn-content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .btn-text {
          font-size: 16px;
          margin-bottom: 2px;
        }

        .btn-subtext {
          font-size: 12px;
          opacity: 0.8;
          font-weight: 500;
        }

        .btn-icon {
          font-size: 24px;
        }

        .hero-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 32px;
        }

        .stat-item {
          text-align: center;
          color: white;
        }

        .stat-number {
          font-size: 32px;
          font-weight: 900;
          margin-bottom: 8px;
          background: linear-gradient(45deg, #FFD700, #FFA500);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .stat-label {
          font-size: 14px;
          opacity: 0.8;
          font-weight: 600;
        }

        .hero-visual {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .visual-container {
          position: relative;
          width: 100%;
          max-width: 500px;
        }

        .main-dashboard {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 24px;
          padding: 24px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .dashboard-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
          padding-bottom: 16px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        }

        .dashboard-dots {
          display: flex;
          gap: 8px;
        }

        .dashboard-dots span {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #FF6B6B;
        }

        .dashboard-dots span:nth-child(2) {
          background: #FFD93D;
        }

        .dashboard-dots span:nth-child(3) {
          background: #6BCF7F;
        }

        .dashboard-title {
          font-weight: 700;
          color: #333;
        }

        .dashboard-content {
          space-y: 16px;
        }

        .analysis-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px;
          background: #f8f9fa;
          border-radius: 12px;
          margin-bottom: 16px;
          transition: all 0.3s ease;
        }

        .analysis-card.active {
          background: linear-gradient(45deg, #6BCF7F, #44A08D);
          color: white;
          transform: scale(1.02);
        }

        .card-icon {
          font-size: 24px;
        }

        .card-title {
          flex: 1;
          font-weight: 600;
        }

        .card-status {
          font-size: 12px;
          font-weight: 500;
        }

        .floating-notifications {
          position: absolute;
          right: -200px;
          top: 50%;
          transform: translateY(-50%);
          space-y: 16px;
        }

        .notification {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
          margin-bottom: 16px;
          animation: slideIn 2s ease infinite alternate;
        }

        .notification.success {
          border-left: 4px solid #6BCF7F;
        }

        .notification.warning {
          border-left: 4px solid #FFD93D;
        }

        .notification span {
          font-size: 24px;
        }

        .notification strong {
          display: block;
          font-size: 14px;
          margin-bottom: 4px;
        }

        .notification p {
          font-size: 12px;
          color: #666;
          margin: 0;
        }

        @keyframes slideIn {
          0% { transform: translateX(20px); opacity: 0.7; }
          100% { transform: translateX(0); opacity: 1; }
        }

        /* Features Section */
        .features-section {
          padding: 120px 0;
          background: #f8fafc;
        }

        .section-header {
          text-align: center;
          margin-bottom: 80px;
        }

        .section-badge {
          display: inline-block;
          background: linear-gradient(45deg, #667eea, #764ba2);
          color: white;
          padding: 8px 16px;
          border-radius: 50px;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 24px;
        }

        .section-header h2 {
          font-size: 48px;
          font-weight: 900;
          color: #1a202c;
          margin-bottom: 16px;
          line-height: 1.2;
        }

        .section-header p {
          font-size: 20px;
          color: #64748b;
          max-width: 600px;
          margin: 0 auto;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 40px;
        }

        .feature-card {
          background: white;
          padding: 40px 32px;
          border-radius: 24px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          border: 1px solid #e2e8f0;
          transition: all 0.4s ease;
        }

        .hover-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
          border-color: #667eea;
        }

        .feature-icon {
          position: relative;
          margin-bottom: 24px;
        }

        .icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 80px;
          height: 80px;
          background: linear-gradient(45deg, #667eea, #764ba2);
          border-radius: 20px;
          font-size: 32px;
          position: relative;
          z-index: 2;
        }

        .icon-pulse {
          position: absolute;
          top: 0;
          left: 0;
          width: 80px;
          height: 80px;
          background: linear-gradient(45deg, #667eea, #764ba2);
          border-radius: 20px;
          opacity: 0.3;
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.1); opacity: 0.1; }
          100% { transform: scale(1); opacity: 0.3; }
        }

        .feature-card h3 {
          font-size: 24px;
          font-weight: 800;
          color: #1a202c;
          margin-bottom: 16px;
        }

        .feature-card p {
          color: #64748b;
          line-height: 1.6;
          margin-bottom: 24px;
        }

        .feature-demo {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px;
          background: #f1f5f9;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 600;
        }

        .demo-arrow {
          color: #667eea;
          font-weight: 900;
        }

        .demo-result {
          color: #059669;
        }

        /* Testimonials Section */
        .testimonials-section {
          padding: 120px 0;
          background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
        }

        .testimonials-section .section-header h2 {
          color: white;
        }

        .testimonials-section .section-header p {
          color: rgba(255, 255, 255, 0.8);
        }

        .testimonials-container {
          max-width: 800px;
          margin: 0 auto;
        }

        .testimonial-card {
          background: rgba(255, 255, 255, 0.05);
          padding: 48px;
          border-radius: 24px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          margin-bottom: 32px;
        }

        .stars {
          margin-bottom: 24px;
        }

        .stars span {
          font-size: 20px;
          margin-right: 4px;
        }

        .testimonial-content p {
          font-size: 24px;
          color: white;
          line-height: 1.6;
          margin-bottom: 32px;
          font-style: italic;
        }

        .testimonial-author {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .author-avatar {
          width: 60px;
          height: 60px;
          background: linear-gradient(45deg, #667eea, #764ba2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
        }

        .author-info strong {
          display: block;
          color: white;
          font-size: 16px;
          margin-bottom: 4px;
        }

        .author-info span {
          color: rgba(255, 255, 255, 0.7);
          font-size: 14px;
        }

        .testimonial-indicators {
          display: flex;
          justify-content: center;
          gap: 12px;
        }

        .indicator {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: none;
          background: rgba(255, 255, 255, 0.3);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .indicator.active {
          background: #667eea;
          transform: scale(1.2);
        }

        /* Pricing Section */
        .pricing-section {
          padding: 120px 0;
          background: #f8fafc;
        }

        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 32px;
          margin-bottom: 60px;
        }

        .pricing-card {
          background: white;
          padding: 40px 32px;
          border-radius: 24px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          border: 2px solid #e2e8f0;
          position: relative;
          transition: all 0.4s ease;
        }

        .pricing-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
        }

        .pricing-card.popular {
          border-color: #667eea;
          transform: scale(1.05);
        }

        .popular-badge {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          background: linear-gradient(45deg, #667eea, #764ba2);
          color: white;
          padding: 8px 24px;
          border-radius: 50px;
          font-size: 14px;
          font-weight: 700;
        }

        .pricing-header {
          text-align: center;
          margin-bottom: 32px;
        }

        .pricing-header h3 {
          font-size: 24px;
          font-weight: 800;
          color: #1a202c;
          margin-bottom: 16px;
        }

        .price {
          display: flex;
          align-items: baseline;
          justify-content: center;
          margin-bottom: 8px;
        }

        .currency {
          font-size: 24px;
          font-weight: 600;
          color: #667eea;
        }

        .amount {
          font-size: 48px;
          font-weight: 900;
          color: #1a202c;
        }

        .pricing-header p {
          color: #64748b;
          font-size: 16px;
        }

        .pricing-features {
          list-style: none;
          margin-bottom: 32px;
        }

        .pricing-features li {
          padding: 12px 0;
          border-bottom: 1px solid #f1f5f9;
          font-size: 16px;
          color: #4a5568;
        }

        .btn-full {
          width: 100%;
          justify-content: center;
        }

        .btn-outline {
          background: transparent;
          border: 2px solid #667eea;
          color: #667eea;
        }

        .btn-outline:hover {
          background: #667eea;
          color: white;
        }

        .pricing-guarantee {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          padding: 32px;
          background: linear-gradient(45deg, #667eea, #764ba2);
          border-radius: 16px;
          color: white;
        }

        .guarantee-icon {
          font-size: 48px;
        }

        .guarantee-text h4 {
          font-size: 20px;
          font-weight: 800;
          margin-bottom: 8px;
        }

        .guarantee-text p {
          opacity: 0.9;
        }

        /* CTA Section */
        .cta-section {
          padding: 120px 0;
          background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
        }

        .cta-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }

        .cta-text h2 {
          font-size: 42px;
          font-weight: 900;
          color: white;
          margin-bottom: 24px;
          line-height: 1.2;
        }

        .cta-text p {
          font-size: 18px;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 24px;
        }

        .old-price {
          text-decoration: line-through;
          color: #ff6b6b;
        }

        .new-price {
          color: #6bcf7f;
          font-weight: 700;
        }

        .cta-benefits {
          display: flex;
          gap: 24px;
        }

        .benefit {
          background: rgba(255, 255, 255, 0.1);
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          color: white;
        }

        .cta-actions {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }

        .btn-xl {
          padding: 24px 48px;
          font-size: 20px;
          position: relative;
          overflow: hidden;
        }

        .btn-shine {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          animation: shine 3s ease-in-out infinite;
        }

        @keyframes shine {
          0% { left: -100%; }
          100% { left: 100%; }
        }

        .cta-note {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.7);
          text-align: center;
        }

        /* Footer */
        .footer {
          padding: 80px 0 40px 0;
          background: #1a202c;
          color: white;
        }

        .footer-content {
          display: grid;
          grid-template-columns: 2fr 3fr;
          gap: 60px;
          margin-bottom: 40px;
        }

        .footer-brand h3 {
          font-size: 32px;
          font-weight: 900;
          margin-bottom: 16px;
          background: linear-gradient(45deg, #FFD700, #FFA500);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .footer-brand p {
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 12px;
          line-height: 1.6;
        }

        .footer-brand-desc {
          margin-bottom: 18px;
          color: rgba(255,255,255,0.85);
          max-width: 380px;
        }

        .social-links {
          display: flex;
          gap: 16px;
        }

        .social-links a {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          font-size: 20px;
          transition: all 0.3s ease;
          margin-right: 8px;
        }

        .social-links a:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }

        .footer-links {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
        }

        .footer-group h4 {
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 20px;
          color: #FFD700;
        }

        .footer-group nav {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .footer-group a {
          display: block;
          color: rgba(255, 255, 255, 0.9);
          text-decoration: none;
          padding: 8px 0;
          margin: 6px 0;
          transition: all 0.18s ease;
          font-size: 14px;
        }

        .footer-group a:hover {
          color: white;
          padding-left: 8px;
        }

        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 40px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .footer-badges {
          display: flex;
          gap: 16px;
        }

        .footer-badges .badge {
          background: rgba(255, 255, 255, 0.1);
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
        }

        /* Responsive Design */
        @media (max-width: 1200px) {
          .container {
            padding: 0 24px;
          }
          
          .hero-content {
            gap: 50px;
          }
          
          .hero-title {
            font-size: 48px;
          }
        }

        @media (max-width: 1024px) {
          .hero-content {
            grid-template-columns: 1fr;
            gap: 40px;
            text-align: center;
          }
          
          .hero-title {
            font-size: 42px;
          }
          
          .floating-notifications {
            display: none;
          }
          
          .cta-content {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 40px;
          }
          
          .footer-content {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          
          .features-grid {
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          }
        }

        @media (max-width: 768px) {
          .container {
            padding: 0 16px;
          }
          
          .hero-section {
            padding: 80px 0;
          }
          
          .hero-title {
            font-size: 32px;
            line-height: 1.2;
          }
          
          .hero-subtitle {
            font-size: 16px;
          }
          
          .hero-actions {
            flex-direction: column;
            align-items: center;
            gap: 16px;
          }
          
          .hero-stats {
            grid-template-columns: repeat(2, 1fr);
            gap: 24px;
          }
          
          .section-header h2 {
            font-size: 28px;
          }
          
          .section-header p {
            font-size: 16px;
          }
          
          .features-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          
          .feature-card {
            padding: 24px 20px;
          }
          
          .pricing-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          
          .pricing-card.popular {
            transform: none;
          }
          
          .cta-benefits {
            flex-direction: column;
            gap: 12px;
          }
          
          .footer-links {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          
          .footer-bottom {
            flex-direction: column;
            gap: 16px;
            text-align: center;
          }
          
          .testimonial-card {
            padding: 32px 20px;
          }
        }

        @media (max-width: 480px) {
          .container {
            padding: 0 12px;
          }
          
          .hero-section {
            padding: 60px 0;
          }
          
          .hero-title {
            font-size: 24px;
          }
          
          .hero-subtitle {
            font-size: 14px;
          }
          
          .btn-large {
            padding: 14px 20px;
            font-size: 14px;
          }
          
          .hero-stats {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          
          .stat-number {
            font-size: 20px;
          }
          
          .stat-label {
            font-size: 12px;
          }
          
          .section-header h2 {
            font-size: 22px;
          }
          
          .section-header p {
            font-size: 14px;
          }
          
          .feature-card {
            padding: 20px 16px;
          }
          
          .feature-card h3 {
            font-size: 18px;
          }
          
          .pricing-card {
            padding: 20px 16px;
          }
          
          .testimonial-card {
            padding: 24px 16px;
          }
          
          .testimonial-content p {
            font-size: 16px;
          }
          
          .cta-text h2 {
            font-size: 24px;
          }
          
          .cta-text p {
            font-size: 14px;
          }
          
          .btn-xl {
            padding: 16px 24px;
            font-size: 16px;
          }
        }
      `}</style>
    </main>
  );
}
