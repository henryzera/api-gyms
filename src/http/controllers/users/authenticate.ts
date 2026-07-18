import { z } from 'zod'
import { type FastifyRequest, type FastifyReply } from 'fastify'
import { InvalidCredentialError } from '@/use-cases/errors/invalid-credentials-error.js'
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case.js'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const autehticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = autehticateBodySchema.parse(request.body)

  try {
    const authenticateUseCase = makeAuthenticateUseCase()

    const { user } = await authenticateUseCase.execute({
      email,
      password,
    })

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
        },
      },
    )

    return reply.status(200).send({ token })
  } catch (err) {
    if (err instanceof InvalidCredentialError) {
      return reply.status(400).send({ message: err.message })
    }

    return reply.status(500).send()
  }
}
