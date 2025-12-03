# 코드 개선점 분석 보고서

> 분석일: 2025-12-02 (업데이트)
> 분석 대상: q-bit-client-react 전체 프로젝트
> 기술 스택: React 19, TypeScript, Vite, TanStack Query, Zustand/Jotai, Tailwind CSS

## 요약

- 🔴 Critical: 1건
- 🟠 High: 5건
- 🟡 Medium: 7건
- 🟢 Low: 4건

### 최근 해결된 이슈
- ~~CRIT-001: searchInputRef null 체크~~ → 이미 optional chaining 적용됨
- ~~HIGH-004: lazy import 미사용~~ → pages/index.tsx에 lazy 적용됨

---

## 🔴 Critical Issues

### [CRIT-001] Calendar 페이지에서 중복 코드 사용

**위치**: `src/pages/calendar/index.tsx:16-45`

**문제**:
`useTodoState`와 `getLocalDateString`이 `features/todo/hooks`에 이미 존재하지만, Calendar 페이지에서 동일한 코드가 중복 정의되어 있음.

**현재 코드**:
```typescript
// pages/calendar/index.tsx - 중복 정의
const createEmptyTodo = (): CreateTodoItemDto => ({
  title: '',
  isCompleted: false,
});

const getLocalDateString = (date: Date) =>
  new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .split('T')[0];

const useTodoState = (selectedDate: Date) => {
  // ... 중복된 훅 로직
};
```

**영향**:
- 코드 유지보수 어려움 (수정 시 두 곳 모두 변경 필요)
- 버그 발생 시 일관성 없는 동작 가능
- DRY 원칙 위반

**해결 방안**:
```typescript
import { useTodoState, getLocalDateString } from '@/features/todo';

// 중복 코드 제거하고 import 사용
```

**검증 방법**:
- Calendar 페이지 Todo 기능 정상 동작 확인
- MyStudy 페이지와 동일한 동작 확인

---

## 🟠 High Priority Issues

### [HIGH-001] 상태 관리 라이브러리 불일치

**위치**: `src/features/search/model/search.store.ts`

**문제**:
프로젝트에서 Jotai를 표준 상태 관리로 사용해야 하나, search store는 Zustand를 사용.

**현재 코드**:
```typescript
import { create } from 'zustand';

export const useSearchStore = create<SearchState>((set) => ({
  // ...
}));
```

**영향**:
- 상태 관리 일관성 부재
- 새 개발자 혼란
- 번들 사이즈 불필요한 증가 (두 라이브러리 모두 포함)

**해결 방안**:
Jotai atom으로 마이그레이션:
```typescript
import { atom, useAtom } from 'jotai';

export const searchStateAtom = atom({
  isSearch: false,
  isFocus: false,
  inputValue: '',
  query: '',
  isTyping: false,
});

export const useSearchStore = () => {
  const [state, setState] = useAtom(searchStateAtom);
  // ... actions
};
```

---

### [HIGH-002] QueryKey 팩토리 패턴 미적용

**위치**: `src/entities/auth/hooks/auth.hooks.ts`

**문제**:
`certKeys`처럼 팩토리 패턴을 사용하지 않고 queryKey를 직접 작성.

**현재 코드**:
```typescript
// auth.hooks.ts - 일관성 없음
export const useGetMe = () => {
  return useQuery<User>({
    queryKey: ['me'],  // 문자열 직접 사용
    queryFn: () => authApi.getMe(),
  });
};
```

**좋은 예시** (cert.hooks.ts):
```typescript
export const certKeys = {
  all: ['certs'] as const,
  search: (params: SearchCertParams) => [...certKeys.all, 'search', params] as const,
  // ...
};
```

**해결 방안**:
```typescript
export const authKeys = {
  all: ['auth'] as const,
  me: () => [...authKeys.all, 'me'] as const,
};

export const useGetMe = () => {
  return useQuery<User>({
    queryKey: authKeys.me(),
    queryFn: authApi.getMe,
  });
};
```

---

### [HIGH-003] 더보기 페이지 미구현 기능들

**위치**: `src/pages/more/index.tsx:43-94`

**문제**:
메뉴 아이템들의 onClick이 `console.log`로만 구현되어 있음.

**현재 코드**:
```typescript
{
  icon: <User size={20} />,
  label: '정보 수정',
  onClick: () => console.log('정보 수정'),  // 미구현
},
{
  icon: <Bell size={20} />,
  label: '푸시 알림',
  onClick: () => console.log('푸시 알림'),  // 미구현
},
// ... 더 많은 미구현 항목들
```

**영향**:
- 사용자가 클릭해도 아무 반응 없음
- 프로덕션에 console.log 노출
- UX 저하

**해결 방안**:
1. 구현 예정인 기능은 `disabled` 상태로 표시
2. console.log 제거
3. toast로 "준비 중" 메시지 표시

```typescript
{
  icon: <User size={20} />,
  label: '정보 수정',
  onClick: () => toast('준비 중인 기능입니다'),
  disabled: true,
},
```

---

### [HIGH-004] CalendarBox 파일 복잡도

**위치**: `src/widgets/calendar-box/index.tsx`

**문제**:
263줄로 너무 크고, `CalendarProgress` 컴포넌트가 같은 파일에 포함됨.

**현재 구조**:
```typescript
// calendar-box/index.tsx (263줄)
export const CalendarBox = () => { /* ... 200줄 */ };

// 같은 파일에 별도 컴포넌트
export const CalendarProgress: React.FC<CalendarProgressProps> = ({ /* ... */ });
```

