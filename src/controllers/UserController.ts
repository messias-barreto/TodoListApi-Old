import { Request, Response } from "express";
import { createUser as createUserService, findUser } from "../services/UserService"

interface IUser {
    name: string;
    login: string;
    password?: string;
    email?: string;
    admin?: boolean;
}

export class UserController {
    async create(request: Request, response: Response){
        const { name, login, password, email } = request.body
        
        const user = await createUserService({name, login, password, email});
        if(user instanceof Error){
            return response.status(400).json(user.message);
        }
        return response.status(200).json(user);
    }

    async findOneUser(request: Request, response: Response) {
        const { id } = request.params;

        const user = await findUser(id);
        return response.status(200).json(user);

    }
}