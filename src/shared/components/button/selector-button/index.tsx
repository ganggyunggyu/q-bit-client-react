import { RightArrow } from '@/shared/icons';
import { Button, ButtonProps } from '../atom-button';

type SelectorButtonProps = ButtonProps & {
  isSelected: boolean;
  icon: 'circle' | 'check' | 'arrow';
};

export const SelectorButton = ({
  isSelected,
  children,
  icon,
  ...props
}: SelectorButtonProps) => (
  <Button
    variant={isSelected ? 'outlinePrimary' : 'outlineAlt'}
    className="flex w-full justify-between px-4 hover:bg-primary-transparent hover:text-primary" //이거 바리안츠로 추가해서 위의 형태로
    {...props}
  >
    {children}

    {icon === 'circle' && (
      <div
        className={`w-6 h-6 border rounded-full transition-all
        ${isSelected ? 'border-4' : 'border-1'}
      `}
      />
    )}
    {icon === 'check' && (
      <figure
        className={`flex items-center justify-center w-6 h-6  rounded-md
      ${
        isSelected
          ? 'bg-primary text-normal'
          : 'text-normal border-2 border-primary'
      }
      
      `}
      >
        <svg
          width="16"
          height="14"
          viewBox="0 0 16 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 8.72414L5.5 13L15 1"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </figure>
    )}
    {icon === 'arrow' && <RightArrow />}
  </Button>
);
