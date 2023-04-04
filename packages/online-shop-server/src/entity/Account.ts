import { Entity, ObjectIdColumn, ObjectID, Column } from "typeorm"

@Entity()
export class Account {
    @ObjectIdColumn()
    public id: ObjectID

    @Column()
    public name: string

    @Column()
    public password: string

    @Column()
    public expiresDate: string

    @Column()
    public createDate: string

    @Column()
    public updateDate: string
}
