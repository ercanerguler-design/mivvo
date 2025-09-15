import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";

export default function AnalysisHome(){
  const [ready, setReady] = useState(false);
  const [credits, setCredits] = useState<number>(0);

  useEffect(()=>{
    async function checkUser() {
      try {
        const response = await fetch('/api/me');
        const data = await response.json();

        if (!data?.user) {
          window.location.href = '/api/auth/signin?callbackUrl=/analysis';
          return;
        }

        const userCredits = data.user.credits || 0;
        setCredits(userCredits);
        setReady(true);
      } catch (error) {
        console.error('Kullanıcı bilgisi alınamadı:', error);
        window.location.href = '/api/auth/signin?callbackUrl=/analysis';
      }
    }

    checkUser();

    // Her 30 saniyede bir kredi durumunu güncelle
    const interval = setInterval(checkUser, 30000);
    return () => clearInterval(interval);
  }, []);

  if(!ready) return (
    <main className="container"><Navbar /><div className="card" style={{marginTop:12}}>Kontrol ediliyor...</div></main>
  );

  return (
    <main>
      <Navbar />
      <section className="container" style={{padding:'32px 24px'}}>
        <h1 style={{fontSize:28,fontWeight:800}}>🔬 Analiz Türünü Seç</h1>
        <div className="alert" style={{marginBottom:16}}>
          Kalan krediniz: <b>{credits}</b>
          {credits <= 0 && (
            <div style={{marginTop:8}}>
              <Link href="/dashboard/credits" className="btn">Kredi Yükle</Link>
            </div>
          )}
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,minmax(0,1fr))',gap:16,marginTop:16}}>
          <div className="card">
            <h3>🔎 VIN (Şase)</h3>
            <p>Marka, model, yıl otomatik.</p>
            <p className="text-success" style={{fontSize:12,marginTop:4}}>✓ Ücretsiz</p>
            <Link href="/analysis/vin" className="btn" style={{marginTop:8}}>Başla</Link>
          </div>
          <div className="card">
            <h3>🖌️ Boya & Göçük</h3>
            <p>Kameradan panel bazlı tespit.</p>
            <p className="text-warning" style={{fontSize:12,marginTop:4}}>1 Kredi</p>
            {credits > 0 ? (
              <Link href="/analysis/paint" className="btn" style={{marginTop:8}}>Başla</Link>
            ) : (
              <Link href="/dashboard/credits?redirect=/analysis/paint" className="btn disabled" style={{marginTop:8,opacity:0.5,cursor:'not-allowed'}}>
                Kredi Gerekiyor
              </Link>
            )}
          </div>
          <div className="card">
            <h3>🎧 Motor Sesi</h3>
            <p>Mikrofonla anomali analizi.</p>
            <p className="text-warning" style={{fontSize:12,marginTop:4}}>1 Kredi</p>
            {credits > 0 ? (
              <Link href="/analysis/audio" className="btn" style={{marginTop:8}}>Başla</Link>
            ) : (
              <Link href="/dashboard/credits?redirect=/analysis/audio" className="btn disabled" style={{marginTop:8,opacity:0.5,cursor:'not-allowed'}}>
                Kredi Gerekiyor
              </Link>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
