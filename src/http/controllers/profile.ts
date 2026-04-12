// import { z } from 'zod'
import { type FastifyRequest, type FastifyReply } from 'fastify'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  return reply.status(200).send()
}
