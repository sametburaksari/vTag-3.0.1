import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, Send } from 'lucide-react';

export function AdminForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // API call to send reset password email
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess(true);
    } catch (err) {
      setError('E-posta gönderilirken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
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
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Parola Sıfırlama
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
              Yönetici hesabınızın parolasını sıfırlamak için e-posta adresinizi girin.
            </p>
          </div>

          <div className="mt-8">
            {error && (
              <div className="mb-4 bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            )}

            {success ? (
              <div className="text-center">
                <div className="mb-4 p-4 bg-green-50 dark:bg-green-900/50 rounded-lg">
                  <p className="text-green-800 dark:text-green-200">
                    Parola sıfırlama bağlantısı e-posta adresinize gönderildi.
                    Lütfen gelen kutunuzu kontrol edin.
                  </p>
                </div>
                <Link
                  to="/auth/admin"
                  className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Giriş sayfasına dön
                </Link>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    E-posta
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="appearance-none block w-full pl-10 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                      placeholder="admin@vtag.com"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center items-center gap-2 py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      'Gönderiliyor...'
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Sıfırlama Bağlantısı Gönder
                      </>
                    )}
                  </button>
                </div>

                <div className="text-center">
                  <Link
                    to="/auth/admin"
                    className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Giriş sayfasına dön
                  </Link>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}