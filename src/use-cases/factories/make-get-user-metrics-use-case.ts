import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository.js'
import { GetUserMatricsUseCase } from '../get-user-matrics.js'

export function makeGetUserMatricsUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const getUserMatricsUseCase = new GetUserMatricsUseCase(checkInsRepository)

  return getUserMatricsUseCase
}
