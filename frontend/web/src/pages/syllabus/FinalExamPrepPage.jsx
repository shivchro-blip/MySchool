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
  finalExamPrepModelPapersComputerApplicationsPlus2,
  finalExamPrepPriorityLessons,
  finalExamPrepPriorityLessonsPlus2,
} from '../../data/finalExamPrepData'

const PAPERS_BY_KEY = {
  'plus1-english': finalExamPrepPapers,
  'plus2-english': finalExamPrepPapersPlus2,
  'plus2-computer-applications': [],
}
const MODEL_PAPERS_BY_KEY = {
  'plus1-english': finalExamPrepModelPapers,
  'plus2-english': finalExamPrepModelPapersPlus2,
  'plus2-computer-applications': finalExamPrepModelPapersComputerApplicationsPlus2,
}
const LESSONS_BY_KEY = {
  'plus1-english': finalExamPrepPriorityLessons,
  'plus2-english': finalExamPrepPriorityLessonsPlus2,
  'plus2-computer-applications': [],
}

export default function FinalExamPrepPage({ classLevel = 'plus1', subjectSlug = 'english' }) {
  const subjectCrumbs = buildBreadcrumbs(classLevel, subjectSlug, null, null, null, SYLLABUS)
  const crumbs = [...subjectCrumbs, { label: 'Final Exam Prep', to: null }]
  const key          = `${classLevel}-${subjectSlug}`
  const papers       = PAPERS_BY_KEY[key]       ?? []
  const modelPapers  = MODEL_PAPERS_BY_KEY[key] ?? []
  const lessons      = LESSONS_BY_KEY[key]      ?? []

  return (
    <div>
      <PageHeader
        breadcrumb={<Breadcrumb crumbs={crumbs} />}
        title="Final Exam Prep"
        subtitle="Prepare for the year-end exam with past annual exam papers and high-priority lesson guidance."
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
        <div className="flex flex-col gap-4">
          {papers.length > 0 && (
            <ExamPaperListCard papers={papers} basePath={`/${classLevel}/${subjectSlug}`} />
          )}
          <ModelPaperListCard papers={modelPapers} basePath={`/${classLevel}/${subjectSlug}`} />
        </div>
        <PriorityLessonsCard lessons={lessons} basePath={`/${classLevel}/${subjectSlug}`} />
      </div>
    </div>
  )
}
