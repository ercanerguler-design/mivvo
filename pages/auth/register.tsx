import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { toast } from 'react-hot-toast';

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.get('name'),
          surname: formData.get('surname'),
          email: formData.get('email'),
          password: formData.get('password'),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Bir hata oluştu');
      }

      // Kayıt başarılı, şimdi otomatik giriş yapalım
      const result = await signIn('credentials', {
        email: formData.get('email'),
        password: formData.get('password'),
        redirect: false,
      });

      if (result?.error) {
        throw new Error('Giriş yapılamadı');
      }

      toast.success('Kayıt başarılı! Yönlendiriliyorsunuz...');
      router.push('/analysis');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
      <div className="w-full max-w-md p-6">
        <div className="bg-white/10 backdrop-blur-lg px-8 py-10 rounded-3xl shadow-2xl border border-white/20">
          <div className="mb-10 text-center">
            <div className="w-32 h-32 mx-auto mb-8 relative">
              <div className="absolute inset-0 bg-blue-500 rounded-full blur-2xl opacity-20"></div>
              <Image
                src="/sample-report-bg.png"
                alt="Mivvo Logo"
                width={128}
                height={128}
                className="relative rounded-full border-4 border-white/20"
              />
            </div>
            <h2 className="text-4xl font-bold text-white mb-3 tracking-tight">
              Hesap Oluştur
            </h2>
            <p className="text-slate-400">
              Mivvo'ya hoş geldiniz
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-slate-300 mb-1"
                >
                  Ad
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="block w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Adınız"
                />
              </div>

              <div>
                <label
                  htmlFor="surname"
                  className="block text-sm font-medium text-slate-300 mb-1"
                >
                  Soyad
                </label>
                <input
                  id="surname"
                  name="surname"
                  type="text"
                  required
                  className="block w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Soyadınız"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-300 mb-1"
                >
                  E-posta Adresi
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="block w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="ornek@email.com"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-slate-300 mb-1"
                >
                  Şifre
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="block w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="••••••••"
                  minLength={6}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3.5 px-4 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-blue-500/25"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Hesap oluşturuluyor...
                  </div>
                ) : (
                  "Hesap Oluştur"
                )}
              </button>
            </div>

            <p className="text-center text-sm text-slate-400">
              Zaten hesabınız var mı?{" "}
              <Link
                href="/auth/login"
                className="font-medium text-blue-400 hover:text-blue-300 transition-colors duration-200"
              >
                Giriş yapın
              </Link>
            </p>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-transparent text-slate-400">
                  veya
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => signIn("google", { callbackUrl: "/panel" })}
              className="mt-4 w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-white/10 bg-white/5 text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-200"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google ile devam et
            </button>
          </div>
        </div>

        <footer className="mt-8 text-center text-sm text-slate-400">
          <p>
            © {new Date().getFullYear()} Mivvo. Tüm hakları saklıdır.
          </p>
        </footer>
      </div>
    </div>
  );
}