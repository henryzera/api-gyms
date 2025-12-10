import type { UsersRepository } from "@/repositories/users-repository.js";
import { InvalidCredentialError } from "./errors/invalid-credentials-error.js";
import { compare } from "bcryptjs";
import type { User } from "@prisma/client";

interface AuthenticateUseCaseRequest {
    email: string
    password: string
}

interface AuthenticateUseCaseResponse {
    user: User
}

export class AuthenticateUseCase{
    constructor(private userRepository: UsersRepository){}

    async execute({email, password}: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse>{
        const user = await this.userRepository.findByEmail(email)

        if(!user){
            throw new InvalidCredentialError()
        }

        // Boolean =>
        const doesPasswordMatches = await compare(password, user.password_hash)

        if(!doesPasswordMatches){
            throw new InvalidCredentialError()
        }

        return { user }
    }

}