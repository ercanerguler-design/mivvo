import { useState } from "react";

export default function VinAnalysis() {
  const [vin, setVin] = useState("");
  const [result, setResult] = useState<any>(null);

  const handleCheck = async () => {
    // Dummy API call
    const mockResult = {
      vin,
      make: "Volkswagen",
      model: "Passat",
      year: 2018,
      engine: "2.0 TDI",
    };
    setResult(mockResult);
  };

  return (
    <main className="container" style={{ padding: "24px" }}>
      <h1>🔎 VIN (Şase) Doğrulama</h1>
      <div className="card" style={{ marginTop: 12 }}>
        <input
          value={vin}
          onChange={(e) => setVin(e.target.value)}
          placeholder="WVWZZZ1JZXW000000"
          style={{
            width: "100%",
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: 8,
          }}
        />
        <button
          onClick={handleCheck}
          style={{
            marginTop: 10,
            padding: "10px 20px",
            background: "#2563eb",
            color: "#fff",
            borderRadius: 8,
          }}
        >
          Doğrula
        </button>
      </div>

      {result && (
        <div style={{ marginTop: 20, padding: 12, border: "1px solid #ddd" }}>
          <h2>Sonuç</h2>
          <p><b>Marka:</b> {result.make}</p>
          <p><b>Model:</b> {result.model}</p>
          <p><b>Yıl:</b> {result.year}</p>
          <p><b>Motor:</b> {result.engine}</p>
        </div>
      )}
    </main>
  );
}
