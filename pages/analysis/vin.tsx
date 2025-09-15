import { useState } from "react";
import VINSearch from "@/components/VINSearch";
import { VehicleInfo } from "@/types/vehicle";

export default function VinAnalysis() {
  const [vehicleInfo, setVehicleInfo] = useState<VehicleInfo | null>(null);
  const [activeTab, setActiveTab] = useState('basic');

  const tabs = [
    { id: 'basic', label: 'Temel Bilgiler' },
    { id: 'engine', label: 'Motor' },
    { id: 'exterior', label: 'Dış' },
    { id: 'interior', label: 'İç' },
    { id: 'safety', label: 'Güvenlik' },
    { id: 'dimensions', label: 'Boyutlar' },
    { id: 'transmission', label: 'Şanzıman' }
  ];

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">🔎 VIN (Şase) Doğrulama</h1>
      
      <div className="bg-white shadow rounded-lg p-6">
        <VINSearch onVehicleInfo={(info) => setVehicleInfo(info)} />
      </div>

      {vehicleInfo && (
        <div className="mt-8">
          <div className="bg-white shadow rounded-lg">
            <div className="border-b border-gray-200">
              <nav className="flex overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'border-b-2 border-blue-500 text-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6">
              {activeTab === 'basic' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="mb-2"><span className="font-semibold">Marka:</span> {vehicleInfo.Make || "Bulunamadı"}</p>
                    <p className="mb-2"><span className="font-semibold">Model:</span> {vehicleInfo.Model || "Bulunamadı"}</p>
                    <p className="mb-2"><span className="font-semibold">Model Yılı:</span> {vehicleInfo.ModelYear || "Bulunamadı"}</p>
                    <p className="mb-2"><span className="font-semibold">Üretici:</span> {vehicleInfo.Manufacturer || "Bulunamadı"}</p>
                    <p className="mb-2"><span className="font-semibold">Araç Tipi:</span> {vehicleInfo.VehicleType || "Bulunamadı"}</p>
                  </div>
                  <div>
                    <p className="mb-2"><span className="font-semibold">Üretim Ülkesi:</span> {vehicleInfo.PlantCountry || "Bulunamadı"}</p>
                    <p className="mb-2"><span className="font-semibold">Üretim Şehri:</span> {vehicleInfo.PlantCity || "Bulunamadı"}</p>
                    <p className="mb-2"><span className="font-semibold">Seri:</span> {vehicleInfo.Series || "Bulunamadı"}</p>
                    <p className="mb-2"><span className="font-semibold">Gövde Tipi:</span> {vehicleInfo.BodyClass || "Bulunamadı"}</p>
                    <p className="mb-2"><span className="font-semibold">Donanım:</span> {vehicleInfo.Trim || "Bulunamadı"}</p>
                  </div>
                </div>
              )}

              {activeTab === 'engine' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="mb-2"><span className="font-semibold">Motor:</span> {vehicleInfo.EngineModel || "Bulunamadı"}</p>
                    <p className="mb-2"><span className="font-semibold">Motor Üreticisi:</span> {vehicleInfo.EngineMake || "Bulunamadı"}</p>
                    <p className="mb-2"><span className="font-semibold">Motor Gücü:</span> {vehicleInfo.EngineHP || "Bulunamadı"} HP</p>
                    <p className="mb-2"><span className="font-semibold">Silindir:</span> {vehicleInfo.EngineCylinders || "Bulunamadı"}</p>
                    <p className="mb-2"><span className="font-semibold">Motor Hacmi:</span> {vehicleInfo.DisplacementL || "Bulunamadı"} L</p>
                  </div>
                  <div>
                    <p className="mb-2"><span className="font-semibold">Yakıt Tipi:</span> {vehicleInfo.FuelTypePrimary || "Bulunamadı"}</p>
                    <p className="mb-2"><span className="font-semibold">Alternatif Yakıt:</span> {vehicleInfo.FuelTypeSecondary || "Bulunamadı"}</p>
                    <p className="mb-2"><span className="font-semibold">Yakıt Sistemi:</span> {vehicleInfo.FuelDeliverySystem || "Bulunamadı"}</p>
                    <p className="mb-2"><span className="font-semibold">Turbo:</span> {vehicleInfo.EngineTurbo || "Bulunamadı"}</p>
                  </div>
                </div>
              )}

              {activeTab === 'exterior' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="mb-2"><span className="font-semibold">Kapılar:</span> {vehicleInfo.Doors || "Bulunamadı"}</p>
                    <p className="mb-2"><span className="font-semibold">Pencereler:</span> {vehicleInfo.Windows || "Bulunamadı"}</p>
                    <p className="mb-2"><span className="font-semibold">Lastik Boyutu:</span> {vehicleInfo.TireSize || "Bulunamadı"}</p>
                    <p className="mb-2"><span className="font-semibold">Jant Malzemesi:</span> {vehicleInfo.WheelMaterial || "Bulunamadı"}</p>
                  </div>
                  <div>
                    <p className="mb-2"><span className="font-semibold">Uzunluk:</span> {vehicleInfo.Length || "Bulunamadı"}</p>
                    <p className="mb-2"><span className="font-semibold">Genişlik:</span> {vehicleInfo.Width || "Bulunamadı"}</p>
                    <p className="mb-2"><span className="font-semibold">Yükseklik:</span> {vehicleInfo.Height || "Bulunamadı"}</p>
                    <p className="mb-2"><span className="font-semibold">Aks Mesafesi:</span> {vehicleInfo.WheelBaseLong || "Bulunamadı"}</p>
                  </div>
                </div>
              )}

              {activeTab === 'interior' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="mb-2"><span className="font-semibold">Klima Tipi:</span> {vehicleInfo.ACType || "Bulunamadı"}</p>
                    <p className="mb-2"><span className="font-semibold">Koltuk Tipi:</span> {vehicleInfo.SeatType || "Bulunamadı"}</p>
                    <p className="mb-2"><span className="font-semibold">Koltuk Döşemesi:</span> {vehicleInfo.SeatMaterial || "Bulunamadı"}</p>
                    <p className="mb-2"><span className="font-semibold">Yolcu Kapasitesi:</span> {vehicleInfo.SeatingCapacity || "Bulunamadı"}</p>
                  </div>
                  <div>
                    <p className="mb-2"><span className="font-semibold">Direksiyon Konumu:</span> {vehicleInfo.SteeringLocation || "Bulunamadı"}</p>
                    <p className="mb-2"><span className="font-semibold">Eğlence Sistemi:</span> {vehicleInfo.EntertainmentSystem || "Bulunamadı"}</p>
                    <p className="mb-2"><span className="font-semibold">Yolcu Hacmi:</span> {vehicleInfo.PassengerVolume || "Bulunamadı"}</p>
                    <p className="mb-2"><span className="font-semibold">Bagaj Hacmi:</span> {vehicleInfo.CargoVolume || "Bulunamadı"}</p>
                  </div>
                </div>
              )}

              {activeTab === 'safety' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="mb-2"><span className="font-semibold">Ön Hava Yastıkları:</span> {vehicleInfo.AirBagLocFront || "Bulunamadı"}</p>
                    <p className="mb-2"><span className="font-semibold">Yan Hava Yastıkları:</span> {vehicleInfo.AirBagLocSide || "Bulunamadı"}</p>
                    <p className="mb-2"><span className="font-semibold">Diz Hava Yastıkları:</span> {vehicleInfo.AirBagLocKnee || "Bulunamadı"}</p>
                    <p className="mb-2"><span className="font-semibold">Perde Hava Yastıkları:</span> {vehicleInfo.AirBagLocCurtain || "Bulunamadı"}</p>
                  </div>
                  <div>
                    <p className="mb-2"><span className="font-semibold">Güvenlik Sistemi:</span> {vehicleInfo.SecurityType || "Bulunamadı"}</p>
                    <p className="mb-2"><span className="font-semibold">Fren Sistemi:</span> {vehicleInfo.BrakeSystemType || "Bulunamadı"}</p>
                    <p className="mb-2"><span className="font-semibold">ABS:</span> {vehicleInfo.BrakeABS || "Bulunamadı"}</p>
                    <p className="mb-2"><span className="font-semibold">Denge Kontrolü:</span> {vehicleInfo.StabilityControl || "Bulunamadı"}</p>
                  </div>
                </div>
              )}

              {activeTab === 'transmission' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="mb-2"><span className="font-semibold">Şanzıman Tipi:</span> {vehicleInfo.TransmissionStyle || "Bulunamadı"}</p>
                    <p className="mb-2"><span className="font-semibold">Vites Sayısı:</span> {vehicleInfo.TransmissionSpeeds || "Bulunamadı"}</p>
                  </div>
                  <div>
                    <p className="mb-2"><span className="font-semibold">Çekiş Tipi:</span> {vehicleInfo.DriveType || "Bulunamadı"}</p>
                    <p className="mb-2"><span className="font-semibold">Transmisyon Tipi:</span> {vehicleInfo.TransmissionType || "Bulunamadı"}</p>
                  </div>
                </div>
              )}

              {activeTab === 'dimensions' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="mb-2"><span className="font-semibold">Boş Ağırlık:</span> {vehicleInfo.CurbWeight || "Bulunamadı"}</p>
                    <p className="mb-2"><span className="font-semibold">Azami Yüklü Ağırlık:</span> {vehicleInfo.GrossVehicleWeight || "Bulunamadı"}</p>
                    <p className="mb-2"><span className="font-semibold">Yük Kapasitesi:</span> {vehicleInfo.PayloadWeight || "Bulunamadı"}</p>
                    <p className="mb-2"><span className="font-semibold">Çekme Kapasitesi:</span> {vehicleInfo.TowingCapacity || "Bulunamadı"}</p>
                  </div>
                  <div>
                    <p className="mb-2"><span className="font-semibold">İz Genişliği:</span> {vehicleInfo.TrackWidth || "Bulunamadı"}</p>
                    <p className="mb-2"><span className="font-semibold">Taban Genişliği:</span> {vehicleInfo.WheelBaseLong || "Bulunamadı"}</p>
                    <p className="mb-2"><span className="font-semibold">Bagaj Hacmi:</span> {vehicleInfo.CargoVolume || "Bulunamadı"}</p>
                    <p className="mb-2"><span className="font-semibold">Yolcu Hacmi:</span> {vehicleInfo.PassengerVolume || "Bulunamadı"}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}


