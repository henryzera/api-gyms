import type { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt.js'
import { create } from './create.js'
import { validate } from './validate.js'
import { history } from './history.js'
import { metrics } from './metrics.js'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/check-ins/history', history)
  app.get('/check-ins/metrics', metrics)

  app.post('/gyms/:gymId/check-ins', create)
  app.patch('check-in/:checkInId/validate', validate)
}
