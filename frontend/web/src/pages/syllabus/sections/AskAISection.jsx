import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { explainTopic } from '../../../api/learning'
import { Button, Input, Card, Badge } from '../../../components/ui'

const QUICK_QUESTIONS = [
  'What is the theme of this lesson?',
  'Who is the main character?',
  'What is the summary?',
  'What are the key points for exam?',
]

export default function AskAISection({ lessonTitle, chapterId }) {
  const [question, setQ]       = useState('')
  const [language, setLang]    = useState('en')
  const [result,   setResult]  = useState(null)
  const [loading,  setLoading] = useState(false)
  const [error,    setError]   = useState('')

  async function handleAsk(q) {
    const prompt = q || question.trim()
    if (!prompt) return
    setLoading(true)
    setError('')
    setResult(null)

    try {
      if (!chapterId) {
        await new Promise(r => setTimeout(r, 800))
        setResult({
          explanation: `This is a simulated response for "${lessonTitle}". Once the content pipeline has processed this lesson and the chapter ID is mapped in the syllabus registry, this will return real AI explanations from your local Ollama model.`,
          key_points: [
            'Connect chapterId in syllabus.js to enable real AI responses',
            'Run the content pipeline for this chapter first',
            'Validate the content chunks in the admin panel',
          ],
          exam_tip: 'Tip: Questions about themes and characters are most common in board exams.',
          model_used: 'preview',
          source_chunks: 0,
          cached: false,
        })
        return
      }
      const data = await explainTopic({ chapterId, question: prompt, language })
      setResult(data)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      {/* Quick question chips */}
      <div>
        <p className="text-xs font-semibold text-ink-3 mb-2.5">
          Quick questions
        </p>
        <div className="flex flex-wrap gap-2">
          {QUICK_QUESTIONS.map(q => (
            <button
              key={q}
              onClick={() => { setQ(q); handleAsk(q) }}
              className="px-3 py-1.5 bg-bg-2 border border-line
                         rounded-full text-xs font-medium text-ink-2
                         hover:border-accent hover:text-accent
                         transition-colors"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Custom question */}
      <div className="flex gap-2">
        <Input
          placeholder="Ask anything about this lesson..."
          value={question}
          onChange={e => setQ(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleAsk()}
          className="flex-1"
        />
        <Button
          onClick={() => handleAsk()}
          disabled={!question.trim() || loading}
        >
          {loading ? '…' : <><Sparkles size={15} /> Ask</>}
        </Button>
      </div>

      {/* Language toggle */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-ink-3">Respond in:</span>
        <div className="flex bg-bg-sunk rounded-lg p-0.5 text-xs">
          {[['en', 'English'], ['ta', 'தமிழ்']].map(([val, label]) => (
            <button
              key={val}
              onClick={() => setLang(val)}
              className={`
                px-3 py-1 rounded-md font-semibold transition-all
                ${language === val ? 'bg-bg-2 text-ink shadow-sm' : 'text-ink-3'}
              `}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <p className="text-sm text-danger bg-pos-soft px-3 py-2 rounded-lg">
          {error}
        </p>
      )}

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <Card padding="lg">
              <p className="text-xs font-bold text-ink-4 uppercase tracking-wide mb-2">
                Explanation
              </p>
              <p className="text-sm text-ink-2 leading-relaxed">
                {result.explanation}
              </p>
            </Card>

            {result.key_points?.length > 0 && (
              <Card padding="md">
                <p className="text-xs font-bold text-ink-4 uppercase tracking-wide mb-2.5">
                  Key Points
                </p>
                <div className="space-y-2">
                  {result.key_points.map((pt, i) => (
                    <div key={i} className="flex gap-2.5 items-start">
                      <div className="w-5 h-5 rounded-full bg-brand-teal-soft flex
                                      items-center justify-center text-[10px]
                                      font-bold text-brand-teal shrink-0 mt-0.5">
                        {i + 1}
                      </div>
                      <p className="text-sm text-ink-2">{pt}</p>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {result.exam_tip && (
              <div className="flex gap-3 bg-warn-soft border border-line-soft
                              rounded-[14px] p-3.5">
                <span className="text-lg shrink-0">💡</span>
                <p className="text-sm text-warn">{result.exam_tip}</p>
              </div>
            )}

            <div className="flex items-center gap-2">
              <Badge variant="gray">{result.model_used}</Badge>
              {result.cached && <Badge variant="blue">Cached</Badge>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
