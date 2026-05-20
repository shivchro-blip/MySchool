import { api } from './client'

export async function explainTopic({ chapterId, topicId, question, language }) {
  return api.post('/learning/explain', {
    chapter_id: chapterId,
    topic_id:   topicId || null,
    question:   question || '',
    language:   language || 'en',
  })
}

export async function getChapterContent(chapterId, chunkType = null) {
  const query = chunkType ? `?chunk_type=${chunkType}` : ''
  return api.get(`/learning/content/${chapterId}${query}`)
}
