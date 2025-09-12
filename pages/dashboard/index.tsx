import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';

interface AnalysisStats {
  totalReports: number;
  completedAnalyses: number;
  pendingAnalyses: number;
  creditsUsed: number;
}

interface RecentReport {
  id: string;
  type: 'FREE' | 'PREMIUM';
  vinNumber: string;
  createdAt: string;
  status: string;
}

export default function PremiumDashboard() {
  const { data: session } = useSession();
  const [stats, setStats] = useState<AnalysisStats | null>(null);
  const [recentReports, setRecentReports] = useState<RecentReport[]>([]);
  const credits = (session?.user as any)?.credits || 0;

  useEffect(() => {
    // Gerçek uygulamada bu veriler API'den gelecek
    setStats({
      totalReports: 15,
      completedAnalyses: 42,
      pendingAnalyses: 3,
      creditsUsed: 45,
    });

    setRecentReports([
      {
        id: '1',
        type: 'PREMIUM',
        vinNumber: 'WBAAA1305H8251545',
        createdAt: '2023-09-12T10:00:00.000Z',
        status: 'Tamamlandı',
      },
      {
        id: '2',
        type: 'PREMIUM',
        vinNumber: 'JH4DA9460MS031857',
        createdAt: '2023-09-11T15:30:00.000Z',
        status: 'Analiz Ediliyor',
      },
    ]);
  }, []);

  if (!session) return null;

  return (
    <DashboardLayout>
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Premium Dashboard</h1>
            <p className="mt-1 text-sm text-gray-500">
              Hoş geldiniz, {session.user?.name}. İşte analizlerinizin özeti.
            </p>
          </div>
          <div className="flex space-x-4">
            {credits > 0 ? (
              <a
                href="/analysis"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                Yeni Analiz Başlat
              </a>
            ) : (
              <a
                href="/dashboard/credits"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
              >
                Kredi Satın Al
              </a>
            )}
          </div>
        </div>

        {/* İstatistikler */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-blue-800">Toplam Rapor</h3>
            <p className="mt-2 text-3xl font-semibold text-blue-900">{stats?.totalReports}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-green-800">Tamamlanan Analizler</h3>
            <p className="mt-2 text-3xl font-semibold text-green-900">{stats?.completedAnalyses}</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-yellow-800">Bekleyen Analizler</h3>
            <p className="mt-2 text-3xl font-semibold text-yellow-900">{stats?.pendingAnalyses}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-purple-800">Mevcut Krediler</h3>
            <p className="mt-2 text-3xl font-semibold text-purple-900">{credits}</p>
            {credits === 0 && (
              <a
                href="/dashboard/credits"
                className="mt-2 inline-block text-sm text-purple-600 hover:text-purple-900"
              >
                Kredi Satın Al →
              </a>
            )}
          </div>
        </div>

        {/* Son Raporlar */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Son Raporlar</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    VIN Numarası
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tip
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tarih
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Durum
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    İşlemler
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentReports.map((report) => (
                  <tr key={report.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {report.vinNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        report.type === 'PREMIUM' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {report.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(report.createdAt).toLocaleDateString('tr-TR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        report.status === 'Tamamlandı' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {report.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-blue-600 hover:text-blue-900">Raporu Görüntüle</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}