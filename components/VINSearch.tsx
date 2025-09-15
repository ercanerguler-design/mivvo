import { useState } from 'react';
import { VehicleInfo } from '@/types/vehicle';

interface VINSearchProps {
  onVehicleInfo?: (info: VehicleInfo) => void;
}

export default function VINSearch({ onVehicleInfo }: VINSearchProps) {
  const [vin, setVin] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleVINSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/vin/decode?vin=${vin}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch vehicle information');
      }

      console.log('API Response:', data); // Debug için ekledik

      if (data.ErrorCode) {
        throw new Error(data.ErrorText || 'VIN numarası geçersiz');
      }

      if (onVehicleInfo) {
        onVehicleInfo(data);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleVINSearch} className="space-y-4">
        <div>
          <label
            htmlFor="vin"
            className="block text-sm font-medium text-gray-700"
          >
            Şase (VIN) Numarası
          </label>
          <div className="mt-1">
            <input
              type="text"
              id="vin"
              name="vin"
              value={vin}
              onChange={(e) => setVin(e.target.value.toUpperCase())}
              placeholder="Örn: 1HGCM82633A123456"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              maxLength={17}
              required
            />
          </div>
          <p className="mt-1 text-xs text-gray-500">
            VIN numarası 17 karakter uzunluğunda olmalıdır
          </p>
        </div>

        <button
          type="submit"
          disabled={loading || vin.length !== 17}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
            loading || vin.length !== 17
              ? 'bg-indigo-400 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          }`}
        >
          {loading ? 'Sorgulanıyor...' : 'Sorgula'}
        </button>

        {error && (
          <div className="text-red-600 text-sm mt-2">
            {error}
          </div>
        )}
      </form>
    </div>
  );
}