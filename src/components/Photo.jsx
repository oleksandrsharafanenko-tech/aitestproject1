import credits from '../content/credits.js'

// An image from /public/images with its Wikimedia Commons credit underneath.
function Photo({ id, alt, caption, className = '', position }) {
  const c = credits[id]
  return (
    <figure className={`photo ${className}`}>
      <img
        src={c.src}
        alt={alt}
        loading="lazy"
        style={position ? { objectPosition: position } : undefined}
      />
      <figcaption>
        {caption && <span className="photo-caption">{caption}</span>}
        <a className="photo-credit" href={c.page} target="_blank" rel="noreferrer">
          {c.author} · {c.license}
        </a>
      </figcaption>
    </figure>
  )
}

export default Photo
