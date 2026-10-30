import { useEffect, useState } from 'react'

// Reads the page slug from the URL hash, e.g. "#/history" -> "history".
const readRoute = () => window.location.hash.replace(/^#\/?/, '')

function useHashRoute() {
  const [route, setRoute] = useState(readRoute)

  useEffect(() => {
    const onChange = () => {
      setRoute(readRoute())
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  return route
}

export default useHashRoute
