// Profile badges. The keys must match AVATARS in server/index.js.
const avatars = {
  hat: { icon: '🤠', label: 'Cowboy hat' },
  horse: { icon: '🐎', label: 'Horse' },
  bull: { icon: '🐂', label: 'Longhorn' },
  cactus: { icon: '🌵', label: 'Cactus' },
  star: { icon: '⭐', label: 'Sheriff star' },
  guitar: { icon: '🎸', label: 'Guitar' },
  eagle: { icon: '🦅', label: 'Eagle' },
  boot: { icon: '👢', label: 'Boot' },
}

export const avatarIcon = (key) => (avatars[key] ?? avatars.hat).icon

export default avatars
