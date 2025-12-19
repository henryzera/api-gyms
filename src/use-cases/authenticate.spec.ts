import {beforeEach, describe, expect, it} from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository.js';
import { AuthenticateUseCase } from './authenticate.js';
import { hash } from 'bcryptjs';
import { InvalidCredentialError } from './errors/invalid-credentials-error.js';

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {

    beforeEach(()=>{
        usersRepository = new InMemoryUsersRepository()
        sut = new AuthenticateUseCase(usersRepository)
    })

    it('should able to authenticate', async ()=>{
        

        await usersRepository.create({
            name: "John Doe",
            email: "johndoe@example.com",
            password_hash: await hash("123456", 6),
        })

        //system under test
        const userData = {
            email: "johndoe@example.com",
            password: "123456",
        }

        const { user } = await sut.execute(userData)

        expect(user.id).toEqual(expect.any(String))
    })

    it('should able to authenticate with wrong email', async ()=>{
        await expect(async ()=>
            await sut.execute({
            email: "johndoee@example.com",
            password: "123456",
        })).rejects.toBeInstanceOf(InvalidCredentialError)


        // const userData = {
        //     email: "johndoee@example.com",
        //     password: "123456",
        // }

        // const user = await sut.execute(userData)
        // expect({user}).rejects.toBeInstanceOf(InvalidCredentialError)
    })

    it('should able to authenticate with wrong password', async ()=>{
        await usersRepository.create({
            name: "John Doe",
            email: "johndoe@example.com",
            password_hash: await hash("123456", 6),
        })

        await expect(async ()=>
            await sut.execute({
            email: "johndoee@example.com",
            password: "1234566",
        })).rejects.toBeInstanceOf(InvalidCredentialError)

    })  

})
