import PageLayout from '../components/PageLayout.jsx'
import Photo from '../components/Photo.jsx'
import './CattleBreeding.css'

const breeds = [
  {
    id: 'longhorn',
    name: 'Texas Longhorn',
    origin: 'Spain → Mexico → Texas',
    since: 'from the 1500s',
    look: 'Horns spanning more than 2.4 m (8 ft), many colours',
    known: 'The original trail-drive cow. Descended from Spanish cattle that lived half-wild for centuries, it is tough, drought-tolerant and can walk huge distances. It nearly died out in the 1920s and was saved by a government-protected herd.',
  },
  {
    id: 'hereford',
    name: 'Hereford',
    origin: 'Herefordshire, England',
    since: 'in the US from 1817',
    look: 'Red body, white face',
    known: 'Bred for beef from the 1700s. Ranchers crossed Herefords with longhorns to get heavier, meatier cattle, and by the 1900s white-faced Herefords covered the Western ranges.',
  },
  {
    id: 'angus',
    name: 'Aberdeen Angus',
    origin: 'North-east Scotland',
    since: 'in the US from 1873',
    look: 'Solid black, naturally hornless',
    known: 'Famous for marbled, high-quality beef. Today it is the most common beef breed in the United States. An Angus × Hereford cross is called a “black baldy”.',
  },
  {
    id: 'brahman',
    name: 'American Brahman',
    origin: 'Bred in the US from Indian zebu cattle',
    since: 'from 1885',
    look: 'Hump over the shoulders, loose skin, long ears',
    known: 'Handles heat, humidity and insects better than European breeds, so it is popular across Texas, Florida and the Gulf Coast.',
  },
]

const seasons = [
  ['Spring', 'Roundup: gather the herd, count and brand the new calves.'],
  ['Summer', 'Cattle graze the open range or summer pastures; cowboys watch the water.'],
  ['Autumn', 'Fall roundup: sort out the animals to sell and ship them to market.'],
  ['Winter', 'Feed hay, break ice on water holes, keep the herd alive until spring.'],
]

// Brand marks are read left to right, top to bottom, outside to inside.
const brands = [
  { name: 'Bar X', mark: <><line x1="18" y1="22" x2="82" y2="22" /><text x="50" y="80">X</text></> },
  { name: 'Lazy S', mark: <text x="50" y="68" transform="rotate(90 50 50)">S</text> },
  { name: 'Rocking R', mark: <><text x="50" y="66">R</text><path d="M20 76 Q50 98 80 76" /></> },
  { name: 'Circle T', mark: <><circle cx="50" cy="50" r="36" /><text x="50" y="68">T</text></> },
  { name: 'Flying W', mark: <><text x="50" y="68">W</text><path d="M10 40 Q22 30 26 44 M90 40 Q78 30 74 44" /></> },
]

function CattleBreeding() {
  return (
    <PageLayout
      slug="cattle-breeding"
      heroId="ranch"
      intro="Cowboys existed because of cattle. Here are the breeds they worked with, how a ranch year runs, and how a ranch marks its animals."
      sources={['Texas_Longhorn', 'Hereford_cattle', 'Aberdeen_Angus', 'Brahman_cattle', 'Ranch', 'Livestock_branding']}
    >
      <section className="section">
        <h2 className="section-title">The breeds</h2>
        <p className="lead">
          Early ranching relied on the hardy, half-wild longhorn. As railways and fences arrived,
          ranchers bred in heavier British beef cattle, and later heat-resistant Brahmans for the South.
        </p>
        <div className="breeds">
          {breeds.map((b) => (
            <article key={b.name} className="breed">
              <Photo id={b.id} alt={`${b.name} cattle`} />
              <div className="breed__body">
                <h3>{b.name}</h3>
                <dl>
                  <dt>Origin</dt>
                  <dd>{b.origin}</dd>
                  <dt>Arrived</dt>
                  <dd>{b.since}</dd>
                  <dt>Looks</dt>
                  <dd>{b.look}</dd>
                </dl>
                <p>{b.known}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">A year on the ranch</h2>
        <ol className="seasons">
          {seasons.map(([name, text]) => (
            <li key={name} className={`season season--${name.toLowerCase()}`}>
              <h3>{name}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="section split">
        <div>
          <h2 className="section-title">Reading a brand</h2>
          <p>
            Before fences, cattle from many ranches mixed on the open range. A hot-iron brand on the
            hide was the only proof of ownership, and every brand was registered. Cattle thieves
            (“rustlers”) sometimes altered brands with a running iron.
          </p>
          <p>
            Brands have their own grammar. A letter lying on its side is <strong>lazy</strong>, one
            on a curved base is <strong>rocking</strong>, one with wings is <strong>flying</strong>,
            and a straight line is a <strong>bar</strong>. Today many ranches also use ear tags and
            microchips.
          </p>
          <ul className="brands">
            {brands.map((b) => (
              <li key={b.name}>
                <svg viewBox="0 0 100 100" aria-hidden="true">
                  {b.mark}
                </svg>
                <span>{b.name}</span>
              </li>
            ))}
          </ul>
        </div>
        <Photo
          id="branding"
          className="branding-photo"
          alt="A ranch hand in a cowboy hat holding a white calf for branding"
          caption="A ranch hand holds a calf for branding."
        />
      </section>
    </PageLayout>
  )
}

export default CattleBreeding
