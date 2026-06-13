interface LogoProps {
  /** Rendered height in px. Width scales with the viewBox ratio. */
  size?: number;
  className?: string;
  /** Stroke colour. Defaults to currentColor so text-* utilities work. */
  title?: string;
}

/**
 * The "x³" brand mark — a hand-lettered italic "x" with a superscript "3",
 * recreated as stylized SVG strokes in the spirit of the Cormorant italic
 * letterform. Bold, ink-black, treated like a fashion-house monogram.
 *
 * Uses `currentColor`, so colour is controlled by the parent's text-* class.
 */
export default function Logo({
  size = 32,
  className,
  title = "X3 Kuaför",
}: LogoProps) {
  // viewBox is 110 x 100; height drives the on-screen size.
  const width = (size * 110) / 100;

  return (
    <svg
      width={width}
      height={size}
      viewBox="0 0 110 100"
      fill="none"
      role="img"
      aria-label={title}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>
      {/* Italic "x" — two crossing brush strokes, gently skewed for lean */}
      <g
        stroke="currentColor"
        strokeWidth={12}
        strokeLinecap="round"
        transform="skewX(-9)"
      >
        <path d="M30 33 Q 44 56 58 87" />
        <path d="M66 33 Q 48 56 30 87" />
      </g>
      {/* Superscript "3" */}
      <path
        d="M70 17 Q 86 9 86 22 Q 86 30 76 30 Q 88 30 88 41 Q 88 54 70 47"
        stroke="currentColor"
        strokeWidth={8}
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
