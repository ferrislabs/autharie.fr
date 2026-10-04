import type { Locale } from '../i18n'
import type { SolutionCopy, SolutionDef, SolutionGroup } from './solutions.types'
import { roleSolutions } from './solutions.roles'
import { stageSolutions } from './solutions.stages'
import { industrySolutions } from './solutions.industries'
import { migrateSolutions } from './solutions.migrate'

export type { SolutionCopy, SolutionDef, SolutionGroup }

export const solutions: SolutionDef[] = [
  ...roleSolutions,
  ...stageSolutions,
  ...industrySolutions,
  ...migrateSolutions,
]

export const solutionGroups: SolutionGroup[] = ['role', 'stage', 'industry', 'migrate']

export const solutionsIn = (group: SolutionGroup) => solutions.filter((s) => s.group === group)

export const getSolution = (slug: string) => solutions.find((s) => s.slug === slug)

export const solutionCopy = (solution: SolutionDef, locale: Locale): SolutionCopy =>
  solution.copy[locale]
