# 연간 캘린더 API 명세

## 개요
연간 캘린더 뷰에서 필요한 데이터를 효율적으로 조회하기 위한 API 명세

---

## 1. 연간 투두 요약 조회

### Endpoint
```
GET /api/todos/yearly/:year
```

### Description
특정 연도의 모든 날짜별 투두 완료율을 조회합니다.
연간 캘린더 히트맵 렌더링에 사용됩니다.

### Path Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| year | number | Yes | 조회할 연도 (예: 2024) |

### Response
```typescript
interface YearlyTodoResponse {
  year: number;
  data: DailyTodoSummary[];
  stats: YearlyStats;
}

interface DailyTodoSummary {
  date: string;           // 'YYYY-MM-DD' 형식
  totalCount: number;     // 해당 날짜의 전체 투두 수
  completedCount: number; // 완료된 투두 수
  percentage: number;     // 완료율 (0-100)
}

interface YearlyStats {
  totalDays: number;      // 투두가 있었던 총 일수
  totalTodos: number;     // 총 투두 개수
  completedTodos: number; // 완료된 투두 개수
  averageRate: number;    // 평균 완료율
}
```

### Example Response
```json
{
  "year": 2024,
  "data": [
    { "date": "2024-01-01", "totalCount": 5, "completedCount": 3, "percentage": 60 },
    { "date": "2024-01-02", "totalCount": 4, "completedCount": 4, "percentage": 100 },
    { "date": "2024-01-05", "totalCount": 3, "completedCount": 1, "percentage": 33 }
  ],
  "stats": {
    "totalDays": 142,
    "totalTodos": 450,
    "completedTodos": 380,
    "averageRate": 84.4
  }
}
```

### Notes
- 투두가 없는 날짜는 응답에 포함하지 않음 (프론트에서 없음으로 처리)
- 날짜는 UTC 기준이 아닌 사용자 로컬 타임존 기준

---

## 2. 연속 학습일(스트릭) 조회

### Endpoint
```
GET /api/todos/streak
```

### Description
사용자의 연속 학습일(스트릭) 정보를 조회합니다.

### Query Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| date | string | No | 기준 날짜 (기본값: 오늘) |

### Response
```typescript
interface StreakResponse {
  currentStreak: number;   // 현재 연속 학습일
  longestStreak: number;   // 최장 연속 학습일
  lastActiveDate: string;  // 마지막 학습일
  streakStartDate: string; // 현재 스트릭 시작일
}
```

### Example Response
```json
{
  "currentStreak": 15,
  "longestStreak": 42,
  "lastActiveDate": "2024-12-04",
  "streakStartDate": "2024-11-20"
}
```

### Notes
- 하루라도 투두를 완료하면 학습일로 인정
- 완료율 기준 설정 가능 (예: 50% 이상 완료 시에만 인정) - 추후 확장

---

## 3. 월간 투두 조회 (기존 API)

### Endpoint
```
GET /api/todos/monthly/:year/:month
```

### Description
특정 월의 투두 데이터를 조회합니다.
현재 이미 구현되어 있는 API입니다.

### Response
현재 응답 형식 유지

---

## 구현 우선순위

### Phase 1 (현재)
- 기존 월간 API 활용하여 프론트에서 연간 데이터 조합
- 성능 이슈 발생 시 Phase 2로 전환

### Phase 2 (성능 최적화 필요시)
- 연간 투두 요약 API 구현
- 백엔드에서 집계하여 응답

### Phase 3 (추가 기능)
- 스트릭 API 구현
- 연간 히트맵 위젯 추가

---

## 프론트엔드 임시 구현

백엔드 API 준비 전까지 프론트엔드에서 임시로 처리:

```typescript
// 현재 월간 API를 12번 호출하여 연간 데이터 조합
const useGetYearlyTodos = (year: number) => {
  const queries = Array.from({ length: 12 }, (_, i) =>
    useGetMonthTodos(year, i + 1)
  );

  // 모든 월 데이터 병합
  const yearlyData = queries.flatMap(q => q.data || []);

  return { data: yearlyData, isLoading: queries.some(q => q.isLoading) };
};
```

### 성능 고려사항
- 12개 API 동시 호출로 인한 부하
- React Query 캐싱으로 재요청 최소화
- 백그라운드에서 프리페칭 고려

---

## 관련 문서
- [연간 히트맵 기능 명세](../features/yearly-heatmap.md)
