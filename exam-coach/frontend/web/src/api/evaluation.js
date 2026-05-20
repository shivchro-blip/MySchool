import { api } from './client'

export async function submitAnswer({ questionId, studentAnswer, attemptNumber }) {
  return api.post('/evaluation/submit', {
    question_id:    questionId,
    student_answer: studentAnswer,
    attempt_number: attemptNumber || 1,
  })
}

export async function retryAnswer({ responseId, newAnswer }) {
  return api.post('/evaluation/retry', {
    response_id: responseId,
    new_answer:  newAnswer,
  })
}

export async function getProgress() {
  return api.get('/evaluation/progress')
}

export async function getHistory(limit = 20) {
  return api.get(`/evaluation/history?limit=${limit}`)
}
