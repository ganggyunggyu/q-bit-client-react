export interface WeeklyReportRequest {
  sundayDate?: string;
}

export interface DailyStat {
  date: string;
  total: number;
  completed: number;
  completionRate: number;
}

export interface WeeklyReportResponse {
  weekStart: string;
  weekEnd: string;
  totalTodos: number;
  completedTodos: number;
  weeklyCompletionRate: number;
  dailyStats: DailyStat[];
  summary: string;
  achievements: string[];
  improvements: string[];
  nextWeekSuggestions: string[];
  encouragement: string;
}
