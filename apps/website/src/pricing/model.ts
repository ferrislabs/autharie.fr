/**
 * The pricing model: what each configuration costs, and what running the same
 * thing yourself costs. Pure functions, no UI, so the numbers can be tested.
 */

export const VOLUMES = [1000, 5000, 10000, 25000, 50000, 100000, 250000, 500000] as const

export type Mode = 'managed' | 'byoc'
export type Engine = 'ferriskey' | 'keycloak'
export type PlanId = 'starter' | 'business' | 'scale'

/** A price is an amount, or not offered at that volume. */
export type Price = { kind: 'price'; amount: number } | { kind: 'unavailable' }

/**
 * Fully managed prices are per volume tier: the figure for 10,000 covers up to
 * 10,000 active accounts. Pairs are [up to N accounts, EUR per month, excl. VAT].
 */
const STARTER: Record<Engine, [number, number][]> = {
  ferriskey: [[1000, 0], [5000, 49], [10000, 99], [25000, 179]],
  keycloak: [[1000, 49], [5000, 69], [10000, 129], [25000, 239]],
}

const BUSINESS: Record<Engine, [number, number][]> = {
  ferriskey: [[10000, 225], [50000, 530], [100000, 890], [250000, 1699], [500000, 2690]],
  keycloak: [[10000, 289], [50000, 690], [100000, 1150], [250000, 2199], [500000, 3490]],
}

/** The top plan: Business plus about 55%, rounded to a price ending in 9. */
const SCALE: Record<Engine, [number, number][]> = {
  ferriskey: [[10000, 349], [50000, 829], [100000, 1379], [250000, 2629], [500000, 4169]],
  keycloak: [[10000, 449], [50000, 1069], [100000, 1779], [250000, 3409], [500000, 5409]],
}
export const STARTER_MAX_VOLUME = 25000

/** BYOC: a flat price for the control plane and the orchestration. Users are unlimited. */
const BYOC: Record<PlanId, Record<Engine, number>> = {
  starter: { ferriskey: 70, keycloak: 89 },
  business: { ferriskey: 269, keycloak: 349 },
  scale: { ferriskey: 629, keycloak: 799 },
}

const tier = (table: [number, number][], volume: number) => table.find(([upTo]) => volume <= upTo)

export interface Selection {
  mode: Mode
  engine: Engine
  plan: PlanId
  volume: number
}

export function priceOf({ mode, engine, plan, volume }: Selection): Price {
  if (mode === 'byoc') return { kind: 'price', amount: BYOC[plan][engine] }

  const table = plan === 'starter' ? STARTER[engine] : plan === 'business' ? BUSINESS[engine] : SCALE[engine]
  const found = tier(table, volume)
  return found ? { kind: 'price', amount: found[1] } : { kind: 'unavailable' }
}

/** Starter stops at 25,000 accounts. A selection that no longer fits moves up to Business. */
export function normalise(selection: Selection): Selection {
  const available = priceOf(selection).kind !== 'unavailable'
  return available ? selection : { ...selection, plan: 'business' }
}

/** The monthly amount to compare against. */
export function monthlyOf(selection: Selection): { amount: number } {
  const price = priceOf(selection)
  return { amount: price.kind === 'unavailable' ? 0 : price.amount }
}

// --- Running it yourself ----------------------------------------------------

export const TCO = {
  workingDaysPerYear: 220,
  fullTimeHoursPerYear: 1607,
  hoursPerDay: 7,
  haMonthly: 200,
  onCallMonthly: 800,
  majorUpgradeDays: 4,
  cveDays: 2,
} as const

export interface TcoInput {
  /** Loaded yearly salary of the DevOps or SRE who looks after it, in EUR. */
  salary: number
  /** Share of a full-time position spent on the identity provider, 0 to 100. */
  timePercent: number
  ha: boolean
  onCall: boolean
  majorUpgrades: boolean
  cve: boolean
}

export const TCO_DEFAULTS: TcoInput = {
  salary: 75000,
  timePercent: 15,
  ha: true,
  onCall: true,
  majorUpgrades: true,
  cve: true,
}

export function internalMonthly(input: TcoInput): number {
  const dayRate = input.salary / TCO.workingDaysPerYear
  const extraDays = (input.majorUpgrades ? TCO.majorUpgradeDays : 0) + (input.cve ? TCO.cveDays : 0)
  return (
    (input.salary / 12) * (input.timePercent / 100) +
    (input.ha ? TCO.haMonthly : 0) +
    (input.onCall ? TCO.onCallMonthly : 0) +
    (extraDays * dayRate) / 12
  )
}

export function internalHoursPerYear(input: TcoInput): number {
  const extraDays = (input.majorUpgrades ? TCO.majorUpgradeDays : 0) + (input.cve ? TCO.cveDays : 0)
  return TCO.fullTimeHoursPerYear * (input.timePercent / 100) + extraDays * TCO.hoursPerDay
}
