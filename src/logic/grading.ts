import { answerKey } from '../data/answerKey'
import type { JournalAnswer, JournalResponse, PublicQuestion, Response } from '../types/quiz'

const parseAmount = (s: string): number => Number(s.replace(/[,\s원]/g, ''))

export function isJournalResponse(r: Response | undefined): r is JournalResponse {
  return typeof r === 'object' && r !== null
}

/** 분개 응답이 모두 입력되었는지 */
export function isJournalComplete(r: JournalResponse): boolean {
  return r.debit !== '' && r.credit !== '' && r.debitAmount.trim() !== '' && r.creditAmount.trim() !== ''
}

export function isCorrect(question: PublicQuestion, response: Response | undefined): boolean {
  const entry = answerKey[question.id]
  if (!entry || response === undefined) return false
  if (question.kind === 'choice') return typeof response === 'number' && response === entry.answer
  if (!isJournalResponse(response)) return false
  const a = entry.answer as JournalAnswer
  const d = parseAmount(response.debitAmount)
  const c = parseAmount(response.creditAmount)
  return response.debit === a.debit && response.credit === a.credit && d === a.amount && c === a.amount
}

export function describeAnswer(question: PublicQuestion): string {
  const entry = answerKey[question.id]
  if (question.kind === 'choice') return question.options[entry.answer as number]
  const a = entry.answer as JournalAnswer
  return `차변 ${a.debit} ${a.amount.toLocaleString()}원 / 대변 ${a.credit} ${a.amount.toLocaleString()}원`
}

export function describeResponse(question: PublicQuestion, response: Response | undefined): string {
  if (response === undefined) return '무응답'
  if (question.kind === 'choice') return typeof response === 'number' ? question.options[response] : '무응답'
  if (!isJournalResponse(response) || !isJournalComplete(response)) return '입력 미완료'
  return `차변 ${response.debit} ${response.debitAmount}원 / 대변 ${response.credit} ${response.creditAmount}원`
}

export function explanationOf(question: PublicQuestion): string {
  return answerKey[question.id].explanation
}
