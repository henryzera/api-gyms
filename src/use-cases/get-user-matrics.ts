import type { CheckInsRepository } from '@/repositories/check-ins-repository.js'

interface GetUserMatricsUseCaseRequest {
  userId: string
}

interface GetUserMatricsUseCaseResponse {
  checkInsCount: number
}

export class GetUserMatricsUseCase {
  private checkInsRepository: CheckInsRepository
  constructor(checkInsRepository: CheckInsRepository) {
    this.checkInsRepository = checkInsRepository
  }

  async execute({
    userId,
  }: GetUserMatricsUseCaseRequest): Promise<GetUserMatricsUseCaseResponse> {
    const checkInsCount = await this.checkInsRepository.countByUserId(userId)
    return { checkInsCount }
  }
}
