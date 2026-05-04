import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { isLoggedIn }    from './api/auth'

import LoginPage         from './pages/LoginPage'
import HomePage          from './pages/HomePage'
import CoursesPage       from './pages/CoursesPage'
import SubjectsPage      from './pages/SubjectsPage'
import TopicListPage     from './pages/TopicListPage'
import TopicDetailPage   from './pages/TopicDetailPage'
import LearnPage         from './pages/LearnPage'
import PracticePage      from './pages/PracticePage'
import ProgressPage      from './pages/ProgressPage'

function Guard({ children }) {
  return isLoggedIn() ? children : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<LoginPage />} />

        <Route path="/" element={
          <Guard><HomePage /></Guard>
        } />

        <Route path="/courses" element={
          <Guard><CoursesPage /></Guard>
        } />
        <Route path="/courses/:classId" element={
          <Guard><SubjectsPage /></Guard>
        } />
        <Route path="/courses/:classId/:subjectSlug" element={
          <Guard><TopicListPage /></Guard>
        } />
        <Route path="/courses/:classId/:subjectSlug/:chapterSlug" element={
          <Guard><TopicDetailPage /></Guard>
        } />

        <Route path="/class/:id"   element={<Navigate to="/courses" replace />} />
        <Route path="/subject/:id" element={<Navigate to="/courses" replace />} />

        <Route path="/chapters" element={<Navigate to="/courses" replace />} />
        <Route path="/chapters/:subjectSlug" element={
          <Guard><TopicListPage /></Guard>
        } />
        <Route path="/chapters/:subjectSlug/:chapterSlug" element={
          <Guard><TopicDetailPage /></Guard>
        } />

        <Route path="/learn/:chapterSlug" element={
          <Guard><LearnPage /></Guard>
        } />
        <Route path="/practice/:chapterSlug" element={
          <Guard><PracticePage /></Guard>
        } />

        <Route path="/progress" element={
          <Guard><ProgressPage /></Guard>
        } />

        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  )
}
