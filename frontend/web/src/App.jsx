import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { isLoggedIn } from './api/auth'
import LoginPage    from './pages/LoginPage'
import HomePage     from './pages/HomePage'
import LearnPage    from './pages/LearnPage'
import PracticePage from './pages/PracticePage'
import ProgressPage from './pages/ProgressPage'
import NotFoundPage from './pages/NotFoundPage'

function PrivateRoute({ children }) {
  return isLoggedIn() ? children : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={
          <PrivateRoute><HomePage /></PrivateRoute>
        } />
        <Route path="/learn/:chapterId" element={
          <PrivateRoute><LearnPage /></PrivateRoute>
        } />
        <Route path="/practice/:chapterId" element={
          <PrivateRoute><PracticePage /></PrivateRoute>
        } />
        <Route path="/progress" element={
          <PrivateRoute><ProgressPage /></PrivateRoute>
        } />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}
