import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository.js'
import { CreateGymUseCase } from '../create-gym.js'

export function makeCreateGymUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const createGymsUseCase = new CreateGymUseCase(gymsRepository)

  return createGymsUseCase
}
