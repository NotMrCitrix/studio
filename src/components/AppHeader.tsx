// @ts-nocheck
"use client";

import { X, Lock } from 'lucide-react';
import type React from 'react';
import { cn } from '@/lib/utils';

interface AppHeaderProps {
  onCitriTabClick?: () => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({ onCitriTabClick }) => {
  // Tab styles
  const tabBaseStyle = "px-4 py-2 flex items-center text-sm border-t border-x rounded-t-md transition-colors duration-150";
  const activeTabStyle = "bg-background text-foreground border-border shadow-sm";
  const inactiveTabStyle = "bg-card text-muted-foreground hover:bg-accent hover:text-accent-foreground border-border hover:border-accent";
  
  return (
    <header className="bg-card text-foreground pt-2 rounded-t-lg shadow-lg font-sans">
      {/* Top part: Window controls and Tabs */}
      <div className="flex items-end px-2">
        {/* Window controls */}
        <div className="flex space-x-1.5 mr-3 mb-1 self-center">
          <div className="w-3 h-3 rounded-full bg-red-500 opacity-80 hover:opacity-100"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-80 hover:opacity-100"></div>
          <div className="w-3 h-3 rounded-full bg-green-500 opacity-80 hover:opacity-100"></div>
        </div>
        
        {/* Tabs */}
        <div className="flex">
          {/* Tab: Home page (Styled as active) */}
          <div 
            className={cn(tabBaseStyle, activeTabStyle, "cursor-default relative z-10 -mb-px border-b-transparent")} // -mb-px to make bottom border overlap
          >
            <span className="truncate" style={{ fontFamily: 'VT323, monospace' }}>Home page</span>
            <X size={16} className="ml-2 opacity-50 hover:opacity-80 transition-opacity" />
          </div>

          {/* Tab: Citri :3 (Styled as inactive) */}
          <div 
            className={cn(tabBaseStyle, inactiveTabStyle, "cursor-pointer ml-1")}
            onClick={onCitriTabClick}
          >
            <span className="truncate" style={{ fontFamily: 'VT323, monospace' }}>Citri :3</span>
            <X size={16} className="ml-2 opacity-50 hover:opacity-80 transition-opacity" />
          </div>
        </div>
      </div>
      
      {/* Bottom part: Address bar */}
      <div className="bg-background mx-2 mb-2 mt-0 px-3 py-1.5 rounded-md flex items-center border border-border shadow-inner">
        <Lock size={14} className="text-muted-foreground mr-2" />
        <span className="text-sm text-foreground" style={{ fontFamily: 'VT323, monospace' }}>localhost:9002</span>
      </div>
    </header>
  );
};

export default AppHeader;
