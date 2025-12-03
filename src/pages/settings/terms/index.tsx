import { AppBar } from '@/widgets';

const TermsPage = () => {
  return (
    <main className="min-h-screen bg-bg-secondary">
      <AppBar variant="titleBack" title="이용약관" />

      <section className="p-4">
        <article className="bg-bg-primary rounded-xl p-4">
          <h2 className="font-headline-sb text-text-primary mb-4">
            자박 서비스 이용약관
          </h2>

          <div className="space-y-6 font-body-m text-text-secondary">
            <div>
              <h3 className="font-body-sb text-text-primary mb-2">
                제1조 (목적)
              </h3>
              <p>
                이 약관은 자박(이하 "회사")이 제공하는 자격증 관리 서비스(이하
                "서비스")의 이용조건 및 절차, 회사와 이용자의 권리, 의무 및
                책임사항을 규정함을 목적으로 합니다.
              </p>
            </div>

            <div>
              <h3 className="font-body-sb text-text-primary mb-2">
                제2조 (정의)
              </h3>
              <p>
                1. "서비스"란 회사가 제공하는 자격증 일정 관리, 학습 관리, 리마인드
                등의 서비스를 말합니다.
                <br />
                2. "이용자"란 이 약관에 따라 회사가 제공하는 서비스를 받는 회원 및
                비회원을 말합니다.
              </p>
            </div>

            <div>
              <h3 className="font-body-sb text-text-primary mb-2">
                제3조 (약관의 효력 및 변경)
              </h3>
              <p>
                1. 이 약관은 서비스를 이용하고자 하는 모든 이용자에 대하여 그
                효력을 발생합니다.
                <br />
                2. 회사는 필요한 경우 관련 법령을 위배하지 않는 범위 내에서 이
                약관을 변경할 수 있습니다.
              </p>
            </div>

            <div>
              <h3 className="font-body-sb text-text-primary mb-2">
                제4조 (서비스의 제공)
              </h3>
              <p>
                회사는 다음과 같은 서비스를 제공합니다.
                <br />
                1. 자격증 시험 일정 조회 및 관리
                <br />
                2. 학습 계획 수립 및 관리
                <br />
                3. 시험 일정 리마인드 알림
                <br />
                4. 기타 회사가 정하는 서비스
              </p>
            </div>

            <p className="text-text-tertiary font-caption-m pt-4 border-t border-divide">
              시행일: 2024년 12월 1일
            </p>
          </div>
        </article>
      </section>
    </main>
  );
};

export default TermsPage;
