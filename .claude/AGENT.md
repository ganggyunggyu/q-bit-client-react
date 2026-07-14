# Q-Bit Client - React 개발 가이드

## 프로젝트 개요

- **타입**: React SPA (Vite 기반)
- **패키지 매니저**: `package-lock.json`과 `pnpm-lock.yaml`이 공존함 (yarn.lock 없음). README는 npm/pnpm 기준으로 안내함 — 실제 팀 표준 PM을 확정해서 하나만 남기는 것을 권장
- **빌드 도구**: Vite 6.2
- **아키텍처**: FSD (Feature-Sliced Design)
- **배포**: Vercel (`vercel.json`)

## 기술 스택

### 코어

- React 19
- TypeScript 5.8 (`tsconfig.json`은 `strict: false`, `tsconfig.app.json`은 `strict: true` — 두 설정이 상충하니 실제 빌드에 쓰이는 쪽 기준으로 판단할 것)
- Vite 6.2

### 상태 관리

- TanStack Query 5 (서버 상태)
- Zustand 5 (클라이언트 상태) — 이 레포는 Zustand를 씀. 전역 CLAUDE.md의 "React는 Jotai 기본" 규칙보다 **이 레포의 기존 컨벤션(Zustand)이 우선**

### 라우팅 & API

- React Router 7
- Axios (`@/app/config` 의 axios 인스턴스 사용)

### 스타일링

- Tailwind CSS 4
- class-variance-authority (CVA)
- clsx + tailwind-merge → `cn()` 유틸 (`src/shared/lib/cn`)

### UI 라이브러리

- Lucide React / React Icons (아이콘)
- Framer Motion / Motion (애니메이션)
- React Calendar, Swiper / React Slick (슬라이더), Lottie
- vaul (바텀시트 — 자체 구현에서 마이그레이션됨)

### 테스트 & 모킹

- Vitest (테스트)
- MSW 2 (API 모킹, `src/mocks/`)

### 유틸리티

- dayjs (날짜), es-toolkit / lodash (유틸), react-hot-toast (토스트)

## 디렉토리 구조 (FSD)

```
src/
├── app/
│   ├── config/            # axios-instance
│   ├── provider/          # auth-provider, protected-route, layout-provider
│   ├── store/             # use-auth-store, use-ui-store, use-onboarding-store, use-calendar-store
│   ├── styles/            # 글로벌 스타일
│   └── motion/            # 애니메이션 설정
│
├── entities/               # 도메인 엔티티
│   ├── auth/               # ui/hooks/model/api
│   ├── cert/                # ui/mock/hooks/model/api
│   ├── passed-cert/          # hooks/model/api (합격 기록)
│   ├── todo/                 # ui/hooks/model/lib/api
│   ├── memo/                 # hooks/model/api
│   ├── ai-recommend/          # hooks/model/api (AI 자격증 추천)
│   └── ai-report/              # hooks/model/api (AI 주간 리포트)
│
├── features/                # 기능 단위
│   ├── cert/ui, todo/ui+hooks, passed-cert/ui, streak/, more/
│   ├── search/ui+model, theme/ui+model
│   └── ai-recommend/
│
├── widgets/                  # 복합 UI 블록
│   ├── app-bar/(caleander-app-bar), bottom-bar/, calendar-box/, vertical-calendar/
│   ├── weekly-calendar/, todo-stats/, main-actions/, category-grid/
│   ├── upcoming-certs-section/, my-remind-certs-section/, top-cert-list/, cheer-modal/
│   ├── more-page/(profile-card, menu-section)
│   └── admin-components/(text-variants, color-variants) # 디자인 시스템 프리뷰
│
├── pages/                     # 라우트별 페이지 (대부분 React.lazy로 지연 로딩)
│   ├── main/, calendar/, my-cert/, my-study/, weekly-report/
│   ├── search/, cert-detail/, ai-recommend/
│   ├── login/, login-request/, kakao-callback-page/
│   ├── onboarding/(1-cert, 2-style)
│   ├── settings/(privacy, inquiry, licenses, terms, notice, theme, notifications, profile-edit)
│   └── admin-components/
│
├── shared/
│   ├── components/         # button, input, modal, bottom-sheet, dropdown, tabs, card, chip, select-box, check-box-input, check-toggle, skeleton-loader, spinner, header
│   ├── hooks/               # use-share, use-scroll, use-watch-position, use-toggle, use-tab-direction, use-visibility, use-loading, use-router
│   ├── lib/                  # cn, cookie, delay, kakao-login
│   ├── util/                  # format-date
│   ├── constants/
│   └── icons/
│
├── assets/                 # tab-bar, category, lottie
└── mocks/                  # MSW 핸들러
```

