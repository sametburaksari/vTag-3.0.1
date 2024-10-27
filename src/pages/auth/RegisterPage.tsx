import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, User, Lock, ArrowRight, Check } from 'lucide-react';

type Step = 'info' | 'verify';

export function RegisterPage() {
  const [step, setStep] = useState<Step>('info');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [verificationCode, setVerificationCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // API call to send verification code
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStep('verify');
    } catch (err) {
      setError('Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // API call to verify code and complete registration
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Redirect to login
    } catch (err) {
      setError('Doğrulama kodu hatalı. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  const passwordStrength = (): { score: number; message: string } => {
    const password = formData.password;
    let score = 0;
    let message = '';

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    switch (score) {
      case 0:
      case 1:
        message = 'Zayıf';
        break;
      case 2:
        message = 'Orta';
        break;
      case 3:
        message = 'İyi';
        break;
      case 4:
        message = 'Güçlü';
        break;
    }

    return { score, message };
  };

  const getStrengthColor = (score: number) => {
    switch (score) {
      case 1:
        return 'bg-red-500';
      case 2:
        return 'bg-yellow-500';
      case 3:
        return 'bg-green-500';
      case 4:
        return 'bg-green-600';
      default:
        return 'bg-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          src="/vtag-black.svg"
          alt="vTag"
          className="mx-auto h-12 w-auto dark:hidden"
        />
        <img
          src="/vtag-white.svg"
          alt="vTag"
          className="mx-auto h-12 w-auto hidden dark:block"
        />
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow-xl shadow-indigo-100/20 dark:shadow-none sm:rounded-xl sm:px-10">
          {step === 'info' ? (
            <>
              <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Hesap Oluştur
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                  Zaten hesabınız var mı?{' '}
                  <Link
                    to="/login"
                    className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                  >
                    Giriş yapın
                  </Link>
                </p>
              </div>

              <div className="mt-8">
                {error && (
                  <div className="mb-4 bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg" role="alert">
                    <span className="block sm:inline">{error}</span>
                  </div>
                )}

                <form className="space-y-6" onSubmit={handleInfoSubmit}>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Ad Soyad
                    </label>
                    <div className="mt-1 relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="appearance-none block w-full pl-10 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      E-posta
                    </label>
                    <div className="mt-1 relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="appearance-none block w-full pl-10 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Şifre
                    </label>
                    <div className="mt-1 relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="appearance-none block w-full pl-10 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                        required
                      />
                    </div>
                    {formData.password && (
                      <div className="mt-2">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            Şifre gücü: {passwordStrength().message}
                          </span>
                        </div>
                        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${getStrengthColor(passwordStrength().score)} transition-all duration-300`}
                            style={{ width: `${(passwordStrength().score / 4) * 100}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Şifre Tekrar
                    </label>
                    <div className="mt-1 relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        className="appearance-none block w-full pl-10 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={loading || formData.password !== formData.confirmPassword}
                      className="w-full flex justify-center items-center gap-2 py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'İşleniyor...' : 'Devam Et'}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              </div>
            </>
          ) : (
            <>
              <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                  E-posta Doğrulama
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                  {formData.email} adresine gönderilen 6 haneli kodu girin
                </p>
              </div>

              <div className="mt-8">
                {error && (
                  <div className="mb-4 bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg" role="alert">
                    <span className="block sm:inline">{error}</span>
                  </div>
                )}

                <form className="space-y-6" onSubmit={handleVerifySubmit}>
                  <div>
                    <label htmlFor="code" className="sr-only">
                      Doğrulama Kodu
                    </label>
                    <input
                      type="text"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      className="block w-full px-3 py-2 text-center tracking-widest border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-2xl dark:bg-gray-700 dark:text-white"
                      placeholder="000000"
                      maxLength={6}
                      required
                    />
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={loading || verificationCode.length !== 6}
                      className="w-full flex justify-center items-center gap-2 py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Doğrulanıyor...' : 'Doğrula'}
                      <Check className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => setStep('info')}
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
                    >
                      Geri Dön
                    </button>
                  </div>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}