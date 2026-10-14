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
  concepts: Concept[]
  worked: { title: string; body: string }
  quizzes: QuizItem[]
}
