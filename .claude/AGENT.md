# Q-Bit Client - React 개발 가이드

## 프로젝트 개요

- **타입**: React SPA (Vite 기반)
- **패키지 매니저**: Yarn
- **빌드 도구**: Vite 6.2
- **아키텍처**: FSD (Feature-Sliced Design)

## 기술 스택

### 코어

- React 19
- TypeScript 5.8
- Vite 6.2

### 상태 관리

- TanStack Query 5 (서버 상태)
- Zustand 5 (클라이언트 상태)

### 라우팅 & API

- React Router 7
- Axios

### 스타일링

- Tailwind CSS 4
- class-variance-authority (CVA)
- clsx + tailwind-merge

### UI 라이브러리

- Lucide React / React Icons (아이콘)
- Framer Motion / Motion (애니메이션)
- React Calendar
- Swiper / React Slick (슬라이더)
- Lottie (애니메이션)

### 테스트 & 모킹

- Vitest (테스트)
- MSW 2 (API 모킹)

### 유틸리티

- dayjs (날짜)
- es-toolkit / lodash (유틸)
- react-hot-toast (토스트)

## 디렉토리 구조 (FSD)

```
src/
├── app/                    # 앱 설정
│   ├── config/            # Axios 인스턴스 등
│   ├── provider/          # Auth, Layout, ProtectedRoute
│   ├── store/             # Zustand stores
│   ├── styles/            # 글로벌 스타일
│   └── motion/            # 애니메이션 설정
│
├── entities/              # 도메인 엔티티
│   ├── auth/              # 인증
│   ├── cert/              # 자격증
│   ├── memo/              # 메모
│   └── todo/              # 할일
│
├── features/              # 기능 단위
│   └── cert/              # 자격증 기능
│
├── widgets/               # 복합 UI 블록
│   ├── app-bar/           # 상단 바들
│   ├── bottom-bar/        # 하단 네비게이션
│   ├── calendar-box/      # 캘린더
│   └── ...
│
├── pages/                 # 페이지 컴포넌트
│   ├── main/
│   ├── calendar/
│   ├── my-cert/
│   ├── onboarding/
│   └── ...
│
├── shared/                # 공유 리소스
│   ├── components/        # 재사용 컴포넌트
│   ├── hooks/             # 커스텀 훅
│   ├── lib/               # 라이브러리 래퍼
│   ├── util/              # 유틸 함수
│   ├── constants/         # 상수
│   └── icons/             # 아이콘
│
├── assets/                # 정적 자원
└── mocks/                 # MSW 핸들러
```

## FSD 레이어별 역할

| 레이어     | 역할                    | 예시                    |
| ---------- | ----------------------- | ----------------------- |
| `app`      | 앱 초기화, 프로바이더   | AuthProvider, stores    |
| `pages`    | 라우트별 페이지         | MainPage, CalendarPage  |
| `widgets`  | 복합 UI 블록            | AppBar, BottomBar       |
| `features` | 비즈니스 기능           | CertCard, AddCert       |
| `entities` | 도메인 모델             | auth, cert, todo        |
| `shared`   | 공통 유틸, 컴포넌트, UI | Button, Input, useFetch |

## 엔티티 구조 컨벤션

각 엔티티는 다음 구조를 따름:

```
entities/[domain]/
├── api/          # API 호출 함수
├── hooks/        # TanStack Query 훅
├── model/        # 타입 정의
├── ui/           # 도메인 관련 UI
├── mock/         # MSW 모킹 (선택)
└── index.ts      # 배럴 export
```

## 개발 규칙

### 컴포넌트

- 함수형 컴포넌트만 사용
- Props 구조분해할당 필수
- 컴포넌트당 하나의 책임

### API & 서버 상태

- TanStack Query로 서버 상태 관리
- Axios 인스턴스 사용 (`@/app/config/axios-instance`)
- 에러 핸들링 필수

### 클라이언트 상태

- Zustand store 사용 (`@/app/store`)
- 전역 상태 최소화

### 스타일링

- Tailwind CSS 우선
- CVA로 컴포넌트 variant 관리
- `cn()` 유틸로 클래스 병합

### Import 경로

- 절대 경로 사용: `@/entities/auth`
- 배럴 export 활용: `@/shared/components`

## 실행 명령어

```bash
# 개발 서버
yarn dev

# 빌드
yarn build

# 린트
yarn lint

# 테스트
yarn vitest

# FSD 구조 생성
yarn fsd-g
```

## 주요 파일 위치

| 용도               | 경로                       |
| ------------------ | -------------------------- |
| 앱 진입점          | `src/main.tsx`             |
| 앱 컴포넌트        | `src/app/index.tsx`        |
| Axios 인스턴스     | `src/app/config/axios-instance` |
| 전역 스타일        | `src/app/styles/`          |
| Zustand Stores     | `src/app/store/`           |
| MSW 핸들러         | `src/mocks/handlers.ts`    |

## 주의사항

- `strict: false` 설정됨 (타입 엄격 모드 해제)
- React 19 사용 중 (최신 버전)
- SVG는 컴포넌트로 import 가능 (vite-plugin-svgr)
