export function classLevelToYearKey(classLevel) {
  if (classLevel === '+1') return 'plus1'
  if (classLevel === '+2') return 'plus2'
  return null
}

export function getAllowedYearKey(profile) {
  return classLevelToYearKey(profile?.class_level)
}

export function isSubjectAllowed(profile, slug) {
  const subs = profile?.subjects
  return !subs?.length || subs.includes(slug)
}
