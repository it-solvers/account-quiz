import { useEffect, useState } from 'react'

export interface Route {
  page: 'home' | 'study' | 'quiz'
  section?: string
}

function parse(hash: string): Route {
  const [, page, section] = hash.replace(/^#/, '').split('/')
  if (page === 'study') return { page: 'study', section: section || undefined }
  if (page === 'quiz') return { page: 'quiz' }
  return { page: 'home' }
}

/** 의존성 없는 해시 라우터. 서버 리라이트 설정 없이 새로고침해도 동작합니다. */
export function useHashRoute(): Route {
  const [route, setRoute] = useState<Route>(() => parse(window.location.hash))
  useEffect(() => {
    const on = () => setRoute(parse(window.location.hash))
    window.addEventListener('hashchange', on)
    return () => window.removeEventListener('hashchange', on)
  }, [])
  return route
}

export const studyHref = (section?: string) => `#/study${section ? `/${section}` : ''}`
