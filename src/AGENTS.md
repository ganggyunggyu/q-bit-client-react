# q-bit-client-react 전용 AGENT 지침

이 파일은 `/src` 이하 트리에만 적용되는 추가 규칙이야.  
루트 `AGENTS.md` 지침을 우선 따르고, 여기 내용은 이 프로젝트 구조에 맞게 보완하는 용도다.

## 기술 스택 요약

- React + TypeScript + Vite
- 상태 관리: jotai + 커스텀 store (`src/app/store`)
- 비동기: TanStack Query (`@tanstack/react-query`)
- 스타일: Tailwind CSS + framer-motion + lucide-react
- FSD 구조 이미 적용됨
  - `app / pages / widgets / features / entities / shared` 계층 유지

## 구조 및 설계 규칙

- FSD 계층 간 의존성은 현재 구조를 유지한다.
  - `shared` → 어디서나
  - `entities` → `features`, `widgets`, `pages`에서만
  - `features` → `widgets`, `pages`에서만
  - `widgets` → `pages`에서만
- 새 모듈 추가 시 반드시 계층을 먼저 정하고 디렉터리부터 만든다.
- 캘린더 관련 기능은 가능한 한 다음 기준으로 정리한다.
  - **도메인 상태/타입**: `src/entities/calendar`
  - **도메인 비즈니스 로직/훅**: `src/features/calendar`
  - **복합 UI(뷰 전환/레이아웃)**: `src/widgets/calendar-*`
  - **페이지 진입점**: `src/pages/calendar`

## React / 상태 관리 규칙

- 모든 새 컴포넌트는 TypeScript 함수형 컴포넌트로 작성한다.
- `className`에는 반드시 `cn` 유틸을 사용한다.
  - `import { cn } from '@/shared';`
- 전역 상태는 jotai 기반 `app/store` 패턴을 따른다.
  - 캘린더 스케일(10년/1년/월/주/일) 같은 전역 UI 상태도 jotai로 관리.
- 서버 상태는 TanStack Query로만 관리한다.
  - `entities/*/api`, `entities/*/hooks` 패턴을 그대로 따른다.

## 캘린더 UX 관련 규칙 (재사용용)

- 이 프로젝트에서 검증된 패턴은 새 캘린더 서비스에서도 재사용 가능하게 만든다.
  - **세로 스크롤 무한 월 뷰**: `src/widgets/vertical-calendar`
  - **월 단위 집약 뷰 + 진행도**: `src/widgets/calendar-box`
  - **주 단위 뷰**: `src/widgets/weekly-calendar` (필요 시 확장)
- 줌인/줌아웃, 년/월/주/일 전환 로직은
  - 상태/전환 규칙: `entities` 또는 `features`
  - UI(애니메이션/제스처): `widgets`
    로 분리해서, 나중에 별도 캘린더 서비스로 뽑아내기 좋게 유지한다.

## 네이밍 / 설정 관리

- 새 캘린더 기반 서비스용 코드는 재사용을 염두에 두고 이름을 짓는다.
  - 임시 서비스 이름은 `LifeArchiveCalendar` 로 통일
  - 표시용 이름은 상수로만 관리한다.
    - 예: `src/shared/constants/app-meta.ts` 에 `APP_DISPLAY_NAME` 등으로 정의
- 환경변수 이름, 라우트 prefix, 쿼리 키 등은
  - 나중에 한 번에 치환하기 쉽도록 `life-archive` 접두어 등 일관된 패턴을 사용한다.

## 테스트 / 개선

- 캘린더 관련 로직(날짜 계산, 기간 생성 등)은 순수 함수로 뽑아서 유닛 테스트 가능하게 만든다.
- UX 관련 작업을 할 때는:
  - 모바일 1st (세로 기준) → 태블릿 → 데스크톱 순으로 확인
  - 스크롤/제스처(핀치, 스와이프) 이벤트는 반드시 `passive` 영향 고려
