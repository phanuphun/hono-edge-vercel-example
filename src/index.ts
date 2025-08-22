import { Hono } from 'hono'
import { version } from 'hono/jsx'

export const config = { runtime: 'edge' }
const app = new Hono()

app.get('/', (c) => {
  return c.json({
    message: 'Hello Hono!',
    version: '1.0.0',
    api: 'hono edge function - geo based'
  })
})
 
app.get('/api/hello', (c) => {
  const url = new URL(c.req.url)
  const override = url.searchParams.get('country')
  const country =
    override ??
    c.req.header('x-vercel-ip-country') ??
    'unknown'
  c.header('Vary', 'x-vercel-ip-country', { append: true })
  return c.json({ runtime: 'edge', country })
})

export default app
