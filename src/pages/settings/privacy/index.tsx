import { AppBar } from '@/widgets';

const PrivacyPage = () => {
  return (
    <main className="min-h-screen bg-bg-secondary">
      <AppBar variant="titleBack" title="개인정보처리방침" />

      <section className="p-4">
        <article className="bg-bg-primary rounded-xl p-4">
          <h2 className="font-headline-sb text-text-primary mb-4">
            개인정보처리방침
          </h2>

          <div className="space-y-6 font-body-m text-text-secondary">
            <div>
              <h3 className="font-body-sb text-text-primary mb-2">
                1. 수집하는 개인정보 항목
              </h3>
              <p>
                회사는 서비스 제공을 위해 다음과 같은 개인정보를 수집합니다.
                <br />
                - 필수항목: 카카오 계정 정보(닉네임, 이메일)
                <br />- 선택항목: 관심 자격증 정보
              </p>
            </div>

            <div>
              <h3 className="font-body-sb text-text-primary mb-2">
                2. 개인정보의 수집 및 이용목적
              </h3>
              <p>
                - 회원 가입 및 관리
                <br />
                - 서비스 제공 및 맞춤형 콘텐츠 제공
                <br />
                - 시험 일정 리마인드 알림 발송
                <br />- 서비스 개선 및 통계 분석
              </p>
            </div>

            <div>
              <h3 className="font-body-sb text-text-primary mb-2">
                3. 개인정보의 보유 및 이용기간
              </h3>
              <p>
                회원 탈퇴 시 즉시 파기합니다. 단, 관련 법령에 따라 보존이 필요한
                경우 해당 기간 동안 보관됩니다.
              </p>
            </div>

            <div>
              <h3 className="font-body-sb text-text-primary mb-2">
                4. 개인정보의 제3자 제공
              </h3>
              <p>
                회사는 이용자의 동의 없이 개인정보를 제3자에게 제공하지 않습니다.
              </p>
            </div>

            <div>
              <h3 className="font-body-sb text-text-primary mb-2">
                5. 개인정보의 파기
              </h3>
              <p>
                개인정보의 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이
                파기합니다.
              </p>
            </div>

            <div>
              <h3 className="font-body-sb text-text-primary mb-2">
                6. 이용자의 권리
              </h3>
              <p>
                이용자는 언제든지 개인정보의 열람, 정정, 삭제, 처리정지를 요청할
                수 있습니다.
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

export default PrivacyPage;
