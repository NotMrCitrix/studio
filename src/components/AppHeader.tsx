// @ts-nocheck
"use client";

import { X } from 'lucide-react';
import type React from 'react';

interface AppHeaderProps {
  onCitriTabClick?: () => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({ onCitriTabClick }) => {
  return (
    <header className="relative text-foreground w-full" style={{ minHeight: '50px' /* Approximate height */ }}>
      {/* Background bar */}
      <div className="absolute top-0 left-0 right-0 h-[38px] shape-bg-1"></div>
      
      {/* Tab: Home page */}
      <div 
        className="absolute top-[3px] left-[0px] h-[30px] w-[160px] shape-bg-2 rounded-t-md flex items-center px-2 cursor-default"
      >
        <span className="text-sm truncate">Home page</span>
        <X size={16} className="ml-auto opacity-70" />
      </div>

      {/* Tab: Citri :3 */}
      <div 
        className="absolute top-[3px] left-[170px] h-[30px] w-[120px] shape-bg-2 rounded-t-md flex items-center px-2 cursor-pointer hover:opacity-80"
        onClick={onCitriTabClick}
      >
        <span className="text-sm truncate">Citri :3</span>
        <X size={16} className="ml-auto opacity-70" />
      </div>
      
      {/* Bottom bar */}
      <div className="absolute top-[38px] left-0 right-0 h-[20px] shape-bg-3 flex items-center px-2">
        <span className="text-xs opacity-80">localhost:9002</span>
      </div>
    </header>
  );
};

export default AppHeader;
