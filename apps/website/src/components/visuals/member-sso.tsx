import { useState } from 'react'
import { cn } from '@explainer/ui'
import { ConsoleWindow, Icon } from '../console/ui'

const roles = [
  { en: 'Members', fr: 'Adhérents' },
  { en: 'Volunteers', fr: 'Bénévoles' },
  { en: 'Staff', fr: 'Salariés' },
  { en: 'Board', fr: 'Bureau' },
]
const tools = [
  { en: 'Members area', fr: 'Espace adhérents', icon: 'users' },
  { en: 'Helpdesk', fr: 'Assistance', icon: 'info' },
  { en: 'Shared drive', fr: 'Documents partagés', icon: 'hard-drive' },
  { en: 'Accounting', fr: 'Comptabilité', icon: 'database' },
]
const initial = [
  [true, false, false, false],
  [true, true, true, false],
  [true, true, true, true],
  [true, false, true, true],
]
const copy = {
  en: { title: 'Who can open what', hint: 'Click a cell to change access. It applies everywhere at once.', people: 'People with access', one: 'One sign in, four tools' },
  fr: { title: 'Qui peut ouvrir quoi', hint: 'Cliquez sur une case pour changer l’accès. Il s’applique partout à la fois.', people: 'Personnes ayant accès', one: 'Une connexion, quatre outils' },
}
const counts = [412, 38, 9, 7]

export default function MemberSso({ locale = 'en' }: { locale?: 'en' | 'fr' }) {
  const t = copy[locale]
  const [grid, setGrid] = useState(initial)
  const toggle = (r: number, c: number) => setGrid((g) => g.map((row, i) => (i === r ? row.map((v, j) => (j === c ? !v : v)) : row)))
  const reach = (c: number) => grid.reduce((n, row, r) => n + (row[c] ? counts[r] : 0), 0)
  return (
    <ConsoleWindow className="shadow-sm">
      <div className="flex items-center justify-between border-b p-4">
        <p className="text-sm font-semibold">{t.title}</p>
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground"><Icon name="key-round" className="h-3.5 w-3.5" />{t.one}</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[420px] text-sm">
          <thead>
            <tr className="border-b text-xs text-muted-foreground">
              <th className="px-4 py-2 text-left font-medium" />
              {tools.map((x) => (
                <th key={x.en} className="px-2 py-2 text-center font-medium">
                  <span className="flex flex-col items-center gap-1"><Icon name={x.icon} className="h-3.5 w-3.5" />{x[locale]}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y">
            {roles.map((r, ri) => (
              <tr key={r.en}>
                <td className="px-4 py-2.5 font-medium">{r[locale]}</td>
                {grid[ri].map((on, ci) => (
                  <td key={ci} className="px-2 py-2.5 text-center">
                    <button type="button" aria-pressed={on} aria-label={`${r[locale]}, ${tools[ci][locale]}`} onClick={() => toggle(ri, ci)} className={cn('inline-flex h-7 w-7 items-center justify-center rounded-md border transition-colors', on ? 'border-primary/40 bg-primary/10 text-primary' : 'text-transparent hover:bg-accent')}>
                      <Icon name="check" className="h-3.5 w-3.5" />
                    </button>
                  </td>
                ))}
              </tr>
            ))}
            <tr className="bg-muted/30 text-xs text-muted-foreground">
              <td className="px-4 py-2">{t.people}</td>
              {tools.map((_, ci) => <td key={ci} className="px-2 py-2 text-center font-medium tabular-nums text-foreground">{reach(ci)}</td>)}
            </tr>
          </tbody>
        </table>
      </div>
      <p className="border-t px-4 py-2.5 text-xs text-muted-foreground">{t.hint}</p>
    </ConsoleWindow>
  )
}
