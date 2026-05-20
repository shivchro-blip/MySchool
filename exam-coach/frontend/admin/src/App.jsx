import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage       from './pages/LoginPage'
import DashboardPage   from './pages/DashboardPage'
import ContentPage     from './pages/ContentPage'
import QuestionsPage   from './pages/QuestionsPage'
import EvaluationsPage from './pages/EvaluationsPage'
import PipelinePage    from './pages/PipelinePage'

function Guard({ children }) {
  const token = localStorage.getItem('admin_token')
  return token ? children : <Navigate to="/login" replace />
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
