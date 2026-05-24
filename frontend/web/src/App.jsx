import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { isLoggedIn } from './api/auth'
import { getCachedProfile } from './api/users'

import LoginPage        from './pages/LoginPage'
import AuthCallbackPage from './pages/AuthCallbackPage'
import OnboardingPage   from './pages/OnboardingPage'
import ProgressPage     from './pages/ProgressPage'
import DashboardPage    from './pages/DashboardPage'
import CoursesIndexPage from './pages/CoursesIndexPage'
import ActivityPage     from './pages/ActivityPage'
import CertificatePage  from './pages/CertificatePage'
import PrivacyPage      from './pages/PrivacyPage'
import TermsPage        from './pages/TermsPage'
import ContactPage      from './pages/ContactPage'

import DashboardShell from './components/layout/DashboardShell'
import CookieBanner   from './components/CookieBanner'

import YearPage         from './pages/syllabus/YearPage'
import SubjectPage      from './pages/syllabus/SubjectPage'
import LessonListPage   from './pages/syllabus/LessonListPage'
import LessonDetailPage         from './pages/syllabus/LessonDetailPage'
import SectionPage              from './pages/syllabus/SectionPage'
import NotFound                 from './pages/syllabus/NotFound'
import ChapterPracticeExamPage  from './pages/ChapterPracticeExamPage'
import FinalExamPrepPage        from './pages/syllabus/FinalExamPrepPage'
import ExamPaperViewerPage      from './pages/ExamPaperViewerPage'
import ExamPaperPracticePage    from './pages/ExamPaperPracticePage'

function Guard({ children }) {
  const location = useLocation()
  const [state, setState] = useState({ loading: true, profile: null })
  const loggedIn = isLoggedIn()

  useEffect(() => {
    if (!loggedIn) return
    getCachedProfile()
      .then(profile => setState({ loading: false, profile }))
  }, [loggedIn])

  if (!loggedIn) {
    return <Navigate to="/login" replace />
  }

  if (state.loading) {
    return (
      <div className="min-h-screen bg-bg-canvas flex items-center justify-center">
        <div className="text-text-muted text-sm">Loading…</div>
      </div>
    )
  }

  const onboarded = state.profile?.onboarding_completed === true

  if (location.pathname === '/onboarding') {
    if (onboarded) return <Navigate to="/" replace />
    return children
  }

  if (!onboarded) {
    return <Navigate to="/onboarding" replace />
  }

  return children
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
    <div style={{ padding: '16px 20px 96px' }}>
      {children}
    </div>
  )
}

export default function App() {
  const [authKey, setAuthKey] = useState(0)

  useEffect(() => {
    function onStorage(e) {
      if (e.key === 'exam_coach_token') setAuthKey(k => k + 1)
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  return (
    <BrowserRouter>
      <CookieBanner />
      <Routes key={authKey}>

        <Route path="/login"          element={<LoginPage />} />
        <Route path="/auth/callback"  element={<AuthCallbackPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms"   element={<TermsPage />} />
        <Route path="/contact" element={<ContactPage />} />

        <Route path="/onboarding" element={
          <Guard><OnboardingPage /></Guard>
        } />

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
        <Route path="/plus1/english/final-exam-prep" element={
          <DashShell>
            <CourseContent><FinalExamPrepPage /></CourseContent>
          </DashShell>
        } />
        <Route path="/plus1/english/final-exam-prep/paper/:paperId" element={
          <DashShell><ExamPaperViewerPage /></DashShell>
        } />
        <Route path="/plus2/english/final-exam-prep" element={
          <DashShell>
            <CourseContent><FinalExamPrepPage classLevel="plus2" subjectSlug="english" /></CourseContent>
          </DashShell>
        } />
        <Route path="/plus2/english/final-exam-prep/paper/:paperId" element={
          <DashShell><ExamPaperViewerPage backPath="/plus2/english/final-exam-prep" /></DashShell>
        } />
        <Route path="/plus1/english/exam/:examYear" element={
          <DashShell>
            <CourseContent><ExamPaperPracticePage classLevel="plus1" /></CourseContent>
          </DashShell>
        } />
        <Route path="/plus2/english/exam/:examYear" element={
          <DashShell>
            <CourseContent><ExamPaperPracticePage classLevel="plus2" /></CourseContent>
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
