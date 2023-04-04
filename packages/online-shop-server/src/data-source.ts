import "reflect-metadata"
import { DataSource } from "typeorm"

import { Account } from "./entity/Account"
import { Auth } from "./entity/Auth"

export const AppDataSource = new DataSource({
    type: "mongodb",
    authSource: "admin",
    database: "test",
    username: "root",
    password: "123456",
    synchronize: true,
    logging: false,
    entities: [Account, Auth],
    migrations: [],
    subscribers: []
})
