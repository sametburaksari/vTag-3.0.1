import React from 'react';
import { Bell, User, Globe2, Moon, Sun } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  onDarkModeChange: (isDark: boolean) => void;
}

export function Header({ darkMode, onDarkModeChange }: HeaderProps) {
  const [notifications] = React.useState(3);
  const [language, setLanguage] = React.useState('tr');

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="px-4 h-16 flex items-center justify-end gap-2">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="p-2 text-sm bg-transparent border border-gray-200 dark:border-gray-700 rounded-lg text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="tr">Türkçe</option>
          <option value="en">English</option>
          <option value="de">Deutsch</option>
        </select>

        <button
          onClick={() => onDarkModeChange(!darkMode)}
          className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          {darkMode ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </button>

        <button className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 relative">
          <Bell className="w-5 h-5" />
          {notifications > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
              {notifications}
            </span>
          )}
        </button>

        <button className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
          <User className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}