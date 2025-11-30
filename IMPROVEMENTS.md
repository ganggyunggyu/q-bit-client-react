# 코드 개선점 분석 보고서

> 분석일: 2025-11-26
> 분석 대상: q-bit-client-react 전체 프로젝트
> 기술 스택: React 19, TypeScript, Vite, TanStack Query, Zustand, Tailwind CSS

## 요약

- 🔴 Critical: 2건
- 🟠 High: 6건
- 🟡 Medium: 6건
- 🟢 Low: 4건

---

## 🔴 Critical Issues

### [CRIT-001] null 체크 없이 ref.current 직접 접근

**위치**: `src/pages/main/index.tsx:45`

**문제**:
`searchInputRef.current.focus()`를 null 체크 없이 직접 호출하고 있음. ref가 아직 연결되지 않은 상태에서 호출 시 런타임 에러 발생.

**현재 코드**:
```typescript
const handleInputFocus = () => {
  searchInputRef.current.focus();  // null일 수 있음
  setIsFocus(true);
};
```

**영향**:
- 컴포넌트 마운트 전에 호출되면 `Cannot read properties of null` 에러 발생
- 앱 크래시 가능성

**해결 방안**:
```typescript
const handleInputFocus = () => {
  searchInputRef.current?.focus();
  setIsFocus(true);
};
```

**검증 방법**:
- 컴포넌트 마운트 직후 handleInputFocus 호출 테스트
- ESLint rule `@typescript-eslint/no-non-null-assertion` 활성화

---

### [CRIT-002] await 이중 사용으로 인한 불필요한 Promise 래핑

**위치**: `src/entities/todo/api/todo.api.ts:22`

**문제**:
`await await axios.get()`으로 await가 두 번 사용됨. 기능적으로는 동작하나 의도치 않은 코드.

**현재 코드**:
```typescript
findOne: async (id: string): Promise<Todo> => {
  const response = await await axios.get(`/todo/${id}`);
  return response.data;
},
```

**영향**:
- 불필요한 Promise 래핑
- 코드 가독성 저하
- 잠재적 버그 유발 가능성

**해결 방안**:
```typescript
findOne: async (id: string): Promise<Todo> => {
  const response = await axios.get(`/todo/${id}`);
  return response.data;
},
```

**검증 방법**:
- API 호출 정상 동작 확인
- ESLint rule `no-await-in-loop` 관련 설정 검토

---

## 🟠 High Priority Issues

### [HIGH-001] 프로덕션에 console.log 디버그 코드 잔존

**위치**:
- `src/pages/index.tsx:72`
- `src/pages/main/index.tsx:32`
- `src/widgets/calendar-box/index.tsx:57-62`

**문제**:
디버그용 console.log가 여러 곳에 남아있음.

**현재 코드**:
```typescript
// pages/index.tsx:72
React.useEffect(() => {
  console.log(location.pathname);
}, [location.pathname]);

// pages/main/index.tsx:32
React.useEffect(() => {
  console.log(user);
}, [user]);

// widgets/calendar-box/index.tsx:57-62
console.log(
  'CalendarBox - todoList:',
  todoList,
  'isLoading:',
  isTodoListLoading,
);
```

**영향**:
- 프로덕션 환경에서 불필요한 로그 노출
- 성능 저하 (미미하지만)
- 민감한 데이터 노출 가능성

**해결 방안**:
1. 모든 디버그용 console.log 제거
2. 필요시 환경 변수 기반 로깅 유틸리티 사용

```typescript
// src/shared/lib/logger/index.ts
export const logger = {
  debug: (...args: unknown[]) => {
    if (import.meta.env.DEV) {
      console.log(...args);
    }
  },
};
```

**검증 방법**:
- `console.log` 전체 검색 후 제거 확인
- ESLint rule `no-console` 활성화

---

### [HIGH-002] features/cert 레이어의 빈 함수들 (데드 코드)

**위치**:
- `src/features/cert/api/cert.api.ts`
- `src/features/cert/hooks/cert.hooks.ts`

**문제**:
features/cert 폴더의 파일들이 빈 함수만 export하고 있음. entities/cert와 역할 중복으로 보임.

**현재 코드**:
```typescript
// features/cert/api/cert.api.ts
export const apicertFn = () => {}

// features/cert/hooks/cert.hooks.ts
export const hookscertFn = () => {}
```

**영향**:
- 코드 혼란
- FSD 아키텍처 위반
- 유지보수성 저하