**영향**:
- 파일 복잡도 증가
- 코드 탐색 어려움
- CalendarProgress 재사용 어려움

**해결 방안**:
```
widgets/calendar-box/
├── index.tsx           # CalendarBox
├── calendar-progress.tsx  # CalendarProgress 분리
└── calendar.css
```

---

### [HIGH-005] Import 순서 비일관

**위치**: `src/widgets/calendar-box/index.tsx:201-202`

**문제**:
파일 중간에 import 문이 있음.

**현재 코드**:
```typescript
// 파일 상단 imports...

export const CalendarBox = () => { /* ... */ };

// 파일 중간에 추가 import!
import { useSpring, useTransform } from 'framer-motion';
import { useGetMyRemindCerts } from '@/entities';

export const CalendarProgress = () => { /* ... */ };
```

**영향**:
- 코드 가독성 저하
- ESLint import 규칙 위반
- 모듈 의존성 파악 어려움

**해결 방안**:
모든 import를 파일 상단으로 이동.

---

## 🟡 Medium Priority Issues

### [MED-001] Magic Numbers 하드코딩

**위치**: 여러 파일

**문제**:
의미 있는 숫자들이 상수화 없이 직접 사용됨.

**예시**:
```typescript
// src/pages/calendar/index.tsx:124
<RemainingDateLabel day={10} />  // 10이 의미하는 바?

// widgets/calendar-box/index.tsx
if (Math.abs(deltaX) > 100) {  // swipe threshold
```

**해결 방안**:
`src/shared/constants/ui.ts`에 정의된 `UI_TIMING` 활용 확대.

---

### [MED-002] 타입 안전하지 않은 params 캐스팅

**위치**: `src/pages/cert-detail/index.tsx`

**문제**:
`params?.id as string` 캐스팅으로 id가 undefined일 때 처리 없음.

**해결 방안**:
Early return 패턴 적용:
```typescript
const certId = params?.id;
if (!certId) return <Navigate to="/" replace />;
```

---

### [MED-003] QueryKey 반복적 invalidate 패턴

**위치**: `src/entities/todo/hooks/todo.hooks.ts`

**문제**:
여러 mutation에서 동일한 5개의 queryKey를 반복적으로 invalidate.

**해결 방안**:
```typescript
const invalidateAllTodoQueries = (queryClient: QueryClient) => {
  TODO_QUERY_KEYS.forEach(key => {
    queryClient.invalidateQueries({ queryKey: [key] });
  });
};
```

---

### [MED-004] Array index를 key로 사용

**위치**:
- `src/pages/calendar/index.tsx:137`

**문제**:
```typescript
{todos.map((todo, idx) => (
  <CheckBoxInput key={`${idx}-${todo.isCompleted}`} />
))}
```

**해결 방안**:
Todo에 고유 id 필드 추가 또는 uuid 생성.

---

### [MED-005] 네이티브 alert 사용

**위치**: `src/pages/my-study/index.tsx:81`

**문제**:
```typescript
if (validTodos.length === 0) {
  alert('최소 하나 이상의 할 일이 필요합니다.');
  return;
}
```

**해결 방안**:
`react-hot-toast` 사용:
```typescript
toast.error('최소 하나 이상의 할 일이 필요합니다.');
```

---

### [MED-006] 주석 처리된 코드들

**위치**: 여러 파일

**문제**:
사용하지 않는 주석 코드 존재. Git history로 복구 가능하므로 제거 권장.

---

### [MED-007] 미사용 import 변수

**위치**: `src/pages/my-study/index.tsx:7`

**문제**:
```typescript
const { mutate: createMemo } = useCreateOrUpdateMemo();  // createMemo 미사용
```

---

## 🟢 Low Priority Issues

### [LOW-001] 파일명 오타

**위치**: `src/entities/cert/ui/remining-date-label/`

**문제**: `remining` → `remaining` 오타

---

### [LOW-002] 불필요한 React.Fragment 사용

**위치**: `src/app/provider/protected-route/index.tsx`

---

### [LOW-003] 불명확한 함수 네이밍

**위치**: `src/features/cert/` 폴더 내 빈 함수들

---

### [LOW-004] Tabs 컴포넌트의 제네릭 타입 부재

**위치**: `src/shared/components/tabs/index.tsx`

---

## 개선 로드맵

### Phase 1: 긴급 수정 (이번 주)
1. [ ] CRIT-001: Calendar 페이지 중복 코드 제거
2. [ ] HIGH-003: 더보기 페이지 console.log 제거
3. [ ] HIGH-005: Import 순서 정리

### Phase 2: 품질 개선 (다음 주)
1. [ ] HIGH-001: Zustand → Jotai 마이그레이션
2. [ ] HIGH-002: authKeys 팩토리 패턴 적용
3. [ ] HIGH-004: CalendarProgress 컴포넌트 분리
4. [ ] MED-005: alert → toast 교체

### Phase 3: 리팩토링 (점진적)
1. [ ] MED-001: Magic numbers 상수화
2. [ ] MED-003: QueryKey invalidate 유틸 함수화
3. [ ] LOW-001~004: 사소한 개선

---

## 참고 사항

### 이전 분석 대비 개선된 점
- lazy loading이 pages/index.tsx에 적용됨
- searchInputRef에 optional chaining 적용됨
- useTodoState, calculateTodoStats가 분리됨 (my-study)

### 추가 권장 사항
1. **ESLint 규칙 강화**
   - `no-console` 활성화
   - `import/order` 규칙 적용

2. **테스트 도입**
   - Vitest 설치됨, 테스트 파일 작성 필요

3. **문서화**
   - FSD 계층별 역할 가이드 작성
