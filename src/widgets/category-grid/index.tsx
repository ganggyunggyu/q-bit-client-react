import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CategoryButton } from '@/entities';
import LAPTOP_ICON from '@/assets/category/Laptop Icon.png';
import { CATEGORY_LIST } from './data';

export const CategoryGrid: React.FC = () => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const visibleCount = 11;
  const visibleItems = CATEGORY_LIST.slice(0, visibleCount);
  const hiddenItems = CATEGORY_LIST.slice(visibleCount);

  const toggleExpanded = () => setIsExpanded(!isExpanded);

  return (
    <article className="grid grid-cols-4 gap-2 px-4 z-10">
      {visibleItems.map((el) => (
        <CategoryButton key={el.name} label={el.name} image={el.image} />
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
                key={el.name}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="col-span-1"
              >
                <CategoryButton label={el.name} image={el.image} />
              </motion.div>
            ))}

            <motion.div
              key="collapse-button"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
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
