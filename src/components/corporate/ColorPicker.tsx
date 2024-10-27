import React, { useState, useRef, useEffect } from 'react';
import { ChromePicker } from 'react-color';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  label: string;
}

export function ColorPicker({ color, onChange, label }: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-10 h-10 rounded border shadow-sm"
          style={{ backgroundColor: color }}
        />
        <input
          type="text"
          value={color}
          onChange={(e) => onChange(e.target.value)}
          className="px-3 py-2 border rounded-lg text-sm w-32"
        />
      </div>
      {isOpen && (
        <div
          ref={popoverRef}
          className="absolute z-10 mt-2"
          style={{ boxShadow: 'rgba(0, 0, 0, 0.15) 0px 0px 10px' }}
        >
          <ChromePicker
            color={color}
            onChange={(color) => onChange(color.hex)}
            disableAlpha
          />
        </div>
      )}
    </div>
  );
}