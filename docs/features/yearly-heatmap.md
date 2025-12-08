# GitHub 스타일 연간 히트맵 캘린더

## 개요
연간 학습 패턴을 한눈에 파악할 수 있는 GitHub Contribution Graph 스타일 히트맵

## 디자인

```
┌─────────────────────────────────────────────────────────┐
│  2024년 학습 현황                              총 142일  │
├─────────────────────────────────────────────────────────┤
│     1월   2월   3월   4월   5월   6월   ...   12월      │
│ 월  ░░▓░░░▓▓░░▓▓▓░░░▓▓▓▓░░▓▓▓▓▓░░ ... ░░░▓▓░░          │
│ 화  ░▓▓░░▓▓▓░▓▓▓▓░░▓▓▓▓▓░▓▓▓▓▓▓░░ ... ░░▓▓▓░░          │
│ 수  ▓▓▓░▓▓▓▓▓▓▓▓▓░▓▓▓▓▓▓▓▓▓▓▓▓▓░░ ... ░▓▓▓▓░░          │
│ 목  ░▓░░▓▓▓░▓▓▓▓░░▓▓▓▓▓░▓▓▓▓▓▓░░ ... ░░▓▓▓░░           │
│ 금  ▓▓▓░▓▓▓▓▓▓▓▓▓░▓▓▓▓▓▓▓▓▓▓▓▓▓░░ ... ░▓▓▓▓░░          │
│ 토  ░░░░░▓░░░▓▓░░░░▓▓░░░░▓▓▓░░░░ ... ░░░▓░░░           │
│ 일  ░░░░░░░░░░▓░░░░░▓░░░░░▓▓░░░░ ... ░░░░░░░           │
├─────────────────────────────────────────────────────────┤
│  ░ 없음   ▒ 1-2개   ▓ 3-5개   █ 6개 이상               │
└─────────────────────────────────────────────────────────┘
```

## 기능 요구사항

### 핵심 기능
- [ ] 연간 365일 히트맵 그리드 렌더링
- [ ] 날짜별 투두 완료율에 따른 색상 강도 표시
- [ ] 연속 학습일(스트릭) 계산 및 표시
- [ ] 날짜 클릭 시 해당 날짜의 투두 상세 보기

### 통계 정보
- [ ] 총 학습일 수
- [ ] 현재 연속 학습일 (Current Streak)
- [ ] 최장 연속 학습일 (Longest Streak)
- [ ] 월별 학습일 비교

### 인터랙션
- [ ] 호버/탭 시 해당 날짜 정보 툴팁
- [ ] 가로 스크롤로 월 이동
- [ ] 연도 선택 드롭다운

## 컴포넌트 구조

```
src/widgets/yearly-heatmap/
├── index.tsx              # 메인 컴포넌트
├── heatmap-grid.tsx       # 히트맵 그리드
├── heatmap-cell.tsx       # 개별 셀
├── streak-stats.tsx       # 스트릭 통계
└── legend.tsx             # 범례
```

## 데이터 구조

```typescript
interface HeatmapData {
  date: string;           // 'YYYY-MM-DD'
  completedCount: number; // 완료한 투두 수
  totalCount: number;     // 전체 투두 수
  percentage: number;     // 완료율
}

interface StreakStats {
  currentStreak: number;
  longestStreak: number;
  totalDays: number;
  thisYearDays: number;
}
```

## API 요구사항

```typescript
// 연간 투두 데이터 조회
GET /api/todos/yearly/:year

// Response
{
  data: HeatmapData[];
  stats: StreakStats;
}
```

## 색상 팔레트

```css
/* 완료율 기반 색상 (primary 색상 계열) */
--heatmap-0: var(--color-bg-tertiary);      /* 0% - 없음 */
--heatmap-1: var(--color-primary-light);    /* 1-25% */
--heatmap-2: var(--color-primary);          /* 26-50% */
--heatmap-3: var(--color-primary-dark);     /* 51-75% */
--heatmap-4: var(--color-accent);           /* 76-100% */
```

## 배치 위치 (예정)

### 옵션 1: 학습 > 통계 탭 상단
- TodoCompletionStats 위에 배치
- 스크롤로 아래 통계와 연결

### 옵션 2: 별도 페이지
- 더보기 > 학습 현황 메뉴 추가
- 히트맵 + 상세 통계 전용 페이지

### 옵션 3: 메인 페이지 위젯
- 메인 페이지에 미니 히트맵 (최근 3개월)
- 탭하면 전체 히트맵 페이지로 이동

## 참고 자료
- [GitHub Contribution Graph](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/managing-contribution-settings-on-your-profile)
- [react-activity-calendar](https://www.npmjs.com/package/react-activity-calendar)

## 우선순위
- Priority: Medium
- 예상 작업량: 2-3일
- 의존성: 연간 투두 데이터 API 필요
