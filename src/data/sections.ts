import { chapters } from './chapters'

export interface NavItem {
  id: string
  badge: string
  label: string
}

/** 교재 사이드바 목차. 원본 index.html의 목차 순서를 그대로 따릅니다. */
export const navItems: NavItem[] = [
  { id: 'guide', badge: '안내', label: '이 교재를 공부하는 방법' },
  ...chapters.flatMap((c): NavItem[] => {
    const item = { id: `chapter-${c.id}`, badge: String(c.id).padStart(2, '0'), label: c.title }
    return c.id === 5 ? [item, { id: 'debit-credit', badge: '핵심', label: '차변·대변과 8요소' }] : [item]
  }),
  { id: 'developer-workflow', badge: 'DEV', label: '회계 시스템 개발 흐름' },
  { id: 'quiz-link', badge: 'PLAY', label: '퀴즈 풀러 가기' },
  { id: 'glossary', badge: '복습', label: '핵심 용어 빠른 복습' },
]
