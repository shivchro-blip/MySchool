import PropTypes from 'prop-types'

const borderMap = {
  left:  'border-l border-line-soft',
  right: 'border-r border-line-soft',
  none:  '',
}

export default function RailPanel({
  width,
  border    = 'none',
  padding   = '',
  children,
  className = '',
}) {
  return (
    <div
      className={`flex flex-col overflow-y-auto shrink-0 ${borderMap[border] || ''} ${padding} ${className}`}
      style={{ width }}
    >
      {children}
    </div>
  )
}

RailPanel.propTypes = {
  width:     PropTypes.string.isRequired,
  border:    PropTypes.oneOf(['left', 'right', 'none']),
  padding:   PropTypes.string,
  children:  PropTypes.node,
  className: PropTypes.string,
}
