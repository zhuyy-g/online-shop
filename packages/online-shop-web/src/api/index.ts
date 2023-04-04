// 与后台交互入口模块
import axios from "axios"
import { CustomerInfo } from "../ts-type/customer"

// 以下两个接口使用nodejs解决
// 注册接口
// 调用时的写法 reqRegister({username, password, type})
export const reqRegister = (user: CustomerInfo) =>
    axios.post("http://localhost:3001/local/register", user)
// 登录接口
export const reqLogin = ({ name, password }: CustomerInfo) =>
    axios.post("http://localhost:3001/local/login", { name, password })
// 鉴权接口
export const reqAuth = ({ token, userId }: { token: string; userId: string }) =>
    axios.post("http://localhost:3001/local/isAuthEnable", { token, userId })

// 以下接口使用网上已有接口解决（http://dishaxy.dishait.cn/doc/3/docnav/162）
// 获取首页分类和基础数据
export const reqIndexCategory = () => axios.get("/api/index_category/data")

// 获取指定商品详情数据
export const reqGoodsDetail = (id: string) => axios.get("/api/goods/" + id)
