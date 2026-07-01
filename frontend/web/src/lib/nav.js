/**
 * Navigation helpers
 * Builds URLs and breadcrumbs from slug parameters.
 * Keeps URL logic in one place — not scattered across components.
 */

export function buildPath(year, subject, category, lesson, section) {
  const parts = [year, subject, category, lesson, section].filter(Boolean)
  return '/' + parts.join('/')
}

export function buildBreadcrumbs(year, subject, category, lesson, section, syllabus) {
  const crumbs = [{ label: 'Courses', to: '/courses' }]

  if (year) {
    crumbs.push({
      label: syllabus[year]?.label || year,
      to:    `/${year}`,
    })
  }
  if (subject) {
    const s = syllabus[year]?.subjects?.[subject]
    crumbs.push({
      label: s?.label || subject,
      to:    `/${year}/${subject}`,
    })
  }
  const subjObj = syllabus[year]?.subjects?.[subject]
  if (category) {
    const c = subjObj?.categories?.[category]
    // Chapter-based subjects (e.g. Maths) use a synthetic 'chapters' segment with
    // no real category — skip the crumb rather than show the raw slug.
    if (c) {
      crumbs.push({
        label: c.label,
        to:    `/${year}/${subject}/${category}`,
      })
    }
  }
  if (lesson) {
    const catLessons = subjObj?.categories?.[category]?.lessons || []
    const chapters   = subjObj?.chapters || []
    const l = catLessons.find(x => x.slug === lesson) || chapters.find(x => x.slug === lesson)
    crumbs.push({
      label: l?.title || lesson,
      to:    `/${year}/${subject}/${category}/${lesson}`,
    })
  }
  if (section) {
    crumbs.push({
      label: section.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
      to:    null,
    })
  }

  return crumbs
}
