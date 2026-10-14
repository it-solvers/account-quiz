import type { PublicQuestion } from '../types/quiz'
import { questionBank } from './questionBank'

/** 풀이 화면에 쓰는 문제 목록: 정답과 해설을 제거한 사본 */
export const questions: PublicQuestion[] = questionBank.map((q) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { answer: _answer, explanation: _explanation, ...rest } = q
  return rest as PublicQuestion
})
