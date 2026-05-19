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
  if (category) {
    const c = syllabus[year]?.subjects?.[subject]?.categories?.[category]
    crumbs.push({
      label: c?.label || category,
      to:    `/${year}/${subject}/${category}`,
    })
  }
  if (lesson) {
    const lessons = syllabus[year]?.subjects?.[subject]?.categories?.[category]?.lessons || []
    const l = lessons.find(x => x.slug === lesson)
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
