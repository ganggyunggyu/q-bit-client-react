import LAPTOP_ICON from '@/assets/category/Laptop Icon.png';
import { CategoryButton } from '@/entities';

type Category = {
  label: string;
  image: string;
  code?: string;
};

const CATEGORY_LIST: Category[] = [
  { label: '디자인/마케팅', image: LAPTOP_ICON },
  { label: '조리/제빵', image: LAPTOP_ICON },
  { label: '화학', image: LAPTOP_ICON },
  { label: '건설', image: LAPTOP_ICON },
  { label: '회계/사무', image: LAPTOP_ICON },
  { label: '복지', image: LAPTOP_ICON },
  { label: '호텔/관광', image: LAPTOP_ICON },
  { label: '뷰티/패션/헤어', image: LAPTOP_ICON },
  { label: '법률/관리', image: LAPTOP_ICON },
  { label: '기계/자동차', image: LAPTOP_ICON },
  { label: '외국어', image: LAPTOP_ICON },
  { label: 'IT/정보통신', image: LAPTOP_ICON },
  { label: '전기/에너지', image: LAPTOP_ICON },
  { label: '교육/언어', image: LAPTOP_ICON },
  { label: '기타', image: LAPTOP_ICON },
];
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { certMock } from '@/entities/cert/mock/cert.mock';
import { CertCard } from '@/features';

export const CategoryGrid: React.FC = () => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const visibleCount = 11;
  const visibleItems = CATEGORY_LIST.slice(0, visibleCount);
  const hiddenItems = CATEGORY_LIST.slice(visibleCount);

  const toggleExpanded = () => setIsExpanded(!isExpanded);

  return (
    <article className="grid grid-cols-4 gap-2 px-4 z-10">
      {visibleItems.map((el) => (
        <CategoryButton key={el.label} label={el.label} image={el.image} />
      ))}

      {!isExpanded && (
        <CategoryButton
          label="더보기"
          image={LAPTOP_ICON}
          onClick={toggleExpanded}
        />
      )}

      <AnimatePresence>
        {isExpanded && (
          <React.Fragment>
            {hiddenItems.map((el) => (
              <motion.div
                key={el.label}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="col-span-1"
              >
                <CategoryButton label={el.label} image={el.image} />
              </motion.div>
            ))}

            <motion.div
              key="collapse-button"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="col-span-1"
            >
              <CategoryButton
                label="접기"
                image={LAPTOP_ICON}
                onClick={toggleExpanded}
              />
            </motion.div>
          </React.Fragment>
        )}
      </AnimatePresence>
    </article>
  );
};
