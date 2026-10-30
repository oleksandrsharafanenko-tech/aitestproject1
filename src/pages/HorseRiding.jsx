import PageLayout from '../components/PageLayout.jsx'
import Photo from '../components/Photo.jsx'
import './HorseRiding.css'

const compare = [
  ['Purpose', 'All-day work with cattle', 'Sport, jumping, dressage'],
  ['Saddle', 'Heavy, deep seat, with a horn', 'Light and flat, no horn'],
  ['Reins', 'One hand, “neck reining”', 'Two hands, direct contact'],
  ['Gaits', 'Walk, jog, lope', 'Walk, trot, canter'],
  ['Stirrups', 'Long, legs nearly straight', 'Shorter, knees bent'],
]

const saddleParts = [
  ['Horn', 'A post at the front. The rope is wrapped (“dallied”) round it to hold a roped cow.'],
  ['Seat & cantle', 'A deep seat with a raised back (cantle) keeps the rider secure when the horse turns or stops fast.'],
  ['Fenders', 'Wide leather flaps that protect the rider’s legs from the horse’s sweat.'],
  ['Cinch', 'The strap under the belly that holds the saddle on.'],
  ['Stirrups', 'Wide and often wooden, so a boot can rest in them all day.'],
]

const skills = [
  ['Neck reining', 'Steering with one hand by laying the rein against the horse’s neck, leaving the other hand free for the rope.'],
  ['Cutting', 'Separating one cow from the herd. A good “cutting horse” reads the cow and blocks it almost by itself.'],
  ['Roping', 'Throwing a loop over a calf or steer from a running horse, then stopping the horse to hold the rope tight.'],
  ['Breaking', 'Training a young or wild horse to accept a rider. Bucking horses are where rodeo bronc riding comes from.'],
]

function HorseRiding() {
  return (
    <PageLayout
      slug="horse-riding"
      heroId="cowboy_1888"
      heroPosition="center 15%"
      intro="A cowboy without a horse was just a man on foot. Western riding grew out of the needs of working cattle all day long."
      sources={['Western_riding', 'Western_saddle', 'American_Quarter_Horse', 'Mustang', 'Lasso']}
    >
      <section className="section">
        <h2 className="section-title">Western vs. English riding</h2>
        <div className="compare-wrap">
          <table className="compare">
            <thead>
              <tr>
                <th scope="col" />
                <th scope="col">Western</th>
                <th scope="col">English</th>
              </tr>
            </thead>
            <tbody>
              {compare.map(([k, w, e]) => (
                <tr key={k}>
                  <th scope="row">{k}</th>
                  <td>{w}</td>
                  <td>{e}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section split saddle">
        <Photo id="saddle" alt="A decorated Western show saddle" caption="A Western saddle, built for long hours of work." />
        <div>
          <h2 className="section-title">Anatomy of a saddle</h2>
          <dl className="saddle-parts">
            {saddleParts.map(([name, text], i) => (
              <div key={name}>
                <dt>
                  <span>{i + 1}</span>
                  {name}
                </dt>
                <dd>{text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">The cow pony</h2>
        <div className="horses">
          <article className="horse">
            <Photo id="quarter_horse" alt="A red roan American Quarter Horse" />
            <div>
              <h3>American Quarter Horse</h3>
              <p className="horse__stat">
                <strong>44 mph</strong> top recorded sprint speed (71 km/h)
              </p>
              <p>
                Named for winning races of a quarter mile or less. Quick, compact and calm, with
                famous “cow sense”. It is the classic ranch and rodeo horse.
              </p>
            </div>
          </article>
          <article className="horse">
            <Photo id="mustang" alt="A mustang horse standing in a field" />
            <div>
              <h3>Mustang</h3>
              <p className="horse__stat">
                <strong>1500s</strong> Spanish ancestors
              </p>
              <p>
                Free-roaming horses of the West, descended from horses brought by the Spanish.
                Cowboys caught and broke mustangs as tough, sure-footed working mounts.
              </p>
            </div>
          </article>
        </div>
        <p className="callout remuda">
          <strong>The remuda:</strong> on a trail drive, each cowboy had a “string” of several horses
          and switched between them during the day so none got worn out. A wrangler looked after the whole
          herd of spare horses.
        </p>
      </section>

      <section className="section">
        <h2 className="section-title">Skills of the trade</h2>
        <div className="skills">
          {skills.map(([name, text]) => (
            <div key={name} className="skill">
              <h3>{name}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>
    </PageLayout>
  )
}

export default HorseRiding
