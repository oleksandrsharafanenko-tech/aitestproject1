import PageLayout from '../components/PageLayout.jsx'
import Photo from '../components/Photo.jsx'
import './Clothes.css'

// Ordered head to toe. Every piece of cowboy clothing had a job to do.
const items = [
  {
    no: 1,
    name: 'The hat',
    photo: { id: 'hat', alt: 'A cream felt cowboy hat with a high crown and wide brim' },
    why: 'Shade from sun, shelter from rain',
    text: 'The wide brim kept off sun and rain, and the high crown kept the head cool. In 1865 John B. Stetson made a hat called the “Boss of the Plains”, and it became the classic cowboy hat. A good felt hat could also fan a campfire or carry water to a horse.',
  },
  {
    no: 2,
    name: 'The bandana',
    why: 'A dust mask in a pocket',
    text: 'A square of cotton tied round the neck. Pulled over the nose, it filtered the choking dust kicked up by thousands of hooves on a drive. It also protected the neck from sunburn and could serve as a sling, a bandage or a potholder.',
  },
  {
    no: 3,
    name: 'Chaps',
    photo: { id: 'chaps', alt: 'A person wearing leather chaps over jeans' },
    why: 'Armour against thorns',
    text: 'From the Spanish chaparreras: leather leggings with no seat, worn over trousers. They protected the legs from thorny brush (the chaparral), rope burns and horse bites. Styles include straight “shotgun” chaps, flared “batwings”, and furry “woolies” for cold northern ranges.',
  },
  {
    no: 4,
    name: 'Boots',
    photo: { id: 'boots', alt: 'A pair of decorated cowboy boots' },
    why: 'Made for the stirrup, not for walking',
    text: 'The pointed toe slides easily into a stirrup. The tall, angled heel stops the foot from slipping through, which could get a fallen rider dragged. The high shaft guards against brush, rocks and snakes.',
  },
  {
    no: 5,
    name: 'Spurs',
    photo: { id: 'spurs', alt: 'A pair of metal riding spurs' },
    why: 'Signals to the horse',
    text: 'Strapped to the boot heel, with a spinning wheel called a rowel. A light touch cues the horse to move forward or sideways. Small dangling pieces called “jingle bobs” gave cowboys their famous jingling walk.',
  },
]

function Bandana() {
  return (
    <svg className="bandana" viewBox="0 0 200 200" role="img" aria-label="Illustration of a red paisley bandana">
      <defs>
        <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="10" cy="10" r="3" fill="#fff1d0" />
          <circle cx="0" cy="0" r="1.5" fill="#fff1d0" />
          <circle cx="20" cy="20" r="1.5" fill="#fff1d0" />
        </pattern>
      </defs>
      <rect x="10" y="10" width="180" height="180" rx="6" fill="#b3261e" />
      <rect x="10" y="10" width="180" height="180" rx="6" fill="url(#dots)" opacity="0.7" />
      <rect x="22" y="22" width="156" height="156" fill="none" stroke="#fff1d0" strokeWidth="3" strokeDasharray="6 5" />
      <g fill="#fff1d0">
        <path d="M100 58 C122 58 128 82 112 92 C104 97 98 90 104 84 C110 78 104 70 96 74 C82 80 84 104 100 110 C126 120 142 90 132 70 C150 90 136 128 100 128 C70 128 62 92 78 72 C84 63 92 58 100 58 Z" />
        <circle cx="52" cy="52" r="8" />
        <circle cx="148" cy="52" r="8" />
        <circle cx="52" cy="148" r="8" />
        <circle cx="148" cy="148" r="8" />
      </g>
    </svg>
  )
}

function Clothes() {
  return (
    <PageLayout
      slug="clothes"
      heroId="hero_cowboy"
      intro="Nothing a cowboy wore was for show, at least not at first. From hat to spurs, the outfit was work gear designed for long days in the saddle."
      sources={['Cowboy_hat', 'Bandana', 'Chaps', 'Cowboy_boot', 'Spur', 'Cowboy']}
    >
      <p className="lead">
        Most of the outfit came straight from the Mexican vaqueros, adapted over time for colder
        northern ranges and, later, for the movies.
      </p>

      <ol className="outfit">
        {items.map((item) => (
          <li key={item.no} className="outfit__item">
            <div className="outfit__media">
              {item.photo ? <Photo id={item.photo.id} alt={item.photo.alt} /> : <Bandana />}
            </div>
            <div className="outfit__text">
              <p className="outfit__tag">
                Item No. {item.no} <span>Head to toe</span>
              </p>
              <h2>{item.name}</h2>
              <p className="outfit__why">{item.why}</p>
              <p>{item.text}</p>
            </div>
          </li>
        ))}
      </ol>

      <aside className="callout">
        <p className="label">Also in the kit</p>
        <p>
          Sturdy cotton or wool shirts, a vest (shirts rarely had pockets), heavy canvas or denim
          trousers, leather gloves for roping, and a slicker (raincoat) tied behind the saddle.
          Blue jeans, patented by Levi Strauss and Jacob Davis in 1873, became a cowboy staple later.
        </p>
      </aside>
    </PageLayout>
  )
}

export default Clothes
