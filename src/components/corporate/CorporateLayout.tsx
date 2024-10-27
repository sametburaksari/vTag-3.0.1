import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { CorporateHeader } from './CorporateHeader';
import {
  LayoutDashboard,
  Users,
  UserCircle,
  Gift,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  HelpCircle,
} from 'lucide-react';

const menuCategories = [
  {
    title: '',
    items: [
      { path: '/corporate', icon: LayoutDashboard, label: 'Dashboard' },
    ]
  },
  {
    title: 'Yönetim',
    items: [
      { path: '/corporate/users', icon: Users, label: 'Kullanıcılar' },
      { path: '/corporate/profiles', icon: UserCircle, label: 'Profiller' },
    ]
  },
  {
    title: 'Raporlar ve Ayarlar',
    items: [
      { path: '/corporate/reports', icon: BarChart3, label: 'Raporlar' },
      { path: '/corporate/advantages', icon: Gift, label: 'Avantajlar' },
      { path: '/corporate/settings', icon: Settings, label: 'Ayarlar' },
      { path: '/corporate/support', icon: HelpCircle, label: 'Destek' },
    ]
  }
];

export function CorporateLayout() {
  const [darkMode, setDarkMode] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className={`flex h-screen ${darkMode ? 'dark' : ''}`}>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white dark:bg-gray-800 shadow-lg"
      >
        {isMobileMenuOpen ? (
          <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        ) : (
          <Menu className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        )}
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40
        w-64 transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700
        flex flex-col
      `}>
        {/* Logo */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <img
            src={darkMode ? '/vtag-white.svg' : '/vtag-black.svg'}
            alt="vTag"
            className="h-8"
          />
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          {menuCategories.map((category, index) => (
            <div key={index} className="mb-6">
              {category.title && (
                <h3 className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2 px-3">
                  {category.title}
                </h3>
              )}
              <ul className="space-y-1">
                {category.items.map((item) => (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      end
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-sm
                        ${isActive
                          ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
                          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`
                      }
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors w-full">
              <LogOut className="w-4 h-4" />
              <span>Çıkış</span>
            </button>
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              vTag, Vamos tarafından geliştirilmektedir.
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <CorporateHeader darkMode={darkMode} onDarkModeChange={setDarkMode} />
        <main className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-800">
          <div className="p-4 md:p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
        {/* App Footer */}
        <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 p-4">
          <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
            <span>2024© vTag</span>
            <span>v3.0.1</span>
          </div>
        </footer>
      </div>
    </div>
  );
}