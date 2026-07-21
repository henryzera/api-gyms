import { z } from 'zod'
import { type FastifyRequest, type FastifyReply } from 'fastify'
import { makeCheckInUseCase } from '@/use-cases/factories/make-check-in-use-case.js'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createCheckinParamsSchema = z.object({
    gymId: z.string().uuid(),
  })

  const createCheckInBodySchema = z.object({
    userLatitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    userLongitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { userLatitude, userLongitude } = createCheckInBodySchema.parse(
    request.body,
  )

  const { gymId } = createCheckinParamsSchema.parse(request.params)

  const checkInUseCase = makeCheckInUseCase()

  await checkInUseCase.execute({
    userId: request.user.sub,
    gymId,
    userLatitude,
    userLongitude,
  })

  return reply.status(201).send()
}
