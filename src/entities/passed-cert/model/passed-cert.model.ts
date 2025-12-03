export type PassedType = 'written' | 'practical' | 'final';

export interface PassedCert {
  _id: string;
  userId: string;
  certId: {
    _id: string;
    name: string;
    jmNm: string;
  };
  passedDate: string;
  score?: number;
  type: PassedType;
  memo?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePassedCertDto {
  certId: string;
  passedDate: string;
  score?: number;
  type: PassedType;
  memo?: string;
}

export interface UpdatePassedCertDto {
  passedDate?: string;
  score?: number;
  type?: PassedType;
  memo?: string;
}

export interface GetPassedCertsParams {
  certId?: string;
  type?: PassedType;
}

export const PASSED_TYPE_LABELS: Record<PassedType, string> = {
  written: '필기',
  practical: '실기',
  final: '최종',
};
