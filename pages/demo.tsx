import Navbar from "../components/Navbar";

export default function Demo(){
  const sample = [
    {"part":"Ön Kaput","status":"sağlam","confidence":0.92},
    {"part":"Sol Ön Kapı","status":"şüpheli","confidence":0.78},
    {"part":"Tavan","status":"sağlam","confidence":0.95},
    {"part":"Bagaj Kapağı","status":"sağlam","confidence":0.90}
  ];
  return (
    <main>
      <Navbar />
      <section className="container">
        <h1>Demo Sonuç</h1>
        <pre className="card" style={{whiteSpace:'pre-wrap', marginTop:12}}>{JSON.stringify(sample,null,2)}</pre>
        <a className="btn" href="/sample-report.pdf" download style={{marginTop:12, display:'inline-block'}}>📑 Örnek PDF Rapor</a>
      </section>
    </main>
  );
}
