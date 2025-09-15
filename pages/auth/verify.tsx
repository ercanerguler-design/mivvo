import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function VerifyEmailPage() {
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const { token, email } = router.query;

  useEffect(() => {
    if (token && email) {
      verifyEmail();
    }
  }, [token, email]);

  const verifyEmail = async () => {
    try {
      const response = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, email }),
      });

      if (!response.ok) {
        throw new Error('Doğrulama başarısız oldu');
      }

      setStatus('success');
      setTimeout(() => {
        router.push('/auth/login');
      }, 3000);
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        {status === 'loading' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Email Doğrulanıyor...
            </h2>
            <p className="mt-2 text-gray-600">Lütfen bekleyin.</p>
          </div>
        )}

        {status === 'success' && (
          <div>
            <h2 className="text-2xl font-bold text-green-600">
              Email Doğrulandı!
            </h2>
            <p className="mt-2 text-gray-600">
              Hesabınız başarıyla doğrulandı. Giriş sayfasına yönlendiriliyorsunuz...
            </p>
          </div>
        )}

        {status === 'error' && (
          <div>
            <h2 className="text-2xl font-bold text-red-600">
              Doğrulama Başarısız
            </h2>
            <p className="mt-2 text-gray-600">
              Email doğrulama işlemi başarısız oldu. Lütfen tekrar deneyin veya
              yeni bir doğrulama emaili isteyin.
            </p>
            <div className="mt-4">
              <Link
                href="/auth/login"
                className="text-indigo-600 hover:text-indigo-500"
              >
                Giriş sayfasına dön
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}