**해결 방안**:
1. features/cert 폴더 구조 재검토
2. entities/cert와의 역할 명확히 분리하거나 제거
3. 사용하지 않는 코드 정리

---

### [HIGH-003] 타입 안전하지 않은 params 캐스팅

**위치**: `src/pages/cert-detail/index.tsx:12`

**문제**:
`params?.id as string` 캐스팅으로 id가 undefined일 때 처리가 없음.

**현재 코드**:
```typescript
const { params } = useRouter();
const certId = params?.id as string;

const { data: cert, isLoading } = useGetCertById(certId);
```

**영향**:
- certId가 undefined일 때 API 호출 오류
- 타입 안전성 미보장

**해결 방안**:
```typescript
const { params } = useRouter();
const certId = params?.id;

if (!certId) {
  return <Navigate to="/" replace />;
}

const { data: cert, isLoading } = useGetCertById(certId);
```

**검증 방법**:
- `/search/` (id 없이) 접근 시 정상 리다이렉트 확인

---

### [HIGH-004] lazy import 미사용으로 초기 번들 사이즈 증가

**위치**: `src/pages/index.tsx`

**문제**:
`lazy`를 import했으나 사용하지 않음. 모든 페이지가 초기 로드 시 함께 로드됨.

**현재 코드**:
```typescript
import React, { lazy, Suspense, JSX } from 'react';
// lazy는 import만 하고 미사용

import MyCertPage from './my-cert';
import MyStudyPage from './my-study';
// ... 모든 페이지를 동기 import
```

**영향**:
- 초기 번들 사이즈 증가
- 첫 로딩 시간 증가
- 사용하지 않는 페이지도 모두 로드

**해결 방안**:
```typescript
const MyCertPage = lazy(() => import('./my-cert'));
const MyStudyPage = lazy(() => import('./my-study'));
const CertDetailPage = lazy(() => import('./cert-detail'));
// ... 주요 페이지들 lazy 적용
```

**검증 방법**:
- 빌드 후 chunk 분리 확인
- Lighthouse 성능 점수 비교

---

### [HIGH-005] 네이티브 alert 사용

**위치**:
- `src/pages/calendar/index.tsx:62`
- `src/pages/cert-detail/index.tsx:26,30`

**문제**:
네이티브 `alert()` 사용으로 UX 일관성 저하.

**현재 코드**:
```typescript
// calendar/index.tsx:62
if (validTodos.length === 0) {
  alert('최소 하나 이상의 할 일이 필요합니다.');
  return;
}

// cert-detail/index.tsx:26,30
onSuccess: () => {
  alert('리마인더에 추가되었습니다.');
},
onError: (error) => {
  alert('리마인더 추가에 실패했습니다.');
},
```

**영향**:
- 디자인 시스템과 불일치
- 모바일 UX 저하
- 사용자 경험 비일관성

**해결 방안**:
이미 설치된 `react-hot-toast` 활용:

```typescript
import toast from 'react-hot-toast';

// 성공
toast.success('리마인더에 추가되었습니다.');

// 에러
toast.error('리마인더 추가에 실패했습니다.');
```

---

### [HIGH-006] FSD 아키텍처 계층 역할 불명확

**위치**: `src/entities/cert/`, `src/features/cert/`

**문제**:
- entities/cert가 API 호출, hooks, UI까지 모두 포함
- features/cert는 빈 함수만 존재
- FSD 원칙상 entities는 비즈니스 엔티티 정의, features는 사용자 기능 담당

**현재 구조**:
```
entities/cert/
├── api/       # API 함수 (features 역할?)
├── hooks/     # TanStack Query 훅 (features 역할?)
├── model/     # 타입 정의 (올바름)
├── mock/      # MSW 핸들러
└── ui/        # UI 컴포넌트

features/cert/
├── api/       # 빈 함수
├── hooks/     # 빈 함수
├── model/     # 빈 export
└── ui/        # CertCard만 존재
```

**영향**:
- 코드 위치 혼란
- 새 개발자 온보딩 어려움
- 일관성 없는 구조

**해결 방안**:
FSD 원칙에 따라 재구성:

```
entities/cert/
├── model/     # Cert 타입, 상수
└── ui/        # 순수 표시용 컴포넌트

features/cert-search/
├── api/       # 검색 API
├── hooks/     # useSearchCerts 등
└── ui/        # 검색 관련 UI

features/cert-remind/
├── api/       # 리마인드 API
├── hooks/     # useAddRemindCert 등
└── ui/        # 리마인드 관련 UI
```

