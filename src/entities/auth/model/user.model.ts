// src/entities/auth/model/user.model.ts

export enum RemindType {
  DEFAULT = 'default',
  MINIMAL = 'minimal',
  OFTEN = 'often',
}

export interface User {
  _id: string; // MongoDB ObjectId
  kakaoId: string;
  email?: string;
  displayName?: string;
  remindType?: RemindType;
  remindCerts: string[]; // ObjectId는 클라이언트에서 string으로 처리
  createdAt: string;
  updatedAt: string;
}

export interface JoinUserRequest {
  kakaoId: string;
  email?: string;
  displayName: string;
  remindType?: RemindType;
  interestedCerts?: string[];
}
