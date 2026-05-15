import { eng11English2025Annual } from './eng11English2025Annual'

const registry = [
  eng11English2025Annual,
]

export function getPaperById(paperId) {
  return registry.find(p => p.paperId === paperId) ?? null
}
