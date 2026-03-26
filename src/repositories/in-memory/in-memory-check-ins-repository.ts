import type { Prisma, CheckIn } from '@prisma/client'
import { type CheckInsRepository } from '../check-ins-repository.js'
import { randomUUID } from 'crypto'
import dayjs from 'dayjs'

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public items: CheckIn[] = []

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date') // retorna o ponto inicial do dia
    const endOdTheDay = dayjs(date).endOf('date')

    const checkinOnSameDate = this.items.find((checkIn) => {
      const checkInDate = dayjs(checkIn.created_at)
      const isOnSameDate =
        checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOdTheDay)

      return checkIn.user_id === userId && isOnSameDate
    })

    if (!checkinOnSameDate) {
      return null
    }

    return checkinOnSameDate
  }

  async findManyByUserId(userId: string): Promise<CheckIn[]> {
    return this.items.filter((item) => item.user_id === userId)
  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date(),
    }

    this.items.push(checkIn)

    return checkIn
  }
}
