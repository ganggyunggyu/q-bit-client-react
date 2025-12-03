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
      className={`relative top-0 z-10 bg-normal ${className ?? ''}`}
      {...props}
    >
      <div className="flex px-4 overflow-x-auto">
        {tabs.map((tab) => {
          const isActive = selected === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onSelect(tab.id)}
              className="relative py-3 font-semibold font-title-md-bold w-full"
            >
              <span
                className={`transition-colors ${
                  isActive ? 'text-text-primary' : 'text-text-tertiary'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="relative h-[3px] bg-border-gray mx-4 rounded-full overflow-hidden">
        <motion.div
          layoutId={isMounted.current ? `tab-indicator-${tabKey}` : undefined}
          className="absolute top-0 h-full bg-primary rounded-full"
          style={{ width: `${100 / tabs.length}%` }}
          animate={{
            left: `${(tabs.findIndex((t) => t.id === selected) / tabs.length) * 100}%`,
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        />
      </div>
    </nav>
  );
};
