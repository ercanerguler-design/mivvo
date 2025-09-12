import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";

export default function AnalysisHome(){
  const [ready, setReady] = useState(false);
  const [credits, setCredits] = useState<number>(0);

  useEffect(()=>{
    (async ()=>{
      const me = await fetch('/api/me').then(r=>r.json()).catch(()=>null);
      if(!me?.user){
        window.location.href = '/api/auth/signin?callbackUrl=/analysis';
        return;
      }
      const c = me?.user?.credits ?? 0;
      if(c <= 0){
        window.location.href = '/panel?pay=1';
        return;
      }
      setCredits(c);
      setReady(true);
    })();
  },[]);

  if(!ready) return (
    <main className="container"><Navbar /><div className="card" style={{marginTop:12}}>Kontrol ediliyor...</div></main>
  );

  return (
    <main>
      <Navbar />
      <section className="container" style={{padding:'32px 24px'}}>
        <h1 style={{fontSize:28,fontWeight:800}}>🔬 Analiz Türünü Seç (Kalan kredi: {credits})</h1>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,minmax(0,1fr))',gap:16,marginTop:16}}>
          <div className="card"><h3>🔎 VIN (Şase)</h3><p>Marka, model, yıl otomatik.</p><Link href="/analysis/vin" className="btn" style={{marginTop:8}}>Başla</Link></div>
          <div className="card"><h3>🖌️ Boya & Göçük</h3><p>Kameradan panel bazlı tespit.</p><Link href="/analysis/paint" className="btn" style={{marginTop:8}}>Başla</Link></div>
          <div className="card"><h3>🎧 Motor Sesi</h3><p>Mikrofonla anomali analizi.</p><Link href="/analysis/audio" className="btn" style={{marginTop:8}}>Başla</Link></div>
        </div>
      </section>
    </main>
  );
}
