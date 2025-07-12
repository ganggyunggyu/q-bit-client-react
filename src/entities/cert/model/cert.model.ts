export type Cert = {
  _id: string;
  jmcd?: string;
  agency?: string;
  jmfldnm?: string;
  mdobligfldcd?: string;
  mdobligfldnm?: string;
  obligfldcd?: string;
  obligfldnm?: string;
  outlook?: string;
  qualgbcd?: string;
  qualgbnm?: string;
  seriescd?: string;
  seriesnm?: string;
  schedule?: ExamSchedule[];
  scheduleDate?: Date;
  daysLeft: number;
};

export type ExamSchedule = {
  description?: string;
  docexamdt?: string;
  docpassdt?: string;
  docregstartdt?: string | null;
  docregenddt?: string | null;
  docsubmitstartdt?: string | null;
  docsubmitentdt?: string | null;
  pracregstartdt?: string | null;
  pracregenddt?: string | null;
  pracexamstartdt?: string | null;
  pracexamenddt?: string | null;
  pracpassdt?: string | null;
};
// 상세 조회용
export type getCertDto = {
  certId: string;
};

// 필터 검색용
export type getCertListParams = {
  keyword?: string;
  obligfldnm?: string;
  mdobligfldnm?: string;
  seriesnm?: string;
  agency?: string;
};

// 다가오는 시험 (접수 마감순)
export type getUpcomingCertListParams = {
  limit: number;
};

// 정렬된 리스트 조회 (조회수/찜/마감순)
export type getCertListSortedParams = {
  sort: 'views' | 'likes' | 'deadline';
  limit: number;
};
