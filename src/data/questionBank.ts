import type { QuestionRecord } from '../types/quiz'
import { legacyQuestions } from './legacyQuestions'
import { addedQuestions } from './addedQuestions'
import { moreQuestions } from './moreQuestions'

/** 문제은행 원본(정답 포함). 풀이 화면에서는 직접 사용하지 않습니다. */
export const questionBank: QuestionRecord[] = [...legacyQuestions, ...addedQuestions, ...moreQuestions]
