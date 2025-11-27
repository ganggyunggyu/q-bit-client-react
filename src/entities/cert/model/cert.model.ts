export type Cert = {
  _id: string;
  code: string;
  name: string;
  category?: string;
  subCategory?: string;
  type?: string;
  grade?: string;
  agency?: string;
  description?: string;
  schedule?: CertSchedule[];
  hasSchedule: boolean;
  daysLeft: number | null;
};

export type CertSchedule = {
  round: string;
  writtenRegStart?: string;
  writtenRegEnd?: string;
  writtenExamStart?: string;
  writtenExamEnd?: string;
  writtenResultDate?: string;
  practicalRegStart?: string;
  practicalRegEnd?: string;
  practicalExamStart?: string;
  practicalExamEnd?: string;
  practicalResultDate?: string;
};

export type SearchCertParams = {
  keyword?: string;
  agency?: string;
  grade?: string;
  category?: string;
  subCategory?: string;
};

export type ScheduleStatus = {
  total: number;
  withSchedule: number;
  withoutSchedule: number;
  percentage: number;
};
