# AI 자격증 추천 API 스펙

## 개요
사용자가 입력한 정보를 바탕으로 AI가 적합한 자격증을 추천하는 기능입니다.

## API 엔드포인트

### POST `/ai/recommend`

사용자 정보를 받아 AI 기반 자격증 추천 결과를 반환합니다.

**Note**: baseURL은 환경 변수 `VITE_API_URL`에 설정됩니다 (예: `http://localhost:8080`).

---

## Request

### Headers
```
Content-Type: application/json
Authorization: Bearer {token}  // 필요시
```

### Request Body

```typescript
{
  "age": number,                    // 나이 (선택)
  "education": string,              // 학력 (선택)
  "field": string,                  // 관심 분야 (선택)
  "experience": string,             // 경력 수준 (선택)
  "goal": string,                   // 목표 (선택)
  "additionalInfo": string          // 추가 정보 (선택)
}
```

### Request Body 상세

| 필드 | 타입 | 필수 | 설명 | 예시 |
|------|------|------|------|------|
| `age` | number | 선택 | 사용자 나이 | 25 |
| `education` | string | 선택 | 최종 학력 | "고졸", "전문대졸", "대졸", "대학원졸" |
| `field` | string | 선택 | 관심 분야 | "IT", "건설", "디자인", "회계" 등 |
| `experience` | string | 선택 | 관련 경력 수준 | "없음", "1년 미만", "1-3년", "3-5년", "5년 이상" |
| `goal` | string | 선택 | 자격증 취득 목표 | "취업", "이직", "자기계발" 등 |
| `additionalInfo` | string | 선택 | 추가 요청사항 | "빠르게 딸 수 있는 자격증 위주로" 등 |

### Request 예시

```json
{
  "age": 25,
  "education": "대졸",
  "field": "IT",
  "experience": "1년 미만",
  "goal": "취업 준비",
  "additionalInfo": "프론트엔드 개발자로 취업하고 싶어요"
}
```

---

## Response

### Success Response (200 OK)

```typescript
{
  "recommendations": [
    {
      "certId": string,             // 자격증 ID (DB의 _id)
      "name": string,               // 자격증 이름
      "reason": string,             // AI 추천 이유
      "difficulty": string,         // 난이도: "easy" | "medium" | "hard"
      "expectedPeriod": string,     // 예상 준비 기간
      "matchScore": number          // 매칭 점수 (0-100)
    }
  ],
  "summary": string,                // AI의 전체 추천 요약
  "aiMessage": string               // AI가 사용자에게 전하는 메시지 (선택)
}
```

### Response 상세

#### recommendations 배열

| 필드 | 타입 | 설명 | 예시 |
|------|------|------|------|
| `certId` | string | 자격증 고유 ID | "507f1f77bcf86cd799439011" |
| `name` | string | 자격증 이름 | "정보처리기사" |
| `reason` | string | AI가 분석한 추천 이유 | "IT 분야에 관심이 있고, 취업을 목표로 하시는 분께 가장 적합한 국가기술자격입니다." |
| `difficulty` | string | 난이도 | "easy", "medium", "hard" |
| `expectedPeriod` | string | 예상 준비 기간 | "3-6개월", "1-2개월" 등 |
| `matchScore` | number | 사용자와의 매칭 점수 | 95 (0-100 사이) |

#### 기타 필드

| 필드 | 타입 | 설명 | 예시 |
|------|------|------|------|
| `summary` | string | AI의 종합 추천 요약 | "IT 분야 취업을 목표로 하시는 분께 총 3개의 자격증을 추천드립니다." |
| `aiMessage` | string | AI의 추가 메시지 (선택) | "꾸준히 학습하시면 6개월 내 모두 취득 가능합니다!" |

### Response 예시

