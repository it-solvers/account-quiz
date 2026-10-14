import { useMemo } from 'react'
import { isJournalComplete, isJournalResponse } from '../logic/grading'
import { shuffle } from '../logic/session'
import type { PublicQuestion, Response } from '../types/quiz'
import QuestionView from './QuestionView'

interface Props {
  questions: PublicQuestion[]
  index: number
  responses: (Response | undefined)[]
  onChange: (i: number, r: Response) => void
  onMove: (i: number) => void
  onFinish: () => void
}

export function isAnswered(r: Response | undefined): boolean {
  if (r === undefined) return false
  return isJournalResponse(r) ? isJournalComplete(r) : true
}

export default function QuizRunner({ questions, index, responses, onChange, onMove, onFinish }: Props) {
  // 보기 순서는 시험 한 번 동안 고정
  const orders = useMemo(
    () => questions.map((q) => (q.kind === 'choice' ? shuffle(q.options.map((_, i) => i)) : [])),
    [questions],
  )
  const q = questions[index]
  const answered = responses.filter(isAnswered).length
  const remaining = questions.length - answered
  const last = index === questions.length - 1

  return (
    <section className="panel quiz-game">
      <div className="game-head">
        <div>
          <div className="game-kicker">문제 {index + 1} / {questions.length}</div>
          <p className="muted" style={{ margin: 0 }}>답을 제출해도 정답은 공개되지 않으며, 마지막에 시험지로 확인합니다.</p>
        </div>
        <div className="game-stats">
          <span className="stat-pill">📝 답변 완료 <b>{answered}</b></span>
          <span className="stat-pill">남은 문제 <b>{remaining}</b></span>
        </div>
      </div>
      <div className="progress-track" role="progressbar" aria-valuemin={0} aria-valuemax={questions.length} aria-valuenow={answered}>
        <div className="progress-fill" style={{ width: `${(answered / questions.length) * 100}%` }} />
      </div>

      <div className="mission-card" key={q.id}>
        <QuestionView question={q} order={orders[index]} response={responses[index]} onChange={(r) => onChange(index, r)} />
        <div className="mission-actions">
          <button type="button" className="game-btn secondary" disabled={index === 0} onClick={() => onMove(index - 1)}>← 이전 문제</button>
          {last ? (
            <button type="button" className="game-btn" onClick={() => {
              if (remaining === 0 || window.confirm(`아직 답하지 않은 문제가 ${remaining}개 있습니다. 그대로 제출할까요?`)) onFinish()
            }}>시험 결과 확인</button>
          ) : (
            <button type="button" className="game-btn" onClick={() => onMove(index + 1)}>다음 문제 →</button>
          )}
        </div>
      </div>

      <div className="q-dots" aria-label="문제 이동">
        {questions.map((x, i) => (
          <button key={x.id} type="button" onClick={() => onMove(i)}
            className={`dot ${i === index ? 'current' : ''} ${isAnswered(responses[i]) ? 'done' : ''}`}
            aria-label={`${i + 1}번 문제${isAnswered(responses[i]) ? ' (답변 완료)' : ''}`}>{i + 1}</button>
        ))}
      </div>
    </section>
  )
}
