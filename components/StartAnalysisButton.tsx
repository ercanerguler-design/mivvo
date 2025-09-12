'use client';
import { useRouter } from "next/router";

export default function StartAnalysisButton(){
  const router = useRouter();

  const go = async () => {
    try{
      const me = await fetch('/api/me').then(r=>r.json());
      const credits = me?.user?.credits ?? 0;
      if(!me?.user){ router.push('/api/auth/signin?callbackUrl=/panel'); return; }
      if(credits <= 0){ alert('Krediniz yok. Lütfen ödeme yapın.'); return; }
      router.push('/analysis');
    }catch{
      router.push('/analysis');
    }
  };

  return <button className="btn" onClick={go}>Analize Başla</button>;
}