---

## 🟡 Medium Priority Issues

### [MED-001] Magic Numbers 하드코딩

**위치**:
- `src/pages/main/index.tsx:36` (debounce 300)
- `src/pages/main/index.tsx:58` (delay 500)
- `src/widgets/calendar-box/index.tsx:87` (swipe threshold 100)

**문제**:
의미 있는 숫자들이 상수화 없이 직접 사용됨.

**현재 코드**:
```typescript
debounce((value: string) => {
  setQuery(value);
  setIsTyping(false);
}, 300),  // 300ms?

await delay(500);  // 500ms?

if (Math.abs(deltaX) > 100) {  // 100px?
```

**해결 방안**:
```typescript
// src/shared/constants/ui.ts
export const UI_TIMING = {
  DEBOUNCE_DELAY: 300,
  ANIMATION_DELAY: 500,
  SWIPE_THRESHOLD: 100,
} as const;
```

---

### [MED-002] Schedule 인터페이스 중복 정의

**위치**:
- `src/entities/cert/model/cert.model.ts` (ExamSchedule)
- `src/pages/cert-detail/index.tsx:77-90` (Schedule)

**문제**:
같은 구조의 인터페이스가 두 곳에서 별도로 정의됨.

**현재 코드**:
```typescript
// cert.model.ts
export type ExamSchedule = {
  description?: string;
  docexamdt?: string;
  // ...
};

// cert-detail/index.tsx
interface Schedule {
  description?: string;
  docexamdt?: string;
  // ...
}
```

**해결 방안**:
`ExamSchedule` 타입을 import하여 사용:

```typescript
import { ExamSchedule } from '@/entities/cert/model/cert.model';

interface CertScheduleSectionProps {
  schedule: ExamSchedule[];
}
```

---

### [MED-003] QueryKey 반복적 invalidate 패턴

**위치**: `src/entities/todo/hooks/todo.hooks.ts`

**문제**:
여러 mutation에서 동일한 5개의 queryKey를 반복적으로 invalidate.

**현재 코드**:
```typescript
onSuccess: () => {
  queryClient.invalidateQueries({ queryKey: ['todos'] });
  queryClient.invalidateQueries({ queryKey: ['todoByDate'] });
  queryClient.invalidateQueries({ queryKey: ['weekTodos'] });
  queryClient.invalidateQueries({ queryKey: ['monthTodos'] });
  queryClient.invalidateQueries({ queryKey: ['todoExists'] });
},
```

**해결 방안**:
```typescript
const TODO_QUERY_KEYS = ['todos', 'todoByDate', 'weekTodos', 'monthTodos', 'todoExists'] as const;

const invalidateAllTodoQueries = (queryClient: QueryClient) => {
  TODO_QUERY_KEYS.forEach(key => {
    queryClient.invalidateQueries({ queryKey: [key] });
  });
};

// 사용
onSuccess: () => invalidateAllTodoQueries(queryClient),
```

---

### [MED-004] Array index를 key로 사용

**위치**:
- `src/pages/main/index.tsx:153`
- `src/pages/calendar/index.tsx:113`

**문제**:
리스트 렌더링에서 index를 key로 사용.

**현재 코드**:
```typescript
certList?.map((cert, index) => {
  return <CertCard key={index} cert={cert} dDay={dDay} />;
})
```

**해결 방안**:
```typescript
certList?.map((cert) => {
  return <CertCard key={cert._id} cert={cert} dDay={dDay} />;
})
```

---

### [MED-005] 주석 처리된 코드들

**위치**:
- `src/app/index.tsx:13` (`{/* <BottomBar /> */}`)
- `src/shared/components/modal/index.tsx:51-53`
- `src/shared/components/bottom-sheet/index.tsx:47`

**문제**:
사용하지 않는 주석 코드가 여러 곳에 존재.

**해결 방안**:
불필요한 주석 코드 제거. 필요시 git history로 복구 가능.

---

### [MED-006] useRouter에서 getQuery 함수의 search 파라미터 미사용

**위치**: `src/shared/hooks/use-router/index.ts:15-26`

**문제**:
`getQuery` 함수가 `search` 파라미터를 받지만 함수 내부에서 외부 스코프의 `search`를 사용.

