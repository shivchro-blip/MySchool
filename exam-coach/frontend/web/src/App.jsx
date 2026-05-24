import { useEffect, useState, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { isLoggedIn } from './api/auth'
import { getCachedProfile } from './api/users'

import DashboardShell from './components/layout/DashboardShell'
import CookieBanner   from './components/CookieBanner'
import PageLoader     from './components/ui/PageLoader'

const LoginPage        = lazy(() => import('./pages/LoginPage'))
const AuthCallbackPage = lazy(() => import('./pages/AuthCallbackPage'))
const OnboardingPage   = lazy(() => import('./pages/OnboardingPage'))
const ProgressPage     = lazy(() => import('./pages/ProgressPage'))
const DashboardPage    = lazy(() => import('./pages/DashboardPage'))
const CoursesIndexPage = lazy(() => import('./pages/CoursesIndexPage'))
const AssignmentsPage  = lazy(() => import('./pages/AssignmentsPage'))
const ActivityPage     = lazy(() => import('./pages/ActivityPage'))
const CertificatePage  = lazy(() => import('./pages/CertificatePage'))
const MessagesPage     = lazy(() => import('./pages/MessagesPage'))
const PrivacyPage      = lazy(() => import('./pages/PrivacyPage'))
const TermsPage        = lazy(() => import('./pages/TermsPage'))
const ContactPage      = lazy(() => import('./pages/ContactPage'))

const YearPage                = lazy(() => import('./pages/syllabus/YearPage'))
const SubjectPage             = lazy(() => import('./pages/syllabus/SubjectPage'))
const LessonListPage          = lazy(() => import('./pages/syllabus/LessonListPage'))
const LessonDetailPage        = lazy(() => import('./pages/syllabus/LessonDetailPage'))
const SectionPage             = lazy(() => import('./pages/syllabus/SectionPage'))
const NotFound                = lazy(() => import('./pages/syllabus/NotFound'))
const ChapterPracticeExamPage = lazy(() => import('./pages/ChapterPracticeExamPage'))
const FinalExamPrepPage       = lazy(() => import('./pages/syllabus/FinalExamPrepPage'))
const ExamPaperViewerPage     = lazy(() => import('./pages/ExamPaperViewerPage'))
const ExamPaperPracticePage   = lazy(() => import('./pages/ExamPaperPracticePage'))
const ModelExamPracticePage   = lazy(() => import('./pages/ModelExamPracticePage'))

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
    return <PageLoader />
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
      <DashboardShell>
        <Suspense fallback={<div className="flex items-center justify-center py-24"><div className="w-7 h-7 border-2 border-accent border-t-transparent rounded-full animate-spin" /></div>}>
          {children}
        </Suspense>
      </DashboardShell>
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

function LegacyCourseRedirect({ year }) {
  const { pathname, search, hash } = useLocation()
  const rest = pathname.slice(`/${year}`.length)
  return <Navigate to={`/courses/${year}${rest}${search}${hash}`} replace />
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
      <Suspense fallback={<PageLoader />}>
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

        <Route path="/assignments" element={
          <DashShell><AssignmentsPage /></DashShell>
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

        <Route path="/messages" element={
          <DashShell><MessagesPage /></DashShell>
        } />

        <Route path="/practice-exam" element={
          <DashShell>
            <CourseContent><ChapterPracticeExamPage /></CourseContent>
          </DashShell>
        } />

        {/* Syllabus drill-down is prefixed so top-level app routes are never captured as a year. */}
        <Route path="/plus1/*" element={<LegacyCourseRedirect year="plus1" />} />
        <Route path="/plus2/*" element={<LegacyCourseRedirect year="plus2" />} />

        <Route path="/courses/:year" element={
          <DashShell>
            <CourseContent><YearPage /></CourseContent>
          </DashShell>
        } />
        <Route path="/courses/:year/:subject" element={
          <DashShell>
            <CourseContent><SubjectPage /></CourseContent>
          </DashShell>
        } />
        <Route path="/courses/plus1/english/final-exam-prep" element={
          <DashShell>
            <CourseContent><FinalExamPrepPage /></CourseContent>
          </DashShell>
        } />
        <Route path="/courses/plus1/english/final-exam-prep/paper/:paperId" element={
          <DashShell><ExamPaperViewerPage /></DashShell>
        } />
        <Route path="/courses/plus2/english/final-exam-prep" element={
          <DashShell>
            <CourseContent><FinalExamPrepPage classLevel="plus2" subjectSlug="english" /></CourseContent>
          </DashShell>
        } />
        <Route path="/courses/plus2/english/final-exam-prep/paper/:paperId" element={
          <DashShell><ExamPaperViewerPage backPath="/courses/plus2/english/final-exam-prep" /></DashShell>
        } />
        <Route path="/courses/plus1/english/exam/:examYear" element={
          <DashShell>
            <CourseContent><ExamPaperPracticePage classLevel="plus1" /></CourseContent>
          </DashShell>
        } />
        <Route path="/courses/plus2/english/exam/:examYear" element={
          <DashShell>
            <CourseContent><ExamPaperPracticePage classLevel="plus2" /></CourseContent>
          </DashShell>
        } />
        <Route path="/courses/plus1/english/model-exam/:modelId" element={
          <DashShell>
            <CourseContent><ModelExamPracticePage classLevel="plus1" /></CourseContent>
          </DashShell>
        } />
        <Route path="/courses/plus2/english/model-exam/:modelId" element={
          <DashShell>
            <CourseContent><ModelExamPracticePage classLevel="plus2" /></CourseContent>
          </DashShell>
        } />
        <Route path="/courses/:year/:subject/:category" element={
          <DashShell>
            <CourseContent><LessonListPage /></CourseContent>
          </DashShell>
        } />
        <Route path="/courses/:year/:subject/:category/:lesson" element={
          <DashShell>
            <CourseContent><LessonDetailPage /></CourseContent>
          </DashShell>
        } />
        <Route path="/courses/:year/:subject/:category/:lesson/:section" element={
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
      </Suspense>
    </BrowserRouter>
  )
}
