import { Check } from 'lucide-react';
import React from 'react';

interface CheckToggleProps {
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
}

export const CheckToggle: React.FC<CheckToggleProps> = ({
  defaultChecked = false,
  onChange,
}) => {
  const [checked, setChecked] = React.useState(defaultChecked);

  const toggle = () => {
    const newVal = !checked;
    setChecked(newVal);
    onChange?.(newVal);
  };

  return (
    <button
      onClick={toggle}
      className={`w-8 h-8 rounded-md flex items-center justify-center transition-colors duration-200 ${
        checked ? 'bg-blue-good' : 'bg-divide'
      }`}
    >
      <Check
        className={`w-8 h-8 transition-colors duration-200 text-white`}
        strokeWidth={3}
      />
    </button>
  );
};
