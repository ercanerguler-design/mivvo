import Navbar from "../components/Navbar";
import useSWR from "swr";
import StartAnalysisButton from "../components/StartAnalysisButton";

const fetcher = (url:string)=>fetch(url).then(r=>r.json());

export default function Panel(){
  const { data, mutate } = useSWR("/api/me", fetcher);
  const credits = data?.user?.credits ?? 0;

  return (
    <main>
      <Navbar />
      <section className="container">
        <h1>📊 Kontrol Paneli</h1>
        <div className="card" style={{marginTop:12}}>
          <div><b>Kullanıcı:</b> {data?.user?.name || "—"}</div>
          <div style={{marginTop:6}}><b>Kredin:</b> {credits}</div>
          <div style={{display:'flex', gap:8, marginTop:12, flexWrap:'wrap'}}>
            <form action="/api/payment/checkout" method="POST" onSubmit={()=>setTimeout(()=>mutate(), 800)}>
              <input type="hidden" name="provider" value="stripe" />
              <button className="btn">Stripe ile 2 Kredi ($7)</button>
            </form>
            <form action="/api/payment/checkout" method="POST" onSubmit={()=>setTimeout(()=>mutate(), 800)}>
              <input type="hidden" name="provider" value="paytr" />
              <button className="btn secondary">PayTR ile 2 Kredi</button>
            </form>
            <StartAnalysisButton />
          </div>
          <p style={{marginTop:10,color:'#64748b'}}>Analiz başına 1 kredi düşer. Yeterli krediniz yoksa önce ödeme yapın.</p>
        </div>
      </section>
    </main>
  );
}
