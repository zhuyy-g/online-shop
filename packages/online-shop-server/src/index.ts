import express, { Request, Response } from "express"
import cors from "cors"
import crypto from "crypto"

import { AppDataSource } from "./data-source"
import { Account } from "./entity/Account"
import { Auth } from "./entity/Auth"

AppDataSource.initialize()
    .then(async () => {
        console.log("mongodb connected successfully.")
    })
    .catch((error) => console.log(error))

// create and setup express app
const app = express()
app.use(express.json())
app.use(cors())

// register routes

app.get("/local/users", async (req: Request, res: Response) => {
    const account = await AppDataSource.getRepository(Account).find()
    res.send({
        msg: "ok",
        data: {
            account
        }
    })
})

app.post("/local/login", async (req: Request, res: Response) => {
    console.log(req)
    const { name, password } = req.body
    await authenticate(name, password, res)
})

app.post("/local/register", async (req: Request, res: Response) => {
    const { name, password, confirmPassword } = req.body
    if (password !== confirmPassword) {
        return res.send({
            msg: "fail",
            errorInfo: {
                code: 1,
                errorMsg: "pls confirm you password!"
            }
        })
    }

    const a = new Account()
    a.name = name
    a.password = password
    await AppDataSource.getRepository(Account).save(a)
    res.send({
        msg: "ok"
    })
})

// start express server
app.listen(3001)

const authenticate = async (name: any, password: any, res: Response) => {
    const user = await AppDataSource.getRepository(Account).findOneBy({ name, password })
    const token = uuid()
    console.log(user)
    if (user === null) {
        return res.send({
            msg: "fail",
            errorInfo: {
                code: 1,
                errorMsg: "The user does not exist."
            }
        })
    }
    // 登录成功之后 判断用户是否有过登录记录
    // 有的话 根据用户id 修改权限表中的数据
    // 没有的话 往权限表中插入一条数据
    const nowAuth = await AppDataSource.getRepository(Auth).findOneBy({
        user_id: user.id.toString()
    })
    if (nowAuth) {
        nowAuth.token = token
        nowAuth.update_time = new Date().getTime()
        await AppDataSource.getRepository(Auth).save(nowAuth)
    } else {
        const temp = new Auth()
        const d = new Date()
        d.setDate(d.getDate() + 10)
        temp.user_id = user.id.toString()
        temp.token = token
        temp.expires_date = d.getTime()
        temp.update_time = new Date().getTime()
        await AppDataSource.getRepository(Auth).save(temp)
    }

    res.send({
        msg: "ok",
        data: {
            token,
            userid: user.id
        }
    })
}

const uuid = () => {
    // 将时间戳和随机数合并通过MD5加密处理形成Token
    const temp = (Date.now() + Math.floor(Math.random() * 10000000)).toString()
    const uuid = crypto.createHash("md5").update(temp).digest("hex")
    return uuid
}

// 在Auth表中根据uid 以及 Token 判断用户权限是否过期
// 待定：这里成功的情况应该返回什么数据
app.post("/local/isAuthEnable", async (req: Request, res: Response) => {
    const { token, userId } = req.body
    const userAuth = await AppDataSource.getRepository(Auth).findOneBy({ token, user_id: userId })
    if (userAuth !== null) {
        const { expires_date } = userAuth
        if (expires_date > Date.now()) {
            return res.send({
                msg: "ok",
                data: {
                    // code: 1,
                    // errorMsg: "pls confirm you password!"
                }
            })
        }
    }
    return res.send({
        msg: "fail",
        errorInfo: {
            code: 1,
            errorMsg: "User expired"
        }
    })
})

// 获取权限表中所有数据
app.get("/local/auths", async (req: Request, res: Response) => {
    const auths = await AppDataSource.getRepository(Auth).find()
    res.send({
        msg: "ok",
        data: {
            auths
        }
    })
})
