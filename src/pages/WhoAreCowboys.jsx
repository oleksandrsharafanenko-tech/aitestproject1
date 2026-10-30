import PageLayout from '../components/PageLayout.jsx'
import Photo from '../components/Photo.jsx'
import './WhoAreCowboys.css'

const jobs = [
  ['Roundups', 'Gathering cattle scattered across miles of open range, twice a year.'],
  ['Branding', "Marking calves with the ranch's brand so everyone knows who owns them."],
  ['Trail drives', 'Moving herds of thousands of cattle hundreds of miles to the railroad.'],
  ['Wrangling', 'A wrangler looked after the horses: catching, feeding and breaking them.'],
  ['Night guard', 'Riding slowly round the sleeping herd, often singing to keep it calm.'],
  ['Ranch chores', 'Mending fences, checking water holes, doctoring sick animals.'],
]

const people = [
  {
    id: 'nat_love',
    name: 'Nat Love',
    years: '1854–1921',
    text: 'Born into slavery in Tennessee, he went west as a teenager and became one of the most famous cowboys of his day. His 1907 autobiography made his trail adventures legendary.',
  },
  {
    id: 'bill_pickett',
    name: 'Bill Pickett',
    years: '1870–1932',
    text: 'A rodeo star who invented "bulldogging", now the event called steer wrestling. In 1972 he became the first African American in the National Rodeo Hall of Fame.',
  },
  {
    id: 'vaqueros',
    name: 'The vaqueros',
    years: 'from the 1500s',
    text: 'Mexican horsemen whose skills, words and gear (the lariat, chaps, the saddle horn) became the foundation of the whole cowboy tradition.',
  },
  {
    id: 'cowgirl',
    name: 'Cowgirls',
    years: 'early 1900s',
    text: 'Women ran ranches, rode in roundups and became stars of the Wild West shows and early rodeos, competing against men in roping and riding.',
  },
]

function WhoAreCowboys() {
  return (
    <PageLayout
      slug="who-are-cowboys"
      heroId="roundup"
      intro="Part worker, part legend: the horse-mounted cattle herders of North America, and how they became one of the most famous figures in the world."
      sources={['Cowboy', 'Vaquero', 'Nat_Love', 'Bill_Pickett', 'Cowgirl']}
    >
      <section className="section split">
        <div className="definition">
          <p className="label">Definition</p>
          <h2 className="definition__word">
            cow·boy <span>(noun)</span>
          </h2>
          <p>
            An animal herder who tends cattle on ranches in North America, traditionally on
            horseback, and often performs many other ranch-related tasks.
          </p>
          <p className="definition__origin">
            <strong>Word origin:</strong> an English translation of the Spanish <em>vaquero</em>,
            from <em>vaca</em>, “cow”. The word <em>buckaroo</em> comes from <em>vaquero</em> too.
          </p>
        </div>
        <Photo
          id="hero_cowboy"
          className="who-painting"
          alt="Painting of cowboys on horseback chasing a runaway steer across the plains"
          caption="Painting by Charles M. Russell, the “cowboy artist” who worked as a Montana cowhand himself."
        />
      </section>

      <section className="section">
        <h2 className="section-title">What a cowboy actually did</h2>
        <p className="lead">
          Movies show gunfights. Real cowboys spent long, dusty days, often 14 hours or more in
          the saddle, doing hard and mostly repetitive work for low pay.
        </p>
        <ol className="jobs">
          {jobs.map(([title, text]) => (
            <li key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="section">
        <h2 className="section-title">Who rode the range</h2>
        <div className="who-stats">
          <div>
            <strong>~1 in 4</strong>
            <span>trail-drive cowboys was Black, by many historians’ estimates</span>
          </div>
          <div>
            <strong>Many</strong>
            <span>more were Mexican vaqueros and Native Americans</span>
          </div>
          <div>
            <strong>Young</strong>
            <span>most were young men, many still in their teens</span>
          </div>
        </div>

        <div className="people">
          {people.map((p) => (
            <article key={p.name} className="person">
              <Photo id={p.id} alt={`Portrait: ${p.name}`} position="top" />
              <div className="person__text">
                <h3>{p.name}</h3>
                <p className="label">{p.years}</p>
                <p>{p.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <blockquote className="code-quote">
          “The cowboy must never shoot first, hit a smaller man, or take unfair advantage.”
          <cite>Gene Autry’s Cowboy Code, the first of its ten rules</cite>
        </blockquote>
      </section>
    </PageLayout>
  )
}

export default WhoAreCowboys
