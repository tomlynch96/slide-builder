import { defineConfig, loadEnv, type Plugin, type ViteDevServer } from 'vite'
import react from '@vitejs/plugin-react'
import type { IncomingMessage, ServerResponse } from 'node:http'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'

/**
 * Serves the Vercel-style handlers in /api during `npm run dev`, so the app
 * works locally without the Vercel CLI. In production Vercel runs them itself.
 */
function localApi(): Plugin {
  return {
    name: 'local-api',
    configureServer(server: ViteDevServer) {
      server.middlewares.use('/api', async (req: IncomingMessage, res: ServerResponse) => {
        const name = (req.url ?? '').split('?')[0].replace(/^\/+/, '')
        if (!/^[a-z0-9-]+$/.test(name) || !existsSync(resolve(server.config.root, `api/${name}.ts`))) {
          res.statusCode = 404
          res.end('Not found')
          return
        }
        try {
          const chunks: Buffer[] = []
          for await (const chunk of req) chunks.push(chunk as Buffer)
          const raw = Buffer.concat(chunks).toString('utf8')
          const body = raw ? JSON.parse(raw) : {}

          const mod = await server.ssrLoadModule(`/api/${name}.ts`)
          const vercelRes = {
            status(code: number) { res.statusCode = code; return vercelRes },
            json(data: unknown) {
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify(data))
              return vercelRes
            },
          }
          await mod.default(Object.assign(req, { body }), vercelRes)
        } catch (err) {
          console.error(`[local-api] /api/${name} failed:`, err)
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: err instanceof Error ? err.message : 'Local API error' }))
        }
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  // Expose server-only vars (e.g. ANTHROPIC_API_KEY) to the local API handlers.
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''))
  return {
    plugins: [react(), localApi()],
  }
})
