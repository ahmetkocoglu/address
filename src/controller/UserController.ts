import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { User } from "../entity/User"
import { Like } from "typeorm"

export class UserController {

    private userRepository = AppDataSource.getRepository(User)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.find({ relations: { phone: true, address: true } })
    }

    async search(request: Request, response: Response, next: NextFunction) {
        const firstName = request.query['firstName'] as string;
        const lastName = request.query['lastName'] as string;

        console.log(firstName, lastName);
        

        return this.userRepository.find({ 
            where: { 
                firstName: Like(`%${firstName}%`), 
                lastName: Like(`%${lastName}%`)
            } })
        //return this.userRepository.find({where: {firstName: firstName, lastName: lastName}})
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)


        const user = await this.userRepository.findOne({
            where: { id }
        })

        if (!user) {
            return "unregistered user"
        }
        return user
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { firstName, lastName, age }: User = request.body;
        /*
        const usr = request.body as User;
        const usr: User = request.body;
        */

        //const abc = Object.assign(new User(), usr)

        const user = Object.assign(new User(), {
            //firstName: usr.firstName,
            firstName,
            lastName,
            age
        })

        //return this.userRepository.save({firstName, lastName, age, phone, city})
        return this.userRepository.save(user)
    }

    async update(request: Request, response: Response, next: NextFunction) {
        const userId = parseInt(request.params.id);
        const { firstName, lastName, age }: User = request.body;

        return this.userRepository.update({
            id: userId
        }, {
            firstName,
            lastName,
            age
        })
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        let userToRemove = await this.userRepository.findOneBy({ id })

        if (!userToRemove) {
            return "this user not exist"
        }

        await this.userRepository.remove(userToRemove)

        return "user has been removed"
    }

}