import { useState } from 'react'
import QuizResult from '../components/QuizResult'
import QuizRunner from '../components/QuizRunner'
import QuizSetup from '../components/QuizSetup'
import { buildQuiz } from '../logic/session'
import type { PublicQuestion, QuizConfig, Response } from '../types/quiz'

type Phase =
  | { name: 'setup' }
  | { name: 'running'; questions: PublicQuestion[]; config: QuizConfig }
  | { name: 'result'; questions: PublicQuestion[]; config: QuizConfig }

export default function QuizPage() {
  const [phase, setPhase] = useState<Phase>({ name: 'setup' })
  const [index, setIndex] = useState(0)
  const [responses, setResponses] = useState<(Response | undefined)[]>([])

  const start = (config: QuizConfig) => {
    const questions = buildQuiz(config)
    setResponses(new Array(questions.length).fill(undefined))
    setIndex(0)
    setPhase({ name: 'running', questions, config })
    window.scrollTo(0, 0)
  }

  if (phase.name === 'setup') return <QuizSetup onStart={start} />

  if (phase.name === 'running') {
    return (
      <QuizRunner
        questions={phase.questions}
        index={index}
        responses={responses}
        onChange={(i, r) => setResponses((rs) => rs.map((x, k) => (k === i ? r : x)))}
        onMove={(i) => { setIndex(i); window.scrollTo(0, 0) }}
        onFinish={() => { setPhase({ name: 'result', questions: phase.questions, config: phase.config }); window.scrollTo(0, 0) }}
      />
    )
  }

  // 다시 풀기: 답안·점수를 모두 비우고 같은 설정으로 새 시험을 구성
  return (
    <QuizResult
      questions={phase.questions}
      responses={responses}
      onRetry={() => start(phase.config)}
    />
  )
}
