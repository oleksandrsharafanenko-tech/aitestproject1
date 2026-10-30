import { mkdirSync } from 'node:fs'
import { DatabaseSync } from 'node:sqlite'
import { fileURLToPath } from 'node:url'

// One SQLite file holds everything. It lives in data/ at the project root, which is
// git-ignored and outside server/, so database writes don't restart the dev server.
const dataDir = new URL('../data/', import.meta.url)
mkdirSync(dataDir, { recursive: true })

const db = new DatabaseSync(fileURLToPath(new URL('app.db', dataDir)))

db.exec(`
  PRAGMA journal_mode = WAL;
  PRAGMA foreign_keys = ON;

  CREATE TABLE IF NOT EXISTS users (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    email         TEXT NOT NULL UNIQUE COLLATE NOCASE,
    password_hash TEXT NOT NULL,
    name          TEXT NOT NULL,
    nickname      TEXT NOT NULL DEFAULT '',
    avatar        TEXT NOT NULL DEFAULT 'hat',
    created_at    TEXT NOT NULL DEFAULT (datetime('now'))
  );

  -- Only a hash of each session token is stored, so a leaked database
  -- can't be used to log in as anyone.
  CREATE TABLE IF NOT EXISTS sessions (
    token_hash TEXT PRIMARY KEY,
    user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    expires_at INTEGER NOT NULL
  );
`)

export default db
