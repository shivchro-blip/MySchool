import { class11English2025Annual } from './class11English2025Annual'

const registry = [
  class11English2025Annual,
]

export function getPaperById(paperId) {
  return registry.find(p => p.paperId === paperId) ?? null
}
