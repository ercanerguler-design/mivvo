import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Navbar from "../components/Navbar";
import { toast } from "react-hot-toast";

export default function Checkout() {
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: ''
  });

  const plans = [
    {
      id: 'bireysel',
      name: 'Bireysel',
      price: 199,
      credits: 2,
      period: 'aylık',
      features: ['2 analiz kredisi', 'VIN otomatik tanıma', 'Boya & göçük analizi', 'Motor sesi kontrolü', 'PDF rapor çıktısı']
    },
    {
      id: 'profesyonel',
      name: 'Profesyonel',
      price: 499,
      credits: 5,
      period: 'aylık',
      features: ['5 analiz kredisi', 'Tüm analiz türleri', 'Priorite işlem', 'Detaylı raporlar', 'API erişimi (Beta)', 'Toplu işlem']
    },
    {
      id: 'kurumsal',
      name: 'Kurumsal',
      price: 1499,
      credits: 20,
      period: 'aylık',
      features: ['20 analiz kredisi', 'Sınırsız kullanıcı', 'Özel API entegrasyonu', '7/24 premium destek', 'Özel raporlama', 'SLA garantisi']
    }
  ];

  useEffect(() => {
    const { plan } = router.query;
    if (plan) {
      const foundPlan = plans.find(p => p.id === plan);
      if (foundPlan) {
        setSelectedPlan(foundPlan);
      }
    }
  }, [router.query]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const formatCardNumber = (value) => {
    return value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setFormData(prev => ({ ...prev, cardNumber: formatted }));
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    setFormData(prev => ({ ...prev, expiryDate: value }));
  };

  const handlePayment = async () => {
    setLoading(true);
    
    try {
      // Mock verilerle test için basit validasyon
      if (paymentMethod === 'card' && (!formData.cardNumber || !formData.cardName)) {
        toast.error('Lütfen kart bilgilerini doldurun');
        setLoading(false);
        return;
      }

      const response = await fetch('/api/payment/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planId: selectedPlan.id,
          amount: selectedPlan.price,
          credits: selectedPlan.credits,
          paymentMethod: paymentMethod
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Ödeme işlemi başarısız');
      }
      
      toast.success('🎉 Ödeme başarılı! Kredileriniz hesabınıza eklendi.');
      
      // 2 saniye bekle sonra panel'e yönlendir
      setTimeout(() => {
        router.push('/panel');
      }, 2000);
      
    } catch (error) {
      toast.error(error.message || 'Ödeme işlemi başarısız. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  if (!selectedPlan) {
    return (
      <main>
        <Navbar />
        <div style={{ padding: '100px 20px', textAlign: 'center' }}>
          <h1>Plan Bulunamadı</h1>
          <p>Lütfen pricing sayfasından bir plan seçin.</p>
        </div>
      </main>
    );
  }

  return (
    <main>
      <Navbar />
      
      <div style={{
        minHeight: '100vh',
        background: '#f8fafc',
        padding: '40px 20px'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          
          {/* Header */}
          <div style={{
            textAlign: 'center',
            marginBottom: '40px'
          }}>
            <h1 style={{
              fontSize: '36px',
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '16px'
            }}>
              Güvenli Ödeme
            </h1>
            <p style={{
              fontSize: '18px',
              color: '#6b7280'
            }}>
              Seçtiğiniz planı güvenle satın alın
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 400px',
            gap: '40px',
            alignItems: 'start'
          }}>
            
            {/* Sol Panel - Ödeme Formu */}
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '40px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
            }}>
              
              {/* Progress Steps */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '40px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  flex: 1
                }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: step >= 1 ? '#667eea' : '#e5e7eb',
                    color: step >= 1 ? 'white' : '#9ca3af',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    fontSize: '14px'
                  }}>
                    1
                  </div>
                  <div style={{
                    flex: 1,
                    height: '2px',
                    background: step >= 2 ? '#667eea' : '#e5e7eb',
                    margin: '0 16px'
                  }}></div>
                </div>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: step >= 2 ? '#667eea' : '#e5e7eb',
                  color: step >= 2 ? 'white' : '#9ca3af',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: '14px'
                }}>
                  2
                </div>
              </div>

              {/* Ödeme Yöntemi Seçimi */}
              <div style={{ marginBottom: '32px' }}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  marginBottom: '20px',
                  color: '#1f2937'
                }}>
                  Ödeme Yöntemi
                </h3>
                
                <div style={{
                  display: 'flex',
                  gap: '16px',
                  marginBottom: '24px'
                }}>
                  <button
                    onClick={() => setPaymentMethod('card')}
                    style={{
                      flex: 1,
                      padding: '16px',
                      border: paymentMethod === 'card' ? '2px solid #667eea' : '2px solid #e5e7eb',
                      borderRadius: '12px',
                      background: paymentMethod === 'card' ? '#f0f9ff' : 'white',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      fontSize: '16px',
                      fontWeight: '600'
                    }}
                  >
                    💳 Kredi Kartı
                  </button>
                  <button
                    onClick={() => setPaymentMethod('bank')}
                    style={{
                      flex: 1,
                      padding: '16px',
                      border: paymentMethod === 'bank' ? '2px solid #667eea' : '2px solid #e5e7eb',
                      borderRadius: '12px',
                      background: paymentMethod === 'bank' ? '#f0f9ff' : 'white',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      fontSize: '16px',
                      fontWeight: '600'
                    }}
                  >
                    🏦 Havale/EFT
                  </button>
                </div>
              </div>

              {/* Kredi Kartı Formu */}
              {paymentMethod === 'card' && (
                <div>
                  <h3 style={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                    marginBottom: '20px',
                    color: '#1f2937'
                  }}>
                    Kart Bilgileri
                  </h3>

                  {/* Test Verileri Butonu */}
                  <div style={{
                    background: '#f0f9ff',
                    padding: '16px',
                    borderRadius: '12px',
                    marginBottom: '20px',
                    border: '1px solid #bfdbfe'
                  }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <div>
                        <h4 style={{
                          fontSize: '14px',
                          fontWeight: 'bold',
                          color: '#1e40af',
                          margin: '0 0 4px 0'
                        }}>
                          🧪 Test Modu
                        </h4>
                        <p style={{
                          fontSize: '12px',
                          color: '#6b7280',
                          margin: 0
                        }}>
                          Test verilerini otomatik doldurmak için butona tıklayın
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setFormData(prev => ({
                            ...prev,
                            cardNumber: '4242 4242 4242 4242',
                            cardName: 'Test Kullanıcı',
                            expiryDate: '12/25',
                            cvv: '123'
                          }));
                        }}
                        style={{
                          padding: '8px 16px',
                          background: '#1e40af',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          fontSize: '12px',
                          fontWeight: '600',
                          cursor: 'pointer'
                        }}
                      >
                        Test Verilerini Doldur
                      </button>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {/* Kart Numarası */}
                    <div>
                      <label style={{
                        display: 'block',
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#374151',
                        marginBottom: '8px'
                      }}>
                        Kart Numarası
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleCardNumberChange}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          border: '2px solid #e5e7eb',
                          borderRadius: '12px',
                          fontSize: '16px',
                          outline: 'none',
                          transition: 'border-color 0.2s',
                          boxSizing: 'border-box'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#667eea'}
                        onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                      />
                      <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
                        Test için: 4242 4242 4242 4242
                      </p>
                    </div>

                    {/* Kart Sahibi */}
                    <div>
                      <label style={{
                        display: 'block',
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#374151',
                        marginBottom: '8px'
                      }}>
                        Kart Sahibi
                      </label>
                      <input
                        type="text"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        placeholder="Ad Soyad"
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          border: '2px solid #e5e7eb',
                          borderRadius: '12px',
                          fontSize: '16px',
                          outline: 'none',
                          transition: 'border-color 0.2s',
                          boxSizing: 'border-box'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#667eea'}
                        onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                      />
                      <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
                        Test için: Test Kullanıcı
                      </p>
                    </div>

                    {/* Tarih ve CVV */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                      <div>
                        <label style={{
                          display: 'block',
                          fontSize: '14px',
                          fontWeight: '600',
                          color: '#374151',
                          marginBottom: '8px'
                        }}>
                          Son Kullanma Tarihi
                        </label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleExpiryChange}
                          placeholder="MM/YY"
                          maxLength="5"
                          style={{
                            width: '100%',
                            padding: '12px 16px',
                            border: '2px solid #e5e7eb',
                            borderRadius: '12px',
                            fontSize: '16px',
                            outline: 'none',
                            transition: 'border-color 0.2s',
                            boxSizing: 'border-box'
                          }}
                          onFocus={(e) => e.target.style.borderColor = '#667eea'}
                          onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                        />
                        <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
                          Test için: 12/25
                        </p>
                      </div>
                      <div>
                        <label style={{
                          display: 'block',
                          fontSize: '14px',
                          fontWeight: '600',
                          color: '#374151',
                          marginBottom: '8px'
                        }}>
                          CVV
                        </label>
                        <input
                          type="text"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          placeholder="123"
                          maxLength="3"
                          style={{
                            width: '100%',
                            padding: '12px 16px',
                            border: '2px solid #e5e7eb',
                            borderRadius: '12px',
                            fontSize: '16px',
                            outline: 'none',
                            transition: 'border-color 0.2s',
                            boxSizing: 'border-box'
                          }}
                          onFocus={(e) => e.target.style.borderColor = '#667eea'}
                          onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                        />
                        <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
                          Test için: 123
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Havale/EFT Bilgileri */}
              {paymentMethod === 'bank' && (
                <div>
                  <h3 style={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                    marginBottom: '20px',
                    color: '#1f2937'
                  }}>
                    Havale/EFT Bilgileri
                  </h3>

                  <div style={{
                    background: '#f0f9ff',
                    padding: '24px',
                    borderRadius: '12px',
                    border: '1px solid #bfdbfe'
                  }}>
                    <h4 style={{
                      fontSize: '16px',
                      fontWeight: 'bold',
                      marginBottom: '16px',
                      color: '#1e40af'
                    }}>
                      Banka Hesap Bilgileri
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px' }}>
                      <div><strong>Banka:</strong> Türkiye İş Bankası</div>
                      <div><strong>Hesap Adı:</strong> Mivvo Teknoloji A.Ş.</div>
                      <div><strong>IBAN:</strong> TR12 0006 4000 0011 2345 6789 01</div>
                      <div><strong>Açıklama:</strong> {selectedPlan.name} - {session?.user?.email}</div>
                    </div>
                    <p style={{
                      fontSize: '12px',
                      color: '#6b7280',
                      marginTop: '16px',
                      fontStyle: 'italic'
                    }}>
                      Havale/EFT işleminizi tamamladıktan sonra ödeme onayı için 1-2 iş günü bekleyiniz.
                    </p>
                  </div>
                </div>
              )}

              {/* İletişim Bilgileri */}
              <div style={{ marginTop: '32px' }}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  marginBottom: '20px',
                  color: '#1f2937'
                }}>
                  İletişim Bilgileri
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#374151',
                      marginBottom: '8px'
                    }}>
                      E-posta
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email || session?.user?.email || ''}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '2px solid #e5e7eb',
                        borderRadius: '12px',
                        fontSize: '16px',
                        outline: 'none',
                        transition: 'border-color 0.2s',
                        boxSizing: 'border-box'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#667eea'}
                      onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                    />
                  </div>

                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#374151',
                      marginBottom: '8px'
                    }}>
                      Telefon
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+90 5XX XXX XX XX"
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '2px solid #e5e7eb',
                        borderRadius: '12px',
                        fontSize: '16px',
                        outline: 'none',
                        transition: 'border-color 0.2s',
                        boxSizing: 'border-box'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#667eea'}
                      onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                    />
                  </div>
                </div>
              </div>

              {/* Ödeme Butonu */}
              <button
                onClick={handlePayment}
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '16px',
                  background: loading ? '#9ca3af' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '18px',
                  fontWeight: '600',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  marginTop: '32px',
                  transition: 'all 0.2s'
                }}
              >
                {loading ? 'İşleniyor...' : `₺${selectedPlan.price} Öde`}
              </button>

              {/* Güvenlik Bilgisi */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginTop: '20px',
                fontSize: '14px',
                color: '#6b7280'
              }}>
                <span>🔒</span>
                <span>256-bit SSL şifreleme ile güvenli ödeme</span>
              </div>
            </div>

            {/* Sağ Panel - Sipariş Özeti */}
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '32px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
              position: 'sticky',
              top: '20px'
            }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: 'bold',
                marginBottom: '24px',
                color: '#1f2937'
              }}>
                Sipariş Özeti
              </h3>

              {/* Seçilen Plan */}
              <div style={{
                background: '#f0f9ff',
                padding: '20px',
                borderRadius: '12px',
                marginBottom: '24px',
                border: '1px solid #bfdbfe'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '12px'
                }}>
                  <h4 style={{
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: '#1e40af',
                    margin: 0
                  }}>
                    {selectedPlan.name}
                  </h4>
                  <span style={{
                    fontSize: '14px',
                    color: '#6b7280'
                  }}>
                    {selectedPlan.period}
                  </span>
                </div>
                
                <div style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: '#1e40af',
                  marginBottom: '8px'
                }}>
                  ₺{selectedPlan.price}
                </div>
                
                <div style={{
                  fontSize: '14px',
                  color: '#6b7280',
                  marginBottom: '16px'
                }}>
                  {selectedPlan.credits} analiz kredisi dahil
                </div>

                <div style={{ fontSize: '14px' }}>
                  <strong>Dahil Özellikler:</strong>
                  <ul style={{ margin: '8px 0 0 0', paddingLeft: '20px' }}>
                    {selectedPlan.features.map((feature, index) => (
                      <li key={index} style={{ marginBottom: '4px' }}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Fiyat Detayları */}
              <div style={{ marginBottom: '24px' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '8px',
                  fontSize: '16px'
                }}>
                  <span>Plan Ücreti</span>
                  <span>₺{selectedPlan.price}</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '8px',
                  fontSize: '16px'
                }}>
                  <span>KDV (%20)</span>
                  <span>₺{(selectedPlan.price * 0.2).toFixed(0)}</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '8px',
                  fontSize: '16px'
                }}>
                  <span>İşlem Ücreti</span>
                  <span>₺0</span>
                </div>
                <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', margin: '16px 0' }} />
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: '#1f2937'
                }}>
                  <span>Toplam</span>
                  <span>₺{(selectedPlan.price * 1.2).toFixed(0)}</span>
                </div>
              </div>

              {/* Güvenlik Rozetleri */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '16px',
                marginTop: '24px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '12px',
                  color: '#6b7280'
                }}>
                  <span>🔒</span>
                  <span>SSL</span>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '12px',
                  color: '#6b7280'
                }}>
                  <span>🛡️</span>
                  <span>PCI DSS</span>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '12px',
                  color: '#6b7280'
                }}>
                  <span>✅</span>
                  <span>3D Secure</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
