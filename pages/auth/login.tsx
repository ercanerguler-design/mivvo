import { GetServerSideProps } from 'next';
import { getProviders, signIn } from 'next-auth/react';
import Image from 'next/image';

export default function Login({ providers }: { providers: any }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <Image
            src="/logo.svg"
            alt="Mivvo Logo"
            width={150}
            height={40}
            className="mx-auto"
          />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Hesabınıza Giriş Yapın</h2>
          <p className="mt-2 text-sm text-gray-600">
            veya{' '}
            <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
              ücretsiz hesap oluşturun
            </a>
          </p>
        </div>

        <div className="mt-8 space-y-6">
          {Object.values(providers).map((provider: any) => (
            <div key={provider.name} className="flex flex-col gap-3">
              <button
                onClick={() => signIn(provider.id, { callbackUrl: '/dashboard' })}
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Image
                  src={`/${provider.name.toLowerCase()}.svg`}
                  alt={provider.name}
                  width={20}
                  height={20}
                  className="mr-2"
                />
                {provider.name} ile Giriş Yap
              </button>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Güvenli giriş sistemi
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders();
  return {
    props: { providers },
  };
};