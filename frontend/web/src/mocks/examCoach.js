// TODO: wire to real Supabase auth user
export const mockUser = {
  name:       'Student',
  classLevel: 'XI',
  boardLabel: 'TN Board',
  initials:   'S',
}

const _progress = {
  streakDays:   0,
  avgScore:     0,
  chaptersDone: 0,
  goalMinutes:  30,
  todayMinutes: 0,
}

// TODO: wire to real progress API
export function getProgress() {
  return _progress
}

// TODO: wire to last-viewed chapter from API
export function getContinueChapter() {
  return {
    id:          'ch-1',
    slug:        'a-photograph',
    title:       'A Photograph',
    content_type: 'poem',
    number:      1,
    progressPct: 45,
  }
}

// TODO: wire to spaced-repetition API
export function getReviewCards() {
  return ['Stilled', 'Transient', 'Labrador', 'Paddling', 'Terribly']
}
