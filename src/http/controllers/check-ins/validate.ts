import { z } from 'zod'
import { type FastifyRequest, type FastifyReply } from 'fastify'
import { makeValidateCheckInUseCase } from '@/use-cases/factories/make-validate-check-in-use-case.js'

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const validateCheckinParamsSchema = z.object({
    checkInId: z.string().uuid(),
  })

  const { checkInId } = validateCheckinParamsSchema.parse(request.params)

  const validateCheckInUseCase = makeValidateCheckInUseCase()

  await validateCheckInUseCase.execute({
    checkInId,
  })

  return reply.status(204).send()
}
