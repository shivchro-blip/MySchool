import { SYLLABUS } from '../../data/syllabus'
import { buildBreadcrumbs } from '../../lib/nav'
import { PageHeader } from '../../components/ui'
import { Breadcrumb } from '../../components/nav'
import ExamPaperListCard from './ExamPaperListCard'
import ModelPaperListCard from './ModelPaperListCard'
import PriorityLessonsCard from './PriorityLessonsCard'
import {
  finalExamPrepPapers,
  finalExamPrepPapersPlus2,
  finalExamPrepModelPapers,
  finalExamPrepModelPapersPlus2,
  finalExamPrepPriorityLessons,
  finalExamPrepPriorityLessonsPlus2,
} from '../../data/finalExamPrepData'

const PAPERS_BY_CLASS       = { plus1: finalExamPrepPapers,      plus2: finalExamPrepPapersPlus2 }
const MODEL_PAPERS_BY_CLASS = { plus1: finalExamPrepModelPapers, plus2: finalExamPrepModelPapersPlus2 }
const LESSONS_BY_CLASS      = { plus1: finalExamPrepPriorityLessons, plus2: finalExamPrepPriorityLessonsPlus2 }

export default function FinalExamPrepPage({ classLevel = 'plus1', subjectSlug = 'english' }) {
  const subjectCrumbs = buildBreadcrumbs(classLevel, subjectSlug, null, null, null, SYLLABUS)
  const crumbs = [...subjectCrumbs, { label: 'Final Exam Prep', to: null }]
  const papers      = PAPERS_BY_CLASS[classLevel]       ?? finalExamPrepPapers
  const modelPapers = MODEL_PAPERS_BY_CLASS[classLevel] ?? finalExamPrepModelPapers
  const lessons     = LESSONS_BY_CLASS[classLevel]      ?? finalExamPrepPriorityLessons

  return (
    <div>
      <PageHeader
        breadcrumb={<Breadcrumb crumbs={crumbs} />}
        title="Final Exam Prep"
        subtitle="Prepare for the year-end English exam with past annual exam papers and high-priority lesson guidance."
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
        <div className="flex flex-col gap-4">
          <ExamPaperListCard papers={papers} basePath={`/${classLevel}/${subjectSlug}`} />
          <ModelPaperListCard papers={modelPapers} basePath={`/${classLevel}/${subjectSlug}`} />
        </div>
        <PriorityLessonsCard lessons={lessons} />
      </div>
    </div>
  )
}
