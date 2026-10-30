// Backlit Western silhouettes that flank the home-page photo on wide screens.
// Each side is drawn in a 1200×1000 box: the photo edge is at x=1200 for the left
// side and x=0 for the right. The horizon (y≈820) lines up with the photo's hills.
// Outlines are roughened with a noise filter, distant layers are hazier and blurrier,
// and near objects get a thin rim of sunlight on the edge facing the sun.

const NEAR = '#2a0b05'
const MID = '#5a1a09'
const FAR = '#a8360f'

// Small seeded random generator so the "random" vegetation is the same every load.
function random(seed) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// Saguaro: slightly tapered trunk with a rounded top, plus arms that bend smoothly upwards.
// `at` is where an arm leaves the trunk and `up` where its tip ends, both as a fraction
// of trunk height measured from the ground; `out` is how far it reaches, in trunk widths.
function saguaro(x, base, h, w, arms) {
  const top = base - h
  const trunk =
    `M${x - w / 2} ${base} L${x - w * 0.46} ${top + w * 0.55} ` +
    `Q${x - w * 0.42} ${top - w * 0.05} ${x} ${top - w * 0.08} ` +
    `Q${x + w * 0.42} ${top - w * 0.05} ${x + w * 0.46} ${top + w * 0.55} L${x + w / 2} ${base} Z`
  const armPaths = arms.map(({ side, at, out, up }) => {
    const y = base - h * at
    const ax = x + side * w * out
    return (
      `M${x} ${y} C${x + side * w * out * 0.85} ${y + w * 0.45} ` +
      `${ax} ${y + w * 0.1} ${ax} ${y - w * 1.1} L${ax} ${base - h * up}`
    )
  })
  return { trunk, arms: armPaths.join(' '), armWidth: w * 0.78 }
}

function Saguaro({ x, base, h, w, arms, color = NEAR }) {
  const s = saguaro(x, base, h, w, arms)
  return (
    <g>
      <path d={s.trunk} fill={color} />
      <path d={s.arms} fill="none" stroke={color} strokeWidth={s.armWidth} strokeLinecap="round" />
    </g>
  )
}

// Desert scrub: twiggy stems fanning out from the base and a dome of small leaf clusters.
function makeBush(cx, base, w, h, seed) {
  const r = random(seed)
  const twigs = Array.from({ length: 9 }, () => {
    const tx = cx + (r() - 0.5) * w
    const ty = base - h * (0.5 + r() * 0.5)
    return `M${cx + (r() - 0.5) * w * 0.15} ${base} Q${(cx + tx) / 2 + (r() - 0.5) * 10} ${(base + ty) / 2} ${tx} ${ty}`
  }).join(' ')
  const leaves = Array.from({ length: 70 }, () => {
    const a = Math.PI * r()
    const d = Math.sqrt(r())
    return {
      cx: cx + Math.cos(a) * (w / 2) * d,
      cy: base - Math.sin(a) * h * d - 2,
      r: 2 + r() * 5,
    }
  })
  return { twigs, leaves }
}

function makeGrass(x, base, seed, size = 1) {
  const r = random(seed)
  return Array.from({ length: 11 }, () => {
    const a = (r() - 0.5) * 1.4
    const len = (14 + r() * 34) * size
    const tx = x + Math.sin(a) * len + (r() - 0.5) * 6
    const ty = base - Math.cos(a) * len
    return `M${x + (r() - 0.5) * 8} ${base} Q${x + Math.sin(a) * len * 0.3} ${base - len * 0.6} ${tx} ${ty}`
  }).join(' ')
}

function makeStones(x0, x1, y, count, seed) {
  const r = random(seed)
  return Array.from({ length: count }, () => {
    const cx = x0 + r() * (x1 - x0)
    const cy = y + r() * 70
    const size = 2 + r() * 6 * (0.4 + (cy - y) / 70)
    const pts = Array.from({ length: 7 }, (_, i) => {
      const a = (i / 7) * Math.PI * 2
      const rad = size * (0.7 + r() * 0.5)
      return `${(cx + Math.cos(a) * rad * 1.3).toFixed(1)},${(cy + Math.min(0, Math.sin(a)) * rad).toFixed(1)}`
    })
    return pts.join(' ')
  })
}

