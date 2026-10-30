import PageLayout from '../components/PageLayout.jsx'
import Photo from '../components/Photo.jsx'
import './CountryMusic.css'

const songs = ['Home on the Range', 'The Old Chisholm Trail', 'Git Along, Little Dogies', 'Red River Valley']

const instruments = ['Fiddle', 'Acoustic guitar', 'Banjo', 'Mandolin', 'Harmonica', 'Steel guitar']

const artists = [
  {
    id: 'autry',
    name: 'Gene Autry',
    tag: 'The Singing Cowboy',
    hit: 'Back in the Saddle Again',
    color: '#a3401c',
    text: 'Sang his way through radio, about 90 films and TV from the 1930s, and became the model of the honest, straight-shooting cowboy hero.',
  },
  {
    id: 'cash',
    name: 'Johnny Cash',
    tag: 'The Man in Black',
    hit: 'Folsom Prison Blues',
    color: '#1d1d1d',
    text: 'A deep bass-baritone voice, a train-like “boom-chicka-boom” rhythm and songs of sorrow and redemption. Famous for his free concerts in prisons.',
  },
  {
    id: 'nelson',
    name: 'Willie Nelson',
    tag: 'Outlaw country',
    hit: 'On the Road Again',
    color: '#4f6b3a',
    text: 'One of the leaders of “outlaw country”, which broke away from the polished Nashville sound. His 1975 album Red Headed Stranger is a cowboy concept album.',
  },
  {
    id: 'parton',
    name: 'Dolly Parton',
    tag: 'The Queen of Country',
    hit: 'Jolene',
    color: '#c46a8a',
    text: 'One of the most successful performers in country music history, with more than 100 million records sold, and a famous songwriter and philanthropist.',
  },
]

function CountryMusic() {
  return (
    <PageLayout
      slug="country-music"
      heroId="ryman"
      intro="Songs sung to calm a restless herd at night grew into one of America’s biggest music genres."
      sources={['Western_music_(North_America)', 'Country_music', 'Grand_Ole_Opry', 'Gene_Autry', 'Johnny_Cash', 'Willie_Nelson', 'Dolly_Parton']}
    >
      <section className="section split">
        <div>
          <h2 className="section-title">Songs of the trail</h2>
          <p>
            On night guard, cowboys rode slowly round the herd and sang. A familiar voice kept
            nervous cattle calm and helped prevent stampedes. Their ballads were about the open
            range, the long drive and life on the prairie. This became <strong>Western music</strong>.
          </p>
          <p>
            Mixed with the folk “hillbilly” music of the Appalachian mountains, it grew into
            <strong> country and western</strong>, a name that became popular in the 1940s.
          </p>
        </div>
        <div className="songbook">
          <p className="label">Old cowboy songs</p>
          <ol>
            {songs.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
          <p className="label">The sound</p>
          <ul className="chips">
            {instruments.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Legends on vinyl</h2>
        <div className="records">
          {artists.map((a) => (
            <article key={a.name} className="record" style={{ '--label': a.color }}>
              <div className="record__sleeve">
                <Photo id={a.id} alt={`Portrait of ${a.name}`} position="top" />
                <div className="record__disc" aria-hidden="true">
                  <span>{a.hit}</span>
                </div>
              </div>
              <h3>{a.name}</h3>
              <p className="record__tag">{a.tag}</p>
              <p>{a.text}</p>
              <p className="record__hit">♪ {a.hit}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section opry">
        <div className="opry__date">
          <span>Nov 28</span>
          1925
        </div>
        <div>
          <h2>The Grand Ole Opry</h2>
          <p>
            A Nashville radio show that started as the WSM Barn Dance and is still on the air. It is the
            longest-running radio broadcast in US history. Its long-time home, the Ryman Auditorium
            (pictured at the top of this page), is nicknamed the “Mother Church of Country Music”.
          </p>
        </div>
      </section>
    </PageLayout>
  )
}

export default CountryMusic
