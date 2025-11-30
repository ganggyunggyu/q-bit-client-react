# Q-Bit Client

자격증 학습 관리 웹 애플리케이션의 클라이언트 프로젝트입니다.

## 기술 스택

### Core
- **React** 19.0.0
- **TypeScript** 5.8.3
- **Vite** 6.2.0

### 상태 관리
- **TanStack Query** - 서버 상태 관리
- **Zustand** - 클라이언트 상태 관리

### UI & Styling
- **Tailwind CSS** 4.1.4
- **Framer Motion** - 애니메이션
- **Lucide React** - 아이콘
- **Lottie** - 애니메이션

### 라우팅
- **React Router** 7.5.0

### 인증
- Kakao OAuth 2.0

### 개발 도구
- **ESLint** - 코드 린팅
- **Prettier** - 코드 포맷팅
- **Vitest** - 단위 테스트
- **MSW** - API 모킹

## 프로젝트 구조

이 프로젝트는 **Feature-Sliced Design (FSD)** 아키텍처를 따릅니다.

```
src/
├── app/           # 애플리케이션 초기화 및 글로벌 설정
│   ├── config/    # 전역 설정
│   ├── provider/  # Context Providers
│   ├── store/     # Zustand 스토어
│   └── styles/    # 글로벌 스타일
├── pages/         # 페이지 컴포넌트
│   ├── main/
│   ├── login/
│   ├── my-cert/
│   ├── my-study/
│   ├── calendar/
│   └── ...
├── widgets/       # 복합 UI 블록
├── features/      # 비즈니스 기능
├── entities/      # 비즈니스 엔티티
│   ├── auth/
│   ├── cert/
│   ├── memo/
│   └── todo/
├── shared/        # 공유 유틸리티 및 컴포넌트
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   └── util/
└── mocks/         # MSW 모킹 데이터
```

## 시작하기

### 사전 요구사항

- **Node.js** 18.x 이상
- **npm** 또는 **pnpm**

### 설치

```bash
# 의존성 설치
npm install
# 또는
pnpm install
```

### 환경 변수 설정

`.env.example` 파일을 복사하여 `.env` 파일을 생성합니다.

```bash
cp .env.example .env
```

`.env` 파일에 필요한 값을 입력합니다:

```env
# API Server
VITE_API_URL=http://localhost:8080

# Kakao OAuth
VITE_KAKAO_CLIENT_ID=your_kakao_rest_api_key
VITE_KAKAO_REDIRECT_URI=http://localhost:5173/auth/kakao/callback
```

### 개발 서버 실행

```bash
npm run dev
```

개발 서버가 [http://localhost:5173](http://localhost:5173)에서 실행됩니다.

### 빌드

```bash
npm run build
```

빌드된 파일은 `dist/` 디렉토리에 생성됩니다.

### 빌드 미리보기

```bash
npm run preview
```

## 주요 기능

- 자격증 정보 조회 및 검색
- 학습 일정 관리
- 개인 학습 기록 관리
- 메모 및 TODO 관리
- 카카오 소셜 로그인
- 캘린더 기반 학습 트래킹

## 스크립트

| 명령어 | 설명 |
|--------|------|
| `npm run dev` | 개발 서버 실행 |
| `npm run build` | 프로덕션 빌드 |
| `npm run preview` | 빌드 결과 미리보기 |
| `npm run lint` | ESLint 실행 |
| `npm run fsd-g` | FSD 구조 생성 도구 실행 |

## 디자인 시스템

### 자박 브랜드 컬러

**메인 컬러**
- `--color-primary`: #62C2B0 (Deep Calm Mint)
- `--color-accent`: #F3C969 (Golden Step)
- `--color-neutral`: #7A8F9E (Soft Teal Gray)
- `--color-navy`: #0D1B2A (Ink Navy)
- `--color-bg-mint`: #DFF3EE (Pale Mist Mint)

**사용 예시**
```tsx
// Tailwind CSS에서 사용
<div className="bg-[--color-primary] text-[--color-navy]">
  자박 메인 컬러
</div>

// CSS에서 사용
.my-element {
  background-color: var(--color-primary);
  color: var(--color-navy);
}
```

컬러 시스템에 대한 자세한 내용은 `/admin-components` 페이지에서 확인할 수 있습니다.

## 코드 컨벤션

- **ESLint** + **Prettier**를 사용하여 코드 스타일을 관리합니다
- TypeScript strict 모드를 사용합니다
- FSD 아키텍처 원칙을 따릅니다
- 컬러는 CSS 변수를 사용하여 일관성을 유지합니다

## 배포

이 프로젝트는 Vercel을 통해 배포됩니다.

```bash
# Vercel 배포 설정 파일
vercel.json
```

## 라이선스

Private
