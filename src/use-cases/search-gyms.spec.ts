import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository.js'
import { SearchGymsUseCase } from './search-gyms.js'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymsRepository)
  })

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: 'JavaScript Gym 1',
      description: null,
      phone: '',
      latitude: 0,
      longitude: 0,
    })

    await gymsRepository.create({
      title: 'JavaScript Gym 2',
      description: null,
      phone: '',
      latitude: 0,
      longitude: 0,
    })

    const { gyms } = await sut.execute({
      query: 'JavaScript',
      page: 1,
    })
    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({
        title: 'JavaScript Gym 1',
      }),
      expect.objectContaining({
        title: 'JavaScript Gym 2',
      }),
    ])
  })
})
