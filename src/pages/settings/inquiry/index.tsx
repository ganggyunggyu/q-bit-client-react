import { AppBar } from '@/widgets';
import { Button } from '@/shared';
import { Mail, MessageCircle, ExternalLink } from 'lucide-react';

interface ContactCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action: string;
  onClick: () => void;
}

const ContactCard = ({
  icon,
  title,
  description,
  action,
  onClick,
}: ContactCardProps) => (
  <button
    onClick={onClick}
    className="flex items-center gap-4 p-4 bg-bg-primary rounded-xl w-full text-left active:scale-[0.98] transition-transform"
  >
    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
      {icon}
    </div>
    <div className="flex-1">
      <p className="font-body-sb text-text-primary">{title}</p>
      <p className="font-caption-m text-text-tertiary">{description}</p>
    </div>
    <div className="flex items-center gap-1 text-primary font-body-sb">
      {action}
      <ExternalLink size={16} />
    </div>
  </button>
);

const InquiryPage = () => {
  const handleEmailClick = () => {
    window.location.href = 'mailto:support@jaback.app?subject=[자박] 문의하기';
  };

  const handleKakaoClick = () => {
    // TODO: 카카오톡 채널 링크
    window.open('https://pf.kakao.com/', '_blank');
  };

  return (
    <main className="min-h-screen bg-bg-secondary">
      <AppBar variant="titleBack" title="문의 & 피드백" />

      <section className="p-4 flex flex-col gap-4">
        <div className="bg-bg-primary rounded-xl p-4">
          <h2 className="font-headline-sb text-text-primary mb-2">
            무엇이든 물어보세요!
          </h2>
          <p className="font-body-m text-text-secondary">
            서비스 이용 중 불편한 점이나 개선 아이디어가 있다면 알려주세요.
            빠르게 답변 드릴게요.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <ContactCard
            icon={<Mail size={24} />}
            title="이메일 문의"
            description="support@jaback.app"
            action="보내기"
            onClick={handleEmailClick}
          />

          <ContactCard
            icon={<MessageCircle size={24} />}
            title="카카오톡 문의"
            description="실시간 상담 가능"
            action="채팅"
            onClick={handleKakaoClick}
          />
        </div>

        <div className="mt-4 p-4 bg-accent/10 rounded-xl">
          <p className="font-caption-m text-accent text-center">
            피드백을 보내주시면 소정의 포인트를 드려요!
          </p>
        </div>
      </section>
    </main>
  );
};

export default InquiryPage;
