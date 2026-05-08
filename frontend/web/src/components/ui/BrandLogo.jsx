// BRAND LOGO CONFIG — update here to change logo globally
import logoSrc from '../../assets/School_Brand_Logo.png';

const DEFAULTS = {
  full: { height: 120 },
  compact: { height: 36 },
};

/**
 * BrandLogo — single source of truth for the Study Coach logo.
 * Props:
 *   height    (number)  — px height; width auto-scales. Default: 120
 *   variant   ('full' | 'compact') — preset sizes; overridden by explicit height
 *   className (string)  — extra Tailwind/CSS classes
 *   style     (object)  — inline style overrides
 */
export default function BrandLogo({ height, variant = 'full', className = '', style = {} }) {
  const h = height ?? DEFAULTS[variant]?.height ?? DEFAULTS.full.height;
  return (
    <img
      src={logoSrc}
      alt="Study Coach"
      height={h}
      style={{ height: h, width: 'auto', objectFit: 'contain', display: 'block', ...style }}
      className={className}
    />
  );
}
