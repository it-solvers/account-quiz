import { typeLabels } from '../data/labels'
import { describeAnswer, describeResponse, explanationOf, isCorrect } from '../logic/grading'
import type { PublicQuestion, Response } from '../types/quiz'

interface Props {
  questions: PublicQuestion[]
  responses: (Response | undefined)[]
  onRetry: () => void
}

export default function QuizResult({ questions, responses, onRetry }: Props) {
  const results = questions.map((q, i) => isCorrect(q, responses[i]))
  const correct = results.filter(Boolean).length
  const total = questions.length
  const pct = Math.round((correct / total) * 100)
  const title = pct >= 90 ? '매우 좋습니다' : pct >= 70 ? '잘했습니다' : '결과를 확인하고 복습해 보세요'

  return (
    <section className="panel quiz-game game-result">
      <div className="game-kicker">시험 결과</div>
      <div className="big-score">{correct} / {total} ({pct}%)</div>
      <h3>{title}</h3>
      <div className="score-grid">
        <div><small>전체 문제</small><b>{total}</b></div>
        <div><small>정답</small><b className="ok">{correct}</b></div>
        <div><small>오답</small><b className="bad">{total - correct}</b></div>
        <div><small>정답률</small><b>{pct}%</b></div>
      </div>
      <p>아래 시험지에서 각 문항의 선택 답안, 정답, 해설을 확인할 수 있습니다. 틀린 문항은 해당 장의 설명을 다시 살펴보세요.</p>

      <div className="exam-sheet">
        {questions.map((q, i) => (
          <article key={q.id} className={`exam-item ${results[i] ? 'exam-correct' : 'exam-wrong'}`}>
            <div className="exam-item-head">
              <strong>{i + 1}. {q.tag ?? typeLabels[q.type]}{q.source === 'added' ? ' · 추가 문제' : ''}</strong>
              <span className="exam-mark">{results[i] ? '정답' : '오답'}</span>
            </div>
            <p className="exam-question">{q.prompt}</p>
            <p>내가 선택한 답: {describeResponse(q, responses[i])}</p>
            <p>정답: {describeAnswer(q)}</p>
            <p className="exam-explanation">해설: {explanationOf(q)}</p>
            <a className="muted" href={`#/study/chapter-${q.chapterId}`}>제{q.chapterId}장 복습하기 →</a>
          </article>
        ))}
      </div>
      <button type="button" className="game-btn" onClick={onRetry}>다시 시험 보기 ↻</button>
    </section>
  )
}
