import { useEffect, useRef, useState } from 'react'
import routes from '../pages/routes.js'
import './Menu.css'

function Menu({ current }) {
  const [open, setOpen] = useState(false)
  const navRef = useRef(null)

  // Close on Escape or on a click anywhere outside the menu.
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    const onClick = (e) => {
      if (!navRef.current?.contains(e.target)) setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onClick)
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <nav className="menu" ref={navRef} aria-label="Main">
      <button
        type="button"
        className="menu-toggle"
        aria-expanded={open}
        aria-controls="menu-list"
        onClick={() => setOpen((o) => !o)}
      >
        <span className={`menu-icon${open ? ' is-open' : ''}`} aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        Menu
      </button>

      {open && (
        <ul id="menu-list" className="menu-list">
          <li>
            <a
              href="#/"
              className="menu-home"
              aria-current={current === '' ? 'page' : undefined}
              onClick={close}
            >
              ★ Home
            </a>
          </li>
          {routes.map((r, i) => (
            <li key={r.slug}>
              <a
                href={`#/${r.slug}`}
                aria-current={current === r.slug ? 'page' : undefined}
                onClick={close}
              >
                <span className="menu-num">{String(i + 1).padStart(2, '0')}</span>
                {r.title}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  )
}

export default Menu
