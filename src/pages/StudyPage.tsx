import { useEffect, useState } from 'react'
import { chapters } from '../data/chapters'
import { glossary } from '../data/glossary'
import { navItems } from '../data/sections'
import ChapterSection from '../components/ChapterSection'
import DebitCreditSection from '../components/DebitCreditSection'
import DevCourse from '../components/DevCourse'
import { studyHref } from '../logic/useHashRoute'

export default function StudyPage({ section }: { section?: string }) {
  const [active, setActive] = useState(navItems[0].id)

  // 주소의 섹션으로 스크롤
  useEffect(() => {
    if (!section) {
      window.scrollTo(0, 0)
      return
    }
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setActive(section)
  }, [section])

  // 스크롤 위치에 따라 현재 단원 표시
  useEffect(() => {
    const els = navItems.map((n) => document.getElementById(n.id)).filter((e): e is HTMLElement => !!e)
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-80px 0px -65% 0px' },
    )
    els.forEach((e) => io.observe(e))
    return () => io.disconnect()
  }, [])

  return (
    <div className="layout">
      <aside className="sidebar">
        <h2>목차</h2>
        <nav className="nav-list" aria-label="교재 목차">
          {navItems.map((n) => (
            <a
              key={n.id}
              href={n.id === 'quiz-link' ? '#/quiz' : studyHref(n.id)}
              className={active === n.id ? 'active' : undefined}
              aria-current={active === n.id ? 'location' : undefined}
            >
              <span>{n.badge}</span> {n.label}
            </a>
          ))}
        </nav>
        <div className="side-note">각 장의 설명을 읽고 퀴즈에서 배운 내용을 직접 적용해 보세요.</div>
      </aside>

      <main className="main">
        <section className="panel" id="guide">
          <h2>이 교재를 공부하는 방법</h2>
          <p>각 장에서 먼저 <strong>기초 설명</strong>과 핵심 개념을 읽고, 계산·적용 예제를 따라 해 보세요. 그다음 <strong>퀴즈</strong>에 도전하세요. 퀴즈는 풀이 중에는 정답을 공개하지 않고, 모든 문제를 푼 뒤 시험지 형식으로 점수와 해설을 보여 줍니다.</p>
          <div className="flowline">
            {['거래 이해', '분개', '총계정원장', '시산표', '결산·마감', '재무제표'].map((s) => <div key={s}>{s}</div>)}
          </div>
        </section>

        <h2 className="lessons-title" id="lessons">기초 설명</h2>
        {chapters.map((c) => (
          <ChapterSection key={c.id} chapter={c} extra={c.id === 5 ? <DebitCreditSection /> : undefined} />
        ))}

        <DevCourse />

        <section className="panel quiz-cta" id="quiz-link">
          <h2>퀴즈로 확인하기</h2>
          <p className="muted">학습 범위와 문제 수를 고르고 시험을 치릅니다. 풀이 중에는 정답이 공개되지 않으며, 마지막에 시험지 형태로 채점 결과와 해설을 확인합니다.</p>
          <a className="game-btn" href="#/quiz">퀴즈 시작하기 →</a>
        </section>

        <section className="panel" id="glossary">
          <h2>핵심 용어 빠른 복습</h2>
          <div className="glossary">
            {glossary.map((g) => <div key={g.term}><strong>{g.term}</strong>{g.desc}</div>)}
          </div>
        </section>
        <div className="footer">회계의 기초 · 개발자 교육 자료 · 인터랙티브 학습판</div>
      </main>
    </div>
  )
}
