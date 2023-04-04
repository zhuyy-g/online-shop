import { Entity, ObjectIdColumn, ObjectID, Column } from "typeorm"

@Entity()
export class Auth {
    @ObjectIdColumn()
    public id: ObjectID

    @Column()
    public user_id: string

    @Column()
    public token: string

    @Column()
    public expires_date: number

    @Column()
    public update_time: number
}
