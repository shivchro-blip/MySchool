import { class11English2025Annual } from './class11English2025Annual'
import { class11English2024Annual } from './class11English2024Annual'
import { class11English2023Annual } from './class11English2023Annual'
import { class11English2022Annual } from './class11English2022Annual'
import { class12English2025Annual } from './class12English2025Annual'
import { class12English2024Annual } from './class12English2024Annual'
import { class12English2023Annual } from './class12English2023Annual'
import { class12English2022Annual } from './class12English2022Annual'
import { class11EnglishModelQA1 } from './class11EnglishModelQA1'
import { class11EnglishModelQA2 } from './class11EnglishModelQA2'
import { class11EnglishModelQA3 } from './class11EnglishModelQA3'
import { class11EnglishModelQA4 } from './class11EnglishModelQA4'
import { class11EnglishModelQA5 } from './class11EnglishModelQA5'
import { class12EnglishModelQA1 } from './class12EnglishModelQA1'
import { class12EnglishModelQA2 } from './class12EnglishModelQA2'
import { class12EnglishModelQA3 } from './class12EnglishModelQA3'
import { class12EnglishModelQA4 } from './class12EnglishModelQA4'
import { class12EnglishModelQA5 } from './class12EnglishModelQA5'

const registry = [
  class11English2025Annual,
  class11English2024Annual,
  class11English2023Annual,
  class11English2022Annual,
  class12English2025Annual,
  class12English2024Annual,
  class12English2023Annual,
  class12English2022Annual,
  class11EnglishModelQA1,
  class11EnglishModelQA2,
  class11EnglishModelQA3,
  class11EnglishModelQA4,
  class11EnglishModelQA5,
  class12EnglishModelQA1,
  class12EnglishModelQA2,
  class12EnglishModelQA3,
  class12EnglishModelQA4,
  class12EnglishModelQA5,
]

export function getPaperById(paperId) {
  return registry.find(p => p.paperId === paperId) ?? null
}
