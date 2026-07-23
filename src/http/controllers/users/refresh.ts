import { z } from 'zod'
import { type FastifyRequest, type FastifyReply } from 'fastify'
import { InvalidCredentialError } from '@/use-cases/errors/invalid-credentials-error.js'
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case.js'

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify({ onlyCookie: true })

  const token = await reply.jwtSign(
    {},
    {
      sign: {
        sub: request.user.sub,
      },
    },
  )

  const refreshToken = await reply.jwtSign(
    {},
    {
      sign: {
        sub: request.user.sub,
        expiresIn: '7d',
      },
    },
  )

  return reply
    .setCookie('refreshToken', refreshToken, {
      path: '/',
      secure: true,
      sameSite: true,
      httpOnly: true,
    })
    .status(200)
    .send({ token })
}
