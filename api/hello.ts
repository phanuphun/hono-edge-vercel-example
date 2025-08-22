import { Hono } from 'hono'
import { handle } from 'hono/vercel'

// ให้ Vercel รู้ว่ารันที่ Edge
export const config = {
  runtime: 'edge',
}

type Vars = { country: string }
const app = new Hono<{ Variables: Vars }>().basePath('/api')


// middleware
app.use('*', async (c, next) => {
  const url = new URL(c.req.url)
  const override = url.searchParams.get('country') ?? undefined
  const fromHeader = c.req.header('x-vercel-ip-country') ?? undefined
  c.set('country', (override ?? fromHeader ?? 'unknown').toUpperCase())
  
  c.header('Vary', 'x-vercel-ip-country', { append: true })
  await next()
})

app.get('/', (c) => {
  return c.json({
    message: 'Hello Hono!',
    version: '1.0.0',
    api: 'hono edge function - geo based',
  })
})


app.get('/hello', (c) => {
  return c.json({ runtime: 'edge', country: c.get('country') })
})

export default handle(app)
