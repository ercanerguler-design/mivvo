'use client';
import { useState } from 'react';

type Props = {
  vin?: string;
  paintResults?: any[];
  audioScore?: number | null;
};

export default function ReportButton({ vin, paintResults, audioScore }: Props){
  const [img, setImg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if(!f) return;
    const reader = new FileReader();
    reader.onload = () => setImg(reader.result as string);
    reader.readAsDataURL(f);
  };

  const downloadPdf = async () => {
    setBusy(true);
    try {
      const res = await fetch('/api/corporateReport');
      if (!res.ok) throw new Error('Kurumsal PDF raporu oluşturulamadı');
      
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `mivvo-kurumsal-rapor-${Date.now()}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (e: any) {
      alert(e.message || 'Hata');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div style={{marginTop:12}}>
      <label style={{display:'block', fontSize:14, opacity:.8, marginBottom:6}}>Araç fotoğrafı yükle (PDF'e eklenecek):</label>
      <input type="file" accept="image/*" onChange={onFile} />
      {img && <div style={{marginTop:8}}><img src={img} style={{maxWidth:240,borderRadius:8,border:'1px solid #e5e7eb'}}/></div>}
      <button onClick={downloadPdf} disabled={busy} className="btn" style={{marginTop:12}}>
        {busy ? 'PDF hazırlanıyor...' : '📑 PDF Raporu İndir'}
      </button>
    </div>
  );
}
