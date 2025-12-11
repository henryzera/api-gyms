import { z } from 'zod'
import {type FastifyRequest, type FastifyReply} from 'fastify'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository.js'
import { AuthenticateUseCase } from '@/use-cases/authenticate.js'
import { InvalidCredentialError } from '@/use-cases/errors/invalid-credentials-error.js'

export async function authenticate(request: FastifyRequest, reply: FastifyReply){
    const autehticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6)
    })

    const { email, password} = autehticateBodySchema.parse(request.body)
     
    try{
        const usersRepository = new PrismaUsersRepository()
        const authenticateUseCase = new AuthenticateUseCase(usersRepository)

        await authenticateUseCase.execute({
            email,
            password
        })
    }
    catch(err){
        if(err instanceof InvalidCredentialError){
            return reply.status(400).send({message: err.message})
        }

        return reply.status(500).send()
    }

    return reply.status(200).send()
}
