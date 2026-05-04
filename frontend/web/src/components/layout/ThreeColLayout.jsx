import PropTypes from 'prop-types'

export default function ThreeColLayout({ leftWidth, rightWidth, children, className = '' }) {
  const [left, center, right] = Array.isArray(children) ? children : [children]
  return (
    <div className={`flex flex-row ${className}`}>
      <div style={{ width: leftWidth, flexShrink: 0 }}>{left}</div>
      <div className="flex-1 min-w-0">{center}</div>
      {right && <div style={{ width: rightWidth, flexShrink: 0 }}>{right}</div>}
    </div>
  )
}

ThreeColLayout.propTypes = {
  leftWidth:  PropTypes.string.isRequired,
  rightWidth: PropTypes.string,
  children:   PropTypes.node.isRequired,
  className:  PropTypes.string,
}
