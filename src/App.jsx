import AccountBadge from './components/AccountBadge.jsx'
import Menu from './components/Menu.jsx'
import SideScenery from './SideScenery.jsx'
import SkyBackdrop from './SkyBackdrop.jsx'
import useHashRoute from './useHashRoute.js'
import WhoAreCowboys from './pages/WhoAreCowboys.jsx'
import History from './pages/History.jsx'
import CattleBreeding from './pages/CattleBreeding.jsx'
import Clothes from './pages/Clothes.jsx'
import Weapons from './pages/Weapons.jsx'
import HorseRiding from './pages/HorseRiding.jsx'
import Movies from './pages/Movies.jsx'
import CountryMusic from './pages/CountryMusic.jsx'
import ModernDays from './pages/ModernDays.jsx'
import AroundTheWorld from './pages/AroundTheWorld.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Profile from './pages/Profile.jsx'
import './App.css'

const pages = {
  'who-are-cowboys': WhoAreCowboys,
  history: History,
  'cattle-breeding': CattleBreeding,
  clothes: Clothes,
  weapons: Weapons,
  'horse-riding': HorseRiding,
  movies: Movies,
  'country-music': CountryMusic,
  'modern-days': ModernDays,
  'around-the-world': AroundTheWorld,
  // accounts (not listed in the menu; reached from the top-right badge)
  login: Login,
  register: Register,
  profile: Profile,
}

function Home() {
  return (
    <main className="scene">
      {/* generated sky continues the photo out to the sides; the photo sits centred */}
      <SkyBackdrop />
      <div className="scene__sunglow" aria-hidden="true" />
      <SideScenery side="left" />
      <SideScenery side="right" />
      <img
        className="scene__photo"
        src="/images/home-hero.jpg"
        alt="Silhouette of a cowboy riding a horse towards the camera in front of a setting sun"
      />

      <section className="hero">
        <div className="title-block">
          <span className="ornament" aria-hidden="true">
            ★ &nbsp;★&nbsp; ★
          </span>
          <h1 className="title">
            <span>Alright,</span> <span>Alright,</span> <span>Alright</span>
          </h1>
          <span className="rule" aria-hidden="true" />
        </div>
      </section>

      <a
        className="scene__credit"
        href="https://www.magnific.com/free-ai-image/cowboy-riding-horse-sunset_416727090.htm"
        target="_blank"
        rel="noreferrer"
      >
        Image: Magnific
      </a>
    </main>
  )
}

function App() {
  const route = useHashRoute()
  const Page = pages[route] ?? Home

  return (
    <>
      <Menu current={pages[route] ? route : ''} />
      <AccountBadge current={route} />
      <Page />
    </>
  )
}

export default App
