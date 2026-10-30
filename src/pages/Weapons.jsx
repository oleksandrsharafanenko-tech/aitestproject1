import PageLayout from '../components/PageLayout.jsx'
import Photo from '../components/Photo.jsx'
import './Weapons.css'

const exhibits = [
  {
    id: 'colt',
    name: 'Colt Single Action Army',
    nickname: '“The Peacemaker”',
    specs: [
      ['Type', 'Six-shot single-action revolver'],
      ['Introduced', '1873'],
      ['Calibre', '.45 Colt (later many others)'],
      ['Fame', 'US Army standard revolver 1873–1892'],
    ],
    text: 'The hammer has to be cocked by hand before every shot. Simple, tough and reliable, it became the definitive Western six-shooter.',
  },
  {
    id: 'winchester',
    name: 'Winchester Model 1873',
    nickname: '“The Gun that Won the West”',
    specs: [
      ['Type', 'Lever-action repeating rifle'],
      ['Introduced', '1873'],
      ['Calibre', '.44-40 (and others)'],
      ['Fame', 'Over 700,000 made'],
    ],
    text: 'Work the lever and a new cartridge loads. Because Colt also made revolvers for the .44-40 cartridge, a cowboy could carry one type of ammunition for both guns.',
  },
  {
    id: 'bowie',
    name: 'Bowie knife',
    nickname: 'The frontier blade',
    specs: [
      ['Type', 'Large fixed-blade knife'],
      ['Introduced', '1830s'],
      ['Named after', 'Jim Bowie'],
      ['Fame', 'The 1827 Sandbar Fight'],
    ],
    text: 'Designed by Rezin Bowie for his brother Jim. On the range, a big knife was mostly for cutting rope, skinning, cooking and all the daily jobs of camp life.',
  },
  {
    id: 'lasso',
    name: 'The lariat',
    nickname: 'The tool used every single day',
    specs: [
      ['Type', 'Rope with a running loop'],
      ['From', 'Spanish la reata'],
      ['Made of', 'Rawhide, hemp, later nylon'],
      ['Fame', 'The real cowboy “weapon”'],
    ],
    text: 'Far more important than any gun. A cowboy used the rope to catch cattle for branding and doctoring, pull animals out of mud and catch horses from the remuda.',
  },
]

function Weapons() {
  return (
    <PageLayout
      slug="weapons"
      heroId="colt"
      intro="Six-shooters, rifles, knives and the humble rope. The real tools of the trail, and how they differ from the movies."
      sources={['Colt_Single_Action_Army', 'Winchester_Model_1873', 'Bowie_knife', 'Lasso', 'Cowboy']}
    >
      <section className="section">
        <h2 className="section-title">The display case</h2>
        <div className="exhibits">
          {exhibits.map((e, i) => (
            <article key={e.id} className="exhibit">
              <div className="exhibit__media">
                <Photo id={e.id} alt={e.name} />
                <span className="exhibit__number">No. {i + 1}</span>
              </div>
              <div className="exhibit__body">
                <h3>{e.name}</h3>
                <p className="exhibit__nick">{e.nickname}</p>
                <table className="exhibit__specs">
                  <tbody>
                    {e.specs.map(([k, v]) => (
                      <tr key={k}>
                        <th scope="row">{k}</th>
                        <td>{v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p>{e.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Myth vs. reality</h2>
        <div className="myths">
          <div className="myth">
            <p className="myth__tag">Myth</p>
            <p>Cowboys settled every argument with a quick-draw duel in the street.</p>
          </div>
          <div className="myth myth--real">
            <p className="myth__tag">Reality</p>
            <p>
              Gunfights were rare. Guns were heavy, expensive tools, used mostly against snakes and
              wolves, to put down injured animals, or to turn a stampede.
            </p>
          </div>
          <div className="myth">
            <p className="myth__tag">Myth</p>
            <p>Everyone in a Wild West town walked around armed.</p>
          </div>
          <div className="myth myth--real">
            <p className="myth__tag">Reality</p>
            <p>
              Many cattle towns, including Dodge City and Tombstone, banned carrying guns in town.
              Cowboys had to hand them in on arrival. Enforcing such a law helped spark the 1881
              gunfight at the O.K. Corral.
            </p>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}

export default Weapons
