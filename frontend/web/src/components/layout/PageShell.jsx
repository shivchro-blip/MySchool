import PropTypes  from 'prop-types'
import { motion } from 'framer-motion'
import BottomNav  from './BottomNav'
import Sidebar    from './Sidebar'

export default function PageShell({
  children,
  topBar,
  showNav   = true,
  noPad     = false,
  className = '',
}) {
  return (
    <div className="min-h-dvh flex bg-bg">

      {showNav && (
        <div className="hidden min-[900px]:flex">
          <Sidebar collapsed={false} />
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {topBar}

        <motion.main
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className={`
            flex-1 w-full mx-auto max-w-4xl
            ${noPad ? '' : 'px-4 min-[900px]:px-8 pt-5'}
            ${showNav ? 'pb-24 min-[900px]:pb-10' : 'pb-6'}
            ${className}
          `}
        >
          {children}
        </motion.main>

        {showNav && <BottomNav />}
      </div>
    </div>
  )
}

PageShell.propTypes = {
  children:  PropTypes.node.isRequired,
  topBar:    PropTypes.node,
  showNav:   PropTypes.bool,
  noPad:     PropTypes.bool,
  className: PropTypes.string,
}
