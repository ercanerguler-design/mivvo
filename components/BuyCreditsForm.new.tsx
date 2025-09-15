import { useState } from 'react';
import { FaLock, FaShieldAlt, FaCreditCard, FaCheck } from 'react-icons/fa';
import { HiCurrencyDollar, HiLightningBolt } from 'react-icons/hi';
import { BiSupport, BiSolidBadgeCheck } from 'react-icons/bi';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface CreditPackage {
  id: string;
  credits: number;
  price: number;
  pricePerCredit: number;
  popular?: boolean;
  features: string[];
}

const creditPackages: CreditPackage[] = [
  {
    id: 'basic',
    credits: 2,
    price: 4,
    pricePerCredit: 2,
    features: [
      '2 AI Analysis Credits',
      'Valid for 30 days',
      'Basic support'
    ]
  },
  {
    id: 'standard',
    credits: 5,
    price: 9,
    pricePerCredit: 1.8,
    features: [
      '5 AI Analysis Credits',
      'Valid for 60 days',
      'Priority support',
      '10% savings on credits'
    ]
  },
  {
    id: 'professional',
    credits: 10,
    price: 19,
    pricePerCredit: 1.9,
    popular: true,
    features: [
      '10 AI Analysis Credits',
      'Valid for 90 days',
      'Priority support',
      'Detailed analysis reports',
      'Email support'
    ]
  },
  {
    id: 'enterprise',
    credits: 50,
    price: 99,
    pricePerCredit: 1.98,
    features: [
      '50 AI Analysis Credits',
      'Valid for 180 days',
      'Premium support',
      'Advanced analytics',
      'Dedicated account manager'
    ]
  }
];

export default function BuyCreditsForm() {
  const [selectedPackage, setSelectedPackage] = useState<CreditPackage | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePackageSelect = (pkg: CreditPackage) => {
    setSelectedPackage(pkg);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedPackage) {
      setError('Please select a credit package');
      return;
    }

    try {
      setIsLoading(true);
      setError('');
      
      const response = await fetch('/api/credits/purchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          credits: selectedPackage.credits,
          price: selectedPackage.price,
        }),
      });

      if (!response.ok) {
        throw new Error('Payment initiation failed');
      }

      const data = await response.json();
      const stripe = await stripePromise;
      
      if (!stripe) {
        throw new Error('Stripe failed to load');
      }

      const result = await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      });

      if (result.error) {
        throw new Error(result.error.message);
      }

    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-900 mb-4">
            Purchase Credits
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Select a credit package to continue with your analysis
          </p>
        </div>
        
        {/* Security Banner */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-8">
          <div className="flex justify-center items-center space-x-8">
            <div className="flex items-center">
              <FaShieldAlt className="text-blue-500 text-lg mr-2" />
              <span className="text-sm text-gray-600">Secure Payment</span>
            </div>
            <div className="flex items-center">
              <FaLock className="text-blue-500 text-lg mr-2" />
              <span className="text-sm text-gray-600">SSL Encrypted</span>
            </div>
            <div className="flex items-center">
              <FaCheck className="text-blue-500 text-lg mr-2" />
              <span className="text-sm text-gray-600">Instant Access</span>
            </div>
          </div>
        </div>

        {/* Premium Security Badges */}
        <div className="grid md:grid-cols-4 gap-8 mb-16">
          <div className="bg-white rounded-xl p-6 shadow-soft transform hover:-translate-y-1 transition-all duration-300">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <FaShieldAlt className="text-blue-600 text-xl" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Enterprise Security</h3>
              <p className="text-sm text-gray-600">Bank-level encryption for all transactions</p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-soft transform hover:-translate-y-1 transition-all duration-300">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <HiLightningBolt className="text-indigo-600 text-xl" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Instant Activation</h3>
              <p className="text-sm text-gray-600">Credits available immediately after purchase</p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-soft transform hover:-translate-y-1 transition-all duration-300">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <BiSupport className="text-purple-600 text-xl" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">24/7 Support</h3>
              <p className="text-sm text-gray-600">Expert assistance always available</p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-soft transform hover:-translate-y-1 transition-all duration-300">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <BiSolidBadgeCheck className="text-green-600 text-xl" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Satisfaction Guaranteed</h3>
              <p className="text-sm text-gray-600">100% money-back guarantee</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Credit Packages */}
          <div className="grid md:grid-cols-4 gap-4">
            {creditPackages.map((pkg) => (
              <div
                key={pkg.id}
                className={`
                  relative bg-white rounded-lg border transition-all cursor-pointer
                  ${pkg.popular 
                    ? 'border-blue-500 shadow-md' 
                    : 'border-gray-200 hover:border-blue-300 hover:shadow-sm'}
                  ${selectedPackage?.id === pkg.id ? 'ring-2 ring-blue-500' : ''}
                `}
                onClick={() => handlePackageSelect(pkg)}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 inset-x-0">
                    <div className="bg-blue-500 text-white text-xs font-medium px-3 py-1 rounded-full w-max mx-auto">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="p-5">
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {pkg.credits} Credits
                    </h3>
                    <div className="mt-2 flex justify-center items-baseline">
                      <span className="text-2xl font-bold text-gray-900">${pkg.price}</span>
                      <span className="ml-1 text-sm text-gray-500">USD</span>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      ${pkg.pricePerCredit} per credit
                    </p>
                  </div>

                  <div className="space-y-2 mb-6">
                    {pkg.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-sm">
                        <HiCurrencyDollar className="text-blue-500 mr-2 flex-shrink-0" />
                        <span className="text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    className={`
                      w-full py-2 px-4 rounded text-sm font-medium transition-all
                      ${selectedPackage?.id === pkg.id
                        ? 'bg-blue-600 text-white shadow-sm'
                        : pkg.popular
                          ? 'bg-blue-500 text-white shadow-sm hover:bg-blue-600'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                      }
                    `}
                  >
                    {selectedPackage?.id === pkg.id ? 'Selected' : 'Select Package'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-center">
              {error}
            </div>
          )}

          {/* Purchase Button */}
          <div className="mt-8 flex flex-col items-center">
            <button
              type="submit"
              disabled={!selectedPackage || isLoading}
              className={`
                inline-flex items-center justify-center px-6 py-3 rounded-md
                text-white font-medium text-sm transition-all
                ${!selectedPackage || isLoading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 shadow-sm'
                }
              `}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  <FaCreditCard className="mr-2 text-sm" />
                  Complete Purchase
                </>
              )}
            </button>

            <div className="mt-4 text-center">
              <p className="text-xs text-gray-500 mb-3">
                Secure payment processed by Stripe
              </p>
              <div className="flex justify-center items-center space-x-4">
                <img src="/visa.svg" alt="Visa" className="h-6" />
                <img src="/mastercard.svg" alt="Mastercard" className="h-6" />
                <img src="/amex.svg" alt="American Express" className="h-6" />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}