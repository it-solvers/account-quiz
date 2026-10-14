export interface Concept {
  title: string
  body: string
}

export interface QuizItem {
  question: string
  answer: { label: string; text: string }[]
}

export interface Chapter {
  id: number
  title: string
  goal: string
  note: string
  /** 신입 개발자를 위한 비유·시스템 관점 설명 */
  devView?: string
  concepts: Concept[]
  worked: { title: string; body: string }
  quizzes: QuizItem[]
}
