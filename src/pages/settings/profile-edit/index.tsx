import { AppBar } from '@/widgets';
import { Button, Input } from '@/shared';
import { useGetMe } from '@/entities/auth/hooks/auth.hooks';
import React from 'react';

const ProfileEditPage = () => {
  const { data: user, isLoading } = useGetMe();
  const [displayName, setDisplayName] = React.useState('');

  React.useEffect(() => {
    if (user?.displayName) {
      setDisplayName(user.displayName);
    }
  }, [user]);

  const handleSubmit = () => {
    // TODO: 프로필 수정 API 호출
    console.log('프로필 수정:', { displayName });
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-bg-secondary">
        <AppBar variant="titleBack" title="정보 수정" />
        <div className="p-4 animate-pulse">
          <div className="h-12 bg-bg-tertiary rounded-xl mb-4" />
          <div className="h-12 bg-bg-tertiary rounded-xl" />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-bg-secondary">
      <AppBar variant="titleBack" title="정보 수정" />

      <section className="p-4 flex flex-col gap-4">
        <div className="bg-bg-primary rounded-xl p-4">
          <label className="font-body-sb text-text-secondary mb-2 block">
            닉네임
          </label>
          <Input
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="닉네임을 입력하세요"
          />
        </div>

        <div className="bg-bg-primary rounded-xl p-4">
          <label className="font-body-sb text-text-secondary mb-2 block">
            이메일
          </label>
          <p className="font-body-m text-text-tertiary">
            {user?.email || '등록된 이메일이 없습니다'}
          </p>
        </div>

        <Button onClick={handleSubmit} className="mt-4">
          저장하기
        </Button>
      </section>
    </main>
  );
};

export default ProfileEditPage;
