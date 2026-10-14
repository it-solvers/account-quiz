# account-quiz — IT개발자 회계교육 학습 사이트

회계 기초 교재(9개 장 + 개발자 실무 절)와 퀴즈를 하나로 합친 React + TypeScript + Vite 앱입니다.

## 실행

```bash
npm install
npm run dev      # 개발 서버 (http://localhost:5173)
npm run build    # 타입 검사 + 프로덕션 빌드 (dist/)
npm run preview  # 빌드 결과 미리보기
```

## 구조

| 경로 | 역할 |
| --- | --- |
| `src/pages/` | HomePage(학습 홈), StudyPage(교재), QuizPage(퀴즈 설정·풀이·결과) |
| `src/components/` | 교재 섹션, 퀴즈 설정/풀이/결과 컴포넌트 |
| `src/data/chapters.ts` | 1~9장 교재 데이터 (원본 `legacy/index.original.html`에서 추출) |
| `src/data/legacyQuestions.ts` | 원본 미션 게임 16문항 |
| `src/data/addedQuestions.ts` | 교재 내용 기반 추가 문제 (`source: 'added'`, 화면에 "추가 문제" 표시) |
| `src/data/questionBank.ts` | 위 두 문제 파일을 합친 문제은행(정답 포함) |
| `src/data/questions.ts` | 정답·해설을 제거한 풀이용 문제 목록 |
| `src/data/answerKey.ts` | 정답·해설 키 (채점과 결과 화면에서만 사용) |
| `src/logic/grading.ts` | 채점 로직 |
| `src/logic/session.ts` | 범위별 무작위 출제·중복 감소 |
| `legacy/index.original.html` | 변환 전 원본 교재 (보존용) |

### 문제 추가 방법
`src/data/addedQuestions.ts`에 항목을 추가합니다. 객관식은 `kind: 'choice'`(`options`, `answer` 인덱스), 분개 입력은 `kind: 'journal'`(`answer: { debit, credit, amount }`)입니다. `chapterId`(1~9)가 학습 범위 선택에 쓰입니다.

> 정답 데이터는 클라이언트 번들에 포함됩니다(서버 없는 정적 사이트). 풀이 화면에는 전달되지 않지만 개발자 도구로는 확인할 수 있습니다.

## Vercel 배포
1. 변경 사항을 GitHub에 push합니다.
2. Vercel 대시보드 → **Add New → Project** → `account-quiz` 저장소 Import.
3. Framework Preset은 **Vite**로 자동 감지됩니다. Build Command `npm run build`, Output Directory `dist` (기본값 그대로).
4. **Deploy**. 라우팅은 해시(`#/study`) 방식이라 새로고침용 rewrite 설정이 필요 없습니다.
