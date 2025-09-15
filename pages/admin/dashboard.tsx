import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { toast, Toaster } from "react-hot-toast";
import AdminAuth from "../../components/AdminAuth";

interface User {
  id: string;
  name: string;
  email: string;
  credits: number;
  createdAt: string;
}

interface Payment {
  id: string;
  userId: string;
  planId: string;
  amount: number;
  credits: number;
  paymentMethod: string;
  status: string;
  transactionId: string;
  createdAt: string;
  user: {
    name: string;
    email: string;
  };
}

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [users, setUsers] = useState<User[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalRevenue: 0,
    totalCredits: 0,
    activePayments: 0
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [usersRes, paymentsRes] = await Promise.all([
        fetch('/api/admin/users'),
        fetch('/api/admin/payments')
      ]);

      const usersData = await usersRes.json();
      const paymentsData = await paymentsRes.json();

      setUsers(usersData.users || []);
      setPayments(paymentsData.payments || []);

      // İstatistikleri hesapla
      const totalRevenue = paymentsData.payments?.reduce((sum: number, payment: Payment) => 
        payment.status === 'completed' ? sum + payment.amount : sum, 0) || 0;
      
      const totalCredits = usersData.users?.reduce((sum: number, user: User) => 
        sum + user.credits, 0) || 0;

      setStats({
        totalUsers: usersData.users?.length || 0,
        totalRevenue,
        totalCredits,
        activePayments: paymentsData.payments?.filter((p: Payment) => p.status === 'completed').length || 0
      });

    } catch (error) {
      toast.error('Veri yüklenirken hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    router.push("/admin/login");
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Bu kullanıcıyı silmek istediğinizden emin misiniz?')) return;
    
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        toast.success('Kullanıcı başarıyla silindi');
        fetchData();
      } else {
        toast.error('Kullanıcı silinirken hata oluştu');
      }
    } catch (error) {
      toast.error('Bir hata oluştu');
    }
  };

  const handleAddCredits = async (userId: string, credits: number) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}/credits`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ credits })
      });
      
      if (response.ok) {
        toast.success(`${credits} kredi başarıyla eklendi`);
        fetchData();
      } else {
        toast.error('Kredi eklenirken hata oluştu');
      }
    } catch (error) {
      toast.error('Bir hata oluştu');
    }
  };

  const handleUpdatePaymentStatus = async (paymentId: string, status: string) => {
    try {
      const response = await fetch(`/api/admin/payments/${paymentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status })
      });
      
      if (response.ok) {
        toast.success('Ödeme durumu güncellendi');
        fetchData();
      } else {
        toast.error('Durum güncellenirken hata oluştu');
      }
    } catch (error) {
      toast.error('Bir hata oluştu');
    }
  };

  const exportUsers = () => {
    const csvContent = [
      ['Ad', 'Email', 'Kredi', 'Kayıt Tarihi'],
      ...users.map(user => [user.name, user.email, user.credits, formatDate(user.createdAt)])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'kullanicilar.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success('Kullanıcı listesi indirildi');
  };

  const exportPayments = () => {
    const csvContent = [
      ['Kullanıcı', 'Plan', 'Tutar', 'Kredi', 'Durum', 'Tarih'],
      ...payments.map(payment => [
        payment.user.name,
        payment.planId,
        payment.amount,
        payment.credits,
        payment.status,
        formatDate(payment.createdAt)
      ])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'odemeler.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success('Ödeme listesi indirildi');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY'
    }).format(amount);
  };


  return (
    <AdminAuth>
      <div style={{
        minHeight: '100vh',
        background: '#f8fafc'
      }}>
      
      {/* Header */}
      <div style={{
        background: 'white',
        borderBottom: '1px solid #e5e7eb',
        padding: '20px 0'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <h1 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#1f2937',
              margin: '0 0 4px 0'
            }}>
              Admin Dashboard
            </h1>
            <p style={{
              color: '#6b7280',
              margin: 0,
              fontSize: '14px'
            }}>
              Mivvo Yönetim Paneli
            </p>
          </div>
          
          <button
            onClick={handleLogout}
            style={{
              padding: '8px 16px',
              background: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Çıkış Yap
          </button>
        </div>
      </div>

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '20px'
      }}>
        
        {/* Navigation Tabs */}
        <div style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '32px',
          background: 'white',
          padding: '8px',
          borderRadius: '12px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
          overflowX: 'auto'
        }}>
          {[
            { id: 'overview', label: 'Genel Bakış', icon: '📊' },
            { id: 'users', label: 'Kullanıcılar', icon: '👥' },
            { id: 'payments', label: 'Siparişler', icon: '💳' },
            { id: 'analytics', label: 'Analitik', icon: '📈' },
            { id: 'reports', label: 'Raporlar', icon: '📋' },
            { id: 'settings', label: 'Ayarlar', icon: '⚙️' },
            { id: 'logs', label: 'Loglar', icon: '📝' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                flex: 1,
                padding: '12px 16px',
                border: 'none',
                background: activeTab === tab.id ? '#1e40af' : 'transparent',
                color: activeTab === tab.id ? 'white' : '#6b7280',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'all 0.2s'
              }}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div>
            {/* Stats Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '24px',
              marginBottom: '32px'
            }}>
              {[
                { title: 'Toplam Kullanıcı', value: stats.totalUsers, icon: '👥', color: '#3b82f6' },
                { title: 'Toplam Gelir', value: formatCurrency(stats.totalRevenue), icon: '💰', color: '#10b981' },
                { title: 'Toplam Kredi', value: stats.totalCredits, icon: '🪙', color: '#f59e0b' },
                { title: 'Başarılı Ödeme', value: stats.activePayments, icon: '✅', color: '#8b5cf6' }
              ].map((stat, index) => (
                <div key={index} style={{
                  background: 'white',
                  padding: '24px',
                  borderRadius: '16px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                  border: '1px solid #e5e7eb'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '16px'
                  }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      background: `${stat.color}20`,
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '24px'
                    }}>
                      {stat.icon}
                    </div>
                  </div>
                  <div>
                    <h3 style={{
                      fontSize: '32px',
                      fontWeight: 'bold',
                      color: '#1f2937',
                      margin: '0 0 4px 0'
                    }}>
                      {stat.value}
                    </h3>
                    <p style={{
                      color: '#6b7280',
                      fontSize: '14px',
                      margin: 0
                    }}>
                      {stat.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
              border: '1px solid #e5e7eb'
            }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#1f2937',
                margin: '0 0 20px 0'
              }}>
                Son Aktiviteler
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {payments.slice(0, 5).map((payment) => (
                  <div key={payment.id} style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px',
                    background: '#f8fafc',
                    borderRadius: '8px'
                  }}>
                    <div>
                      <p style={{
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#1f2937',
                        margin: '0 0 4px 0'
                      }}>
                        {payment.user.name} - {payment.planId} Planı
                      </p>
                      <p style={{
                        fontSize: '12px',
                        color: '#6b7280',
                        margin: 0
                      }}>
                        {payment.user.email}
                      </p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#10b981',
                        margin: '0 0 4px 0'
                      }}>
                        {formatCurrency(payment.amount)}
                      </p>
                      <p style={{
                        fontSize: '12px',
                        color: '#6b7280',
                        margin: 0
                      }}>
                        {formatDate(payment.createdAt)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '24px'
            }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#1f2937',
                margin: 0
              }}>
                Kullanıcılar ({users.length})
              </h3>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={exportUsers}
                  style={{
                    padding: '8px 16px',
                    background: '#10b981',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  📊 CSV İndir
                </button>
                <button
                  onClick={fetchData}
                  style={{
                    padding: '8px 16px',
                    background: '#1e40af',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  🔄 Yenile
                </button>
              </div>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse'
              }}>
                <thead>
                  <tr style={{
                    background: '#f8fafc',
                    borderBottom: '1px solid #e5e7eb'
                  }}>
                    <th style={{
                      padding: '12px',
                      textAlign: 'left',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#374151'
                    }}>Kullanıcı</th>
                    <th style={{
                      padding: '12px',
                      textAlign: 'left',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#374151'
                    }}>Email</th>
                    <th style={{
                      padding: '12px',
                      textAlign: 'left',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#374151'
                    }}>Kredi</th>
                    <th style={{
                      padding: '12px',
                      textAlign: 'left',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#374151'
                    }}>Kayıt Tarihi</th>
                    <th style={{
                      padding: '12px',
                      textAlign: 'left',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#374151'
                    }}>İşlemler</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} style={{
                      borderBottom: '1px solid #f3f4f6'
                    }}>
                      <td style={{
                        padding: '12px',
                        fontSize: '14px',
                        color: '#1f2937',
                        fontWeight: '600'
                      }}>
                        {user.name}
                      </td>
                      <td style={{
                        padding: '12px',
                        fontSize: '14px',
                        color: '#6b7280'
                      }}>
                        {user.email}
                      </td>
                      <td style={{
                        padding: '12px',
                        fontSize: '14px',
                        color: '#1f2937',
                        fontWeight: '600'
                      }}>
                        {user.credits}
                      </td>
                      <td style={{
                        padding: '12px',
                        fontSize: '14px',
                        color: '#6b7280'
                      }}>
                        {formatDate(user.createdAt)}
                      </td>
                      <td style={{
                        padding: '12px',
                        fontSize: '14px'
                      }}>
                        <div style={{ display: 'flex', gap: '4px' }}>
                          <button
                            onClick={() => handleAddCredits(user.id, 10)}
                            style={{
                              padding: '4px 8px',
                              background: '#10b981',
                              color: 'white',
                              border: 'none',
                              borderRadius: '4px',
                              fontSize: '12px',
                              cursor: 'pointer'
                            }}
                            title="10 Kredi Ekle"
                          >
                            +10
                          </button>
                          <button
                            onClick={() => handleAddCredits(user.id, 50)}
                            style={{
                              padding: '4px 8px',
                              background: '#3b82f6',
                              color: 'white',
                              border: 'none',
                              borderRadius: '4px',
                              fontSize: '12px',
                              cursor: 'pointer'
                            }}
                            title="50 Kredi Ekle"
                          >
                            +50
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            style={{
                              padding: '4px 8px',
                              background: '#ef4444',
                              color: 'white',
                              border: 'none',
                              borderRadius: '4px',
                              fontSize: '12px',
                              cursor: 'pointer'
                            }}
                            title="Kullanıcıyı Sil"
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Payments Tab */}
        {activeTab === 'payments' && (
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '24px'
            }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#1f2937',
                margin: 0
              }}>
                Siparişler ({payments.length})
              </h3>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={exportPayments}
                  style={{
                    padding: '8px 16px',
                    background: '#10b981',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  📊 CSV İndir
                </button>
                <button
                  onClick={fetchData}
                  style={{
                    padding: '8px 16px',
                    background: '#1e40af',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  🔄 Yenile
                </button>
              </div>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse'
              }}>
                <thead>
                  <tr style={{
                    background: '#f8fafc',
                    borderBottom: '1px solid #e5e7eb'
                  }}>
                    <th style={{
                      padding: '12px',
                      textAlign: 'left',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#374151'
                    }}>Kullanıcı</th>
                    <th style={{
                      padding: '12px',
                      textAlign: 'left',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#374151'
                    }}>Plan</th>
                    <th style={{
                      padding: '12px',
                      textAlign: 'left',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#374151'
                    }}>Tutar</th>
                    <th style={{
                      padding: '12px',
                      textAlign: 'left',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#374151'
                    }}>Kredi</th>
                    <th style={{
                      padding: '12px',
                      textAlign: 'left',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#374151'
                    }}>Durum</th>
                    <th style={{
                      padding: '12px',
                      textAlign: 'left',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#374151'
                    }}>Tarih</th>
                    <th style={{
                      padding: '12px',
                      textAlign: 'left',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#374151'
                    }}>İşlemler</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment) => (
                    <tr key={payment.id} style={{
                      borderBottom: '1px solid #f3f4f6'
                    }}>
                      <td style={{
                        padding: '12px',
                        fontSize: '14px',
                        color: '#1f2937',
                        fontWeight: '600'
                      }}>
                        {payment.user.name}
                      </td>
                      <td style={{
                        padding: '12px',
                        fontSize: '14px',
                        color: '#6b7280'
                      }}>
                        {payment.planId}
                      </td>
                      <td style={{
                        padding: '12px',
                        fontSize: '14px',
                        color: '#10b981',
                        fontWeight: '600'
                      }}>
                        {formatCurrency(payment.amount)}
                      </td>
                      <td style={{
                        padding: '12px',
                        fontSize: '14px',
                        color: '#1f2937',
                        fontWeight: '600'
                      }}>
                        {payment.credits}
                      </td>
                      <td style={{
                        padding: '12px',
                        fontSize: '14px'
                      }}>
                        <span style={{
                          padding: '4px 8px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: '600',
                          background: payment.status === 'completed' ? '#dcfce7' : '#fef3c7',
                          color: payment.status === 'completed' ? '#166534' : '#92400e'
                        }}>
                          {payment.status === 'completed' ? 'Tamamlandı' : 'Beklemede'}
                        </span>
                      </td>
                      <td style={{
                        padding: '12px',
                        fontSize: '14px',
                        color: '#6b7280'
                      }}>
                        {formatDate(payment.createdAt)}
                      </td>
                      <td style={{
                        padding: '12px',
                        fontSize: '14px'
                      }}>
                        <div style={{ display: 'flex', gap: '4px' }}>
                          {payment.status === 'pending' && (
                            <button
                              onClick={() => handleUpdatePaymentStatus(payment.id, 'completed')}
                              style={{
                                padding: '4px 8px',
                                background: '#10b981',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                fontSize: '12px',
                                cursor: 'pointer'
                              }}
                              title="Onayla"
                            >
                              ✅
                            </button>
                          )}
                          {payment.status === 'completed' && (
                            <button
                              onClick={() => handleUpdatePaymentStatus(payment.id, 'failed')}
                              style={{
                                padding: '4px 8px',
                                background: '#f59e0b',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                fontSize: '12px',
                                cursor: 'pointer'
                              }}
                              title="İptal Et"
                            >
                              ❌
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <div>
            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
              border: '1px solid #e5e7eb',
              marginBottom: '24px'
            }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#1f2937',
                margin: '0 0 20px 0'
              }}>
                📊 Raporlar ve Export
              </h3>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '20px'
              }}>
                <div style={{
                  background: '#f8fafc',
                  padding: '20px',
                  borderRadius: '12px',
                  border: '1px solid #e5e7eb'
                }}>
                  <h4 style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#1f2937',
                    margin: '0 0 12px 0'
                  }}>
                    👥 Kullanıcı Raporları
                  </h4>
                  <p style={{
                    fontSize: '14px',
                    color: '#6b7280',
                    margin: '0 0 16px 0'
                  }}>
                    Tüm kullanıcı verilerini CSV formatında indirin
                  </p>
                  <button
                    onClick={exportUsers}
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: '#10b981',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    📥 Kullanıcı Listesi İndir
                  </button>
                </div>

                <div style={{
                  background: '#f8fafc',
                  padding: '20px',
                  borderRadius: '12px',
                  border: '1px solid #e5e7eb'
                }}>
                  <h4 style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#1f2937',
                    margin: '0 0 12px 0'
                  }}>
                    💳 Ödeme Raporları
                  </h4>
                  <p style={{
                    fontSize: '14px',
                    color: '#6b7280',
                    margin: '0 0 16px 0'
                  }}>
                    Tüm ödeme verilerini CSV formatında indirin
                  </p>
                  <button
                    onClick={exportPayments}
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: '#3b82f6',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    📥 Ödeme Listesi İndir
                  </button>
                </div>

                <div style={{
                  background: '#f8fafc',
                  padding: '20px',
                  borderRadius: '12px',
                  border: '1px solid #e5e7eb'
                }}>
                  <h4 style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#1f2937',
                    margin: '0 0 12px 0'
                  }}>
                    📈 Gelir Raporu
                  </h4>
                  <p style={{
                    fontSize: '14px',
                    color: '#6b7280',
                    margin: '0 0 16px 0'
                  }}>
                    Aylık gelir raporunu görüntüleyin
                  </p>
                  <button
                    onClick={() => toast.success('Gelir raporu hazırlanıyor...')}
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: '#8b5cf6',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    📊 Gelir Raporu Oluştur
                  </button>
                </div>
              </div>
            </div>

            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
              border: '1px solid #e5e7eb'
            }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#1f2937',
                margin: '0 0 20px 0'
              }}>
                📋 Sistem Raporları
              </h3>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '16px'
              }}>
                <div style={{
                  background: '#f0f9ff',
                  padding: '16px',
                  borderRadius: '12px',
                  border: '1px solid #bfdbfe'
                }}>
                  <h4 style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#1e40af',
                    margin: '0 0 8px 0'
                  }}>
                    Toplam Kullanıcı
                  </h4>
                  <p style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: '#1e40af',
                    margin: 0
                  }}>
                    {stats.totalUsers}
                  </p>
                </div>
                
                <div style={{
                  background: '#f0fdf4',
                  padding: '16px',
                  borderRadius: '12px',
                  border: '1px solid #bbf7d0'
                }}>
                  <h4 style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#166534',
                    margin: '0 0 8px 0'
                  }}>
                    Toplam Gelir
                  </h4>
                  <p style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: '#166534',
                    margin: 0
                  }}>
                    {formatCurrency(stats.totalRevenue)}
                  </p>
                </div>
                
                <div style={{
                  background: '#fef3c7',
                  padding: '16px',
                  borderRadius: '12px',
                  border: '1px solid #fde68a'
                }}>
                  <h4 style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#92400e',
                    margin: '0 0 8px 0'
                  }}>
                    Başarılı Ödeme
                  </h4>
                  <p style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: '#92400e',
                    margin: 0
                  }}>
                    {stats.activePayments}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div>
            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
              border: '1px solid #e5e7eb',
              marginBottom: '24px'
            }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#1f2937',
                margin: '0 0 20px 0'
              }}>
                ⚙️ Sistem Ayarları
              </h3>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '20px'
              }}>
                <div style={{
                  background: '#f8fafc',
                  padding: '20px',
                  borderRadius: '12px',
                  border: '1px solid #e5e7eb'
                }}>
                  <h4 style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#1f2937',
                    margin: '0 0 12px 0'
                  }}>
                    🔧 Genel Ayarlar
                  </h4>
                  <div style={{ marginBottom: '12px' }}>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#374151',
                      marginBottom: '4px'
                    }}>
                      Site Başlığı
                    </label>
                    <input
                      type="text"
                      defaultValue="Mivvo Admin Panel"
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        fontSize: '14px'
                      }}
                    />
                  </div>
                  <div style={{ marginBottom: '12px' }}>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#374151',
                      marginBottom: '4px'
                    }}>
                      Varsayılan Kredi
                    </label>
                    <input
                      type="number"
                      defaultValue="2"
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        fontSize: '14px'
                      }}
                    />
                  </div>
                  <button
                    onClick={() => toast.success('Ayarlar kaydedildi')}
                    style={{
                      width: '100%',
                      padding: '10px',
                      background: '#1e40af',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    💾 Kaydet
                  </button>
                </div>

                <div style={{
                  background: '#f8fafc',
                  padding: '20px',
                  borderRadius: '12px',
                  border: '1px solid #e5e7eb'
                }}>
                  <h4 style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#1f2937',
                    margin: '0 0 12px 0'
                  }}>
                    🔐 Güvenlik Ayarları
                  </h4>
                  <div style={{ marginBottom: '12px' }}>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#374151',
                      marginBottom: '4px'
                    }}>
                      Admin Şifresi
                    </label>
                    <input
                      type="password"
                      defaultValue="12345"
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        fontSize: '14px'
                      }}
                    />
                  </div>
                  <div style={{ marginBottom: '12px' }}>
                    <label style={{
                      display: 'flex',
                      alignItems: 'center',
                      fontSize: '14px',
                      color: '#374151',
                      cursor: 'pointer'
                    }}>
                      <input
                        type="checkbox"
                        defaultChecked
                        style={{ marginRight: '8px' }}
                      />
                      İki faktörlü kimlik doğrulama
                    </label>
                  </div>
                  <button
                    onClick={() => toast.success('Güvenlik ayarları güncellendi')}
                    style={{
                      width: '100%',
                      padding: '10px',
                      background: '#ef4444',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    🔒 Güvenlik Güncelle
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Logs Tab */}
        {activeTab === 'logs' && (
          <div>
            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
              border: '1px solid #e5e7eb'
            }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#1f2937',
                margin: '0 0 20px 0'
              }}>
                📝 Sistem Logları
              </h3>
              
              <div style={{
                background: '#1f2937',
                borderRadius: '8px',
                padding: '16px',
                fontFamily: 'monospace',
                fontSize: '12px',
                color: '#10b981',
                maxHeight: '400px',
                overflowY: 'auto'
              }}>
                <div style={{ marginBottom: '8px' }}>
                  <span style={{ color: '#6b7280' }}>[2024-01-15 14:30:25]</span> 
                  <span style={{ color: '#10b981' }}> INFO:</span> 
                  <span style={{ color: '#ffffff' }}> Admin girişi başarılı</span>
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <span style={{ color: '#6b7280' }}>[2024-01-15 14:28:15]</span> 
                  <span style={{ color: '#f59e0b' }}> WARN:</span> 
                  <span style={{ color: '#ffffff' }}> Yüksek CPU kullanımı tespit edildi</span>
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <span style={{ color: '#6b7280' }}>[2024-01-15 14:25:42]</span> 
                  <span style={{ color: '#10b981' }}> INFO:</span> 
                  <span style={{ color: '#ffffff' }}> Yeni kullanıcı kaydı: test@example.com</span>
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <span style={{ color: '#6b7280' }}>[2024-01-15 14:22:18]</span> 
                  <span style={{ color: '#3b82f6' }}> DEBUG:</span> 
                  <span style={{ color: '#ffffff' }}> Veritabanı bağlantısı kuruldu</span>
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <span style={{ color: '#6b7280' }}>[2024-01-15 14:20:05]</span> 
                  <span style={{ color: '#ef4444' }}> ERROR:</span> 
                  <span style={{ color: '#ffffff' }}> API endpoint hatası: /api/payment/process</span>
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <span style={{ color: '#6b7280' }}>[2024-01-15 14:18:33]</span> 
                  <span style={{ color: '#10b981' }}> INFO:</span> 
                  <span style={{ color: '#ffffff' }}> Ödeme işlemi tamamlandı: TXN_123456</span>
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <span style={{ color: '#6b7280' }}>[2024-01-15 14:15:21]</span> 
                  <span style={{ color: '#10b981' }}> INFO:</span> 
                  <span style={{ color: '#ffffff' }}> Server başlatıldı: port 3000</span>
                </div>
              </div>
              
              <div style={{
                marginTop: '16px',
                display: 'flex',
                gap: '8px'
              }}>
                <button
                  onClick={() => toast.success('Loglar temizlendi')}
                  style={{
                    padding: '8px 16px',
                    background: '#ef4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  🗑️ Logları Temizle
                </button>
                <button
                  onClick={() => toast.success('Log dosyası indirildi')}
                  style={{
                    padding: '8px 16px',
                    background: '#10b981',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  📥 Log İndir
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div>
            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
              border: '1px solid #e5e7eb',
              marginBottom: '24px'
            }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#1f2937',
                margin: '0 0 20px 0'
              }}>
                Gelir Analizi
              </h3>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '16px'
              }}>
                {[
                  { label: 'Profesyonel Plan', count: payments.filter(p => p.planId === 'profesyonel').length, revenue: payments.filter(p => p.planId === 'profesyonel').reduce((sum, p) => sum + p.amount, 0) },
                  { label: 'Bireysel Plan', count: payments.filter(p => p.planId === 'bireysel').length, revenue: payments.filter(p => p.planId === 'bireysel').reduce((sum, p) => sum + p.amount, 0) },
                  { label: 'Kurumsal Plan', count: payments.filter(p => p.planId === 'kurumsal').length, revenue: payments.filter(p => p.planId === 'kurumsal').reduce((sum, p) => sum + p.amount, 0) }
                ].map((plan, index) => (
                  <div key={index} style={{
                    background: '#f8fafc',
                    padding: '16px',
                    borderRadius: '12px',
                    border: '1px solid #e5e7eb'
                  }}>
                    <h4 style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      color: '#1f2937',
                      margin: '0 0 8px 0'
                    }}>
                      {plan.label}
                    </h4>
                    <p style={{
                      fontSize: '14px',
                      color: '#6b7280',
                      margin: '0 0 4px 0'
                    }}>
                      Satış: {plan.count}
                    </p>
                    <p style={{
                      fontSize: '16px',
                      fontWeight: 'bold',
                      color: '#10b981',
                      margin: 0
                    }}>
                      {formatCurrency(plan.revenue)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
              border: '1px solid #e5e7eb'
            }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#1f2937',
                margin: '0 0 20px 0'
              }}>
                Kullanıcı İstatistikleri
              </h3>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '16px'
              }}>
                <div style={{
                  background: '#f0f9ff',
                  padding: '16px',
                  borderRadius: '12px',
                  border: '1px solid #bfdbfe'
                }}>
                  <h4 style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#1e40af',
                    margin: '0 0 8px 0'
                  }}>
                    Ortalama Kredi
                  </h4>
                  <p style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: '#1e40af',
                    margin: 0
                  }}>
                    {users.length > 0 ? Math.round(users.reduce((sum, user) => sum + user.credits, 0) / users.length) : 0}
                  </p>
                </div>
                
                <div style={{
                  background: '#f0fdf4',
                  padding: '16px',
                  borderRadius: '12px',
                  border: '1px solid #bbf7d0'
                }}>
                  <h4 style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#166534',
                    margin: '0 0 8px 0'
                  }}>
                    En Yüksek Kredi
                  </h4>
                  <p style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: '#166534',
                    margin: 0
                  }}>
                    {users.length > 0 ? Math.max(...users.map(user => user.credits)) : 0}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      </div>
      
      <Toaster position="top-center" />
    </AdminAuth>
  );
}
