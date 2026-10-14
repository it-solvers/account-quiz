export type QuestionType = 'classify' | 'meaning' | 'side' | 'account' | 'journal' | 'balance' | 'concept'

export type Difficulty = 1 | 2 | 3

export interface QuestionBase {
  id: string
  type: QuestionType
  /** 교재 장 번호(1~9). 학습 범위 선택에 사용 */
  chapterId: number
  difficulty: Difficulty
  /** textbook: 원본 교재 미션 / added: 이번에 추가한 문제 */
  source: 'textbook' | 'added'
  tag?: string
  story?: string
  prompt: string
  explanation: string
}

export interface ChoiceRecord extends QuestionBase {
  kind: 'choice'
  options: string[]
  /** options 배열의 정답 인덱스 */
  answer: number
}

export interface JournalAnswer {
  debit: string
  credit: string
  amount: number
}

export interface JournalRecord extends QuestionBase {
  kind: 'journal'
  accounts: string[]
  answer: JournalAnswer
}

/** 문제은행에 저장되는 전체 레코드(정답·해설 포함) */
export type QuestionRecord = ChoiceRecord | JournalRecord

/** 풀이 화면에 전달되는 문제: 정답과 해설이 제거된 형태 */
export type PublicChoice = Omit<ChoiceRecord, 'answer' | 'explanation'>
export type PublicJournal = Omit<JournalRecord, 'answer' | 'explanation'>
export type PublicQuestion = PublicChoice | PublicJournal

export interface JournalResponse {
  debit: string
  credit: string
  debitAmount: string
  creditAmount: string
}

/** 사용자의 응답. choice는 원본 options 인덱스, journal은 입력값 */
export type Response = number | JournalResponse

export interface QuizConfig {
  chapterIds: number[]
  count: number
}
