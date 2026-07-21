import { describe, expect, test, it, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '@/app.js'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user.js'
import { prisma } from '@/lib/prisma.js'

describe('Create (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  it('should be able to create a check-in', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const gym = await prisma.gym.create({
      data: {
        title: 'TypeScript Gym',
        latitude: -27.2092052,
        longitude: -49.6401091,
        phone: '11999999999',
      },
    })

    const response = await request(app.server)
      .post(`/gyms/${gym.id}/check-ins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        userLatitude: -27.2092052,
        userLongitude: -49.6401091,
      })

    expect(response.statusCode).toEqual(201)
  })
})
