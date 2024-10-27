import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { ReturnToAdminBar } from './ReturnToAdminBar';
import {
  LayoutDashboard,
  UserCircle,
  Gift,
  BarChart3,
  HelpCircle,
  LogOut,
  Menu,
  X,
  CreditCard
} from 'lucide-react';

const menuItems = [
  { path: '/user', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/user/profiles', icon: UserCircle, label: 'Profiller' },
  { path: '/user/advantages', icon: Gift, label: 'Avantajlar' },
  { path: '/user/reports', icon: BarChart3, label: 'Raporlar' },
  { path: '/user/subscription', icon: CreditCard, label: 'Abonelik' },
  { path: '/user/support', icon: HelpCircle, label: 'Destek' },
];

export function UserLayout() {
  const [darkMode, setDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
          <div className="space-y-1">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/user'}
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
            ))}
          </div>
          
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
        <ReturnToAdminBar />
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

export default UserLayout;