import PropTypes from 'prop-types'

export default function TwoColLayout({ leftWidth, children, className = '' }) {
  const [left, right] = Array.isArray(children) ? children : [children]
  return (
    <div className={`flex flex-row ${className}`}>
      <div style={{ width: leftWidth, flexShrink: 0 }}>{left}</div>
      <div className="flex-1 min-w-0">{right}</div>
    </div>
  )
}

TwoColLayout.propTypes = {
  leftWidth: PropTypes.string.isRequired,
  children:  PropTypes.node.isRequired,
  className: PropTypes.string,
}
