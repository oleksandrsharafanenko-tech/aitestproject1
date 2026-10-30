import PageLayout from '../components/PageLayout.jsx'
import Photo from '../components/Photo.jsx'
import './Movies.css'

const eras = [
  ['1900s–20s', 'Silent era'],
  ['1930s–50s', 'Golden age'],
  ['1960s–70s', 'Spaghetti Westerns'],
  ['1990s', 'Revisionist'],
  ['2000s–now', 'Neo-Western'],
]

// Films with no free poster on Wikimedia Commons get a typographic poster instead.
const films = [
  {
    title: 'The Great Train Robbery',
    year: 1903,
    by: 'Edwin S. Porter',
    star: 'Silent, about 12 minutes',
    photo: 'train_robbery',
    text: 'Outlaws rob a steam train and are hunted down by a posse. One of the first Westerns ever made; its final shot of a bandit firing straight at the audience shocked viewers.',
  },
  {
    title: 'Stagecoach',
    year: 1939,
    by: 'John Ford',
    star: 'John Wayne, Claire Trevor',
    photo: 'stagecoach',
    text: 'Strangers share a stagecoach through dangerous Apache territory. It made John Wayne a star and put Monument Valley on the map.',
  },
  {
    title: 'High Noon',
    year: 1952,
    by: 'Fred Zinnemann',
    star: 'Gary Cooper, Grace Kelly',
    photo: 'high_noon',
    text: 'A town marshal must face a gang of killers alone when the townsfolk refuse to help. The story unfolds in almost real time.',
  },
  {
    title: 'The Searchers',
    year: 1956,
    by: 'John Ford',
    star: 'John Wayne',
    photo: 'searchers',
    text: 'A bitter Civil War veteran spends years searching for his abducted niece. Often named the greatest Western ever made.',
  },
  {
    title: 'The Good, the Bad and the Ugly',
    year: 1966,
    by: 'Sergio Leone',
    star: 'Clint Eastwood, Lee Van Cleef, Eli Wallach',
    poster: { tone: 'yellow', tagline: 'Three men. One fortune.' },
    text: 'The most famous “spaghetti Western”, made in Italy and Spain. Ennio Morricone’s howling score is one of the best-known pieces of film music ever.',
  },
  {
    title: 'Unforgiven',
    year: 1992,
    by: 'Clint Eastwood',
    star: 'Clint Eastwood, Gene Hackman, Morgan Freeman',
    poster: { tone: 'grey', tagline: 'An aging outlaw. One last job.' },
    text: 'A dark, honest look at violence that tears down the old myths. It won the Academy Award for Best Picture.',
  },
  {
    title: 'Yellowstone',
    year: '2018–24',
    by: 'Taylor Sheridan (TV series)',
    star: 'Kevin Costner',
    poster: { tone: 'blue', tagline: 'A Montana ranch. A family at war.' },
    text: 'A modern-day ranching family fights to keep its land. The hit TV series sparked a new wave of interest in cowboy life and Western fashion.',
  },
]

function Poster({ film }) {
  if (film.photo) return <Photo id={film.photo} alt={`Poster for ${film.title} (${film.year})`} />
  return (
    <div className={`type-poster type-poster--${film.poster.tone}`} role="img" aria-label={`${film.title} title card`}>
      <span className="type-poster__tag">{film.poster.tagline}</span>
      <strong>{film.title}</strong>
      <span className="type-poster__year">{film.year}</span>
    </div>
  )
}

function Movies() {
  return (
    <PageLayout
      slug="movies"
      heroId="western_illustration"
      heroPosition="center 30%"
      intro="For more than a century the Western has been one of the great film genres. These are the films that shaped how the world sees the cowboy."
      sources={[
        'Western_(genre)',
        'The_Great_Train_Robbery_(1903_film)',
        'Stagecoach_(1939_film)',
        'High_Noon',
        'The_Searchers',
        'The_Good,_the_Bad_and_the_Ugly',
        'Unforgiven',
        'Yellowstone_(American_TV_series)',
      ]}
    >
      <section className="section">
        <h2 className="section-title">Eras of the Western</h2>
        <ol className="eras">
          {eras.map(([years, name]) => (
            <li key={name}>
              <span>{years}</span>
              {name}
            </li>
          ))}
        </ol>
      </section>

      <section className="section marquee">
        <h2 className="section-title">Now showing</h2>
        <div className="films">
          {films.map((f) => (
            <article key={f.title} className="film">
              <div className="film__poster">
                <Poster film={f} />
              </div>
              <div className="film__ticket">
                <p className="film__year">{f.year}</p>
                <h3>{f.title}</h3>
                <p className="film__meta">
                  Directed by {f.by}
                  <br />
                  {f.star}
                </p>
                <p>{f.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </PageLayout>
  )
}

export default Movies
