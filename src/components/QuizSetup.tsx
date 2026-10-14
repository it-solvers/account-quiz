import { useState } from 'react'
import { chapters } from '../data/chapters'
import { questions } from '../data/questions'
import { poolSize } from '../logic/session'
import type { QuizConfig } from '../types/quiz'

const MAX_DEFAULT = 10

export default function QuizSetup({ onStart }: { onStart: (c: QuizConfig) => void }) {
  const [selected, setSelected] = useState<number[]>(chapters.map((c) => c.id))
  const [count, setCount] = useState(MAX_DEFAULT)

  const total = poolSize(selected)
  const effective = Math.min(Math.max(count, 1), total)
  const perChapter = (id: number) => questions.filter((q) => q.chapterId === id).length

  const toggle = (id: number) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id].sort((a, b) => a - b)))

  return (
    <section className="panel quiz-setup">
      <div className="game-kicker">QUIZ</div>
      <h2>퀴즈 설정</h2>
      <p className="muted">학습 범위와 문제 수를 고르세요. 문제는 문제은행에서 무작위로 뽑으며, 풀이 중에는 정답이 공개되지 않습니다.</p>

      <fieldset className="setup-group">
        <legend>학습 범위</legend>
        <div className="setup-actions">
          <button type="button" className="btn" onClick={() => setSelected(chapters.map((c) => c.id))}>전체 선택</button>
          <button type="button" className="btn" onClick={() => setSelected([])}>모두 해제</button>
        </div>
        <div className="chapter-checks">
          {chapters.map((c) => (
            <label key={c.id} className={`check ${selected.includes(c.id) ? 'on' : ''}`}>
              <input type="checkbox" checked={selected.includes(c.id)} onChange={() => toggle(c.id)} />
              <span>제{c.id}장 {c.title}</span>
              <small>{perChapter(c.id)}문항</small>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="setup-group">
        <legend>문제 수</legend>
        <div className="count-row">
          {[5, 10, 20].map((n) => (
            <button key={n} type="button" className={`btn ${count === n ? 'btn-on' : ''}`} onClick={() => setCount(n)}>
              {n}문제
            </button>
          ))}
          <label className="count-input">
            직접 입력
            <input type="number" min={1} max={Math.max(total, 1)} value={count}
              onChange={(e) => setCount(Number(e.target.value) || 1)} />
          </label>
        </div>
        <p className="muted">
          선택한 범위의 문제은행: {total}문항 → 이번 시험: <b>{total === 0 ? 0 : effective}문제</b>
          {total > 0 && count > total && ' (범위 내 문항 수로 조정됩니다)'}
        </p>
      </fieldset>

      <button type="button" className="game-btn" disabled={total === 0}
        onClick={() => onStart({ chapterIds: selected, count: effective })}>
        {total === 0 ? '학습 범위를 선택하세요' : '시험 시작 →'}
      </button>
    </section>
  )
}
