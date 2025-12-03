import {
  User,
  Award,
  BookOpen,
  Bell,
  Sun,
  MessageSquare,
  Info,
  FileText,
  Shield,
  Code,
  LogOut,
  UserX,
} from 'lucide-react';

import { useRouter } from '@/shared';
import { useGetMe } from '@/entities/auth/hooks/auth.hooks';
import { useAccountActions } from '@/features/more';
import { ProfileCard, MenuSection, MenuItem } from '@/widgets';

const MorePage = () => {
  const { navigate } = useRouter();
  const { data: user, isLoading } = useGetMe();
  const { handleLogout, handleWithdraw } = useAccountActions();

  const menuSections = [
    {
      title: '내 정보',
      items: [
        {
          icon: <Award size={20} />,
          label: '내 자격증',
          onClick: () => navigate('/my-cert'),
        },
        {
          icon: <BookOpen size={20} />,
          label: '내 학습',
          onClick: () => navigate('/my-study'),
        },
        {
          icon: <User size={20} />,
          label: '정보 수정',
          onClick: () => navigate('/settings/profile'),
        },
      ],
    },
    {
      title: '설정',
      items: [
        {
          icon: <Bell size={20} />,
          label: '푸시 알림',
          onClick: () => navigate('/settings/notifications'),
        },
        {
          icon: <Sun size={20} />,
          label: '테마 설정',
          onClick: () => navigate('/settings/theme'),
        },
      ],
    },
    {
      title: '고객지원',
      items: [
        {
          icon: <MessageSquare size={20} />,
          label: '문의 & 피드백',
          onClick: () => navigate('/settings/inquiry'),
        },
        {
          icon: <Info size={20} />,
          label: '공지사항',
          onClick: () => navigate('/settings/notice'),
        },
      ],
    },
    {
      title: '앱 정보',
      items: [
        {
          icon: <FileText size={20} />,
          label: '이용약관',
          onClick: () => navigate('/settings/terms'),
        },
        {
          icon: <Shield size={20} />,
          label: '개인정보처리방침',
          onClick: () => navigate('/settings/privacy'),
        },
        {
          icon: <Code size={20} />,
          label: '오픈소스 라이선스',
          onClick: () => navigate('/settings/licenses'),
        },
      ],
    },
  ];

  const accountItems: MenuItem[] = user
    ? [
        {
          icon: <LogOut size={20} />,
          label: '로그아웃',
          onClick: handleLogout,
        },
        {
          icon: <UserX size={20} />,
          label: '회원 탈퇴',
          onClick: handleWithdraw,
          variant: 'danger',
        },
      ]
    : [];

  return (
    <main className="min-h-screen bg-bg-secondary pb-(--layout-bottom-bar-height) pt-safe">
      <div className="flex flex-col gap-6 px-(--layout-page-px) pt-6">
        <ProfileCard
          user={user}
          isLoading={isLoading}
          onLoginClick={() => navigate('/auth/login')}
        />

        {menuSections.map((section, index) => (
          <MenuSection
            key={section.title}
            title={section.title}
            items={section.items}
            animationDelay={index * 0.1}
          />
        ))}

        {accountItems.length > 0 && (
          <MenuSection
            items={accountItems}
            animationDelay={menuSections.length * 0.1}
          />
        )}

        <footer className="text-center py-4">
          <p className="font-caption-m text-text-tertiary">자박 v1.0.0</p>
        </footer>
      </div>
    </main>
  );
};

export default MorePage;
