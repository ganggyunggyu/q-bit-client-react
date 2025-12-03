import { motion } from 'framer-motion';
import { User, ChevronRight } from 'lucide-react';
import { User as UserType } from '@/entities/auth/model/user.model';
import { useStudyStreak, StudyStreakBadge } from '@/features/streak';

interface ProfileCardProps {
  user?: UserType;
  isLoading: boolean;
  onLoginClick: () => void;
}

export const ProfileCard = ({
  user,
  isLoading,
  onLoginClick,
}: ProfileCardProps) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-bg-primary rounded-xl p-5 shadow-sm"
    >
      {isLoading ? (
        <ProfileCardSkeleton />
      ) : !user ? (
        <LoginPrompt onClick={onLoginClick} />
      ) : (
        <UserProfile user={user} />
      )}
    </motion.article>
  );
};

const ProfileCardSkeleton = () => (
  <div className="flex items-center gap-4">
    <div className="w-16 h-16 rounded-full bg-bg-secondary animate-pulse" />
    <div className="flex-1 space-y-3">
      <div className="h-5 bg-bg-secondary rounded animate-pulse w-32" />
      <div className="h-4 bg-bg-secondary rounded animate-pulse w-48" />
    </div>
  </div>
);

interface LoginPromptProps {
  onClick: () => void;
}

const LoginPrompt = ({ onClick }: LoginPromptProps) => (
  <button
    onClick={onClick}
    className="flex items-center gap-4 w-full text-left active:scale-[0.98] transition-transform"
  >
    <div className="w-16 h-16 rounded-full bg-bg-secondary flex items-center justify-center">
      <User size={32} className="text-text-tertiary" />
    </div>
    <div className="flex-1">
      <p className="font-headline-sb text-text-primary mb-1">
        로그인이 필요해요
      </p>
      <p className="font-body-m text-text-tertiary">
        자격증 관리를 시작해보세요
      </p>
    </div>
    <ChevronRight size={20} className="text-text-tertiary" />
  </button>
);

interface UserProfileProps {
  user: UserType;
}

const UserProfile = ({ user }: UserProfileProps) => {
  const { streak, streakLevel, isLoading: isStreakLoading } = useStudyStreak();

  return (
    <>
      <header className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-linear-to-br from-primary to-accent flex items-center justify-center text-white font-title-sb">
          {user.displayName?.[0] || 'U'}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <p className="font-headline-sb text-text-primary">
              {user.displayName}님
            </p>
            <StudyStreakBadge
              streak={streak}
              streakLevel={streakLevel}
              isLoading={isStreakLoading}
            />
          </div>
          <p className="font-body-m text-text-secondary">
            {user.email || '환영합니다!'}
          </p>
        </div>
      </header>

      <div className="flex gap-3 mt-4 pt-4 border-t border-divide">
        <div className="flex-1 text-center">
          <p className="font-caption-m text-text-tertiary mb-1">레벨</p>
          <p className="font-headline-sb text-primary">Lv.1</p>
        </div>
        <div className="w-px bg-divide" />
        <div className="flex-1 text-center">
          <p className="font-caption-m text-text-tertiary mb-1">포인트</p>
          <p className="font-headline-sb text-accent">0P</p>
        </div>
        <div className="w-px bg-divide" />
        <div className="flex-1 text-center">
          <p className="font-caption-m text-text-tertiary mb-1">자격증</p>
          <p className="font-headline-sb text-text-primary">
            {user.remindCerts?.length || 0}개
          </p>
        </div>
      </div>
    </>
  );
};
