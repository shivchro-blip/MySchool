import { useParams } from 'react-router-dom'
import ExamPaperViewer from '../components/examPaperViewer/ExamPaperViewer'

export default function ExamPaperViewerPage() {
  const { paperId } = useParams()
  return (
    <ExamPaperViewer
      paperId={paperId}
      backPath="/plus1/english/final-exam-prep"
    />
  )
}
