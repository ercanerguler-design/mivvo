import Link from "next/link";
import Navbar from "../components/Navbar";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulated form submission
    setTimeout(() => {
      setSubmitStatus('success');
      setIsSubmitting(false);
      setFormData({ name: '', email: '', company: '', subject: '', message: '' });
    }, 2000);
  };

  const contactMethods = [
    {
      icon: "📧",
      title: "Email",
      description: "7/24 email desteği",
      value: "destek@mivvo.com",
      action: "mailto:destek@mivvo.com"
    },
    {
      icon: "📞",
      title: "Telefon",
      description: "Çalışma saatleri: 09:00 - 18:00",
      value: "+90 212 555 0123",
      action: "tel:+902125550123"
    },
    {
      icon: "💬",
      title: "Canlı Destek",
      description: "Anında yardım alın",
      value: "Chat ile Bağlan",
      action: "#chat"
    },
    {
      icon: "📍",
      title: "Adres",
      description: "Ofisimizi ziyaret edin",
      value: "Levent, İstanbul",
      action: "https://maps.google.com"
    }
  ];

  const supportCategories = [
    {
      title: "Teknik Destek",
      description: "Analiz sorunları, API kullanımı",
      icon: "🔧"
    },
    {
      title: "Satış Desteği", 
      description: "Plan seçimi, fiyatlandırma",
      icon: "💼"
    },
    {
      title: "Kurumsal Çözümler",
      description: "Özel entegrasyonlar, SLA",
      icon: "🏢"
    },
    {
      title: "Genel Bilgi",
      description: "Özellikler, kullanım kılavuzu",
      icon: "❓"
    }
  ];

  const team = [
    {
      name: "Ahmet Yılmaz",
      role: "Müşteri Başarısı Müdürü",
      email: "ahmet@mivvo.com",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Elif Demir",
      role: "Teknik Destek Uzmanı", 
      email: "elif@mivvo.com",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Can Öztürk",
      role: "Satış Uzmanı",
      email: "can@mivvo.com", 
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    }
  ];

  return (
    <main>
      <Navbar />
      
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container">
          <div className="contact-hero-content">
            <h1>Size <span className="text-highlight">Nasıl Yardımcı</span> Olabiliriz?</h1>
            <p>
              Sorularınız, önerileriniz veya teknik destek talepleriniz için 
              buradan bizimle iletişime geçebilirsiniz.
            </p>
            
            <div className="quick-stats">
              <div className="stat">
                <div className="stat-number">&lt; 1 saat</div>
                <div className="stat-label">Ortalama Yanıt Süresi</div>
              </div>
              <div className="stat">
                <div className="stat-number">%98</div>
                <div className="stat-label">Müşteri Memnuniyeti</div>
              </div>
              <div className="stat">
                <div className="stat-number">7/24</div>
                <div className="stat-label">Destek Hizmeti</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="contact-methods">
        <div className="container">
          <div className="methods-grid">
            {contactMethods.map((method, index) => (
              <a 
                key={index}
                href={method.action}
                className="method-card"
                target={method.action.startsWith('http') ? '_blank' : '_self'}
                rel={method.action.startsWith('http') ? 'noopener noreferrer' : ''}
              >
                <div className="method-icon">{method.icon}</div>
                <div className="method-info">
                  <h3>{method.title}</h3>
                  <p>{method.description}</p>
                  <div className="method-value">{method.value}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Support */}
      <section className="contact-form-section">
        <div className="container">
          <div className="contact-content">
            <div className="form-container">
              <div className="form-header">
                <h2>Mesaj Gönderin</h2>
                <p>Detaylı talebinizi iletebilir, size en kısa sürede dönüş yapalım</p>
              </div>
              
              {submitStatus === 'success' ? (
                <div className="success-message">
                  <div className="success-icon">✅</div>
                  <h3>Mesajınız Gönderildi!</h3>
                  <p>En kısa sürede size geri dönüş yapacağız. Teşekkürler!</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Ad Soyad *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="form-input"
                      />
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="company">Şirket</label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="subject">Konu *</label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="form-input"
                      >
                        <option value="">Seçiniz</option>
                        <option value="technical">Teknik Destek</option>
                        <option value="sales">Satış Desteği</option>
                        <option value="enterprise">Kurumsal Çözümler</option>
                        <option value="general">Genel Bilgi</option>
                        <option value="other">Diğer</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="message">Mesajınız *</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="form-input"
                      placeholder="Sorularınızı veya talebinizi detaylı olarak yazabilirsiniz..."
                    />
                  </div>
                  
                  <button 
                    type="submit" 
                    className="btn btn-primary btn-large btn-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span>⏳</span>
                        Gönderiliyor...
                      </>
                    ) : (
                      <>
                        <span>📤</span>
                        Mesaj Gönder
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
            
            <div className="support-sidebar">
              <div className="support-categories">
                <h3>Destek Kategorileri</h3>
                {supportCategories.map((category, index) => (
                  <div key={index} className="support-category">
                    <div className="category-icon">{category.icon}</div>
                    <div>
                      <h4>{category.title}</h4>
                      <p>{category.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="quick-links">
                <h3>Hızlı Bağlantılar</h3>
                <div className="links-list">
                  <Link href="/services" className="quick-link">
                    📊 Hizmetlerimiz
                  </Link>
                  <Link href="/pricing" className="quick-link">
                    💰 Fiyatlandırma
                  </Link>
                  <Link href="/about" className="quick-link">
                    🏢 Hakkımızda
                  </Link>
                  <Link href="/terms" className="quick-link">
                    📜 Kullanım Şartları
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-contact">
        <div className="container">
          <div className="section-header">
            <h2>Destek Ekibimiz</h2>
            <p>Size yardımcı olmak için burada olan uzmanlarımız</p>
          </div>
          
          <div className="team-grid">
            {team.map((member, index) => (
              <div key={index} className="team-member">
                <div className="member-avatar">
                  <img src={member.image} alt={member.name} />
                </div>
                <div className="member-info">
                  <h4>{member.name}</h4>
                  <div className="member-role">{member.role}</div>
                  <a href={`mailto:${member.email}`} className="member-email">
                    {member.email}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Quick */}
      <section className="faq-quick">
        <div className="container">
          <div className="faq-content">
            <div className="faq-text">
              <h2>Sık Sorulan Soruları İncelediniz mi?</h2>
              <p>
                Çoğu sorunun yanıtını SSS bölümümüzde bulabilirsiniz. 
                Hızlı çözümler için önce buraya göz atmanızı öneriyoruz.
              </p>
              <Link href="/faq" className="btn btn-secondary btn-large">
                <span>❓</span>
                SSS'ye Git
              </Link>
            </div>
            <div className="faq-visual">
              <div className="faq-stats">
                <div className="faq-stat">
                  <div className="stat-value">50+</div>
                  <div className="stat-desc">Soru & Cevap</div>
                </div>
                <div className="faq-stat">
                  <div className="stat-value">%80</div>
                  <div className="stat-desc">Hızlı Çözüm</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Office Hours */}
      <section className="office-hours">
        <div className="container">
          <div className="hours-content">
            <h2>Destek Saatlerimiz</h2>
            <div className="hours-grid">
              <div className="hours-item">
                <div className="hours-icon">📧</div>
                <div>
                  <h4>Email Desteği</h4>
                  <p>7/24 • Her zaman yanıtlıyoruz</p>
                </div>
              </div>
              <div className="hours-item">
                <div className="hours-icon">📞</div>
                <div>
                  <h4>Telefon Desteği</h4>
                  <p>Hafta içi 09:00 - 18:00</p>
                </div>
              </div>
              <div className="hours-item">
                <div className="hours-icon">💬</div>
                <div>
                  <h4>Canlı Destek</h4>
                  <p>Hafta içi 10:00 - 17:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .contact-hero {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 100px 0;
          text-align: center;
        }
        
        .contact-hero h1 {
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
        
        .contact-hero p {
          font-size: 20px;
          line-height: 1.6;
          margin-bottom: 48px;
          opacity: 0.9;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }
        
        .quick-stats {
          display: flex;
          justify-content: center;
          gap: 48px;
          flex-wrap: wrap;
        }
        
        .stat {
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
        
        .contact-methods {
          padding: 100px 0;
          background: white;
        }
        
        .methods-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 32px;
        }
        
        .method-card {
          background: #f8fafc;
          padding: 32px 24px;
          border-radius: 20px;
          text-align: center;
          border: 2px solid var(--ring);
          transition: all 0.3s ease;
          text-decoration: none;
          color: inherit;
        }
        
        .method-card:hover {
          border-color: var(--primary);
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
        }
        
        .method-icon {
          font-size: 48px;
          margin-bottom: 20px;
        }
        
        .method-info h3 {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 8px;
          color: var(--ink);
        }
        
        .method-info p {
          color: var(--muted);
          margin-bottom: 12px;
          font-size: 14px;
        }
        
        .method-value {
          color: var(--primary);
          font-weight: 600;
          font-size: 16px;
        }
        
        .contact-form-section {
          padding: 100px 0;
          background: #f8fafc;
        }
        
        .contact-content {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 64px;
        }
        
        .form-container {
          background: white;
          padding: 48px;
          border-radius: 24px;
          box-shadow: var(--shadow-lg);
        }
        
        .form-header {
          margin-bottom: 32px;
        }
        
        .form-header h2 {
          font-size: 32px;
          font-weight: 800;
          margin-bottom: 8px;
          color: var(--ink);
        }
        
        .form-header p {
          color: var(--muted);
          font-size: 16px;
        }
        
        .contact-form {
          space-y: 24px;
        }
        
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          margin-bottom: 24px;
        }
        
        .form-group {
          margin-bottom: 24px;
        }
        
        .form-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          color: var(--ink);
        }
        
        .form-input {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid var(--ring);
          border-radius: 12px;
          font-size: 16px;
          transition: border-color 0.2s ease;
        }
        
        .form-input:focus {
          outline: none;
          border-color: var(--primary);
        }
        
        .form-input[type="textarea"] {
          resize: vertical;
          min-height: 120px;
        }
        
        .success-message {
          text-align: center;
          padding: 48px 24px;
        }
        
        .success-icon {
          font-size: 64px;
          margin-bottom: 24px;
        }
        
        .success-message h3 {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 12px;
          color: var(--ink);
        }
        
        .success-message p {
          color: var(--muted);
          font-size: 16px;
        }
        
        .support-sidebar {
          space-y: 32px;
        }
        
        .support-categories,
        .quick-links {
          background: white;
          padding: 32px;
          border-radius: 20px;
          box-shadow: var(--shadow-md);
          margin-bottom: 32px;
        }
        
        .support-categories h3,
        .quick-links h3 {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 24px;
          color: var(--ink);
        }
        
        .support-category {
          display: flex;
          gap: 16px;
          align-items: flex-start;
          margin-bottom: 20px;
          padding-bottom: 20px;
          border-bottom: 1px solid var(--ring);
        }
        
        .support-category:last-child {
          margin-bottom: 0;
          padding-bottom: 0;
          border-bottom: none;
        }
        
        .category-icon {
          font-size: 24px;
          margin-top: 4px;
        }
        
        .support-category h4 {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 4px;
          color: var(--ink);
        }
        
        .support-category p {
          font-size: 14px;
          color: var(--muted);
        }
        
        .links-list {
          space-y: 12px;
        }
        
        .quick-link {
          display: block;
          padding: 12px 16px;
          background: #f8fafc;
          border-radius: 8px;
          color: var(--ink);
          text-decoration: none;
          transition: all 0.2s ease;
          margin-bottom: 12px;
        }
        
        .quick-link:hover {
          background: var(--primary);
          color: white;
        }
        
        .team-contact {
          padding: 100px 0;
          background: white;
        }
        
        .team-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
        }
        
        .team-member {
          background: #f8fafc;
          padding: 32px 24px;
          border-radius: 20px;
          text-align: center;
          border: 2px solid var(--ring);
          transition: all 0.3s ease;
        }
        
        .team-member:hover {
          border-color: var(--primary);
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
        }
        
        .member-avatar {
          width: 80px;
          height: 80px;
          margin: 0 auto 20px;
          border-radius: 50%;
          overflow: hidden;
        }
        
        .member-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .member-info h4 {
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 4px;
          color: var(--ink);
        }
        
        .member-role {
          color: var(--muted);
          font-size: 14px;
          margin-bottom: 12px;
        }
        
        .member-email {
          color: var(--primary);
          font-weight: 600;
          font-size: 14px;
          text-decoration: none;
        }
        
        .member-email:hover {
          text-decoration: underline;
        }
        
        .faq-quick {
          padding: 100px 0;
          background: #f8fafc;
        }
        
        .faq-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
        }
        
        .faq-text h2 {
          font-size: 36px;
          font-weight: 800;
          margin-bottom: 16px;
          color: var(--ink);
        }
        
        .faq-text p {
          font-size: 18px;
          line-height: 1.6;
          margin-bottom: 32px;
          color: var(--muted);
        }
        
        .faq-visual {
          display: flex;
          justify-content: center;
        }
        
        .faq-stats {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 32px;
        }
        
        .faq-stat {
          background: white;
          padding: 32px 24px;
          border-radius: 16px;
          text-align: center;
          box-shadow: var(--shadow-md);
        }
        
        .faq-stat .stat-value {
          font-size: 32px;
          font-weight: 900;
          color: var(--primary);
          margin-bottom: 8px;
        }
        
        .faq-stat .stat-desc {
          color: var(--muted);
          font-size: 14px;
        }
        
        .office-hours {
          padding: 80px 0;
          background: white;
        }
        
        .hours-content {
          text-align: center;
        }
        
        .hours-content h2 {
          font-size: 32px;
          font-weight: 800;
          margin-bottom: 48px;
          color: var(--ink);
        }
        
        .hours-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
          max-width: 800px;
          margin: 0 auto;
        }
        
        .hours-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        
        .hours-icon {
          font-size: 48px;
          margin-bottom: 16px;
        }
        
        .hours-item h4 {
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 8px;
          color: var(--ink);
        }
        
        .hours-item p {
          color: var(--muted);
          font-size: 14px;
        }
        
        @media (max-width: 768px) {
          .contact-hero h1 {
            font-size: 36px;
          }
          
          .quick-stats {
            flex-direction: column;
            gap: 24px;
          }
          
          .methods-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 24px;
          }
          
          .contact-content {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          
          .form-row {
            grid-template-columns: 1fr;
            gap: 0;
          }
          
          .team-grid {
            grid-template-columns: 1fr;
          }
          
          .faq-content {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          
          .hours-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
        }
        
        @media (max-width: 480px) {
          .methods-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
}
