import { typeLabels } from '../data/labels'
import type { JournalResponse, PublicQuestion, Response } from '../types/quiz'
import { isJournalResponse } from '../logic/grading'

interface Props {
  question: PublicQuestion
  /** 화면에 보일 보기 순서(원본 options 인덱스 배열) */
  order: number[]
  response: Response | undefined
  onChange: (r: Response) => void
}

const EMPTY: JournalResponse = { debit: '', credit: '', debitAmount: '', creditAmount: '' }
const digits = (s: string) => s.replace(/[^\d]/g, '')
const fmt = (s: string) => (s === '' ? '' : Number(s).toLocaleString())

export default function QuestionView({ question, order, response, onChange }: Props) {
  const head = (
    <>
      <span className="mission-tag">{question.tag ?? typeLabels[question.type]}</span>
      {question.source === 'added' && <span className="added-tag">추가 문제</span>}
      <h3 className="q-prompt">{question.prompt}</h3>
      {question.story && <p className="mission-story">{question.story}</p>}
    </>
  )

  if (question.kind === 'choice') {
    return (
      <>
        {head}
        <div className="mission-options" role="radiogroup" aria-label="보기">
          {order.map((orig, pos) => (
            <button key={orig} type="button" role="radio" aria-checked={response === orig}
              className={`mission-option ${response === orig ? 'selected' : ''}`}
              onClick={() => onChange(orig)}>
              <span className="option-letter">{String.fromCharCode(65 + pos)}</span>
              <span>{question.options[orig]}</span>
            </button>
          ))}
        </div>
      </>
    )
  }

  const r = isJournalResponse(response) ? response : EMPTY
  const set = (patch: Partial<JournalResponse>) => onChange({ ...r, ...patch })
  const row = (side: '차변' | '대변', acc: 'debit' | 'credit', amt: 'debitAmount' | 'creditAmount') => (
    <div className="journal-row">
      <span className={`side-badge ${acc}`}>{side}</span>
      <select aria-label={`${side} 계정과목`} value={r[acc]} onChange={(e) => set({ [acc]: e.target.value })}>
        <option value="">계정과목 선택</option>
        {question.accounts.map((a) => <option key={a} value={a}>{a}</option>)}
      </select>
      <input aria-label={`${side} 금액`} inputMode="numeric" placeholder="금액(원)" value={fmt(r[amt])}
        onChange={(e) => set({ [amt]: digits(e.target.value) })} />
    </div>
  )
  return (
    <>
      {head}
      <div className="journal-form">
        {row('차변', 'debit', 'debitAmount')}
        {row('대변', 'credit', 'creditAmount')}
      </div>
    </>
  )
}
