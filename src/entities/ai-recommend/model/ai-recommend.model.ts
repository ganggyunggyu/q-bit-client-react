export interface AiRecommendRequest {
  age?: number;
  education?: string; // '고졸' | '전문대졸' | '대졸' | '대학원졸'
  field?: string; // 관심 분야
  experience?: string; // 경력 수준
  goal?: string; // 목표
  additionalInfo?: string; // 추가 정보
}

export interface RecommendedCert {
  certId: string;
  name: string;
  reason: string; // AI가 추천한 이유
  difficulty: 'easy' | 'medium' | 'hard';
  expectedPeriod: string; // 예상 준비 기간
  matchScore: number; // 매칭 점수 (0-100)
}

export interface AiRecommendResponse {
  recommendations: RecommendedCert[];
  summary: string; // AI의 전체 추천 요약
  aiMessage?: string; // AI가 사용자에게 전하는 메시지
}

export interface RecommendStep {
  id: number;
  question: string;
  field: keyof AiRecommendRequest;
  type: 'select' | 'text' | 'number';
  options?: { value: string; label: string }[];
  placeholder?: string;
}

export const RECOMMEND_STEPS: RecommendStep[] = [
  {
    id: 1,
    question: '나이가 어떻게 되시나요?',
    field: 'age',
    type: 'number',
    placeholder: '예: 25',
  },
  {
    id: 2,
    question: '최종 학력은 어떻게 되시나요?',
    field: 'education',
    type: 'select',
    options: [
      { value: '고졸', label: '고등학교 졸업' },
      { value: '전문대졸', label: '전문대학 졸업' },
      { value: '대졸', label: '대학교 졸업' },
      { value: '대학원졸', label: '대학원 졸업' },
    ],
  },
  {
    id: 3,
    question: '어떤 분야에 관심이 있으신가요?',
    field: 'field',
    type: 'text',
    placeholder: 'IT, 건설, 디자인, 회계 등',
  },
  {
    id: 4,
    question: '관련 경력이 있으신가요?',
    field: 'experience',
    type: 'select',
    options: [
      { value: '없음', label: '경력 없음' },
      { value: '1년 미만', label: '1년 미만' },
      { value: '1-3년', label: '1-3년' },
      { value: '3-5년', label: '3-5년' },
      { value: '5년 이상', label: '5년 이상' },
    ],
  },
  {
    id: 5,
    question: '자격증을 취득하려는 목표가 무엇인가요?',
    field: 'goal',
    type: 'text',
    placeholder: '취업, 이직, 자기계발 등',
  },
  {
    id: 6,
    question: '추가로 전달하고 싶은 내용이 있나요? (선택)',
    field: 'additionalInfo',
    type: 'text',
    placeholder: '예: 빠르게 딸 수 있는 자격증 위주로 추천해주세요',
  },
];