```json
{
  "recommendations": [
    {
      "certId": "507f1f77bcf86cd799439011",
      "name": "정보처리기사",
      "reason": "IT 분야 취업을 준비하시는 분께 가장 기본이 되는 국가기술자격입니다. 프론트엔드 개발자로서 전산학 기초를 다지는 데 도움이 됩니다.",
      "difficulty": "medium",
      "expectedPeriod": "3-6개월",
      "matchScore": 95
    },
    {
      "certId": "507f1f77bcf86cd799439012",
      "name": "웹디자인기능사",
      "reason": "프론트엔드 개발에 필요한 UI/UX 감각을 키울 수 있으며, 실무에서 디자이너와의 협업에 도움이 됩니다.",
      "difficulty": "easy",
      "expectedPeriod": "1-2개월",
      "matchScore": 85
    },
    {
      "certId": "507f1f77bcf86cd799439013",
      "name": "리눅스마스터 2급",
      "reason": "개발 환경 구축과 서버 배포에 대한 이해도를 높일 수 있어, 풀스택 개발자로 성장하는 데 유리합니다.",
      "difficulty": "medium",
      "expectedPeriod": "2-4개월",
      "matchScore": 80
    }
  ],
  "summary": "IT 분야에서 프론트엔드 개발자로 취업을 목표로 하시는 25세 대졸 경력자분께 총 3개의 자격증을 추천드립니다. 정보처리기사를 메인으로, 웹디자인기능사와 리눅스마스터를 보조로 준비하시면 좋습니다.",
  "aiMessage": "추천드린 자격증들을 단계적으로 준비하시면 약 6-12개월 안에 모두 취득 가능합니다. 꾸준히 학습하시면 좋은 결과 있으실 겁니다!"
}
```

---

## Error Response

### 400 Bad Request
잘못된 요청 데이터

```json
{
  "error": "Invalid request data",
  "message": "age must be a positive number"
}
```

### 401 Unauthorized
인증 실패 (토큰 필요시)

```json
{
  "error": "Unauthorized",
  "message": "Authentication required"
}
```

### 500 Internal Server Error
서버 내부 오류 (AI 모델 오류 등)

```json
{
  "error": "Internal Server Error",
  "message": "AI recommendation service temporarily unavailable"
}
```

---

## 구현 참고사항

### AI 추천 로직 고려사항

1. **필수 입력값 없음**
   - 모든 필드가 선택사항이므로, 최소한의 정보로도 추천 가능해야 함
   - 입력된 정보가 많을수록 더 정확한 추천 제공

2. **추천 개수**
   - 기본적으로 3-5개의 자격증 추천
   - matchScore 기준 내림차순 정렬

3. **난이도 판단 기준**
   - easy: 비전공자도 1-2개월 준비 가능
   - medium: 3-6개월 준비 필요
   - hard: 6개월 이상 장기 준비 필요

4. **매칭 점수 계산**
   - 사용자 입력 정보와 자격증 특성의 연관성 분석
   - 0-100 사이 점수, 높을수록 적합도 높음

5. **추천 우선순위**
   - 사용자의 `goal` (목표)을 최우선 고려
   - `field` (관심 분야) 두 번째 고려
   - `experience` (경력)와 난이도 매칭

---

## 데이터 활용 예시

프론트엔드에서는 다음과 같이 활용합니다:

1. **단계별 폼**으로 사용자 정보 수집
2. 모든 정보 수집 후 `/api/ai/recommend` POST 요청
3. 로딩 중 애니메이션 표시
4. 추천 결과를 카드 형태로 표시
   - matchScore 높은 순으로 정렬
   - 각 자격증별 추천 이유, 난이도, 준비 기간 표시
5. AI 요약 메시지를 별도 섹션에 표시
6. 각 추천 자격증 클릭 시 상세 페이지로 이동

---

## 추가 요청사항

- 응답 시간: 3초 이내 권장
- AI 응답 실패 시 폴백(fallback) 추천 제공 고려
- 추후 사용자 피드백(추천이 도움되었는지) 수집 기능 추가 가능성 있음
