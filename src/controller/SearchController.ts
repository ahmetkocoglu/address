import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Town } from "../entity/Town"
import { Like } from "typeorm"

export class SearchController {

    private townRepository = AppDataSource.getRepository(Town)

    async all(request: Request, response: Response, next: NextFunction) {
        const search = request.query['search'] as string

        return this.townRepository.find({
            where: [
                { name: Like(`%${search}%`) },
                {
                    district: {
                        name: Like(`%${search}%`),
                    }
                },
                {
                    district: {
                        city: { name: Like(`%${search}%`) }
                    }
                },
                {
                    district: {
                        city: { country: { name: Like(`%${search}%`) } }
                    }
                },
            ],
            relations: {
                district: { city: { country: true } },
                address: { user: { email: true, phone: true } },
            }
        })
    }
}