import React from 'react';

interface CategoryButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  label: string;
  image: string;
}

export const CategoryButton: React.FC<CategoryButtonProps> = ({
  label,
  image,
  className,
  ...props
}) => {
  const formatLabel = (name: string) =>
    name.split('.').slice(0, 2).join('/') +
    (name.split('.').length > 2 ? '…' : '');

  return (
    <button
      type="button"
      className={`flex flex-col items-center justify-center gap-1 w-[84px] h-[84px] rounded-xl bg-white shadow-sm hover:shadow-md transition ${className}`}
      {...props}
    >
      <img src={image} alt={label} className="w-10 h-10 object-contain" />
      <p className="font-caption-m">{formatLabel(label)}</p>
    </button>
  );
};
