import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage       from './pages/LoginPage'
import DashboardPage   from './pages/DashboardPage'
import ContentPage     from './pages/ContentPage'
import QuestionsPage   from './pages/QuestionsPage'
import EvaluationsPage from './pages/EvaluationsPage'
import PipelinePage    from './pages/PipelinePage'

function isTokenValid(token) {
  // Security audit: the guard previously only checked token PRESENCE; an
  // expired or garbage value passed. Decode exp and require it be in the
  // future. (Authorization is still enforced server-side per request.)
  try {
    const payload = JSON.parse(
      atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/'))
    )
    return typeof payload.exp === 'number' && Date.now() < payload.exp * 1000
  } catch {
    return false
  }
}

function Guard({ children }) {
  const token = localStorage.getItem('admin_token')
  if (!token || !isTokenValid(token)) {
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_session')
    return <Navigate to="/login" replace />
  }
  return children
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login"        element={<LoginPage />} />
        <Route path="/"             element={<Guard><DashboardPage /></Guard>} />
        <Route path="/content"      element={<Guard><ContentPage /></Guard>} />
        <Route path="/questions"    element={<Guard><QuestionsPage /></Guard>} />
        <Route path="/evaluations"  element={<Guard><EvaluationsPage /></Guard>} />
        <Route path="/pipeline"     element={<Guard><PipelinePage /></Guard>} />
      </Routes>
    </BrowserRouter>
  )
}
