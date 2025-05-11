// @ts-nocheck
"use client";

import { X, Lock } from 'lucide-react';
import type React from 'react';
import { cn } from '@/lib/utils';

interface AppHeaderProps {
  activeTab: 'home' | 'citri';
  onHomeTabClick?: () => void;
  onCitriTabClick?: () => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({ activeTab, onHomeTabClick, onCitriTabClick }) => {
  const tabBaseStyle = "px-4 py-2 flex items-center text-sm border-t border-x rounded-t-md transition-colors duration-150 border-border";
  
  // Active tab: appears to merge with the address bar area below it.
  // -mb-px pulls the tab slightly down to cover the bottom border of the tab strip div.
  // !border-b-background makes its bottom border match the address bar's background, creating a seamless look.
  const activeTabDynamicStyle = "bg-background text-foreground !border-b-background relative z-10 -mb-px shadow-sm";
  
  // Inactive tab: sits on the tab bar, has a visible bottom border separating it from the address bar area.
  const inactiveTabDynamicStyle = "bg-card text-muted-foreground border-b-border hover:bg-accent hover:text-accent-foreground";
  
  return (
    // Header is sticky, stays at the top. z-50 ensures it's above other content.
    <header className="sticky top-0 z-50 bg-card text-foreground pt-2 rounded-t-lg shadow-lg font-sans">
      {/* Tab strip area: This div has a bottom border that active tabs will visually "cover" using -mb-px. */}
      <div className="flex items-end px-2 border-b border-border">
        {/* Window controls */}
        <div className="flex space-x-1.5 mr-3 self-center">
          <div className="w-3 h-3 rounded-full bg-red-500 opacity-80 hover:opacity-100"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-80 hover:opacity-100"></div>
          <div className="w-3 h-3 rounded-full bg-green-500 opacity-80 hover:opacity-100"></div>
        </div>
        
        {/* Tabs */}
        <div className="flex">
          {/* Tab: Home page */}
          <div 
            className={cn(
              tabBaseStyle, 
              activeTab === 'home' ? activeTabDynamicStyle : inactiveTabDynamicStyle, 
              "cursor-pointer"
            )}
            onClick={onHomeTabClick}
          >
            <span className="truncate" style={{ fontFamily: 'VT323, monospace' }}>Home page</span>
            <X size={16} className="ml-2 opacity-50 hover:opacity-80 transition-opacity" />
          </div>

          {/* Tab: Citri :3 */}
          <div 
            className={cn(
              tabBaseStyle, 
              activeTab === 'citri' ? activeTabDynamicStyle : inactiveTabDynamicStyle, 
              "cursor-pointer ml-1" // ml-1 for spacing if tabs are directly next to each other
            )}
            onClick={onCitriTabClick}
          >
            <span className="truncate" style={{ fontFamily: 'VT323, monospace' }}>Citri :3</span>
            <X size={16} className="ml-2 opacity-50 hover:opacity-80 transition-opacity" />
          </div>
        </div>
      </div> {/* End of tab strip area */}
      
      {/* Bottom part: Address bar. Has bg-background to match the active tab's background. */}
      {/* Rounded-b-md + borders complete the "window" look under the tabs. */}
      <div className="bg-background mx-2 mb-2 px-3 py-1.5 rounded-b-md flex items-center border-x border-b border-border shadow-inner">
        <Lock size={14} className="text-muted-foreground mr-2" />
        <span className="text-sm text-foreground" style={{ fontFamily: 'VT323, monospace' }}>localhost:9002</span>
      </div>
    </header>
  );
};

export default AppHeader;
