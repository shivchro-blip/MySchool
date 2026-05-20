import { useParams } from 'react-router-dom'
import ExamPaperViewer from '../components/examPaperViewer/ExamPaperViewer'

export default function ExamPaperViewerPage({ backPath = '/plus1/english/final-exam-prep' }) {
  const { paperId } = useParams()
  return (
    <ExamPaperViewer
      paperId={paperId}
      backPath={backPath}
    />
  )
}
