import Link from "next/link";
import Navbar from "../components/Navbar";

export default function About() {
  const team = [
    {
      name: "Ahmet Yılmaz",
      role: "CEO & Kurucu",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      bio: "15 yıllık otomotiv sektörü deneyimi. MIT'de AI üzerine doktora."
    },
    {
      name: "Elif Demir",
      role: "CTO", 
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
      bio: "Google'da 8 yıl machine learning engineer. Stanford CS mezunu."
    },
    {
      name: "Can Öztürk",
      role: "Head of Product",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face", 
      bio: "Startup ekosisteminde 10 yıl. Çeşitli B2B SaaS ürünleri geliştirdi."
    }
  ];

  const stats = [
    { number: "50,000+", label: "Tamamlanan Analiz" },
    { number: "%99.2", label: "Doğruluk Oranı" },
    { number: "500+", label: "Galeri Ortağı" },
    { number: "24/7", label: "Müşteri Desteği" }
  ];

  return (
    <main>
      <Navbar />
      
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <div className="about-hero-content">
            <h1>Araç Ekspertiz Sektörünü <span className="text-highlight">Dönüştürüyoruz</span></h1>
            <p className="hero-subtitle">
              Mivvo, yapay zeka teknolojileri ile geleneksel araç ekspertiz süreçlerini 
              dijitalleştiren ve otomatikleştiren Türkiye'nin önde gelen platformudur.
            </p>
            <div className="hero-stats">
              {stats.map((stat, index) => (
                <div key={index} className="stat-card">
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mission-vision">
        <div className="container">
          <div className="mv-grid">
            <div className="mv-card">
              <div className="mv-icon">🎯</div>
              <h3>Misyonumuz</h3>
              <p>
                Araç alım-satım süreçlerinde şeffaflık ve güven sağlayarak, 
                kullanıcıların bilinçli kararlar vermesine yardımcı olmak. 
                Teknoloji ile ekspertiz maliyetini düşürüp erişilebilirliği artırmak.
              </p>
            </div>
            <div className="mv-card">
              <div className="mv-icon">🚀</div>
              <h3>Vizyonumuz</h3>
              <p>
                2030 yılına kadar Türkiye'de her araç alım-satımının Mivvo 
                teknolojisi ile desteklenmesi ve uluslararası pazarlarda 
                lider konuma gelmek.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="our-story">
        <div className="container">
          <div className="story-content">
            <div className="story-text">
              <h2>Hikayemiz</h2>
              <div className="story-timeline">
                <div className="timeline-item">
                  <div className="timeline-year">2023</div>
                  <div className="timeline-content">
                    <h4>Kuruluş</h4>
                    <p>Otomotiv sektöründeki deneyimlerimizi AI teknolojisi ile birleştirdik.</p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-year">2024</div>
                  <div className="timeline-content">
                    <h4>İlk Ürün</h4>
                    <p>VIN analiz sistemi ve boya tespit algoritmalarını geliştirdik.</p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-year">2025</div>
                  <div className="timeline-content">
                    <h4>Büyüme</h4>
                    <p>Motor sesi analizi ve kurumsal çözümler portföyümüze katıldı.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="story-visual">
              <div className="story-image">
                <img src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop" alt="Mivvo Ofis" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <div className="section-header">
            <h2>Ekibimiz</h2>
            <p>Otomotiv ve teknoloji sektörlerinden deneyimli profesyoneller</p>
          </div>
          
          <div className="team-grid">
            {team.map((member, index) => (
              <div key={index} className="team-card">
                <div className="member-image">
                  <img src={member.image} alt={member.name} />
                </div>
                <div className="member-info">
                  <h4>{member.name}</h4>
                  <div className="member-role">{member.role}</div>
                  <p>{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology */}
      <section className="technology-section">
        <div className="container">
          <div className="tech-content">
            <div className="tech-text">
              <h2>Teknolojilerimiz</h2>
              <p>
                En güncel AI ve makine öğrenmesi teknolojilerini kullanarak 
                sürekli gelişen çözümler sunuyoruz.
              </p>
              <div className="tech-features">
                <div className="tech-feature">
                  <span className="feature-icon">🧠</span>
                  <div>
                    <h4>Computer Vision</h4>
                    <p>Görüntü işleme ile boya ve hasar tespiti</p>
                  </div>
                </div>
                <div className="tech-feature">
                  <span className="feature-icon">🔊</span>
                  <div>
                    <h4>Audio Analysis</h4>
                    <p>Ses analizi ile motor anomali tespiti</p>
                  </div>
                </div>
                <div className="tech-feature">
                  <span className="feature-icon">📊</span>
                  <div>
                    <h4>Machine Learning</h4>
                    <p>Büyük veri ile sürekli öğrenen algoritmalar</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="tech-visual">
              <div className="tech-stats">
                <div className="tech-stat">
                  <div className="stat-value">1M+</div>
                  <div className="stat-desc">Eğitim Verisi</div>
                </div>
                <div className="tech-stat">
                  <div className="stat-value">%99.2</div>
                  <div className="stat-desc">Doğruluk</div>
                </div>
                <div className="tech-stat">
                  <div className="stat-value">2 Sn</div>
                  <div className="stat-desc">Analiz Süresi</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="values-section">
        <div className="container">
          <div className="section-header">
            <h2>Değerlerimiz</h2>
            <p>Çalışma prensipleri ve kurumsal değerlerimiz</p>
          </div>
          
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">🎯</div>
              <h4>Doğruluk</h4>
              <p>Her analiz sonucu şeffaf ve doğru bilgiye dayanır</p>
            </div>
            <div className="value-card">
              <div className="value-icon">⚡</div>
              <h4>Hız</h4>
              <p>Teknoloji ile süreçleri hızlandırır, zamanınızı tasarruf ederiz</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🔒</div>
              <h4>Güvenlik</h4>
              <p>Verileriniz en yüksek güvenlik standartlarında korunur</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h4>Güven</h4>
              <p>Müşteri memnuniyeti ve uzun vadeli ilişkiler önceliğimiz</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Bizimle Çalışmaya Hazır mısınız?</h2>
            <p>Araç ekspertiz ihtiyaçlarınız için hemen başlayın</p>
            <div className="cta-buttons">
              <Link href="/panel" className="btn btn-primary btn-large">
                Hemen Başla
              </Link>
              <Link href="/contact" className="btn btn-secondary btn-large">
                İletişime Geç
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .about-hero {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 100px 0;
          text-align: center;
        }
        
        .about-hero h1 {
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
        
        .hero-subtitle {
          font-size: 20px;
          line-height: 1.6;
          margin-bottom: 48px;
          opacity: 0.9;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }
        
        .hero-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 32px;
          max-width: 800px;
          margin: 0 auto;
        }
        
        .stat-card {
          text-align: center;
        }
        
        .stat-number {
          font-size: 32px;
          font-weight: 900;
          margin-bottom: 8px;
        }
        
        .stat-label {
          font-size: 14px;
          opacity: 0.8;
        }
        
        .mission-vision {
          padding: 100px 0;
          background: white;
        }
        
        .mv-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 48px;
        }
        
        .mv-card {
          text-align: center;
          padding: 48px 32px;
        }
        
        .mv-icon {
          font-size: 64px;
          margin-bottom: 24px;
        }
        
        .mv-card h3 {
          font-size: 32px;
          font-weight: 800;
          margin-bottom: 16px;
          color: var(--ink);
        }
        
        .mv-card p {
          font-size: 18px;
          line-height: 1.6;
          color: var(--muted);
        }
        
        .our-story {
          padding: 100px 0;
          background: #f8fafc;
        }
        
        .story-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
        }
        
        .story-text h2 {
          font-size: 48px;
          font-weight: 800;
          margin-bottom: 48px;
          color: var(--ink);
        }
        
        .story-timeline {
          space-y: 32px;
        }
        
        .timeline-item {
          display: flex;
          gap: 24px;
          margin-bottom: 32px;
        }
        
        .timeline-year {
          background: var(--primary);
          color: white;
          padding: 8px 16px;
          border-radius: 999px;
          font-weight: 700;
          font-size: 14px;
          min-width: 70px;
          text-align: center;
        }
        
        .timeline-content h4 {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 8px;
          color: var(--ink);
        }
        
        .timeline-content p {
          color: var(--muted);
          line-height: 1.6;
        }
        
        .story-image {
          border-radius: 20px;
          overflow: hidden;
          box-shadow: var(--shadow-xl);
        }
        
        .story-image img {
          width: 100%;
          height: auto;
        }
        
        .team-section {
          padding: 100px 0;
          background: white;
        }
        
        .team-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 48px;
        }
        
        .team-card {
          background: white;
          border-radius: 20px;
          box-shadow: var(--shadow-lg);
          overflow: hidden;
          transition: transform 0.3s ease;
        }
        
        .team-card:hover {
          transform: translateY(-8px);
        }
        
        .member-image {
          width: 100%;
          height: 300px;
          overflow: hidden;
        }
        
        .member-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .member-info {
          padding: 32px 24px;
        }
        
        .member-info h4 {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 8px;
          color: var(--ink);
        }
        
        .member-role {
          color: var(--primary);
          font-weight: 600;
          margin-bottom: 16px;
        }
        
        .member-info p {
          color: var(--muted);
          line-height: 1.6;
        }
        
        .technology-section {
          padding: 100px 0;
          background: #f8fafc;
        }
        
        .tech-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
        }
        
        .tech-text h2 {
          font-size: 48px;
          font-weight: 800;
          margin-bottom: 24px;
          color: var(--ink);
        }
        
        .tech-text p {
          font-size: 18px;
          line-height: 1.6;
          margin-bottom: 32px;
          color: var(--muted);
        }
        
        .tech-features {
          space-y: 24px;
        }
        
        .tech-feature {
          display: flex;
          gap: 16px;
          align-items: flex-start;
          margin-bottom: 24px;
        }
        
        .feature-icon {
          font-size: 32px;
          margin-top: 4px;
        }
        
        .tech-feature h4 {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 4px;
          color: var(--ink);
        }
        
        .tech-feature p {
          color: var(--muted);
          font-size: 16px;
        }
        
        .tech-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
        }
        
        .tech-stat {
          background: white;
          padding: 32px 24px;
          border-radius: 16px;
          text-align: center;
          box-shadow: var(--shadow-md);
        }
        
        .stat-value {
          font-size: 32px;
          font-weight: 900;
          color: var(--primary);
          margin-bottom: 8px;
        }
        
        .stat-desc {
          color: var(--muted);
          font-size: 14px;
        }
        
        .values-section {
          padding: 100px 0;
          background: white;
        }
        
        .values-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 32px;
        }
        
        .value-card {
          text-align: center;
          padding: 32px 24px;
          background: white;
          border: 2px solid var(--ring);
          border-radius: 16px;
          transition: all 0.3s ease;
        }
        
        .value-card:hover {
          border-color: var(--primary);
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
        }
        
        .value-icon {
          font-size: 48px;
          margin-bottom: 16px;
        }
        
        .value-card h4 {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 8px;
          color: var(--ink);
        }
        
        .value-card p {
          color: var(--muted);
          font-size: 14px;
          line-height: 1.5;
        }
        
        .about-cta {
          padding: 100px 0;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          text-align: center;
        }
        
        .about-cta h2 {
          font-size: 48px;
          font-weight: 800;
          margin-bottom: 16px;
        }
        
        .about-cta p {
          font-size: 20px;
          margin-bottom: 32px;
          opacity: 0.9;
        }
        
        .cta-buttons {
          display: flex;
          gap: 16px;
          justify-content: center;
        }
        
        @media (max-width: 768px) {
          .about-hero h1 {
            font-size: 36px;
          }
          
          .hero-stats {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .mv-grid,
          .story-content,
          .tech-content {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          
          .team-grid {
            grid-template-columns: 1fr;
          }
          
          .values-grid {
            grid-template-columns: repeat(2, 1fr);
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
