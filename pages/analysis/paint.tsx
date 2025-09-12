'use client';
import { useEffect, useRef, useState } from 'react';
import ReportButton from '../../components/ReportButton';

export default function PaintAnalysis(){
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [result, setResult] = useState<any[]|null>(null);

  useEffect(()=>{
    let stream: MediaStream | null = null;
    (async ()=>{
      try{
        stream = await navigator.mediaDevices.getUserMedia({ video:true });
        if(videoRef.current){ videoRef.current.srcObject = stream; await videoRef.current.play(); }
      }catch(e){ alert('Kamera açılamadı.'); }
    })();
    return ()=>{ stream?.getTracks().forEach(t=>t.stop()); };
  },[]);

  const run = async () => {
    await fetch('/api/credits/use', { method:'POST' }).catch(()=>{});
    const v = videoRef.current!, c = canvasRef.current!, ctx = c.getContext('2d')!;
    c.width = v.videoWidth; c.height = v.videoHeight;
    ctx.drawImage(v,0,0,c.width,c.height);
    ctx.strokeStyle = '#2563eb'; ctx.lineWidth = 4;
    ctx.strokeRect(c.width*0.2, c.height*0.4, 180, 100);
    setResult([{ part:'Sol Ön Kapı', status:'şüpheli', confidence:0.78 }, { part:'Ön Kaput', status:'sağlam', confidence:0.92 }]);
  };

  return (
    <main className="container" style={{padding:'24px'}}>
      <h1>🖌️ Boya & Göçük Analizi</h1>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginTop:12}}>
        <div className="card">
          <video ref={videoRef} playsInline muted style={{width:'100%',borderRadius:12}}/>
          <button className="btn" onClick={run} style={{marginTop:8}}>Analizi Başlat (1 kredi)</button>
        </div>
        <div className="card">
          <canvas ref={canvasRef} style={{width:'100%',border:'1px solid #eee',borderRadius:12}}/>
          {result && (
            <div className="alert" style={{marginTop:8}}>
              {result.map((r,i)=>(<div key={i}>{r.part} → <b>{r.status}</b> ({Math.round(r.confidence*100)}%)</div>))}
              <ReportButton paintResults={result} />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
