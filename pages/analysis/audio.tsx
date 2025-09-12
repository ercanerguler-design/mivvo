'use client';
import { useRef, useState } from 'react';
import ReportButton from '../../components/ReportButton';

export default function AudioAnalysis(){
  const [score, setScore] = useState<number|null>(null);
  const [started, setStarted] = useState(false);
  const raf = useRef<number|null>(null);
  const analyserRef = useRef<AnalyserNode|null>(null);
  const streamRef = useRef<MediaStream|null>(null);
  const ctxRef = useRef<AudioContext|null>(null);

  const loop = () => {
    const an = analyserRef.current!;
    const data = new Uint8Array(an.frequencyBinCount);
    an.getByteFrequencyData(data);
    let sum = 0, cnt = 0;
    for(let i=Math.floor(data.length*0.6); i<data.length; i++){ sum+=data[i]; cnt++; }
    const s = sum / Math.max(1,cnt);
    setScore(Number((s/255).toFixed(2)));
    raf.current = requestAnimationFrame(loop);
  };

  const start = async () => {
    await fetch('/api/credits/use', { method:'POST' }).catch(()=>{});
    const stream = await navigator.mediaDevices.getUserMedia({ audio:true });
    streamRef.current = stream;
    const ctx = new AudioContext(); ctxRef.current = ctx;
    const src = ctx.createMediaStreamSource(stream);
    const an = ctx.createAnalyser(); an.fftSize = 2048;
    src.connect(an); analyserRef.current = an;
    setStarted(true); loop();
  };
  const stop = () => {
    if(raf.current) cancelAnimationFrame(raf.current);
    streamRef.current?.getTracks().forEach(t=>t.stop());
    ctxRef.current?.close();
    setStarted(false);
  };

  return (
    <main className="container" style={{padding:'24px'}}>
      <h1>🎧 Motor Sesi Analizi</h1>
      <div className="card" style={{marginTop:12}}>
        {!started ? <button className="btn" onClick={start}>Analizi Başlat (1 kredi)</button> : <button className="btn secondary" onClick={stop}>Durdur</button>}
        {score !== null && <div className="alert" style={{marginTop:12}}>Anomali Skoru: <b>{score}</b> {score>0.55?'⚠️ Olası anomali':'✅ Normal'}</div>}
        {started && <ReportButton audioScore={score} />}
      </div>
    </main>
  );
}
