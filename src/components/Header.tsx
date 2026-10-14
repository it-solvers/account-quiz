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
        <div className="brand-group">
          <a className="brand logo" href="https://itsolvers.co.kr/" title="아이티해결단 메인으로 이동">
            <img src="https://itsolvers.co.kr/images/logo.png" alt="아이티해결단 로고" />
            <span>아이티해결단</span>
          </a>
          <a className="brand-sub" href="#/">IT개발자 회계교육</a>
        </div>
        <nav className="top-links" aria-label="주 메뉴">
          {link('#/', '학습 홈', page === 'home')}
          {link('#/study', '교재 학습', page === 'study')}
          {link('#/quiz', '퀴즈', page === 'quiz')}
        </nav>
      </div>
    </header>
  )
}
