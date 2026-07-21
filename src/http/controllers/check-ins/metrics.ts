import { type FastifyRequest, type FastifyReply } from 'fastify'
import { makeGetUserMatricsUseCase } from '@/use-cases/factories/make-get-user-metrics-use-case.js'

export async function metrics(request: FastifyRequest, reply: FastifyReply) {
  const getUserMetricsUseCase = makeGetUserMatricsUseCase()

  const { checkInsCount } = await getUserMetricsUseCase.execute({
    userId: request.user.sub,
  })

  return reply.status(201).send({
    checkInsCount,
  })
}
