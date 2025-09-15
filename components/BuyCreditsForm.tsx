import React, { useState } from 'react';
import { CreditCardIcon, BanknotesIcon } from '@heroicons/react/24/outline';

interface CreditPackage {
  id: string;
  credits: number;
  price: number;
  bonus?: number;
  popular?: boolean;
}

interface BuyCreditsFormProps {
  onPackageSelect?: (pkg: CreditPackage) => void;
  onSuccess?: () => void;
}

const BuyCreditsForm: React.FC<BuyCreditsFormProps> = ({ onPackageSelect, onSuccess }) => {
  const [selectedPackage, setSelectedPackage] = useState<string>('');

  const packages: CreditPackage[] = [
    { id: 'basic', credits: 10, price: 9.99 },
    { id: 'popular', credits: 25, price: 19.99, bonus: 5, popular: true },
    { id: 'premium', credits: 50, price: 34.99, bonus: 15 },
    { id: 'enterprise', credits: 100, price: 59.99, bonus: 30 }
  ];

  const handleSubmit = async (pkg: CreditPackage) => {
    try {
      // Demo mod - gerçek ödeme yerine başarı mesajı
      alert(`Demo: ${pkg.credits} kredi paketi seçildi! (${pkg.price}$)`);
      
      if (onPackageSelect) {
        onPackageSelect(pkg);
      }
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Ödeme sırasında hata oluştu');
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#1f2937' }}>
        Kredi Paketleri
      </h2>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '20px' 
      }}>
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            style={{
              border: pkg.popular ? '3px solid #3b82f6' : '2px solid #e5e7eb',
              borderRadius: '12px',
              padding: '24px',
              position: 'relative',
              backgroundColor: '#ffffff',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onClick={() => setSelectedPackage(pkg.id)}
          >
            {pkg.popular && (
              <div style={{
                position: 'absolute',
                top: '-12px',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: '#3b82f6',
                color: 'white',
                padding: '4px 16px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                En Popüler
              </div>
            )}
            
            <div style={{ textAlign: 'center' }}>
              <div style={{ marginBottom: '16px' }}>
                <CreditCardIcon style={{ width: '48px', height: '48px', margin: '0 auto', color: '#3b82f6' }} />
              </div>
              
              <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px', color: '#1f2937' }}>
                {pkg.credits} Kredi
                {pkg.bonus && (
                  <span style={{ color: '#16a34a', fontSize: '14px', display: 'block' }}>
                    +{pkg.bonus} Bonus
                  </span>
                )}
              </h3>
              
              <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#3b82f6', marginBottom: '16px' }}>
                ${pkg.price}
              </p>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleSubmit(pkg);
                }}
                style={{
                  width: '100%',
                  backgroundColor: pkg.popular ? '#3b82f6' : '#6b7280',
                  color: 'white',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = pkg.popular ? '#2563eb' : '#4b5563';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = pkg.popular ? '#3b82f6' : '#6b7280';
                }}
              >
                Satın Al
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div style={{ 
        marginTop: '40px', 
        padding: '20px', 
        backgroundColor: '#f9fafb', 
        borderRadius: '8px',
        textAlign: 'center'
      }}>
        <BanknotesIcon style={{ width: '24px', height: '24px', margin: '0 auto 8px', color: '#6b7280' }} />
        <p style={{ color: '#6b7280', fontSize: '14px' }}>
          Güvenli ödeme ile kredileriniz anında hesabınıza yüklenir
        </p>
      </div>
    </div>
  );
};

export default BuyCreditsForm;
