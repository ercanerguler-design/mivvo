'use client';
import { useState } from "react";

export default function BuyCreditsButton(){
  const [loading, setLoading] = useState(false);
  const buy = async (provider: "stripe"|"paytr") => {
    setLoading(true);
    try{
      const r = await fetch("/api/payment/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ provider })
      });
      const d = await r.json();
      if(!r.ok) throw new Error(d.error || "Ödeme başlatılamadı");
      alert(d.message || "Ödeme tamamlandı (demo). 2 kredi yüklendi.");
      location.reload();
    }catch(e:any){
      alert(e.message);
    }finally{
      setLoading(false);
    }
  };
  return (
    <div style={{display:'flex',gap:8}}>
      <button className="btn" onClick={()=>buy("stripe")} disabled={loading}>Stripe ile 7$ (2 hak)</button>
      <button className="btn ghost" onClick={()=>buy("paytr")} disabled={loading}>PayTR ile 7$ (2 hak)</button>
    </div>
  );
}
