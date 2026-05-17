import { class11English2025Annual } from './class11English2025Annual'
import { class11English2024Annual } from './class11English2024Annual'
import { class11English2023Annual } from './class11English2023Annual'
import { class11English2022Annual } from './class11English2022Annual'
import { class12English2025Annual } from './class12English2025Annual'
import { class12English2024Annual } from './class12English2024Annual'
import { class12English2023Annual } from './class12English2023Annual'
import { class12English2022Annual } from './class12English2022Annual'

const registry = [
  class11English2025Annual,
  class11English2024Annual,
  class11English2023Annual,
  class11English2022Annual,
  class12English2025Annual,
  class12English2024Annual,
  class12English2023Annual,
  class12English2022Annual,
]

export function getPaperById(paperId) {
  return registry.find(p => p.paperId === paperId) ?? null
}
