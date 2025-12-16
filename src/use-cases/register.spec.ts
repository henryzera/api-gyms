import {beforeEach, describe, expect, it} from 'vitest'
import { RegisterUseCase } from './register.js';
import { compare, hash } from 'bcryptjs';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository.js';
import { UserAlredyExistsError } from './errors/user-alredy-exists-error.js';
import type { UsersRepository } from '@/repositories/users-repository.js';

let usersRepository: UsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
    beforeEach(()=>{
        usersRepository = new InMemoryUsersRepository
        sut = new RegisterUseCase(usersRepository)
    })

    it('should able to register', async ()=>{
        
        const userData = {
            name: "John Doe",
            email: "johndoe@example.com",
            password: "123456",
        }

        const { user } = await sut.execute(userData)

        expect(user.id).toEqual(expect.any(String))
    })    

    it('should hash user password', async ()=>{
        const usersRepository = new InMemoryUsersRepository
        const registerUseCase = new RegisterUseCase(usersRepository)
        const userData = {
            name: "John Doe",
            email: "johndoe@example.com",
            password: "123456",
        }

        const { user } = await registerUseCase.execute(userData)

        const isPasswordCorrectlyHashed = await compare(
            userData.password,
            user.password_hash
        )

        expect(isPasswordCorrectlyHashed).toBe(true)
    })

    it('should not be able to register with same email twice', async ()=>{
        const usersRepository = new InMemoryUsersRepository
        const registerUseCase = new RegisterUseCase(usersRepository)

        const email = 'johndoe@example.com'

        await registerUseCase.execute({
            name: 'John Doe',
            email,
            password: '123456'
        })

        await expect(registerUseCase.execute({
                name: 'John Doe',
                email,
                password: '123456'
            })
        ).rejects.toBeInstanceOf(UserAlredyExistsError)
    })
})
