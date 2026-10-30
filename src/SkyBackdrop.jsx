// Full-screen sky behind the home-page photo. Its colours are sampled from the photo's
// own left and right edges (every 5% of the height), so the sky continues seamlessly
// out of the photo. Procedural cloud bands add texture at the photo's level of focus.

const LEFT_EDGE = [
  '#73241a', '#81271a', '#932b1a', '#a9301a', '#c3381a', '#f0771a', '#ea671a',
  '#cb381a', '#e44e1a', '#e34a1a', '#e0461a', '#e1451a', '#db421a', '#d83e1a',
  '#d73c1a', '#74211a', '#67221b', '#2d1b1a', '#221c1a', '#231c1a', '#201b1a',
]

const RIGHT_EDGE = [
  '#c33c19', '#b43119', '#e76a19', '#ec7c19', '#ed7319', '#eb6d19', '#ed7c19',
  '#ed7c19', '#eb7318', '#e96819', '#e75f18', '#e35619', '#d94a19', '#d74518',
  '#d54319', '#7f2319', '#6e2219', '#2f1b1a', '#2a1e1b', '#1f1b1a', '#221c1a',
]

function EdgeGradient({ id, colors }) {
  return (
    <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
      {colors.map((c, i) => (
        <stop key={i} offset={`${i * 5}%`} stopColor={c} />
      ))}
    </linearGradient>
  )
}

function SkyBackdrop() {
  return (
    <svg className="sky" width="100%" height="100%" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <EdgeGradient id="sky-left" colors={LEFT_EDGE} />
        <EdgeGradient id="sky-right" colors={RIGHT_EDGE} />

        {/* blend from the left-edge colours to the right-edge colours across the screen */}
        <linearGradient id="sky-blend" x1="0" y1="0" x2="1" y2="0">
          <stop offset="35%" stopColor="#000" />
          <stop offset="65%" stopColor="#fff" />
        </linearGradient>
        <mask id="sky-right-mask">
          <rect width="100%" height="100%" fill="url(#sky-blend)" />
        </mask>

        {/* clouds only in the sky, fading out above the hills */}
        <linearGradient id="sky-cloud-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff" />
          <stop offset="62%" stopColor="#fff" />
          <stop offset="74%" stopColor="#000" />
        </linearGradient>
        <mask id="sky-cloud-mask">
          <rect width="100%" height="100%" fill="url(#sky-cloud-fade)" />
        </mask>

        {/* Stretched fractal noise gives long horizontal cloud bands. The colour matrix
            turns bright noise into glowing golden cloud edges and dark noise into
            smoky red cloud bodies, like the photo's sky. */}
        <filter id="sky-clouds-light" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.0022 0.0105" numOctaves="5" seed="12" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1   0 0 0 0 0.64   0 0 0 0 0.16   4.2 0 0 0 -2.35"
          />
          <feGaussianBlur stdDeviation="2.5" />
        </filter>
        <filter id="sky-clouds-dark" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.0018 0.009" numOctaves="5" seed="4" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.42   0 0 0 0 0.09   0 0 0 0 0.04   -4.4 0 0 0 1.95"
          />
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>

      <rect width="100%" height="100%" fill="url(#sky-left)" />
      <rect width="100%" height="100%" fill="url(#sky-right)" mask="url(#sky-right-mask)" />

      <g mask="url(#sky-cloud-mask)">
        <rect width="100%" height="100%" filter="url(#sky-clouds-dark)" opacity="0.55" />
        <rect width="100%" height="100%" filter="url(#sky-clouds-light)" opacity="0.45" />
      </g>
    </svg>
  )
}

export default SkyBackdrop
