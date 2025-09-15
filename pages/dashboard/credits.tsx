import { NextPage } from 'next';
import { useRouter } from 'next/router';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import BuyCreditsForm from '../../components/BuyCreditsForm';

const CreditsPage: NextPage = () => {
  const router = useRouter();
  const { redirect } = router.query;

  const onSuccess = () => {
    if (redirect) {
      router.push(redirect as string);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg p-4">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-900">Kredi Yükleme</h2>
              {redirect && (
                <p className="mt-2 text-sm text-gray-600">
                  Bu işlem için kredi yüklemeniz gerekiyor. Kredi yükledikten sonra otomatik olarak işleminize döneceksiniz.
                </p>
              )}
            </div>
            <BuyCreditsForm onSuccess={onSuccess} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CreditsPage;