## FSD 레이어별 역할

| 레이어     | 역할                    | 예시                    |
| ---------- | ----------------------- | ----------------------- |
| `app`      | 앱 초기화, 프로바이더   | AuthProvider, stores    |
| `pages`    | 라우트별 페이지 (lazy)  | MainPage, CalendarPage  |
| `widgets`  | 복합 UI 블록            | AppBar, BottomBar       |
| `features` | 비즈니스 기능           | CertCard, RecommendForm |
| `entities` | 도메인 모델             | auth, cert, todo, ai-recommend |
| `shared`   | 공통 유틸, 컴포넌트, UI | Button, Input, cn()     |

## 엔티티 구조 컨벤션

```
entities/[domain]/
├── api/          # API 호출 함수 (axios 직접 호출, ex: todoApi.create)
├── hooks/        # TanStack Query 훅
├── model/        # 타입 정의 ([domain].model.ts)
├── ui/           # 도메인 관련 UI (선택)
├── lib/          # 도메인 로컬 유틸 (선택)
├── mock/         # MSW 모킹 (선택)
└── index.ts      # 배럴 export
```

## 개발 규칙

### 컴포넌트

- 함수형 컴포넌트만 사용, Props 구조분해할당 필수, 컴포넌트당 하나의 책임

### API & 서버 상태

- TanStack Query로 서버 상태 관리
- Axios 인스턴스 사용 (`@/app/config` → axios-instance)
- 에러 핸들링 필수

### 클라이언트 상태

- Zustand store 사용 (`@/app/store`), 전역 상태 최소화

### 스타일링

- Tailwind CSS 우선, CVA로 컴포넌트 variant 관리, `cn()` 유틸로 클래스 병합
- 브랜드 컬러는 CSS 변수 사용: `--color-primary`(#62C2B0), `--color-accent`(#F3C969), `--color-neutral`(#7A8F9E), `--color-navy`(#0D1B2A), `--color-bg-mint`(#DFF3EE). 상세는 `/admin-components` 페이지 참고

### Import 경로

- 절대 경로 사용: `@/entities/auth`
- 배럴 export 활용: `@/shared/components`

### 라우팅 / 코드 스플리팅

- 자주 안 쓰는 페이지는 `React.lazy`로 분리 (초기 번들 크기 이슈로 `more`/`admin-components`/`my-cert`/`my-study` 등 전환됨, `src/pages/index.tsx`)
- 카카오 콜백 라우트는 서버·카카오 콘솔과 동일하게 `/auth/kakao/callback` 형식(슬래시) 사용 — 하이픈 버전으로 되돌리면 콜백이 깨짐

## 실행 명령어

```bash
npm run dev       # 개발 서버 (Vite, localhost:5173)
npm run build     # tsc -b && vite build
npm run lint      # ESLint
npm run preview   # 빌드 미리보기
npx vitest        # 테스트 (package.json script는 미등록, vitest devDependency만 존재)
npm run fsd-g      # FSD 구조 생성 도구 (fsd-maker.ts)
```

## 주요 파일 위치

| 용도               | 경로                             |
| ------------------ | --------------------------------- |
| 앱 진입점          | `src/main.tsx`                    |
| 앱 컴포넌트        | `src/app/index.tsx`               |
| Axios 인스턴스     | `src/app/config/axios-instance`   |
| 전역 스타일        | `src/app/styles/`                 |
| Zustand Stores     | `src/app/store/`                  |
| MSW 핸들러         | `src/mocks/handlers.ts`           |
| cn() 유틸          | `src/shared/lib/cn`               |

## 주의사항

- `tsconfig.json`(`strict: false`)과 `tsconfig.app.json`(`strict: true`)이 상충함 — Vite 빌드는 `tsc -b`로 `tsconfig.app.json`을 타므로 실질적으로는 strict 적용됨. 루트 `tsconfig.json`의 완화 설정은 혼선을 줄 수 있어 정리 권장
- lockfile이 `package-lock.json` + `pnpm-lock.yaml` 두 개 공존 — 실제 사용 PM 하나로 통일 권장
- React 19 사용 중, SVG는 컴포넌트로 import 가능 (vite-plugin-svgr)
- 알려진 트러블슈팅은 [README.md](../README.md) 하단 참고 (카카오 콜백 경로 불일치, AI 추천 폼 undefined 에러, 정적 import로 인한 초기 번들 비대화)
