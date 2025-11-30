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
    <div className="w-full bg-[--color-bg-primary]">
      <div
        className={`flex items-center justify-between px-[--space-4] py-[--space-3] cursor-pointer border border-[--color-divide] text-[--color-text-primary]
          ${isOpen ? 'rounded-t-[--radius-sm]' : 'rounded-[--radius-sm]'}
          `}
        onClick={toggleDropdown}
      >
        <span>{selected}</span>
        <ChevronUp
          className={`transition-transform duration-[--transition-fast] ${isOpen ? 'rotate-0' : 'rotate-180'}`}
          size={20}
        />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="bg-[--color-bg-primary] rounded-b-[--radius-sm] border border-[--color-divide] overflow-hidden"
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
                  className="px-[--space-4] py-[--space-3] hover:bg-[--color-bg-secondary] cursor-pointer text-[--color-text-primary] transition-colors duration-[--transition-fast]"
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
