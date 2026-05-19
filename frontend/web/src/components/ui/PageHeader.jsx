import PageTitle from './PageTitle'
import Eyebrow from './Eyebrow'

export default function PageHeader({ breadcrumb, eyebrow, categoryEyebrow, title, subtitle, className = '' }) {
  return (
    <div className={`mb-8 ${className}`}>
      {breadcrumb && (
        <div className="mb-6">{breadcrumb}</div>
      )}
      {!breadcrumb && eyebrow && (
        <Eyebrow style={{ marginBottom: 12 }}>{eyebrow}</Eyebrow>
      )}
      {categoryEyebrow && (
        <Eyebrow style={{ marginBottom: 12, color: categoryEyebrow.color }}>{categoryEyebrow.label}</Eyebrow>
      )}
      <PageTitle>{title}</PageTitle>
      {subtitle && (
        <p className="text-base text-text-muted font-normal mt-1.5">{subtitle}</p>
      )}
    </div>
  )
}
