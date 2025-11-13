import { prisma } from "@/lib/prisma.js"
import type { UsersRepository } from "@/repositories/users-repository.js"
import { hash } from "bcryptjs"
import { UserAlredyExistsError } from "./errors/user-alredy-exists-error.js"

interface registerUseCaseRequest{
    name: string
    email: string
    password: string
}

export class RegisterUseCase{

    constructor(private usersRepository: UsersRepository){
    }

    async execute({
        name, email, password
    }: registerUseCaseRequest){
        const password_hash = await hash(password, 6)
        
        const userWithSameEmail = await this.usersRepository.findByEmail(email)

        if(userWithSameEmail){
            throw new UserAlredyExistsError()
        }

        // const prismaUsersRepository = new PrismaUsersRepository()

        await this.usersRepository.create({
            name,
            email,
            password_hash
        })
    }
}