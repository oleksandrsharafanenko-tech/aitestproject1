import credits from '../content/credits.js'
import '../pages/Account.css'

const bg = credits.ranch

// Shared frame for the sign-in, registration and profile pages: a parchment
// "ranch papers" card over a darkened ranch photo.
function AccountShell({ kicker, title, children, wide = false }) {
  return (
    <main className="account" style={{ backgroundImage: `url(${bg.src})` }}>
      <section className={`account-card${wide ? ' account-card--wide' : ''}`}>
        <p className="account-card__kicker">{kicker}</p>
        <h1 className="account-card__title">{title}</h1>
        <span className="account-card__rule" aria-hidden="true" />
        {children}
      </section>
      <a className="account__credit" href={bg.page} target="_blank" rel="noreferrer">
        Photo: {bg.author} · {bg.license}
      </a>
    </main>
  )
}

export default AccountShell
