import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

interface CheckBoxProps {
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

export const CheckBoxInput: React.FC<CheckBoxProps> = ({
  label,
  checked,
  onChange,
}) => {
  const [internalChecked, setInternalChecked] =
    React.useState<boolean>(!!checked);
  const [isFocused, setIsFocused] = React.useState<boolean>(false);

  const toggleCheck = () => {
    const newState = !internalChecked;
    setInternalChecked(newState);
    onChange?.(newState);
  };

  return (
    <figure className="relative flex items-center space-x-3 cursor-pointer select-none">
      <button
        onClick={toggleCheck}
        className="w-6 h-6 flex items-center justify-center border-1 border-white rounded-full"
      >
        <div
          className={`w-4 h-4 rounded-full transition-colors duration-150 ${
            internalChecked ? 'bg-blue-good' : 'bg-transparent'
          }`}
        />
      </button>

      <input
        placeholder={label}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`transition-colors duration-150 text-black disabled:text-primary disabled:line-through`}
        disabled={internalChecked}
      />

      <AnimatePresence>
        {isFocused && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 1 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute w-full bg-blue-good -bottom-1.5"
          />
        )}
      </AnimatePresence>
    </figure>
  );
};
