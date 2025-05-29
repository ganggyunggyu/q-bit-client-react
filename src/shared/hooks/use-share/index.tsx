export const useShare = () => {
  const shareContent = async (title: string, text: string, url: string) => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
        // console.log('공유 성공!');
      } catch (error) {
        console.error('공유 실패 또는 취소', error);
      }
    } else {
      alert('이 브라우저에서는 공유 기능을 지원하지 않습니다.');
    }
  };

  return { shareContent };
};
