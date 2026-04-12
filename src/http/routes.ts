import type { FastifyInstance } from 'fastify'
import { register } from './controllers/register.js'
import { authenticate } from './controllers/authenticate.js'
import { profile } from './controllers/profile.js'

export async function appRoutes(app: FastifyInstance) {
  /** Public */
  app.post('/users', register)
  app.post('/session', authenticate)

  /** Authenticated */
  app.get('/me', profile)
}
