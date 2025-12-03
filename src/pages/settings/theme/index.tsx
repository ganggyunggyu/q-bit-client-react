import { motion } from 'framer-motion';
import { Sun, Moon, Monitor, Check } from 'lucide-react';
import { AppBar } from '@/widgets';
import { useThemeStore, ThemeMode } from '@/features/theme';

interface ThemeCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
}

const ThemeCard = ({
  icon,
  title,
  description,
  selected,
  onClick,
}: ThemeCardProps) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-normal active:scale-[0.98] ${
      selected
        ? 'border-primary bg-primary/5'
        : 'border-transparent bg-bg-primary shadow-sm'
    }`}
  >
    <div
      className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
        selected ? 'bg-primary text-white' : 'bg-bg-secondary text-text-secondary'
      }`}
    >
      {icon}
    </div>
    <div className="flex-1 text-left">
      <p className={`font-body-sb ${selected ? 'text-primary' : 'text-text-primary'}`}>
        {title}
      </p>
      <p className="font-caption-m text-text-tertiary">{description}</p>
    </div>
    {selected && (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="text-primary"
      >
        <Check size={20} />
      </motion.div>
    )}
  </button>
);

const THEME_OPTIONS: { mode: ThemeMode; icon: React.ReactNode; title: string; description: string }[] = [
  {
    mode: 'light',
    icon: <Sun size={24} />,
    title: '라이트 모드',
    description: '밝은 테마를 사용합니다',
  },
  {
    mode: 'dark',
    icon: <Moon size={24} />,
    title: '다크 모드',
    description: '어두운 테마를 사용합니다',
  },
  {
    mode: 'system',
    icon: <Monitor size={24} />,
    title: '시스템 설정',
    description: '기기 설정에 따라 자동 전환',
  },
];

const ThemePage = () => {
  const { mode, setMode, resolvedTheme } = useThemeStore();

  return (
    <main className="min-h-screen bg-bg-secondary pt-safe">
      <AppBar variant="titleBack" title="테마 설정" />

      <section className="p-4 flex flex-col gap-3">
        {THEME_OPTIONS.map((option, index) => (
          <motion.div
            key={option.mode}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ThemeCard
              icon={option.icon}
              title={option.title}
              description={option.description}
              selected={mode === option.mode}
              onClick={() => setMode(option.mode)}
            />
          </motion.div>
        ))}
      </section>

      <p className="font-caption-m text-text-tertiary text-center mt-4 px-4">
        현재 적용된 테마: {resolvedTheme === 'dark' ? '다크 모드' : '라이트 모드'}
      </p>
    </main>
  );
};

export default ThemePage;
