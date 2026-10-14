import type { QuestionType } from '../types/quiz'

export const typeLabels: Record<QuestionType, string> = {
  classify: '계정 분류',
  meaning: '의미·성격',
  side: '차변·대변 구분',
  account: '계정과목·분개 선택',
  journal: '분개 금액 맞추기',
  balance: '차대 합계 확인',
  concept: '개념 확인',
}
