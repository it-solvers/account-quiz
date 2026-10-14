import { questions } from '../data/questions'
import type { PublicQuestion, QuizConfig } from '../types/quiz'

const SEEN_KEY = 'account-quiz:seen'

export function shuffle<T>(items: readonly T[]): T[] {
  const a = [...items]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function loadSeen(): Set<string> {
  try {
    return new Set(JSON.parse(localStorage.getItem(SEEN_KEY) ?? '[]') as string[])
  } catch {
    return new Set()
  }
}

function saveSeen(ids: Set<string>) {
  try {
    localStorage.setItem(SEEN_KEY, JSON.stringify([...ids]))
  } catch {
    /* 저장소를 쓸 수 없어도 출제에는 영향 없음 */
  }
}

export function poolSize(chapterIds: number[]): number {
  return questions.filter((q) => chapterIds.includes(q.chapterId)).length
}

/**
 * 범위 내 문제를 무작위로 count개 뽑는다. 이전 시험에서 나오지 않은 문제를 먼저 쓰고,
 * 모자라면 이미 푼 문제로 채운다. 모두 소진되면 기록을 초기화한다.
 */
export function buildQuiz(config: QuizConfig): PublicQuestion[] {
  const pool = questions.filter((q) => config.chapterIds.includes(q.chapterId))
  let seen = loadSeen()
  let fresh = pool.filter((q) => !seen.has(q.id))
  if (fresh.length === 0) {
    seen = new Set([...seen].filter((id) => !pool.some((q) => q.id === id)))
    fresh = pool
  }
  const picked = shuffle(fresh).slice(0, config.count)
  if (picked.length < config.count) {
    const rest = shuffle(pool.filter((q) => !picked.includes(q)))
    picked.push(...rest.slice(0, config.count - picked.length))
  }
  picked.forEach((q) => seen.add(q.id))
  saveSeen(seen)
  return shuffle(picked)
}
