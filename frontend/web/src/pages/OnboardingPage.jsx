import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, GraduationCap, Check, BookOpen, Calculator, FlaskConical, Monitor, Code } from 'lucide-react'
import { completeOnboarding, invalidateProfileCache } from '../api/users'

const SUBJECTS = [
  { slug: 'english', name: 'English',     Icon: BookOpen,     bg: '#E6F4F2', color: '#2A7B6F' },
  { slug: 'maths',   name: 'Mathematics', Icon: Calculator,   bg: '#EEEFF9', color: '#5C6BC0' },
  { slug: 'computer-applications', name: 'Computer Applications', Icon: Monitor, bg: '#EAF1FB', color: '#1B4B82' },
  { slug: 'computer-applications-tamil', name: 'Computer Applications (தமிழ்)', Icon: Monitor, bg: '#E8F5E9', color: '#2E7D32' },
  { slug: 'computer-science', name: 'Computer Science', Icon: Code, bg: '#EDF2FB', color: '#3B5BDB' },
  { slug: 'computer-science-tamil', name: 'Computer Science (தமிழ்)', Icon: Code, bg: '#E8EAF6', color: '#3949AB' },
  { slug: 'science', name: 'Science',     Icon: FlaskConical, bg: '#FBEEE0', color: '#D97020' },
]

const CLASSES = [
  { value: '+1', label: 'Class 11', sub: 'Junior year', bg: '#E7FAFA', border: '#2EC4B6', color: '#2EC4B6' },
  { value: '+2', label: 'Class 12', sub: 'Senior year', bg: '#F0EBFE', border: '#9B72F0', color: '#9B72F0' },
]

const stepVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] } },
  exit:    { opacity: 0, y: -12, transition: { duration: 0.15 } },
}

function ProgressBar({ progress }) {
  return (
    <div className="h-1 rounded-full bg-surface-alt overflow-hidden mb-6">
      <div
        className="h-full rounded-full bg-brand-teal transition-[width] duration-500"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}

function CtaButton({ children, onClick, disabled, loading }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className="w-full py-3 rounded-button font-semibold text-sm text-white
                 bg-brand-teal hover:bg-brand-teal-hover
                 transition-colors duration-150
                 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? '…' : children}
    </button>
  )
}

function ClassPicker({ classLevel, setClassLevel, onNext }) {
  return (
    <div className="bg-surface rounded-card border border-border-soft shadow-card p-8">
      <ProgressBar progress={50} />
      <p className="text-xs font-semibold text-text-faint uppercase tracking-widest mb-3">
        Step 1 of 2
      </p>
      <h1 className="text-2xl font-bold text-text-primary mb-2">
        Which class are you in?
      </h1>
      <p className="text-sm text-text-secondary mb-6">
        We'll tailor your lessons to your year.
      </p>

      <div className="grid grid-cols-2 gap-3 mb-8">
        {CLASSES.map(cls => {
          const sel = classLevel === cls.value
          return (
            <button
              key={cls.value}
              onClick={() => setClassLevel(cls.value)}
              className="relative text-left p-5 rounded-card transition-all duration-150 focus:outline-none"
              style={sel
                ? { background: cls.bg, border: `2px solid ${cls.border}` }
                : { background: 'var(--bg-surface)', border: '2px solid var(--border-strong)' }
              }
            >
              {sel && (
                <span
                  className="absolute top-3 right-3 w-4 h-4 rounded-full flex items-center justify-center"
                  style={{ background: cls.color }}
                >
                  <Check size={10} color="white" strokeWidth={3} />
                </span>
              )}
              <GraduationCap
                size={22}
                className="mb-3"
                style={{ color: sel ? cls.color : 'var(--text-muted)' }}
              />
              {/* Selected chip sits on a fixed light pastel bg → pin label to a
                  fixed dark ink so it stays legible in dark mode (theme tokens
                  would flip to near-white and vanish). Unselected = theme-aware. */}
              <div
                className="font-semibold text-sm text-text-primary"
                style={sel ? { color: '#1E293B' } : undefined}
              >{cls.label}</div>
              <div
                className="text-xs text-text-secondary mt-0.5"
                style={sel ? { color: '#475569' } : undefined}
              >{cls.sub}</div>
            </button>
          )
        })}
      </div>

      <CtaButton onClick={onNext} disabled={!classLevel}>
        Continue
      </CtaButton>
    </div>
  )
}

