import { axiosInstance } from '@/app/config';
import { WeeklyReportRequest, WeeklyReportResponse } from '../model/ai-report.model';

export const aiReportApi = {
  getWeeklyReport: async (data?: WeeklyReportRequest): Promise<WeeklyReportResponse> => {
    const response = await axiosInstance.post<WeeklyReportResponse>(
      '/ai/weekly-report',
      data || {},
    );
    return response.data;
  },
};
