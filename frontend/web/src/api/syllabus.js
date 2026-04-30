import { api } from './client'

export async function getSubjects() {
  return api.get('/syllabus/subjects')
}

export async function getChapters(subjectId) {
  return api.get(`/syllabus/subjects/${subjectId}/chapters`)
}

export async function getTopics(chapterId) {
  return api.get(`/syllabus/chapters/${chapterId}/topics`)
}

export async function getQuestions(chapterId, marks = null) {
  const query = marks ? `?marks=${marks}` : ''
  return api.get(`/syllabus/chapters/${chapterId}/questions${query}`)
}
