import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui'

export default function NotFound({ message = 'Page not found' }) {
  const navigate = useNavigate()
  return (
    <div className="text-center py-16">
      <p className="text-5xl mb-4">📭</p>
      <p className="text-lg font-bold text-ink mb-1">Not Found</p>
      <p className="text-sm text-ink-4 mb-6">{message}</p>
      <Button variant="secondary" onClick={() => navigate('/')}>
        Go home
      </Button>
    </div>
  )
}