// Weathered fence: posts of uneven height and lean, barbed wire sagging between them.
function makeFence(xs, seed) {
  const r = random(seed)
  const posts = xs.map((x, i) => {
    const base = 902 - i * 5
    const top = base - 58 + i * 3 - r() * 10
    const lean = (r() - 0.5) * 8
    return { x, base, top, lean }
  })
  const wire = (frac) =>
    posts
      .slice(1)
      .map((p, i) => {
        const a = posts[i]
        const ay = a.top + (a.base - a.top) * frac
        const by = p.top + (p.base - p.top) * frac
        return `M${a.x + a.lean * (1 - frac)} ${ay} Q${(a.x + p.x) / 2} ${(ay + by) / 2 + 7} ${p.x + p.lean * (1 - frac)} ${by}`
      })
      .join(' ')
  return { posts, wires: wire(0.15) + ' ' + wire(0.5) }
}

const LEFT = {
  bushes: [makeBush(880, 908, 130, 46, 11), makeBush(1090, 915, 100, 36, 12), makeBush(745, 896, 80, 28, 13), makeBush(560, 880, 70, 22, 14)],
  grass: [makeGrass(700, 902, 21), makeGrass(1135, 918, 22), makeGrass(250, 880, 23, 0.7), makeGrass(960, 910, 24)],
  stones: makeStones(200, 1150, 880, 12, 31),
}

const RIGHT = {
  bushes: [makeBush(150, 914, 120, 40, 41), makeBush(430, 906, 80, 26, 42), makeBush(700, 908, 110, 34, 43)],
  grass: [makeGrass(80, 918, 51), makeGrass(1010, 902, 52, 0.8), makeGrass(560, 906, 53)],
  stones: makeStones(60, 1100, 878, 10, 61),
  fence: makeFence([470, 556, 645, 730, 822, 910, 1000], 71),
  // windmill sails: 18 narrow blades with a slight twist
  sails: Array.from({ length: 18 }, (_, i) => {
    const a = (i / 18) * Math.PI * 2
    const p = (ang, rad) => `${(322 + Math.cos(ang) * rad).toFixed(1)},${(540 + Math.sin(ang) * rad).toFixed(1)}`
    return [p(a - 0.05, 20), p(a + 0.07, 20), p(a + 0.16, 60), p(a + 0.02, 60)].join(' ')
  }),
}

