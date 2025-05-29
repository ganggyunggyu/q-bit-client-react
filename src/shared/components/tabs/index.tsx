import React from 'react';
import { motion } from 'framer-motion';

export interface Tab {
  id: string;
  label: string;
}

interface TabsProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'onSelect'> {
  tabs: Tab[];
  selected: string;
  onSelect: (tabId: string) => void;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  selected,
  onSelect,
  className,
  ...rest
}) => {
  return (
    <nav
      className={`relative top-0 z-10 border-b border-gray-200 pt-4 ${className ?? ''}`}
      {...rest}
    >
      <div className="flex px-4 overflow-x-auto no-scrollbar space-x-4">
        {tabs.map((tab) => {
          const isActive = selected === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onSelect(tab.id)}
              className="relative py-3 px-4 font-semibold text-sm whitespace-nowrap w-full"
            >
              <span
                className={
                  isActive ? 'text-shadow-black' : 'text-shadow-black-alt'
                }
              >
                {tab.label}
              </span>

              {isActive && (
                <motion.div
                  layoutId="underline"
                  className="absolute bottom-0 left-0 right-0 h-[4px] bg-black-alt rounded"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
