import Navbar from "../components/Navbar";
import useSWR from "swr";
import StartAnalysisButton from "../components/StartAnalysisButton";
import Link from "next/link";
import { useState } from "react";

const fetcher = (url: string) => fetch(url).then(r => r.json());

export default function Panel() {
  const { data, mutate } = useSWR("/api/me", fetcher);
  const [activeTab, setActiveTab] = useState('overview');
  
  const credits = data?.user?.credits ?? 0;
  const user = data?.user;

  // Mock data for demonstration - replace with real API calls
  const dashboardStats = {
    totalAnalyses: 24,
    thisMonth: 8,
    accuracy: 98.5,
    savedMoney: 2400
  };

  const recentAnalyses = [
    { id: 1, type: 'VIN', vin: 'WDB463...', date: '2025-01-10', status: 'Tamamlandı', result: 'Temiz' },
    { id: 2, type: 'Boya', vin: 'WVWZZZ1K...', date: '2025-01-08', status: 'Tamamlandı', result: 'Boyalı Panel' },
    { id: 3, type: 'Motor', vin: 'WAUZZZ8V...', date: '2025-01-06', status: 'Tamamlandı', result: 'Normal' },
    { id: 4, type: 'VIN', vin: 'JN8AZ2KR...', date: '2025-01-05', status: 'İşleniyor', result: '-' }
  ];

  const creditHistory = [
    { id: 1, type: 'Satın Alma', amount: 5, date: '2025-01-08', price: '₺399' },
    { id: 2, type: 'Kullanım', amount: -1, date: '2025-01-07', description: 'VIN Analizi' },
    { id: 3, type: 'Kullanım', amount: -1, date: '2025-01-06', description: 'Boya Analizi' },
    { id: 4, type: 'Satın Alma', amount: 2, date: '2025-01-01', price: '₺199' }
  ];

  if (!data) {
    return (
      <main>
        <Navbar />
        <div className="container">
          <div className="loading-card">
            <div className="loading-spinner"></div>
            <p>Dashboard yükleniyor...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      <Navbar />
      
      <div className="dashboard">
        <div className="container">
          {/* Dashboard Header */}
          <div className="dashboard-header">
            <div className="welcome-section">
              <div className="user-avatar">
                <img src={user?.image || '/default-avatar.png'} alt={user?.name} />
              </div>
              <div className="welcome-text">
                <h1>Hoş Geldin, {user?.name?.split(' ')[0] || 'Kullanıcı'}! 👋</h1>
                <p>Dashboard'undan tüm analizlerini yönetebilir ve raporlarına erişebilirsin.</p>
              </div>
            </div>
            
            <div className="credit-info-card">
              <div className="credit-display">
                <div className="credit-number">{credits}</div>
                <div className="credit-label">Mevcut Kredi</div>
              </div>
              <div className="credit-actions">
                <Link href="/pricing" className="btn btn-primary btn-sm">
                  <span>💳</span>
                  Kredi Satın Al
                </Link>
              </div>
            </div>
          </div>

          {/* Dashboard Navigation */}
          <div className="dashboard-nav">
            <button 
              className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              <span>📊</span>
              Genel Bakış
            </button>
            <button 
              className={`tab-button ${activeTab === 'analyses' ? 'active' : ''}`}
              onClick={() => setActiveTab('analyses')}
            >
              <span>🔬</span>
              Analizlerim
            </button>
            <button 
              className={`tab-button ${activeTab === 'credits' ? 'active' : ''}`}
              onClick={() => setActiveTab('credits')}
            >
              <span>🪙</span>
              Kredi Geçmişi
            </button>
            <button 
              className={`tab-button ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              <span>👤</span>
              Profil
            </button>
          </div>

          {/* Dashboard Content */}
          <div className="dashboard-content">
            
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="tab-content">
                <div className="stats-grid">
                  <div className="stat-card">
                    <div className="stat-icon">📈</div>
                    <div className="stat-info">
                      <div className="stat-value">{dashboardStats.totalAnalyses}</div>
                      <div className="stat-label">Toplam Analiz</div>
                    </div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-icon">📅</div>
                    <div className="stat-info">
                      <div className="stat-value">{dashboardStats.thisMonth}</div>
                      <div className="stat-label">Bu Ay</div>
                    </div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-icon">🎯</div>
                    <div className="stat-info">
                      <div className="stat-value">{dashboardStats.accuracy}%</div>
                      <div className="stat-label">Doğruluk Oranı</div>
                    </div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-icon">💰</div>
                    <div className="stat-info">
                      <div className="stat-value">₺{dashboardStats.savedMoney}</div>
                      <div className="stat-label">Tasarruf</div>
                    </div>
                  </div>
                </div>

                <div className="overview-grid">
                  <div className="quick-actions">
                    <h3>Hızlı İşlemler</h3>
                    <div className="action-buttons">
                      <Link href="/analysis/vin" className="action-button">
                        <div className="action-icon">🔎</div>
                        <div className="action-text">
                          <h4>VIN Analizi</h4>
                          <p>Araç bilgilerini otomatik al</p>
                        </div>
                      </Link>
                      <Link href="/analysis/paint" className="action-button">
                        <div className="action-icon">🖌️</div>
                        <div className="action-text">
                          <h4>Boya Kontrolü</h4>
                          <p>Hasar ve boya tespiti</p>
                        </div>
                      </Link>
                      <Link href="/analysis/audio" className="action-button">
                        <div className="action-icon">🎧</div>
                        <div className="action-text">
                          <h4>Motor Sesi</h4>
                          <p>Akustik anomali analizi</p>
                        </div>
                      </Link>
                    </div>
                  </div>

                  <div className="recent-activity">
                    <h3>Son Analizler</h3>
                    <div className="activity-list">
                      {recentAnalyses.slice(0, 4).map((analysis) => (
                        <div key={analysis.id} className="activity-item">
                          <div className="activity-info">
                            <div className="activity-type">{analysis.type}</div>
                            <div className="activity-vin">{analysis.vin}</div>
                          </div>
                          <div className="activity-result">
                            <div className={`status ${analysis.status.toLowerCase()}`}>
                              {analysis.status}
                            </div>
                            <div className="activity-date">{analysis.date}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Link href="#" onClick={() => setActiveTab('analyses')} className="view-all-link">
                      Tüm analizleri gör →
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Analyses Tab */}
            {activeTab === 'analyses' && (
              <div className="tab-content">
                <div className="analyses-header">
                  <h2>Tüm Analizlerim</h2>
                  <StartAnalysisButton />
                </div>
                
                <div className="analyses-table">
                  <div className="table-header">
                    <div>Tür</div>
                    <div>VIN/ID</div>
                    <div>Tarih</div>
                    <div>Durum</div>
                    <div>Sonuç</div>
                    <div>İşlem</div>
                  </div>
                  
                  {recentAnalyses.map((analysis) => (
                    <div key={analysis.id} className="table-row">
                      <div className="analysis-type">
                        <span className="type-badge">{analysis.type}</span>
                      </div>
                      <div className="analysis-vin">{analysis.vin}</div>
                      <div className="analysis-date">{analysis.date}</div>
                      <div>
                        <span className={`status-badge ${analysis.status.toLowerCase()}`}>
                          {analysis.status}
                        </span>
                      </div>
                      <div className="analysis-result">{analysis.result}</div>
                      <div className="analysis-actions">
                        {analysis.status === 'Tamamlandı' ? (
                          <button className="btn btn-sm btn-secondary">
                            📄 Rapor İndir
                          </button>
                        ) : (
                          <button className="btn btn-sm btn-ghost" disabled>
                            ⏳ Bekleniyor
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Credits Tab */}
            {activeTab === 'credits' && (
              <div className="tab-content">
                <div className="credits-header">
                  <div>
                    <h2>Kredi Yönetimi</h2>
                    <p>Kredi bakiyeniz ve işlem geçmişiniz</p>
                  </div>
                  <div className="current-credits">
                    <div className="credit-balance">
                      <span className="balance-number">{credits}</span>
                      <span className="balance-label">Mevcut Kredi</span>
                    </div>
                  </div>
                </div>

                <div className="credit-actions-grid">
                  <div className="credit-packages">
                    <h3>Kredi Paketleri</h3>
                    <div className="package-list">
                      <div className="package-item">
                        <div className="package-info">
                          <h4>Başlangıç Paketi</h4>
                          <p>2 analiz kredisi</p>
                        </div>
                        <div className="package-price">₺199</div>
                        <form action="/api/payment/checkout" method="POST" onSubmit={() => setTimeout(() => mutate(), 800)}>
                          <input type="hidden" name="provider" value="stripe" />
                          <input type="hidden" name="package" value="starter" />
                          <button className="btn btn-primary btn-sm btn-full">Satın Al</button>
                        </form>
                      </div>
                      <div className="package-item popular">
                        <div className="popular-badge">Popüler</div>
                        <div className="package-info">
                          <h4>Profesyonel Paket</h4>
                          <p>5 analiz kredisi</p>
                        </div>
                        <div className="package-price">₺399</div>
                        <form action="/api/payment/checkout" method="POST" onSubmit={() => setTimeout(() => mutate(), 800)}>
                          <input type="hidden" name="provider" value="stripe" />
                          <input type="hidden" name="package" value="professional" />
                          <button className="btn btn-primary btn-sm btn-full">Satın Al</button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="credit-history">
                  <h3>Kredi Geçmişi</h3>
                  <div className="history-list">
                    {creditHistory.map((transaction) => (
                      <div key={transaction.id} className="history-item">
                        <div className="history-info">
                          <div className="history-type">{transaction.type}</div>
                          <div className="history-desc">
                            {transaction.description || transaction.price}
                          </div>
                        </div>
                        <div className="history-amount">
                          <span className={transaction.amount > 0 ? 'positive' : 'negative'}>
                            {transaction.amount > 0 ? '+' : ''}{transaction.amount}
                          </span>
                          <div className="history-date">{transaction.date}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="tab-content">
                <div className="profile-grid">
                  <div className="profile-info">
                    <h2>Profil Bilgileri</h2>
                    <div className="profile-card">
                      <div className="profile-avatar">
                        <img src={user?.image || '/default-avatar.png'} alt={user?.name} />
                      </div>
                      <div className="profile-details">
                        <div className="detail-item">
                          <label>Ad Soyad</label>
                          <div className="detail-value">{user?.name}</div>
                        </div>
                        <div className="detail-item">
                          <label>Email</label>
                          <div className="detail-value">{user?.email}</div>
                        </div>
                        <div className="detail-item">
                          <label>Üyelik Tarihi</label>
                          <div className="detail-value">{new Date(user?.createdAt).toLocaleDateString('tr-TR')}</div>
                        </div>
                        <div className="detail-item">
                          <label>Toplam Kredi</label>
                          <div className="detail-value">{credits}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="account-settings">
                    <h3>Hesap Ayarları</h3>
                    <div className="settings-list">
                      <div className="setting-item">
                        <div className="setting-info">
                          <h4>Email Bildirimleri</h4>
                          <p>Analiz tamamlandığında email al</p>
                        </div>
                        <button className="toggle-switch active">
                          <span className="toggle-slider"></span>
                        </button>
                      </div>
                      <div className="setting-item">
                        <div className="setting-info">
                          <h4>SMS Bildirimleri</h4>
                          <p>Önemli güncellemeler için SMS</p>
                        </div>
                        <button className="toggle-switch">
                          <span className="toggle-slider"></span>
                        </button>
                      </div>
                      <div className="setting-item">
                        <div className="setting-info">
                          <h4>Pazarlama İletişimi</h4>
                          <p>Kampanya ve fırsat bilgilendirmeleri</p>
                        </div>
                        <button className="toggle-switch active">
                          <span className="toggle-slider"></span>
                        </button>
                      </div>
                    </div>
                    
                    <div className="danger-zone">
                      <h4>Tehlikeli İşlemler</h4>
                      <button className="btn btn-danger btn-sm">
                        🗑️ Hesabı Sil
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      <style jsx>{`
        .dashboard {
          min-height: 100vh;
          background: #f8fafc;
          padding: 40px 0;
        }
        
        .loading-card {
          text-align: center;
          padding: 60px 40px;
          background: white;
          border-radius: 16px;
          margin: 40px auto;
          max-width: 400px;
          box-shadow: var(--shadow-md);
        }
        
        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 4px solid var(--ring);
          border-top: 4px solid var(--primary);
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 20px;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
          background: white;
          padding: 32px;
          border-radius: 20px;
          box-shadow: var(--shadow-sm);
        }
        
        .welcome-section {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        
        .user-avatar {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          overflow: hidden;
          border: 3px solid var(--primary);
        }
        
        .user-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .welcome-text h1 {
          font-size: 28px;
          font-weight: 800;
          margin-bottom: 8px;
          color: var(--ink);
        }
        
        .welcome-text p {
          color: var(--muted);
          font-size: 16px;
        }
        
        .credit-info-card {
          display: flex;
          align-items: center;
          gap: 24px;
        }
        
        .credit-display {
          text-align: center;
          background: #f0f9ff;
          padding: 20px 24px;
          border-radius: 16px;
          border: 2px solid var(--primary);
        }
        
        .credit-number {
          font-size: 32px;
          font-weight: 900;
          color: var(--primary);
          margin-bottom: 4px;
        }
        
        .credit-label {
          font-size: 14px;
          color: var(--muted);
        }
        
        .dashboard-nav {
          display: flex;
          gap: 8px;
          margin-bottom: 32px;
          background: white;
          padding: 8px;
          border-radius: 16px;
          box-shadow: var(--shadow-sm);
        }
        
        .tab-button {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 20px;
          border: none;
          background: none;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
          color: var(--muted);
          font-weight: 500;
        }
        
        .tab-button.active,
        .tab-button:hover {
          background: var(--primary);
          color: white;
        }
        
        .dashboard-content {
          background: white;
          border-radius: 20px;
          box-shadow: var(--shadow-sm);
        }
        
        .tab-content {
          padding: 32px;
        }
        
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          margin-bottom: 32px;
        }
        
        .stat-card {
          display: flex;
          align-items: center;
          gap: 16px;
          background: #f8fafc;
          padding: 24px;
          border-radius: 16px;
          border: 1px solid var(--ring);
        }
        
        .stat-icon {
          font-size: 32px;
        }
        
        .stat-value {
          font-size: 24px;
          font-weight: 800;
          color: var(--ink);
          margin-bottom: 4px;
        }
        
        .stat-label {
          font-size: 14px;
          color: var(--muted);
        }
        
        .overview-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
        }
        
        .quick-actions h3,
        .recent-activity h3 {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 20px;
          color: var(--ink);
        }
        
        .action-buttons {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        
        .action-button {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px;
          background: #f8fafc;
          border-radius: 16px;
          border: 2px solid var(--ring);
          transition: all 0.2s ease;
          text-decoration: none;
          color: inherit;
        }
        
        .action-button:hover {
          border-color: var(--primary);
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }
        
        .action-icon {
          font-size: 32px;
        }
        
        .action-text h4 {
          font-size: 16px;
          font-weight: 700;
          margin-bottom: 4px;
          color: var(--ink);
        }
        
        .action-text p {
          font-size: 14px;
          color: var(--muted);
        }
        
        .activity-list {
          space-y: 16px;
        }
        
        .activity-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 20px;
          background: #f8fafc;
          border-radius: 12px;
          margin-bottom: 16px;
        }
        
        .activity-type {
          font-weight: 600;
          color: var(--primary);
          font-size: 14px;
        }
        
        .activity-vin {
          color: var(--ink);
          font-size: 14px;
        }
        
        .activity-result {
          text-align: right;
        }
        
        .status {
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          margin-bottom: 4px;
          display: inline-block;
        }
        
        .status.tamamlandı {
          background: #dcfce7;
          color: #166534;
        }
        
        .status.işleniyor {
          background: #fef3c7;
          color: #92400e;
        }
        
        .activity-date {
          font-size: 12px;
          color: var(--muted);
        }
        
        .view-all-link {
          display: inline-flex;
          align-items: center;
          color: var(--primary);
          font-weight: 600;
          text-decoration: none;
          margin-top: 16px;
        }
        
        .analyses-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
        }
        
        .analyses-header h2 {
          font-size: 24px;
          font-weight: 800;
          color: var(--ink);
        }
        
        .analyses-table {
          border: 1px solid var(--ring);
          border-radius: 16px;
          overflow: hidden;
        }
        
        .table-header,
        .table-row {
          display: grid;
          grid-template-columns: 1fr 2fr 1.5fr 1fr 1.5fr 1.5fr;
          gap: 16px;
          padding: 16px 20px;
          align-items: center;
        }
        
        .table-header {
          background: #f8fafc;
          font-weight: 700;
          color: var(--ink);
          font-size: 14px;
        }
        
        .table-row {
          border-bottom: 1px solid var(--ring);
        }
        
        .table-row:last-child {
          border-bottom: none;
        }
        
        .type-badge {
          background: var(--primary);
          color: white;
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
        }
        
        .status-badge {
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
        }
        
        .status-badge.tamamlandı {
          background: #dcfce7;
          color: #166534;
        }
        
        .status-badge.işleniyor {
          background: #fef3c7;
          color: #92400e;
        }
        
        .credits-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
        }
        
        .credits-header h2 {
          font-size: 24px;
          font-weight: 800;
          color: var(--ink);
          margin-bottom: 8px;
        }
        
        .credits-header p {
          color: var(--muted);
        }
        
        .credit-balance {
          background: var(--primary);
          color: white;
          padding: 20px 24px;
          border-radius: 16px;
          text-align: center;
        }
        
        .balance-number {
          display: block;
          font-size: 32px;
          font-weight: 900;
          margin-bottom: 4px;
        }
        
        .balance-label {
          font-size: 14px;
          opacity: 0.9;
        }
        
        .credit-actions-grid {
          margin-bottom: 32px;
        }
        
        .credit-packages h3 {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 20px;
          color: var(--ink);
        }
        
        .package-list {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }
        
        .package-item {
          position: relative;
          background: #f8fafc;
          padding: 24px;
          border-radius: 16px;
          border: 2px solid var(--ring);
          text-align: center;
        }
        
        .package-item.popular {
          border-color: var(--primary);
          transform: scale(1.05);
        }
        
        .popular-badge {
          position: absolute;
          top: -8px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--primary);
          color: white;
          padding: 4px 12px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 600;
        }
        
        .package-info h4 {
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 8px;
          color: var(--ink);
        }
        
        .package-info p {
          color: var(--muted);
          margin-bottom: 16px;
        }
        
        .package-price {
          font-size: 24px;
          font-weight: 800;
          color: var(--primary);
          margin-bottom: 16px;
        }
        
        .credit-history h3 {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 20px;
          color: var(--ink);
        }
        
        .history-list {
          space-y: 12px;
        }
        
        .history-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 20px;
          background: #f8fafc;
          border-radius: 12px;
          margin-bottom: 12px;
        }
        
        .history-type {
          font-weight: 600;
          color: var(--ink);
          margin-bottom: 4px;
        }
        
        .history-desc {
          font-size: 14px;
          color: var(--muted);
        }
        
        .history-amount {
          text-align: right;
        }
        
        .history-amount span {
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 4px;
          display: block;
        }
        
        .history-amount .positive {
          color: #10b981;
        }
        
        .history-amount .negative {
          color: #ef4444;
        }
        
        .history-date {
          font-size: 12px;
          color: var(--muted);
        }
        
        .profile-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
        }
        
        .profile-info h2 {
          font-size: 24px;
          font-weight: 800;
          margin-bottom: 20px;
          color: var(--ink);
        }
        
        .profile-card {
          background: #f8fafc;
          padding: 32px;
          border-radius: 16px;
          border: 1px solid var(--ring);
        }
        
        .profile-avatar {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          overflow: hidden;
          margin: 0 auto 24px;
          border: 4px solid var(--primary);
        }
        
        .profile-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .detail-item {
          margin-bottom: 20px;
          padding-bottom: 20px;
          border-bottom: 1px solid var(--ring);
        }
        
        .detail-item:last-child {
          margin-bottom: 0;
          padding-bottom: 0;
          border-bottom: none;
        }
        
        .detail-item label {
          display: block;
          font-weight: 600;
          color: var(--muted);
          margin-bottom: 8px;
          font-size: 14px;
        }
        
        .detail-value {
          font-size: 16px;
          color: var(--ink);
        }
        
        .account-settings h3 {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 20px;
          color: var(--ink);
        }
        
        .settings-list {
          space-y: 16px;
          margin-bottom: 32px;
        }
        
        .setting-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          background: #f8fafc;
          border-radius: 12px;
          margin-bottom: 16px;
        }
        
        .setting-info h4 {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 4px;
          color: var(--ink);
        }
        
        .setting-info p {
          font-size: 14px;
          color: var(--muted);
        }
        
        .toggle-switch {
          position: relative;
          width: 50px;
          height: 24px;
          background: #e2e8f0;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: background 0.2s ease;
        }
        
        .toggle-switch.active {
          background: var(--primary);
        }
        
        .toggle-slider {
          position: absolute;
          top: 2px;
          left: 2px;
          width: 20px;
          height: 20px;
          background: white;
          border-radius: 50%;
          transition: transform 0.2s ease;
        }
        
        .toggle-switch.active .toggle-slider {
          transform: translateX(26px);
        }
        
        .danger-zone {
          background: #fef2f2;
          padding: 20px;
          border-radius: 12px;
          border: 1px solid #fecaca;
        }
        
        .danger-zone h4 {
          font-size: 16px;
          font-weight: 700;
          margin-bottom: 12px;
          color: #dc2626;
        }
        
        .btn-danger {
          background: #dc2626;
          color: white;
        }
        
        .btn-danger:hover {
          background: #b91c1c;
        }
        
        .btn-sm {
          padding: 8px 12px;
          font-size: 14px;
        }
        
        .btn-full {
          width: 100%;
          justify-content: center;
        }
        
        .btn-ghost {
          background: transparent;
          border: 1px solid var(--ring);
          color: var(--muted);
        }
        
        .btn-ghost:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        @media (max-width: 768px) {
          .dashboard-header {
            flex-direction: column;
            gap: 20px;
            text-align: center;
          }
          
          .welcome-section {
            flex-direction: column;
            text-align: center;
          }
          
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .overview-grid {
            grid-template-columns: 1fr;
          }
          
          .table-header,
          .table-row {
            grid-template-columns: 1fr 1fr;
            gap: 8px;
            padding: 12px 16px;
            font-size: 14px;
          }
          
          .package-list {
            grid-template-columns: 1fr;
          }
          
          .profile-grid {
            grid-template-columns: 1fr;
          }
          
          .dashboard-nav {
            flex-wrap: wrap;
          }
          
          .tab-button {
            flex: 1;
            justify-content: center;
            padding: 10px 12px;
            font-size: 14px;
          }
        }
        
        @media (max-width: 480px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }
          
          .credit-info-card {
            flex-direction: column;
            gap: 16px;
          }
        }
      `}</style>
    </main>
  );
}
