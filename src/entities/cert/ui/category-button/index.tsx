import React from 'react';

interface CategoryButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  label: string;
  image: string;
}

type Category = {
  label: string;
  image: string;
  code?: string;
};

const CATEGORY_LIST: Category[] = [
  { label: '디자인/마케팅', image: '' },
  { label: '조리/제빵', image: '' },
  { label: '화학', image: '' },
  { label: '건설', image: '' },
  { label: '회계/사무', image: '' },
  { label: '복지', image: '' },
  { label: '호텔/관광', image: '' },
  { label: '뷰티/패션/헤어', image: '' },
  { label: '법률/관리', image: '' },
  { label: '기계/자동차', image: '' },
  { label: '외국어', image: '' },
  { label: 'IT/정보통신', image: '' },
  { label: '전기/에너지', image: '' },
  { label: '교육/언어', image: '' },
  { label: '기타', image: '' },
];

export const CategoryButton: React.FC<CategoryButtonProps> = ({
  label,
  image,
  className,
  ...props
}) => {
  return (
    <button
      type="button"
      className={`flex flex-col items-center justify-center gap-1 p-3 rounded-xl bg-white shadow-sm hover:shadow-md transition ${className}`}
      {...props}
    >
      <img src={image} alt={label} className="w-8 h-8 object-contain" />
      <p className="text-sm font-medium text-gray-800">{label}</p>
    </button>
  );
};
