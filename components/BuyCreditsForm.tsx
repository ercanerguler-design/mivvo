import { useState } from 'react';
import { useSession } from 'next-auth/react';

const creditPackages = [
  { credits: 10, amount: 70, popular: false },
  { credits: 25, amount: 150, popular: true },
  { credits: 50, amount: 250, popular: false },
];

export default function BuyCreditsForm() {
  const { data: session, update: updateSession } = useSession();
  const [loading, setLoading] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(creditPackages[1]);

  const handlePurchase = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/credits/purchase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: selectedPackage.amount,
          credits: selectedPackage.credits,
        }),
      });

      if (!response.ok) throw new Error('Ödeme işlemi başarısız');

      const data = await response.json();
      
      // Oturum bilgilerini güncelle
      await updateSession();

      alert('Kredi satın alma işlemi başarılı!');
    } catch (error) {
      alert('Bir hata oluştu: ' + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Kredi Paketleri
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Mevcut Krediniz: {session?.user?.credits || 0}
          </p>
        </div>

        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0">
          {creditPackages.map((pkg) => (
            <div
              key={pkg.credits}
              className={`rounded-lg shadow-sm divide-y divide-gray-200 ${
                selectedPackage === pkg
                  ? 'ring-2 ring-blue-500'
                  : ''
              }`}
            >
              <div className="p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {pkg.credits} Kredi
                </h3>
                {pkg.popular && (
                  <p className="absolute top-0 -translate-y-1/2 transform px-4 py-1 text-sm font-semibold text-white bg-blue-500 rounded-full">
                    Popular
                  </p>
                )}
                <p className="mt-4">
                  <span className="text-4xl font-extrabold text-gray-900">
                    {pkg.amount}₺
                  </span>
                </p>
                <button
                  onClick={() => setSelectedPackage(pkg)}
                  className={`mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium ${
                    selectedPackage === pkg
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                  }`}
                >
                  {selectedPackage === pkg ? 'Seçildi' : 'Seç'}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={handlePurchase}
            disabled={loading}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'İşleniyor...' : 'Satın Al'}
          </button>
        </div>
      </div>
    </div>
  );
}