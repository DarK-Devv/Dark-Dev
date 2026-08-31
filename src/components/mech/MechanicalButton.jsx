import AlienGlyph from './AlienGlyph';
import './MechanicalButton.css';

/**
 * Chamfered machine-control button/link. Hover triggers an energy-line
 * sweep plus a small glyph fade-in beside the label, per the brief's
 * "hovering feels like activating a control" requirement.
 */
export default function MechanicalButton({
  as,
  href,
  onClick,
  variant = 'primary', // 'primary' | 'ghost'
  glyph = 'a6',
  className = '',
  children,
  ...rest
}) {
  const Tag = as || (href ? 'a' : 'button');
  return (
    <Tag
      href={href}
      onClick={onClick}
      className={`mbtn mbtn--${variant} ${className}`}
      data-cursor="glyph"
      {...rest}
    >
      <span className="mbtn__sweep" aria-hidden="true" />
      {children}
      <AlienGlyph variant={glyph} size={14} className="mbtn__glyph" />
    </Tag>
  );
}
