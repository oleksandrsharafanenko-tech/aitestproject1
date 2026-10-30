import PageLayout from '../components/PageLayout.jsx'
import Photo from '../components/Photo.jsx'
import './History.css'

const events = [
  {
    year: '1500s',
    title: 'Cattle and horses cross the ocean',
    text: 'Spanish settlers bring cattle and horses to Mexico, along with the herding traditions of Andalusia in southern Spain. Some animals escape and multiply on the open grasslands.',
    photo: { id: 'longhorn', alt: 'A Texas Longhorn cow with long curved horns' },
  },
  {
    year: '1700s',
    title: 'The age of the vaquero',
    text: 'On the ranchos and missions of Mexico, Texas and California, vaqueros develop the lariat, chaps, the big-horned saddle and the roundup. American cowboys later copy almost all of it.',
    photo: { id: 'vaqueros', alt: 'Painting of Mexican vaqueros roping cattle' },
  },
  {
    year: '1865',
    title: 'Millions of longhorns, nowhere to sell them',
    text: 'After the Civil War, Texas is full of half-wild longhorns worth only a few dollars each. In the growing cities of the North, the same animal sells for many times more. The trick is getting it there.',
  },
  {
    year: '1867',
    title: 'The Chisholm Trail opens',
    text: 'A railhead opens at Abilene, Kansas, and cowboys start driving herds north along the Chisholm Trail through Indian Territory to meet the trains.',
    photo: { id: 'chisholm_map', alt: '1873 map of the Chisholm Trail and its branches through Texas' },
  },
  {
    year: '1866–1890s',
    title: 'The great cattle drives',
    text: 'About 27 million cattle are driven from Texas to Kansas railheads. A typical drive moved a couple of thousand head with about a dozen cowboys, a cook and his chuck wagon, and took months.',
    photo: { id: 'roundup', alt: 'Cowboys rounding up a herd of cattle on the plains' },
  },
  {
    year: '1874',
    title: 'Barbed wire',
    text: 'Joseph Glidden patents a cheap barbed wire. Within a few decades the open range is fenced off into private ranches, and the long drives become impossible.',
    photo: { id: 'barbed_wire', alt: 'Close-up of a rusty barbed wire knot' },
  },
  {
    year: '1883',
    title: "Buffalo Bill's Wild West",
    text: 'William “Buffalo Bill” Cody launches a touring show of riding, roping and shooting. It tours Europe from 1887 and turns the working cowboy into a worldwide legend.',
    photo: { id: 'buffalo_bill', alt: 'Portrait of Buffalo Bill Cody with long hair and a goatee' },
  },
  {
    year: '1886–87',
    title: 'The Big Die-Up',
    text: 'A catastrophic winter on the Northern Plains kills huge numbers of cattle that had no shelter or hay. Ranchers turn to smaller, fenced herds that are fed through winter.',
  },
  {
    year: '1890',
    title: 'The frontier closes',
    text: 'The US Census declares that there is no longer a clear frontier line. The open-range cowboy era is over, but the cowboy is just getting started as a hero of books, shows and soon films.',
  },
]

function History() {
  return (
    <PageLayout
      slug="history"
      heroId="chuck_wagon"
      intro="From Spanish ranchos to the great trail drives and the fences that ended them: how three centuries of cattle work created the American cowboy."
      sources={[
        'Vaquero',
        'Cattle_drives_in_the_United_States',
        'Chisholm_Trail',
        'Barbed_wire',
        'Open_range',
        "Buffalo_Bill's_Wild_West",
      ]}
    >
      <p className="lead">
        The classic cowboy era lasted only about 25 years, from the end of the Civil War in 1865 to
        around 1890. Its roots, though, go back more than three centuries.
      </p>

      <ol className="timeline">
        {events.map((e) => (
          <li key={e.year} className={`timeline__item${e.photo ? '' : ' timeline__item--text'}`}>
            <div className="timeline__year">{e.year}</div>
            <div className="timeline__card">
              <h2>{e.title}</h2>
              <p>{e.text}</p>
            </div>
            {e.photo && <Photo id={e.photo.id} alt={e.photo.alt} className="timeline__photo" />}
          </li>
        ))}
      </ol>
    </PageLayout>
  )
}

export default History
