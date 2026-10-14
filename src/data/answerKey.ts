import type { JournalAnswer, QuestionRecord } from '../types/quiz'
import { questionBank } from './questionBank'

export interface AnswerEntry {
  answer: number | JournalAnswer
  explanation: string
}

/** 정답·해설 키. 채점과 결과 화면에서만 사용합니다. */
export const answerKey: Record<string, AnswerEntry> = Object.fromEntries(
  questionBank.map((q: QuestionRecord) => [q.id, { answer: q.answer, explanation: q.explanation }]),
)
