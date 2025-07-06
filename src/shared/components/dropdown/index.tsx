import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronUp } from 'lucide-react';

interface DropdownProps {
  options: string[];
  defaultLabel?: string;
  onChange?: (value: string) => void;
}

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  defaultLabel = 'Select',
  onChange,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<string>(defaultLabel);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelect = (value: string) => {
    setSelected(value);
    setIsOpen(false);
    onChange?.(value);
  };

  return (
    <div className="w-full bg-white">
      <div
        className={`flex items-center justify-between px-4 py-3 cursor-pointer border border-divide
          ${isOpen ? 'rounded-t-xl' : 'rounded-xl'}
          `}
        onClick={toggleDropdown}
      >
        <span className="">{selected}</span>
        <ChevronUp
          className={`transition-transform ${isOpen ? 'rotate-0' : 'rotate-180'}`}
          size={20}
        />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="bg-white rounded-b-xl border border-divide overflow-hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <ul>
              {options.map((option) => (
                <li
                  key={option}
                  onClick={() => handleSelect(option)}
                  className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
                >
                  {option}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
