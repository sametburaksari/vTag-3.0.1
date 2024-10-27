import React, { useState, useEffect, useRef } from 'react';
import { Search, Building2 } from 'lucide-react';

interface Company {
  id: string;
  name: string;
  industry: string;
}

interface CompanySearchInputProps {
  value: string;
  onChange: (company: Company | null) => void;
}

export function CompanySearchInput({ value, onChange }: CompanySearchInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [companies, setCompanies] = useState<Company[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Mock data - gerçek uygulamada API'den gelecek
  const mockCompanies: Company[] = [
    { id: '1', name: 'Tech Solutions A.Ş.', industry: 'Teknoloji' },
    { id: '2', name: 'Digital Ventures Ltd.', industry: 'Teknoloji' },
    { id: '3', name: 'Smart Systems Inc.', industry: 'Yazılım' },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    // Simulate API call
    const filtered = mockCompanies.filter(company =>
      company.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCompanies(filtered);
  }, [searchTerm]);

  return (
    <div ref={wrapperRef} className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Firma ara..."
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {isOpen && companies.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-auto">
          {companies.map((company) => (
            <button
              key={company.id}
              onClick={() => {
                onChange(company);
                setSearchTerm(company.name);
                setIsOpen(false);
              }}
              className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3"
            >
              <Building2 className="w-5 h-5 text-gray-400" />
              <div>
                <p className="font-medium">{company.name}</p>
                <p className="text-sm text-gray-500">{company.industry}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}