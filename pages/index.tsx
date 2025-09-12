import Link from "next/link";
import Navbar from "../components/Navbar";
import ReportButton from "../components/ReportButton";

export default function Home(){
  return (
    <main>
      <Navbar />
      <section className="container">
        <div className="hero" style={{display:'grid',gridTemplateColumns:'1.25fr 1fr',gap:28,alignItems:'center'}}>
          <div>
            <div className="badge">Yeni Nesil • Yapay Zekâ Destekli Ekspertiz</div>
            <h1 style={{fontSize:48, lineHeight:1.05, margin:'14px 0 10px', fontWeight:900}}>Mivvo Akıllı Araç Ekspertiz</h1>
            <p style={{color:'#334155', fontSize:18}}>VIN'den otomatik araç tanıma • Kameradan panel bazlı boya & göçük analizi • Mikrofondan motor sesi anomali tespiti • Tek tıkla PDF rapor.</p>
            <div style={{display:'flex',gap:12, marginTop:18}}>
              <Link href="/panel" className="btn">Hemen Başla</Link>
              <a className="btn secondary" href="#features">Özellikleri Keşfet</a>
              <ReportButton />
            </div>
            <div style={{display:'flex',gap:16, marginTop:16, alignItems:'center', flexWrap:'wrap'}}>
              <div className="badge">🔒 Google ile Güvenli Giriş</div>
              <div className="badge">💳 Stripe & PayTR</div>
              <div className="badge">📑 Kurumsal PDF Rapor</div>
            </div>
          </div>
          <img src="/hero.svg" alt="Araç görseli" style={{width:'100%',borderRadius:18,border:'1px solid #e2e8f0'}} />
        </div>
      </section>

      <section id="features" className="container" style={{marginTop:24}}>
        <div className="grid" style={{gridTemplateColumns:'repeat(3,minmax(0,1fr))'}}>
          <div className="card">
            <h3>🔎 VIN (Şase) Akıllı Tanı</h3>
            <p>Marka, model, yıl ve motor tipi otomatik doldurulur; kullanıcı hatası ortadan kalkar.</p>
          </div>
          <div className="card">
            <h3>🖌️ Boya & Göçük Analizi</h3>
            <p>Kamera ile panel bazında tespit. Nokta atışı şüpheli bölgeler işaretlenir.</p>
          </div>
          <div className="card">
            <h3>🎧 Motor Sesi Anomali</h3>
            <p>Mikrofon verisinden frekans analiziyle anormallikler skorlanır.</p>
          </div>
        </div>
      </section>

      <section className="container" style={{marginTop:24}}>
        <div className="card" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:18,alignItems:'center'}}>
          <div>
            <h3 style={{fontSize:28,margin:0}}>Tek Fiyat: <b>$7 → 2 Analiz Hakkı</b></h3>
            <p style={{marginTop:8,color:'#475569'}}>Kullanıcı başına kredi mantığı. Ödeme sonrası anında aktif, faturalandırma Stripe/PayTR güvencesiyle.</p>
            <Link href="/panel" className="btn" style={{marginTop:10}}>Giriş Yap & Satın Al</Link>
          </div>
          <ul style={{margin:0,paddingLeft:18,color:'#334155'}}>
            <li>Kurumsal PDF rapor (logo + görsel + detay)</li>
            <li>Güvenlik odaklı mimari (OAuth 2.0)</li>
            <li>Yatırımcı sunumuna hazır arayüz</li>
          </ul>
        </div>
      </section>

      <footer>© {new Date().getFullYear()} Mivvo • Tüm hakları saklıdır.</footer>
    </main>
  );
}
