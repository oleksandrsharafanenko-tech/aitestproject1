import credits from '../content/credits.js'
import routes from '../pages/routes.js'
import './PageLayout.css'

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X']

// Shared frame for every chapter: photo banner, content area, sources and prev/next links.
function PageLayout({ slug, intro, heroId, heroPosition = 'center', sources = [], children }) {
  const index = routes.findIndex((r) => r.slug === slug)
  const { title } = routes[index]
  const prev = routes[index - 1]
  const next = routes[index + 1]
  const hero = credits[heroId]

  return (
    <div className={`page page--${slug}`}>
      <header
        className="page-hero"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(28, 12, 6, 0.35), rgba(28, 12, 6, 0.85)), url(${hero.src})`,
          backgroundPosition: heroPosition,
        }}
      >
        <div className="page-hero__inner">
          <p className="page-hero__kicker">Chapter {ROMAN[index]}</p>
          <h1 className="page-hero__title">{title}</h1>
          <p className="page-hero__intro">{intro}</p>
        </div>
        <a className="page-hero__credit" href={hero.page} target="_blank" rel="noreferrer">
          Photo: {hero.author} · {hero.license}
        </a>
      </header>

      <main className="page-body">{children}</main>

      <footer className="page-footer">
        {sources.length > 0 && (
          <div className="page-sources">
            <h2>Sources</h2>
            <ul>
              {sources.map((s) => (
                <li key={s}>
                  <a
                    href={`https://en.wikipedia.org/wiki/${s}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {decodeURIComponent(s).replace(/_/g, ' ')}
                  </a>
                </li>
              ))}
            </ul>
            <p>Text summarised from Wikipedia. Photos from Wikimedia Commons, credited under each image.</p>
          </div>
        )}
        <nav className="pager" aria-label="Chapters">
          <a href={prev ? `#/${prev.slug}` : '#/'}>← {prev ? prev.title : 'Home'}</a>
          {next && <a href={`#/${next.slug}`}>{next.title} →</a>}
        </nav>
      </footer>
    </div>
  )
}

export default PageLayout
