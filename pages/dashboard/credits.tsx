import { NextPage } from 'next';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import BuyCreditsForm from '../../components/BuyCreditsForm';

const CreditsPage: NextPage = () => {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg p-4">
            <BuyCreditsForm />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CreditsPage;