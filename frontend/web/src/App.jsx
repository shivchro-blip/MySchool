import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { isLoggedIn } from './api/auth'

import LoginPage        from './pages/LoginPage'
import ProgressPage     from './pages/ProgressPage'
import DashboardPage    from './pages/DashboardPage'
import CoursesIndexPage from './pages/CoursesIndexPage'
import ActivityPage     from './pages/ActivityPage'
import CertificatePage  from './pages/CertificatePage'

import DashboardShell from './components/layout/DashboardShell'

import YearPage         from './pages/syllabus/YearPage'
import SubjectPage      from './pages/syllabus/SubjectPage'
import LessonListPage   from './pages/syllabus/LessonListPage'
import LessonDetailPage         from './pages/syllabus/LessonDetailPage'
import SectionPage              from './pages/syllabus/SectionPage'
import NotFound                 from './pages/syllabus/NotFound'
import ChapterPracticeExamPage  from './pages/ChapterPracticeExamPage'

function Guard({ children }) {
  return isLoggedIn() ? children : <Navigate to="/login" replace />
}

function DashShell({ children }) {
  return (
    <Guard>
      <DashboardShell>{children}</DashboardShell>
    </Guard>
  )
}

function CourseContent({ children }) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-6 lg:py-8">
      {children}
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<LoginPage />} />

        {/* ── Dashboard shell routes ─────────────────────────── */}
        <Route path="/" element={
          <DashShell><DashboardPage /></DashShell>
        } />

        <Route path="/courses" element={
          <DashShell>
            <CourseContent><CoursesIndexPage /></CourseContent>
          </DashShell>
        } />

        <Route path="/progress" element={
          <DashShell>
            <CourseContent><ProgressPage /></CourseContent>
          </DashShell>
        } />

        <Route path="/activity" element={
          <DashShell><ActivityPage /></DashShell>
        } />

        <Route path="/certificate" element={
          <DashShell><CertificatePage /></DashShell>
        } />

        <Route path="/practice-exam" element={
          <DashShell>
            <CourseContent><ChapterPracticeExamPage /></CourseContent>
          </DashShell>
        } />

        {/* ── Syllabus drill-down — stays in DashboardShell ─── */}
        {/* Internal navigate() calls use /:year/... so these   */}
        {/* routes keep the user in the EduFlow shell throughout */}
        <Route path="/:year" element={
          <DashShell>
            <CourseContent><YearPage /></CourseContent>
          </DashShell>
        } />
        <Route path="/:year/:subject" element={
          <DashShell>
            <CourseContent><SubjectPage /></CourseContent>
          </DashShell>
        } />
        <Route path="/:year/:subject/:category" element={
          <DashShell>
            <CourseContent><LessonListPage /></CourseContent>
          </DashShell>
        } />
        <Route path="/:year/:subject/:category/:lesson" element={
          <DashShell>
            <CourseContent><LessonDetailPage /></CourseContent>
          </DashShell>
        } />
        <Route path="/:year/:subject/:category/:lesson/:section" element={
          <DashShell>
            <CourseContent><SectionPage /></CourseContent>
          </DashShell>
        } />

        <Route path="*" element={
          <DashShell>
            <CourseContent><NotFound /></CourseContent>
          </DashShell>
        } />

      </Routes>
    </BrowserRouter>
  )
}
