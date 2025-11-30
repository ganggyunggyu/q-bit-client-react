import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

export interface MenuItem {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  variant?: 'default' | 'danger';
}

export interface MenuSectionProps {
  title?: string;
  items: MenuItem[];
  animationDelay?: number;
}

export const MenuSection = ({
  title,
  items,
  animationDelay = 0,
}: MenuSectionProps) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: animationDelay }}
    >
      {title && (
        <h3 className="font-body-sb text-text-secondary mb-3 px-1">{title}</h3>
      )}
      <nav className="bg-bg-primary rounded-xl overflow-hidden shadow-sm">
        <ul>
          {items.map((item, index) => (
            <li key={item.label}>
              <MenuItemButton
                item={item}
                isLast={index === items.length - 1}
              />
            </li>
          ))}
        </ul>
      </nav>
    </motion.section>
  );
};

interface MenuItemButtonProps {
  item: MenuItem;
  isLast: boolean;
}

const MenuItemButton = ({ item, isLast }: MenuItemButtonProps) => {
  const isDanger = item.variant === 'danger';

  return (
    <button
      onClick={item.onClick}
      className={`w-full flex items-center gap-3 px-5 py-4 transition-colors active:bg-bg-secondary ${
        !isLast ? 'border-b border-divide' : ''
      }`}
    >
      <span className={isDanger ? 'text-urgent' : 'text-text-secondary'}>
        {item.icon}
      </span>
      <span
        className={`flex-1 text-left font-body-m ${
          isDanger ? 'text-urgent' : 'text-text-primary'
        }`}
      >
        {item.label}
      </span>
      <ChevronRight
        size={20}
        className={isDanger ? 'text-urgent/50' : 'text-text-tertiary'}
      />
    </button>
  );
};
