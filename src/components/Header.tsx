import type { Route } from '../logic/useHashRoute'

export default function Header({ page }: { page: Route['page'] }) {
  const link = (href: string, label: string, active: boolean) => (
    <a href={href} className={active ? 'active' : undefined} aria-current={active ? 'page' : undefined}>
      {label}
    </a>
  )
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <a className="brand" href="#/">회계의 기초 · 개발자 교육</a>
        <nav className="top-links" aria-label="주 메뉴">
          {link('#/', '학습 홈', page === 'home')}
          {link('#/study', '교재 학습', page === 'study')}
          {link('#/quiz', '퀴즈', page === 'quiz')}
        </nav>
      </div>
    </header>
  )
}
