import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { isLoggedIn } from './api/auth'

import LoginPage from './pages/LoginPage'
import ProgressPage from './pages/ProgressPage'

import AppShell from './components/layout/AppShell'

import YearPage         from './pages/syllabus/YearPage'
import SubjectPage      from './pages/syllabus/SubjectPage'
import LessonListPage   from './pages/syllabus/LessonListPage'
import LessonDetailPage from './pages/syllabus/LessonDetailPage'
import SectionPage      from './pages/syllabus/SectionPage'
import NotFound         from './pages/syllabus/NotFound'

function Guard({ children }) {
  return isLoggedIn() ? children : <Navigate to="/login" replace />
}

function SyllabusShell({ children }) {
  return (
    <Guard>
      <AppShell>{children}</AppShell>
    </Guard>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<LoginPage />} />

        <Route path="/progress" element={
          <SyllabusShell><ProgressPage /></SyllabusShell>
        } />

        <Route path="/:year" element={
          <SyllabusShell><YearPage /></SyllabusShell>
        } />
        <Route path="/:year/:subject" element={
          <SyllabusShell><SubjectPage /></SyllabusShell>
        } />
        <Route path="/:year/:subject/:category" element={
          <SyllabusShell><LessonListPage /></SyllabusShell>
        } />
        <Route path="/:year/:subject/:category/:lesson" element={
          <SyllabusShell><LessonDetailPage /></SyllabusShell>
        } />
        <Route path="/:year/:subject/:category/:lesson/:section" element={
          <SyllabusShell><SectionPage /></SyllabusShell>
        } />

        <Route path="/" element={<SyllabusShell><YearPage /></SyllabusShell>} />
        <Route path="*" element={<SyllabusShell><NotFound /></SyllabusShell>} />

      </Routes>
    </BrowserRouter>
  )
}
