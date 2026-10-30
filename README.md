# Alright, Alright, Alright

A cowboy-themed website built with React and Vite, made as a project for learning to work with AI.

The home page shows a cowboy riding out of a desert sunset. From the **Menu** in the top-left corner you can visit ten illustrated chapters about cowboy life:

1. Who are Cowboys?
2. History
3. Cowboy Cattle Breeding
4. Clothes
5. Weapons
6. Horse Riding
7. Movies
8. Country Music
9. Modern Days
10. Cowboy Analogues in Other Countries

Visitors can also **register an account** and **sign in** using the button in the top-right corner. On their profile page they can edit their name, add a cowboy nickname, pick a badge and change their password.

## Running it locally

You need [Node.js](https://nodejs.org/) 22.13 or newer, because the accounts server uses Node's built-in SQLite.

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

`npm run dev` starts two servers together:

| Server   | Address               | What it does                              |
| -------- | --------------------- | ----------------------------------------- |
| Website  | http://localhost:5173 | The React site (Vite, reloads on save)    |
| Accounts | http://localhost:3001 | Registration, sign-in and profile API     |

The website forwards every `/api/...` request to the accounts server, so in the browser you only ever use port 5173.

Other commands:

| Command           | What it does                                                    |
| ----------------- | --------------------------------------------------------------- |
| `npm run dev:web` | Start only the website                                          |
| `npm run dev:api` | Start only the accounts server                                  |
| `npm run build`   | Build the site for production into `dist/`                      |
| `npm start`       | Run the accounts server and serve the built site from `dist/` on port 3001 |
| `npm run lint`    | Check the code with ESLint                                      |

## Project structure

```
src/
  App.jsx            routes (#/history, #/login, ...) and the home page
  SkyBackdrop.jsx    generated sunset sky around the home-page photo
  SideScenery.jsx    desert silhouettes left and right of the photo
  components/        Menu, account badge, shared page layout, photo with credit
  pages/             one .jsx + .css per chapter, plus Login, Register, Profile
  auth/              who is signed in (React context) and the API helper
  content/credits.js author and licence for every photo
server/
  index.js           Express API: /api/auth/* and /api/profile
  auth.js            password hashing, sessions, login rate limit
  db.js              SQLite database setup
public/images/       photos used on the pages
data/                the accounts database (created on first run, not in git)
```

## How accounts work

- Passwords are never stored as typed. They are hashed with `scrypt` from Node's built-in `crypto` module.
- Signing in sets a session cookie that JavaScript in the page can't read (`httpOnly`). The cookie lasts 30 days. The database stores only a hash of each session token.
- Requests that change data must be sent as JSON, and the cookie isn't sent from other websites (`SameSite=Lax`). Together these protect against cross-site request forgery.
- After 10 wrong passwords, sign-in for that email from that connection is blocked for 15 minutes.
- Changing your password signs you out on all other devices.

Email verification and "forgot password" are not built yet.

## Image credits

- The home-page photo is from [Magnific](https://www.magnific.com/free-ai-image/cowboy-riding-horse-sunset_416727090.htm).
- The chapter photos come from Wikimedia Commons and are mostly public domain. Each photo's author and licence is shown under it on the page and listed in `src/content/credits.js`.
- The chapter texts are based on Wikipedia articles, which are linked at the bottom of each page.
