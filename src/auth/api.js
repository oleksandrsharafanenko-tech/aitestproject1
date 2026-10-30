// Small fetch wrapper for the accounts server. Throws an Error carrying the
// server's message, so forms can show it directly.
export async function api(path, { method = 'GET', body } = {}) {
  let res
  try {
    res = await fetch(`/api${path}`, {
      method,
      credentials: 'same-origin',
      headers: method === 'GET' ? undefined : { 'Content-Type': 'application/json' },
      body: method === 'GET' ? undefined : JSON.stringify(body ?? {}),
    })
  } catch {
    throw new Error('Can’t reach the server. Is it running (npm run dev)?')
  }

  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.error ?? 'Can’t reach the server. Is it running (npm run dev)?')
  return data
}
