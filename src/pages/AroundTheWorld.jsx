import PageLayout from '../components/PageLayout.jsx'
import Photo from '../components/Photo.jsx'
import './AroundTheWorld.css'

// Grouped by continent; each card is styled as a passport stamp.
const regions = [
  {
    name: 'The Americas',
    riders: [
      {
        id: 'charro',
        name: 'Charro',
        country: 'Mexico',
        land: 'Haciendas of central Mexico',
        signature: 'Wide sombrero, embroidered suit',
        text: 'The elegant horseman of Mexico and heir of the original vaquero. Charrería, the charro rodeo, is Mexico’s national sport and is on UNESCO’s list of world cultural heritage.',
      },
      {
        id: 'gaucho',
        name: 'Gaucho',
        country: 'Argentina · Uruguay · S. Brazil',
        land: 'The Pampas grasslands',
        signature: 'Poncho, baggy bombachas, facón knife, bolas',
        text: 'Proud, independent riders of the Pampas who caught cattle with the boleadoras, weighted throwing cords. The 1872 epic poem “Martín Fierro” made the gaucho a national symbol of Argentina.',
      },
      {
        id: 'huaso',
        name: 'Huaso',
        country: 'Chile',
        land: 'Central and southern Chile',
        signature: 'Short colourful chamanto poncho, flat-brimmed hat',
        text: 'Chile’s countryman on horseback. Chilean rodeo, where pairs of riders pin a steer against a padded wall, is the country’s official national sport.',
      },
      {
        id: 'llanero',
        name: 'Llanero',
        country: 'Venezuela · Colombia',
        land: 'The Llanos plains of the Orinoco',
        signature: 'Liqui liqui suit, joropo music',
        text: 'Herders of the vast tropical plains that flood in the rainy season. Llaneros fought as famous cavalry in the wars of independence, and their joropo music is still played today.',
      },
      {
        id: 'paniolo',
        name: 'Paniolo',
        country: 'Hawaiʻi',
        land: 'Ranches of the Big Island',
        signature: 'Flower lei on the hat',
        text: 'In the 1830s Mexican vaqueros were invited to Hawaiʻi to teach locals how to handle wild cattle. The name probably comes from español, “Spanish”.',
      },
    ],
  },
  {
    name: 'Europe',
    riders: [
      {
        id: 'csikos',
        name: 'Csikós',
        country: 'Hungary',
        land: 'The Puszta, Great Hungarian Plain',
        signature: 'Blue shirt, wide trousers, long whip',
        text: 'Horse herders famous for the “Puszta five”: standing upright on the backs of two galloping horses while driving three more in front.',
      },
      {
        id: 'gardian',
        name: 'Gardian',
        country: 'France',
        land: 'The Camargue, Rhône delta',
        signature: 'White Camargue horses, trident',
        text: 'Mounted herdsmen of black Camargue bulls in the wetlands of Provence, riding the hardy white Camargue horse. Their brotherhood dates back to 1512.',
      },
      {
        id: 'butteri',
        name: 'Buttero',
        country: 'Italy',
        land: 'The Maremma, Tuscany & Lazio',
        signature: 'Velvet jacket, long staff (uncino)',
        text: 'Italy’s cowboys herd the long-horned Maremmana cattle. Legend says that in 1890 the butteri beat Buffalo Bill’s cowboys in a riding contest.',
      },
    ],
  },
  {
    name: 'Australia',
    riders: [
      {
        id: 'stockman',
        name: 'Stockman',
        country: 'Australia',
        land: 'Cattle stations of the Outback',
        signature: 'Akubra hat, stockwhip, Drizabone coat',
        text: 'Ride huge cattle stations, some larger than small countries. Drovers moved herds thousands of kilometres along stock routes. Celebrated in Banjo Paterson’s 1890 poem “The Man from Snowy River”.',
      },
    ],
  },
]

// Number the stamps continuously across all regions.
regions.flatMap((region) => region.riders).forEach((r, i) => {
  r.no = String(i + 1).padStart(2, '0')
})

function AroundTheWorld() {
  return (
    <PageLayout
      slug="around-the-world"
      heroId="gardian"
      intro="Wherever there were grasslands, cattle and horses, people invented their own kind of cowboy. Here are some of them."
      sources={['Charro', 'Gaucho', 'Huaso', 'Llanero', 'Paniolo', 'Csikós', 'Gardian', 'Butteri', 'Stockman_(Australia)']}
    >
      <p className="lead">
        Many of these traditions share one ancestor: the horse-mounted cattle herders of Spain and
        Portugal. Others grew up on their own, on the plains of Hungary or in the marshes of France.
      </p>

      {regions.map((region) => (
        <section key={region.name} className="section">
          <h2 className="section-title">{region.name}</h2>
          <div className="stamps">
            {region.riders.map((r) => (
              <article key={r.name} className="stamp">
                <Photo id={r.id} alt={`${r.name}, ${r.country}`} position="top" />
                <div className="stamp__body">
                  <span className="stamp__seal" aria-hidden="true">
                    Nº {r.no}
                  </span>
                  <p className="stamp__country">{r.country}</p>
                  <h3>{r.name}</h3>
                  <dl>
                    <dt>Home range</dt>
                    <dd>{r.land}</dd>
                    <dt>Look for</dt>
                    <dd>{r.signature}</dd>
                  </dl>
                  <p>{r.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
    </PageLayout>
  )
}

export default AroundTheWorld
