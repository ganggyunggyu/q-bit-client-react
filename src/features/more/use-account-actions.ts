import toast from 'react-hot-toast';
import { useRouter } from '@/shared';

export const useAccountActions = () => {
  const { navigate } = useRouter();

  const handleLogout = () => {
    // TODO: 실제 로그아웃 API 호출
    localStorage.removeItem('accessToken');
    toast.success('로그아웃 되었습니다.');
    navigate('/');
  };

  const handleWithdraw = () => {
    // TODO: 회원탈퇴 확인 모달 + API 호출
    const confirmed = window.confirm(
      '정말 탈퇴하시겠습니까?\n모든 데이터가 삭제됩니다.',
    );
    if (confirmed) {
      // TODO: 실제 회원탈퇴 API 호출
      console.log('회원 탈퇴 처리');
      toast.success('회원 탈퇴가 완료되었습니다.');
      navigate('/');
    }
  };

  return {
    handleLogout,
    handleWithdraw,
  };
};