function Defs({ id, sunSide }) {
  const roughen = (name, freq, scale, blur) => (
    <filter id={`${id}-${name}`} filterUnits="userSpaceOnUse" x="-100" y="-100" width="1400" height="1200">
      <feTurbulence type="fractalNoise" baseFrequency={freq} numOctaves="3" seed="7" result="noise" />
      <feDisplacementMap in="SourceGraphic" in2="noise" scale={scale} xChannelSelector="R" yChannelSelector="G" />
      <feGaussianBlur stdDeviation={blur} />
    </filter>
  )
  return (
    <defs>
      {roughen('far', 0.02, 22, 9)}
      {roughen('mid', 0.03, 16, 4.5)}
      {/* near: slight roughening, soft focus, then a rim of sunlight on the sun-facing edge */}
      <filter id={`${id}-near`} filterUnits="userSpaceOnUse" x="-100" y="-100" width="1400" height="1200">
        <feTurbulence type="fractalNoise" baseFrequency="0.09" numOctaves="2" seed="3" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" xChannelSelector="R" yChannelSelector="G" />
        <feGaussianBlur stdDeviation="1.6" result="soft" />
        <feOffset in="soft" dx={-3 * sunSide} dy="0" result="shifted" />
        <feComposite in="soft" in2="shifted" operator="out" result="edge" />
        <feFlood floodColor="#ff8c2e" floodOpacity="0.32" />
        <feComposite in2="edge" operator="in" />
        <feGaussianBlur stdDeviation="1.2" result="rim" />
        <feMerge>
          <feMergeNode in="soft" />
          <feMergeNode in="rim" />
        </feMerge>
      </filter>
      {/* low ground clutter: same soft focus, no rim light (it sits below the bright horizon) */}
      <filter id={`${id}-low`} filterUnits="userSpaceOnUse" x="-100" y="-100" width="1400" height="1200">
        <feTurbulence type="fractalNoise" baseFrequency="0.09" numOctaves="2" seed="3" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" xChannelSelector="R" yChannelSelector="G" />
        <feGaussianBlur stdDeviation="1.6" />
      </filter>
      <filter id={`${id}-grain`}>
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <linearGradient id={`${id}-ground`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#4a1608" />
        <stop offset="35%" stopColor="#1e0804" />
        <stop offset="100%" stopColor="#0d0402" />
      </linearGradient>
      <linearGradient id={`${id}-haze`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ff8a2a" stopOpacity="0" />
        <stop offset="70%" stopColor="#ff7a1e" stopOpacity="0.35" />
        <stop offset="100%" stopColor="#ff7a1e" stopOpacity="0" />
      </linearGradient>
    </defs>
  )
}

function Foreground({ data }) {
  return (
    <>
      <g fill={NEAR}>
        {data.stones.map((pts, i) => (
          <polygon key={i} points={pts} />
        ))}
      </g>
      {data.bushes.map((b, i) => (
        <g key={i}>
          <path d={b.twigs} fill="none" stroke={NEAR} strokeWidth="2.2" strokeLinecap="round" />
          <g fill={NEAR}>
            {b.leaves.map((l, j) => (
              <circle key={j} cx={l.cx} cy={l.cy} r={l.r} />
            ))}
          </g>
        </g>
      ))}
      <path d={data.grass.join(' ')} fill="none" stroke={NEAR} strokeWidth="1.8" strokeLinecap="round" />
    </>
  )
}

function LeftSide() {
  const id = 'west-l'
  return (
    <>
      <Defs id={id} sunSide={1} />
      {/* far mesas: long flat tops breaking down in steps */}
      <path
        filter={`url(#${id}-far)`}
        fill={FAR}
        opacity="0.7"
        d="M0 845 V712 L18 704 H70 L84 684 L96 676 H180 L188 670 H292 L300 680 L314 694 L330 712
           L352 716 H418 L430 702 L446 694 H540 L556 704 L572 728 L594 738 H690 L708 752 L726 766
           H850 L866 780 L884 794 H1200 V845 Z"
      />
      <rect x="0" y="640" width="1200" height="220" fill={`url(#${id}-haze)`} />
      {/* mid distance: Monument Valley-style butte with talus slopes, a spire, a low mesa */}
      <g filter={`url(#${id}-mid)`} fill={MID}>
        <path
          d="M630 852 C660 840 690 806 703 772 L708 742 L711 690 L716 640 L712 612 L720 604 L738 600
             L760 602 L784 598 L806 601 L838 598 L860 603 L872 610 L870 626 L878 668 L882 712
             L890 756 C900 792 930 830 972 852 Z"
        />
        <path d="M596 852 C606 830 616 800 620 760 L624 716 L629 686 L634 668 L642 664 L648 672
                 L650 700 L654 740 L660 790 C664 820 672 840 684 852 Z" />
        <path d="M280 852 C300 836 314 800 318 776 L322 744 L330 730 H372 L392 728 L410 734 L418 750
                 L426 784 C434 818 452 838 476 852 Z" opacity="0.85" />
      </g>
      {/* ground */}
      <path fill={`url(#${id}-ground)`} d="M0 838 C300 826 700 846 1200 836 V1000 H0 Z" />
      {/* foreground */}
      <g filter={`url(#${id}-near)`}>
        <Saguaro
          x={1000}
          base={884}
          h={270}
          w={30}
          arms={[
            { side: -1, at: 0.4, out: 1.5, up: 0.78 },
            { side: 1, at: 0.52, out: 1.35, up: 0.86 },
            { side: 1, at: 0.3, out: 1.3, up: 0.55 },
          ]}
        />
        <Saguaro
          x={470}
          base={864}
          h={150}
          w={16}
          color="#3a1006"
          arms={[
            { side: -1, at: 0.45, out: 1.4, up: 0.74 },
            { side: 1, at: 0.55, out: 1.3, up: 0.82 },
          ]}
        />
      </g>
      <g filter={`url(#${id}-low)`}>
        <Foreground data={LEFT} />
      </g>
    </>
  )
}

function RightSide() {
  const id = 'west-r'
  const { fence, sails } = RIGHT
  return (
    <>
      <Defs id={id} sunSide={-1} />
      {/* far mesas */}
      <path
        filter={`url(#${id}-far)`}
        fill={FAR}
        opacity="0.7"
        d="M0 845 V804 H180 L196 792 L214 778 H300 L316 760 L332 726 L346 690 L358 662 L372 656
           H468 L476 650 H596 L612 658 L628 676 L648 700 L676 712 H774 L790 718 H852 L868 732
           L884 748 H980 L996 734 L1012 722 H1200 V845 Z"
      />
      <rect x="0" y="640" width="1200" height="220" fill={`url(#${id}-haze)`} />
      {/* small saguaro in the haze */}
      <g filter={`url(#${id}-mid)`}>
        <Saguaro
          x={560}
          base={852}
          h={130}
          w={14}
          color={MID}
          arms={[
            { side: -1, at: 0.5, out: 1.4, up: 0.8 },
            { side: 1, at: 0.4, out: 1.3, up: 0.68 },
          ]}
        />
      </g>
      {/* ground */}
      <path fill={`url(#${id}-ground)`} d="M0 836 C500 846 900 826 1200 838 V1000 H0 Z" />
      <g filter={`url(#${id}-near)`}>
        {/* windmill with stock tank, scaled down around its base */}
        <g transform="translate(322 880) scale(0.66) translate(-322 -900)">
          <g fill="none" stroke={NEAR} strokeLinecap="round">
            {/* legs */}
            <path d="M282 900 L314 556 M362 900 L330 556 M300 900 L318 556 M344 900 L326 556" strokeWidth="9" />
            {/* cross bracing between girts */}
            <path
              d="M287 846 H357 M292 790 H352 M298 728 H346 M304 666 H340 M309 612 H335
                 M287 846 L352 790 M357 846 L292 790 M292 790 L346 728 M352 790 L298 728
                 M298 728 L340 666 M346 728 L304 666 M304 666 L335 612 M340 666 L309 612"
              strokeWidth="2"
            />
            {/* pump rod and platform */}
            <path d="M322 556 V900" strokeWidth="2" />
            <path d="M306 560 H338" strokeWidth="5" />
            {/* wheel rings and hub */}
            <circle cx="322" cy="540" r="21" strokeWidth="2.5" />
            <circle cx="322" cy="540" r="46" strokeWidth="1.5" />
            {/* tail boom */}
            <path d="M322 540 L452 532" strokeWidth="4" />
          </g>
          <g fill={NEAR}>
            {sails.map((pts, i) => (
              <polygon key={i} points={pts} />
            ))}
            <circle cx="322" cy="540" r="7" />
            <path d="M440 504 L520 514 L522 548 L440 560 Z" />
            {/* stock tank */}
            <path d="M190 900 V868 Q190 862 198 862 H278 Q286 862 286 868 V900 Z" />
          </g>
        </g>
      </g>
      <g filter={`url(#${id}-low)`}>
        {/* fence */}
        <g stroke={NEAR} strokeLinecap="round" fill="none">
          {fence.posts.map((p) => (
            <path key={p.x} d={`M${p.x} ${p.base} L${p.x + p.lean} ${p.top}`} strokeWidth="9" />
          ))}
          <path d={fence.wires} strokeWidth="2" />
        </g>
        <Foreground data={RIGHT} />
      </g>
    </>
  )
}

function SideScenery({ side }) {
  return (
    <svg
      className={`scenery scenery--${side}`}
      viewBox="0 0 1200 1000"
      preserveAspectRatio={side === 'left' ? 'xMaxYMax slice' : 'xMinYMax slice'}
      aria-hidden="true"
    >
      {side === 'left' ? <LeftSide /> : <RightSide />}
      <rect
        width="1200"
        height="1000"
        filter={`url(#west-${side === 'left' ? 'l' : 'r'}-grain)`}
        opacity="0.14"
        style={{ mixBlendMode: 'overlay' }}
      />
    </svg>
  )
}

export default SideScenery
