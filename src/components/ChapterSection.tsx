import type { ReactNode } from 'react'
import type { Chapter } from '../types/content'

export default function ChapterSection({ chapter, extra }: { chapter: Chapter; extra?: ReactNode }) {
  const no = String(chapter.id).padStart(2, '0')
  const concepts = (
    <>
      <h3>핵심 개념</h3>
      <div className="concept-grid">
        {chapter.concepts.map((c) => (
          <article className="concept" key={c.title}>
            <h4>{c.title}</h4>
            <p>{c.body}</p>
          </article>
        ))}
      </div>
    </>
  )
  return (
    <section className="chapter" id={`chapter-${chapter.id}`}>
      <div className="chapter-head">
        <div className="chapter-no">CHAPTER {no}</div>
        <h2>제{chapter.id}장 {chapter.title}</h2>
      </div>
      <p className="goal"><strong>이번 장의 목표</strong>　{chapter.goal}</p>
      <div className="beginner-note">
        <div className="label">기초 설명</div>
        <p>{chapter.note}</p>
      </div>
      {extra}
      {concepts}
      <div className="worked">
        <div className="label">계산·적용 예제</div>
        <h3>{chapter.worked.title}</h3>
        <p>{chapter.worked.body}</p>
      </div>
      <h3>확인 문제 · 정답과 풀이</h3>
      <p className="muted">먼저 문제를 생각한 뒤 눌러 정답과 풀이를 확인하세요.</p>
      {chapter.quizzes.map((q) => (
        <details className="quiz" key={q.question}>
          <summary>{q.question}</summary>
          <div className="answer">
            {q.answer.map((a) => (
              <p key={a.label}><strong>{a.label}</strong>　{a.text}</p>
            ))}
          </div>
        </details>
      ))}
    </section>
  )
}
