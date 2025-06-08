import React from 'react';
import { motion } from 'framer-motion';

export interface Tab {
  id: string;
  label: string;
}

interface TabsProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'onSelect'> {
  tabs: Tab[];
  selected: string;
  tabKey: string;
  onSelect: (tabId: string) => void;
}

/**
 * Tabs - 탭 네비게이션 컴포넌트
 * 개별 탭의 정보
 * @property id 탭을 식별하는 고유 문자열
 * @property label 탭에 표시할 텍스트 라벨
 *
 * Tabs 컴포넌트 Props
 * @param tabs 탭 목록 (각 탭은 id와 label을 포함함)
 * @param selected 현재 선택된 탭의 id
 * @param onSelect 탭이 선택될 때 실행되는 콜백 (선택된 tab id를 인자로 받음)
 * @param className 추가적인 Tailwind 클래스
 *
 * 선택된 탭에 하이라이트 애니메이션을 적용합니다.
 */
export const Tabs: React.FC<TabsProps> = ({
  tabs,
  selected,
  onSelect,
  className,
  tabKey,
  ...props
}) => {
  const isMounted = React.useRef(false);

  React.useEffect(() => {
    isMounted.current = true;
  }, []);

  return (
    <nav
      className={`relative top-0 z-10 border-b border-gray-200 pt-[15px] ${className ?? ''}`}
      {...props}
    >
      <div className="flex px-4 py-2 overflow-x-auto ">
        {tabs.map((tab) => {
          const isActive = selected === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onSelect(tab.id)}
              className="relative py-2 font-semibold font-title-md-bold w-full"
            >
              <span className={isActive ? 'text-black' : 'text-black-alt'}>
                {tab.label}
              </span>

              <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-primary-trans rounded" />

              {isActive && (
                <motion.div
                  key={tabKey}
                  layoutId={isMounted.current ? 'underline' : ''}
                  className="w-full absolute bottom-0 left-0 right-0 h-[3px] bg-black rounded"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
