import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Phone } from "./entity/Phone"
import { Email } from "./entity/Email"
import { Address } from "./entity/Address"
import { Country } from "./entity/Country"
import { City } from "./entity/City"
import { District } from "./entity/District"
import { Town } from "./entity/Town"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "127.0.0.1",
    port: 3306,
    username: "root",
    password: "P@ssw0rd",
    database: "address",
    synchronize: true,
    logging: false,
    entities: [User, Phone, Email, Address, Country, City, District, Town],
    migrations: [],
    subscribers: []
})
