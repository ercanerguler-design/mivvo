import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ 
    name: "", 
    email: "", 
    password: "" 
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch('/api/auth/register', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(form) 
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data?.error || 'Kayıt başarısız');
      
      toast.success('Kayıt başarılı! Giriş yapılıyor...');
      
      // Otomatik giriş yap
      const signInResult = await signIn('credentials', {
        email: form.email.trim(),
        password: form.password,
        redirect: false
      });
      
      if (signInResult && !signInResult.error) {
        router.push('/panel');
      } else {
        router.push('/auth/login');
      }
    } catch (err: any) {
      toast.error(err?.message || 'Bir hata oluştu');
    } finally { 
      setLoading(false); 
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '1000px',
        background: 'white',
        borderRadius: '20px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        overflow: 'hidden',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        minHeight: '600px'
      }}>
        
        {/* Sol Panel */}
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '60px 40px',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <div style={{ marginBottom: '40px' }}>
            <h1 style={{
              fontSize: '36px',
              fontWeight: 'bold',
              marginBottom: '16px',
              margin: 0
            }}>Mivvo</h1>
            <p style={{
              fontSize: '18px',
              opacity: 0.9,
              lineHeight: '1.6',
              margin: 0
            }}>
              Yapay zeka destekli araç ekspertizleri ile güvenli alışveriş yapın
            </p>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                background: 'rgba(255,255,255,0.2)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px'
              }}>🔍</div>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '600', margin: '0 0 4px 0' }}>VIN Analizi</h3>
                <p style={{ fontSize: '14px', opacity: 0.8, margin: 0 }}>Detaylı araç geçmişi ve teknik bilgiler</p>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                background: 'rgba(255,255,255,0.2)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px'
              }}>🎨</div>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '600', margin: '0 0 4px 0' }}>Boya Kontrolü</h3>
                <p style={{ fontSize: '14px', opacity: 0.8, margin: 0 }}>Gelişmiş görüntü işleme teknolojisi</p>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                background: 'rgba(255,255,255,0.2)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px'
              }}>🔊</div>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '600', margin: '0 0 4px 0' }}>Motor Analizi</h3>
                <p style={{ fontSize: '14px', opacity: 0.8, margin: 0 }}>Akustik analizler ile hata tespiti</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sağ Panel */}
        <div style={{
          padding: '60px 40px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <div style={{ marginBottom: '32px', textAlign: 'center' }}>
            <h2 style={{
              fontSize: '28px',
              fontWeight: 'bold',
              color: '#1f2937',
              margin: '0 0 8px 0'
            }}>Hesap Oluştur</h2>
            <p style={{
              color: '#6b7280',
              fontSize: '16px',
              margin: 0
            }}>Hemen başlayın ve araç ekspertizlerinizi alın</p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Ad Soyad */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '8px'
              }}>Ad Soyad</label>
              <input
                name="name"
                type="text"
                value={form.name}
                onChange={onChange}
                required
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
                placeholder="Adınız ve soyadınız"
              />
            </div>

            {/* E-posta */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '8px'
              }}>E-posta Adresi</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={onChange}
                required
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
                placeholder="ornek@email.com"
              />
            </div>

            {/* Şifre */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '8px'
              }}>Şifre</label>
              <div style={{ position: 'relative' }}>
                <input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={onChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 50px 12px 16px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '12px',
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                  placeholder="En az 8 karakter"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '18px',
                    color: '#6b7280'
                  }}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            {/* Şartlar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <input
                id="terms"
                type="checkbox"
                required
                style={{
                  width: '16px',
                  height: '16px',
                  accentColor: '#667eea'
                }}
              />
              <label htmlFor="terms" style={{
                fontSize: '14px',
                color: '#6b7280',
                lineHeight: '1.5'
              }}>
                <Link href="/legal/terms" style={{ color: '#667eea', textDecoration: 'none' }}>
                  Kullanım koşullarını
                </Link> ve{' '}
                <Link href="/legal/privacy" style={{ color: '#667eea', textDecoration: 'none' }}>
                  gizlilik politikasını
                </Link> kabul ediyorum
              </label>
            </div>

            {/* Kayıt Butonu */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '14px',
                background: loading ? '#9ca3af' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                marginTop: '8px'
              }}
            >
              {loading ? 'Kaydediliyor...' : 'Hesap Oluştur'}
            </button>

            {/* Giriş Linki */}
            <div style={{ textAlign: 'center', marginTop: '16px' }}>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
                Zaten hesabınız var?{' '}
                <Link href="/auth/login" style={{
                  color: '#667eea',
                  fontWeight: '600',
                  textDecoration: 'none'
                }}>
                  Giriş yapın
                </Link>
              </p>
            </div>

            {/* Sosyal Medya */}
            <div style={{ marginTop: '24px' }}>
              <div style={{
                position: 'relative',
                textAlign: 'center',
                marginBottom: '20px'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: 0,
                  right: 0,
                  height: '1px',
                  background: '#e5e7eb'
                }}></div>
                <span style={{
                  background: 'white',
                  padding: '0 16px',
                  color: '#6b7280',
                  fontSize: '14px'
                }}>veya</span>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button
                  type="button"
                  onClick={() => signIn('google', { callbackUrl: '/panel' })}
                  style={{
                    padding: '12px 24px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '12px',
                    background: 'white',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#374151',
                    transition: 'all 0.2s',
                    minWidth: '200px'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.borderColor = '#d1d5db';
                    e.currentTarget.style.background = '#f9fafb';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.borderColor = '#e5e7eb';
                    e.currentTarget.style.background = 'white';
                  }}
                >
                  <span style={{ fontSize: '18px' }}>G</span>
                  Google ile devam et
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}