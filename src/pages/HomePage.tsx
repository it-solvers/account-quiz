import { chapters } from '../data/chapters'
import { questions } from '../data/questions'

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="eyebrow">Accounting fundamentals for developers</div>
        <h1>회계의 기초</h1>
        <p>회계 기초 개념을 이해하고, 상황형 미션과 퀴즈로 직접 풀어 보며 익힐 수 있는 학습 사이트입니다.</p>
        <div className="chips">
          <span className="chip">{chapters.length}개 장 학습 가이드</span>
          <span className="chip">문제은행 {questions.length}문항</span>
          <span className="chip">개발자 실무 연결</span>
          <span className="chip">브라우저에서 학습</span>
        </div>
      </section>
      <div className="home-cards">
        <a className="home-card" href="#/study">
          <div className="label">교재 학습</div>
          <h2>교재 읽기</h2>
          <p>1장 회계의 기초부터 9장 결산보고서 작성까지, 핵심 개념과 예제, 확인 문제를 순서대로 학습합니다.</p>
          <span className="go">교재 학습으로 이동 →</span>
        </a>
        <a className="home-card" href="#/quiz">
          <div className="label">퀴즈</div>
          <h2>퀴즈 풀기</h2>
          <p>학습 범위와 문제 수를 고르고 시험을 치릅니다. 풀이 중에는 정답이 공개되지 않고, 마지막에 시험지 형태로 채점 결과를 확인합니다.</p>
          <span className="go">퀴즈 시작 →</span>
        </a>
      </div>
    </>
  )
}