function SubjectPicker({ subjects, toggleSubject, loading, error, onBack, onFinish }) {
  return (
    <div className="bg-surface rounded-card border border-border-soft shadow-card p-8">
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary
                   transition-colors duration-150 mb-5 focus:outline-none"
      >
        <ArrowLeft size={16} />
        Back
      </button>

      <ProgressBar progress={100} />
      <p className="text-xs font-semibold text-text-faint uppercase tracking-widest mb-3">
        Step 2 of 2
      </p>
      <h1 className="text-2xl font-bold text-text-primary mb-2">
        Pick your subjects
      </h1>
      <p className="text-sm text-text-secondary mb-6">
        Choose one or more. You can add more later.
      </p>

      <div className="flex flex-col gap-2 mb-6">
        {SUBJECTS.map(subj => {
          const sel = subjects.includes(subj.slug)
          return (
            <button
              key={subj.slug}
              onClick={() => toggleSubject(subj.slug)}
              className="flex items-center gap-4 w-full p-4 rounded-button text-left
                         transition-all duration-150 focus:outline-none"
              style={sel
                ? { background: subj.bg, border: `1.5px solid ${subj.color}` }
                : { background: 'var(--bg-surface)', border: '1.5px solid var(--border-strong)' }
              }
            >
              <span
                className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center"
                style={{ background: subj.bg, color: subj.color }}
              >
                <subj.Icon size={18} />
              </span>
              <span
                className="flex-1 text-sm text-text-primary"
                style={{ fontWeight: sel ? 600 : 400, color: sel ? '#1E293B' : undefined }}
              >
                {subj.name}
              </span>
              {sel && (
                <Check size={16} style={{ color: subj.color }} strokeWidth={2.5} />
              )}
            </button>
          )
        })}
      </div>

      {error && (
        <p className="text-sm text-danger mb-4">{error}</p>
      )}

      <CtaButton onClick={onFinish} disabled={subjects.length === 0} loading={loading}>
        Finish setup
      </CtaButton>
    </div>
  )
}

function SuccessScreen({ classLevel, subjects, onDone }) {
  const cls = CLASSES.find(c => c.value === classLevel)
  const selectedSubjects = SUBJECTS.filter(s => subjects.includes(s.slug))
  const romanClass = classLevel === '+1' ? 'XI' : 'XII'

  return (
    <div className="bg-surface rounded-card border border-border-soft shadow-card p-8 text-center">
      <div
        className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6"
        style={{ background: 'var(--brand-teal-soft)' }}
      >
        <Check size={40} style={{ color: 'var(--brand-teal)' }} strokeWidth={2.5} />
      </div>

      <h1 className="text-2xl font-bold text-text-primary mb-2">You're all set!</h1>
      <p className="text-sm text-text-secondary mb-6">
        Your learning space is ready. Here's what we've unlocked for you:
      </p>

      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {cls && (
          <span
            className="px-3 py-1.5 rounded-pill text-sm font-semibold"
            style={{ background: cls.bg, color: cls.color }}
          >
            Class {romanClass}
          </span>
        )}
        {selectedSubjects.map(subj => (
          <span
            key={subj.slug}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-pill text-sm font-medium"
            style={{ background: subj.bg, color: subj.color }}
          >
            <subj.Icon size={14} />
            {subj.name}
          </span>
        ))}
      </div>

      <CtaButton onClick={onDone}>
        Go to my dashboard
      </CtaButton>
    </div>
  )
}

export default function OnboardingPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [classLevel, setClassLevel] = useState(null)
  const [subjects, setSubjects] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function toggleSubject(slug) {
    setSubjects(prev =>
      prev.includes(slug) ? prev.filter(s => s !== slug) : [...prev, slug]
    )
  }

  async function handleFinish() {
    setLoading(true)
    setError('')
    try {
      await completeOnboarding({ classLevel, subjects })
      invalidateProfileCache()
      setStep(3)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-page-bg flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-[480px]">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" variants={stepVariants} initial="initial" animate="animate" exit="exit">
              <ClassPicker
                classLevel={classLevel}
                setClassLevel={setClassLevel}
                onNext={() => setStep(2)}
              />
            </motion.div>
          )}
          {step === 2 && (
            <motion.div key="step2" variants={stepVariants} initial="initial" animate="animate" exit="exit">
              <SubjectPicker
                subjects={subjects}
                toggleSubject={toggleSubject}
                loading={loading}
                error={error}
                onBack={() => setStep(1)}
                onFinish={handleFinish}
              />
            </motion.div>
          )}
          {step === 3 && (
            <motion.div key="step3" variants={stepVariants} initial="initial" animate="animate" exit="exit">
              <SuccessScreen
                classLevel={classLevel}
                subjects={subjects}
                onDone={() => navigate('/', { replace: true })}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
