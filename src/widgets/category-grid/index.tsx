import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CategoryButton } from '@/entities';
import LAPTOP_ICON from '@/assets/category/Laptop Icon.png';

type Category = {
  count: number;
  name: string;
  image: string;
  code?: string;
};

const CATEGORY_LIST: Category[] = [
  {
    count: 103,
    code: '14',
    name: '건설',
    image: LAPTOP_ICON,
  },
  {
    count: 102,
    code: null,
    name: '기타',
    image: LAPTOP_ICON,
  },
  {
    count: 83,
    code: '16',
    name: '기계',
    image: LAPTOP_ICON,
  },
  {
    count: 42,
    code: '24',
    name: '농림어업',
    image: LAPTOP_ICON,
  },
  {
    count: 42,
    code: '25',
    name: '안전관리',
    image: LAPTOP_ICON,
  },
  {
    count: 40,
    code: '20',
    name: '전기.전자',
    image: LAPTOP_ICON,
  },
  {
    count: 37,
    code: '17',
    name: '재료',
    image: LAPTOP_ICON,
  },
  {
    count: 35,
    code: '26',
    name: '환경.에너지',
    image: LAPTOP_ICON,
  },
  {
    count: 20,
    code: '23',
    name: '인쇄.목재.가구.공예',
    image: LAPTOP_ICON,
  },
  {
    count: 19,
    code: '19',
    name: '섬유.의복',
    image: LAPTOP_ICON,
  },
  {
    count: 13,
    code: '22',
    name: '식품.가공',
    image: LAPTOP_ICON,
  },
  {
    count: 13,
    code: '18',
    name: '화학',
    image: LAPTOP_ICON,
  },
  {
    count: 13,
    code: '02',
    name: '경영.회계.사무',
    image: LAPTOP_ICON,
  },
  {
    count: 12,
    code: '13',
    name: '음식서비스',
    image: LAPTOP_ICON,
  },
  {
    count: 10,
    code: '08',
    name: '문화.예술.디자인.방송',
    image: LAPTOP_ICON,
  },
  {
    count: 9,
    code: '21',
    name: '정보통신',
    image: LAPTOP_ICON,
  },
  {
    count: 8,
    code: '12',
    name: '이용.숙박.여행.오락.스포츠',
    image: LAPTOP_ICON,
  },
  {
    count: 6,
    code: '15',
    name: '광업자원',
    image: LAPTOP_ICON,
  },
  {
    count: 3,
    code: '06',
    name: '보건.의료',
    image: LAPTOP_ICON,
  },
  {
    count: 2,
    code: '07',
    name: '사회복지.종교',
    image: LAPTOP_ICON,
  },
  {
    count: 2,
    code: '09',
    name: '운전.운송',
    image: LAPTOP_ICON,
  },
  {
    count: 1,
    code: '04',
    name: '교육.자연.과학.사회과학',
    image: LAPTOP_ICON,
  },
  {
    count: 1,
    code: '10',
    name: '영업.판매',
    image: LAPTOP_ICON,
  },
  {
    count: 1,
    code: '01',
    name: '사업관리',
    image: LAPTOP_ICON,
  },
];

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
