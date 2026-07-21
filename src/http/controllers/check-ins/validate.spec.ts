import { describe, expect, test, it, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '@/app.js'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user.js'
import { prisma } from '@/lib/prisma.js'

describe('Validate (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  it('should be able to validate check-ins', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const user = await prisma.user.findFirstOrThrow()

    const gym = await prisma.gym.create({
      data: {
        title: 'TypeScript Gym',
        latitude: -27.2092052,
        longitude: -49.6401091,
        phone: '11999999999',
      },
    })

    let checkIn = await prisma.checkIn.create({
      data: {
        gym_id: gym.id,
        user_id: user.id,
      },
    })

    const response = await request(app.server)
      .patch(`/check-in/${checkIn.id}/validate`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(204)

    checkIn = await prisma.checkIn.findUniqueOrThrow({
      where: {
        id: checkIn.id,
      },
    })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
  })
})
