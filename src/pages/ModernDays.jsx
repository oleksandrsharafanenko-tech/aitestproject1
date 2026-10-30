import PageLayout from '../components/PageLayout.jsx'
import Photo from '../components/Photo.jsx'
import './ModernDays.css'

const stats = [
  ['8', 'seconds', 'a bronc or bull rider must stay on to score'],
  ['1M+', 'visitors', 'at the Calgary Stampede every July'],
  ['800+', 'riders', 'hold Professional Bull Riders memberships'],
  ['4', 'countries', 'host PBR events: US, Canada, Brazil, Australia'],
]

const events = [
  { id: 'bronc', name: 'Saddle bronc riding', type: 'Rough stock', text: 'Ride a bucking horse with a saddle and one hand on a rein for 8 seconds. Grew straight out of breaking wild horses on the ranch.' },
  { id: 'bull_riding', name: 'Bull riding', type: 'Rough stock', text: 'Eight seconds on top of a bucking, spinning bull weighing up to a tonne, holding on with one hand. The most dangerous event in rodeo.' },
  { id: 'lasso', position: '100% center', name: 'Roping', type: 'Timed event', text: 'Tie-down and team roping turn everyday ranch work into a race against the clock.' },
  { id: 'chuckwagon_race', name: 'Chuckwagon racing', type: 'Calgary special', text: 'Teams of horses race old-style cook wagons around a track, a famous highlight of the Calgary Stampede since the 1920s.' },
]

const today = [
  ['Horses and quad bikes', 'Horses still go where vehicles can’t: steep, rocky or brushy country. ATVs, pickups and even helicopters cover the rest.'],
  ['Drones and microchips', 'Drones check on far-off herds and water tanks. Electronic ear tags (RFID) track each animal alongside the traditional brand.'],
  ['Working ranches', 'Cowboys still gather, brand and move cattle on big ranches across the US West, Canada, Mexico, Brazil and Australia.'],
  ['Pop culture', 'TV shows like Yellowstone, Western fashion and country music keep the cowboy image everywhere, from Texas to Tokyo.'],
]

function ModernDays() {
  return (
    <PageLayout
      slug="modern-days"
      heroId="bull_riding"
      intro="The open range is gone, but the cowboy isn’t. Today they work with drones as well as horses and compete in rodeos watched by millions."
      sources={['Rodeo', 'Professional_Bull_Riders', 'Calgary_Stampede', 'Livestock_branding', 'Ranch']}
    >
      <section className="section">
        <div className="scoreboard">
          {stats.map(([num, unit, text]) => (
            <div key={text} className="scoreboard__cell">
              <strong>{num}</strong>
              <span className="scoreboard__unit">{unit}</span>
              <span>{text}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Rodeo: ranch work as sport</h2>
        <p className="lead">
          Rodeo started as friendly contests between ranch hands. It became a professional sport, and
          every event comes from a real cowboy job.
        </p>
        <div className="events">
          {events.map((e) => (
            <article key={e.name} className="event">
              <Photo id={e.id} alt={e.name} position={e.position} />
              <div className="event__body">
                <p className="event__type">{e.type}</p>
                <h3>{e.name}</h3>
                <p>{e.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Cowboys in the 21st century</h2>
        <div className="today">
          {today.map(([title, text]) => (
            <div key={title} className="today__item">
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>
    </PageLayout>
  )
}

export default ModernDays