**현재 코드**:
```typescript
const getQuery = <T extends Record<string, string>>(
  search: string,  // 이 파라미터 미사용
): Partial<T> => {
  const q: Partial<T> = {};
  const params = new URLSearchParams(search);  // 외부 search 사용?

  params.forEach((value, key) => {
    q[key as keyof T] = value as T[keyof T];
  });

  return q;
};
```

**해결 방안**:
파라미터 제거하거나 명확히 사용:

```typescript
const getQuery = <T extends Record<string, string>>(): Partial<T> => {
  const q: Partial<T> = {};
  const params = new URLSearchParams(search);
  // ...
};
```

---

## 🟢 Low Priority Issues

### [LOW-001] 불필요한 React.Fragment 사용

**위치**: `src/app/provider/protected-route/index.tsx:13`

**문제**:
단일 children을 감싸는 불필요한 `<React.Fragment>`.

**현재 코드**:
```typescript
return <React.Fragment>{children}</React.Fragment>;
```

**해결 방안**:
```typescript
return <>{children}</>;
// 또는
return children;
```

---

### [LOW-002] 파일명 오타

**위치**: `src/entities/cert/ui/remining-date-label/`

**문제**:
`remining` → `remaining` 오타.

**해결 방안**:
폴더명 수정: `remining-date-label` → `remaining-date-label`

---

### [LOW-003] 불명확한 함수 네이밍

**위치**:
- `src/features/cert/api/cert.api.ts` (apicertFn)
- `src/features/cert/hooks/cert.hooks.ts` (hookscertFn)

**문제**:
함수명이 기능을 설명하지 않음.

**해결 방안**:
해당 파일들 전체 재검토 후 제거 또는 명확한 네이밍으로 변경.

---

### [LOW-004] Tabs 컴포넌트의 onSelect 타입 제한

**위치**: `src/shared/components/tabs/index.tsx:14`

**문제**:
`onSelect: (tabId: string) => void`로 정의되어 있지만, 실제 사용처에서는 더 구체적인 타입이 필요할 수 있음.

**현재 코드**:
```typescript
onSelect: (tabId: string) => void;
```

**해결 방안**:
제네릭 타입 적용:

```typescript
interface TabsProps<T extends string> {
  tabs: { id: T; label: string }[];
  selected: T;
  onSelect: (tabId: T) => void;
}
```

---

## 개선 로드맵

### Phase 1: 긴급 수정 (Critical + High)
1. [ ] CRIT-001: searchInputRef null 체크 추가
2. [ ] CRIT-002: await 이중 사용 제거
3. [ ] HIGH-001: console.log 제거 및 logger 유틸 도입
4. [ ] HIGH-002: features/cert 데드 코드 정리
5. [ ] HIGH-003: certId 타입 안전성 확보
6. [ ] HIGH-004: 페이지 lazy loading 적용
7. [ ] HIGH-005: alert → toast 교체
8. [ ] HIGH-006: FSD 계층 구조 재검토 및 문서화

### Phase 2: 품질 개선 (Medium)
1. [ ] MED-001: Magic numbers 상수화
2. [ ] MED-002: Schedule 인터페이스 통합
3. [ ] MED-003: QueryKey invalidate 유틸 함수화
4. [ ] MED-004: list key를 고유 id로 변경
5. [ ] MED-005: 주석 코드 정리
6. [ ] MED-006: getQuery 함수 시그니처 수정

### Phase 3: 리팩토링 (Low)
1. [ ] LOW-001: 불필요한 Fragment 제거
2. [ ] LOW-002: 파일명 오타 수정
3. [ ] LOW-003: 데드 코드 함수 정리
4. [ ] LOW-004: Tabs 제네릭 타입 적용

---

## 참고 사항

### 분석 방법론
- 정적 코드 분석 (파일 단위 검토)
- FSD 아키텍처 규칙 검증
- React/TypeScript 베스트 프랙티스 기준 적용
- TanStack Query 패턴 검토

### 추가 권장 사항
1. **ESLint 규칙 강화**
   - `no-console` 활성화 (warn → error)
   - `@typescript-eslint/no-non-null-assertion` 활성화
   - `@typescript-eslint/no-explicit-any` 활성화

2. **테스트 도입**
   - Vitest가 이미 설치되어 있으나 테스트 파일 미존재
   - 주요 hooks에 대한 단위 테스트 추가 권장

3. **문서화**
   - FSD 계층별 역할 가이드 작성
   - 컴포넌트 스토리북 도입 고려

4. **성능 모니터링**
   - React DevTools Profiler 활용
   - 번들 사이즈 분석 (vite-plugin-visualizer)
