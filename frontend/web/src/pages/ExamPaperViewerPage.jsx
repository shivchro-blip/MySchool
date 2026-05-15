import { useParams } from 'react-router-dom'
import ExamPaperViewer from '../components/examPaperViewer/ExamPaperViewer'

export default function ExamPaperViewerPage() {
  const { paperId } = useParams()
  return (
    <div className="py-8">
      <ExamPaperViewer
        paperId={paperId}
        backPath="/plus1/english/final-exam-prep"
      />
    </div>
  )
}
