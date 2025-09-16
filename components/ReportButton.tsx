'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

type Props = {
  vin?: string;
  paintResults?: any[];
  audioScore?: number | null;
};

export default function ReportButton({ vin, paintResults, audioScore }: Props){
  const { data: session } = useSession();
  const router = useRouter();
  const [img, setImg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [credits, setCredits] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  // Kredi kontrolü
  useEffect(() => {
    async function checkCredits() {
      try {
        const response = await fetch('/api/me');
        const data = await response.json();
        
        if (data?.user?.credits !== undefined) {
          setCredits(data.user.credits);
        }
      } catch (error) {
        console.error('Kredi kontrolü sırasında hata:', error);
      } finally {
        setLoading(false);
      }
    }

    checkCredits();
  }, []);

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if(!f) return;
    const reader = new FileReader();
    reader.onload = () => setImg(reader.result as string);
    reader.readAsDataURL(f);
  };

  const downloadPdf = async () => {
    // Kredi kontrolü
    if (credits <= 0) {
      router.push('/dashboard/credits?redirect=' + encodeURIComponent(window.location.pathname));
      return;
    }

    setBusy(true);
    try {
      // Önce kredi kullan
      const creditResponse = await fetch('/api/credits/use', { method: 'POST' });
      if (!creditResponse.ok) {
        throw new Error('Kredi kullanılamadı');
      }

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

      // Kredi sayısını güncelle
      setCredits(prev => Math.max(0, prev - 1));
    } catch (e: any) {
      alert(e.message || 'Hata');
    } finally {
      setBusy(false);
    }
  };

  if (loading) {
    return <div>Kredi kontrolü yapılıyor...</div>;
  }

  return (
    <div style={{marginTop:12}}>
      <div style={{marginBottom:8, fontSize:14, color: credits > 0 ? '#059669' : '#dc2626'}}>
        Kalan Kredi: {credits}
      </div>
      
      <label style={{display:'block', fontSize:14, opacity:.8, marginBottom:6}}>Araç fotoğrafı yükle (PDF'e eklenecek):</label>
      <input type="file" accept="image/*" onChange={onFile} />
      {img && <div style={{marginTop:8}}><img src={img} style={{maxWidth:240,borderRadius:8,border:'1px solid #e5e7eb'}}/></div>}
      
      <button 
        onClick={downloadPdf} 
        disabled={busy || credits <= 0} 
        className="btn" 
        style={{
          marginTop:12,
          opacity: credits <= 0 ? 0.5 : 1,
          cursor: credits <= 0 ? 'not-allowed' : 'pointer'
        }}
      >
        {busy ? 'PDF hazırlanıyor...' : credits <= 0 ? 'Kredi yetersiz - PDF İndir' : '📑 PDF Raporu İndir (1 kredi)'}
      </button>
      
      {credits <= 0 && (
        <div style={{marginTop:8, fontSize:12, color:'#dc2626'}}>
          PDF indirmek için kredi satın almanız gerekiyor.
        </div>
      )}
    </div>
  );
}
