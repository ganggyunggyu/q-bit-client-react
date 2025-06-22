import { Button, Dropdown, SelectBox, useRouter } from '@/shared';
import { TitleAppBar } from '@/widgets';
import { useAuthMe } from '@/entities';

const MorePage = () => {
  const { navigate } = useRouter();
  const { data: user, isLoading } = useAuthMe();

  const handleLoginClick = () => navigate('/auth/login');

  return (
    <main className="flex flex-col h-[calc(100vh-52px)] pb-[100px] gap-4 bg-alternative">
      <TitleAppBar title="더보기" />

      <section className="flex flex-col gap-3 px-3">
        {isLoading ? (
          <Button variant="outline" size="lg" disabled>
            <p className="w-full text-left pl-4 animate-pulse text-gray-400">
              로딩중...
            </p>
          </Button>
        ) : !user ? (
          <Button onClick={handleLoginClick} variant="outline" size="lg">
            <p className="w-full text-left pl-4">로그인 해주세요</p>
          </Button>
        ) : (
          <Button variant="outline" size="lg">
            <p className="w-full text-left pl-4">
              {user.displayName}님 오늘도 파이팅!
            </p>
          </Button>
        )}

        <Dropdown
          options={['정보 수정', '푸시 알림', '로그아웃']}
          defaultLabel="기본정보"
          onChange={(val) => console.log('Selected:', val)}
        />
        <Dropdown
          options={['문의 & 피드백 보내기', '회원 탈퇴']}
          defaultLabel="고객지원"
          onChange={(val) => console.log('Selected:', val)}
        />
      </section>

      <section className="flex flex-col px-3 bg-alternative">
        <SelectBox className="flex justify-start">공지사항</SelectBox>
        <SelectBox className="flex justify-start">이용약관</SelectBox>
        <SelectBox className="flex justify-start">개인정보처리방침</SelectBox>
        <SelectBox className="flex justify-start">오픈소스라이선스</SelectBox>
      </section>
    </main>
  );
};

export default MorePage;
