import type { GymsRepository } from '@/repositories/gyms-repository.js'
import type { Gym } from '@prisma/client'

interface CreateGymUseCaseRequest {
  title: string
  description?: string | null
  phone?: string | null
  latitude: number
  longitude: number
}

interface CreateGymUseCaseResponse {
  gym: Gym
}

export class CreateGymUseCase {
  private gymsRepository: GymsRepository

  constructor(gymsRepository: GymsRepository) {
    this.gymsRepository = gymsRepository
  }

  async execute({
    title,
    description,
    phone,
    latitude,
    longitude,
  }: CreateGymUseCaseRequest): Promise<CreateGymUseCaseResponse> {
    const gym = await this.gymsRepository.create({
      title,
      description: description ?? null,
      phone: phone ?? null,
      latitude,
      longitude,
    })

    return { gym }
  }
}
