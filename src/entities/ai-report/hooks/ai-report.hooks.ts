import { useMutation, useQuery } from '@tanstack/react-query';
import { aiReportApi } from '../api/ai-report.api';
import { WeeklyReportRequest } from '../model/ai-report.model';

export const useGetWeeklyReport = (sundayDate?: string) => {
  return useQuery({
    queryKey: ['weeklyReport', sundayDate],
    queryFn: () => aiReportApi.getWeeklyReport(sundayDate ? { sundayDate } : undefined),
    staleTime: 1000 * 60 * 5, // 5분
  });
};

export const useRefreshWeeklyReport = () => {
  return useMutation({
    mutationFn: (data?: WeeklyReportRequest) => aiReportApi.getWeeklyReport(data),
  });
};
