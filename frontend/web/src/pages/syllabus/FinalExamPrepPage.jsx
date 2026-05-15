import { SYLLABUS } from '../../data/syllabus'
import { buildBreadcrumbs } from '../../lib/nav'
import { PageHeader } from '../../components/ui'
import { Breadcrumb } from '../../components/nav'
import ExamPaperListCard from './ExamPaperListCard'
import PriorityLessonsCard from './PriorityLessonsCard'

export default function FinalExamPrepPage() {
  const subjectCrumbs = buildBreadcrumbs('plus1', 'english', null, null, null, SYLLABUS)
  const crumbs = [...subjectCrumbs, { label: 'Final Exam Prep', to: null }]

  return (
    <div>
      <PageHeader
        breadcrumb={<Breadcrumb crumbs={crumbs} />}
        title="Final Exam Prep"
        subtitle="Prepare for the year-end English exam with past annual exam papers and high-priority lesson guidance."
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
        <ExamPaperListCard />
        <PriorityLessonsCard />
      </div>
    </div>
  )
}
