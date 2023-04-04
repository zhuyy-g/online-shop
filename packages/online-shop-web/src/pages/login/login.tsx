import { Form, Button, Input } from "react-vant"
import { useNavigate } from "react-router-dom"

import "./index.less"
import { reqLogin } from "../../api/index"

const Login = () => {
    const [form] = Form.useForm()
    const navigate = useNavigate()

    const onFinish = (values: any) => {
        reqLogin(values).then((res) => {
            if (res.data.msg === "ok") {
                // 将用户ID（uid或者userName）和有效时间（1个月）以及Token保存在cookie中
                const { token, userid } = res.data.data
                const d = new Date()
                d.setDate(d.getDate() + 1)
                document.cookie = `token = ${token}`
                document.cookie = `expires = ${d}`
                document.cookie = `userId = ${userid}`

                window.sessionStorage.setItem("token", token)
                navigate("/")
            }
        })
    }

    return (
        <div className="login-warp">
            <div className="login-warp-title">登录</div>
            <Form
                form={form}
                onFinish={onFinish}
                footer={
                    <div style={{ margin: "16px 16px 0" }}>
                        <Button round nativeType="submit" type="primary" block>
                            提交
                        </Button>
                    </div>
                }
            >
                <Form.Item
                    rules={[{ required: true, message: "请填写用户名" }]}
                    name="name"
                    label="用户名"
                >
                    <Input placeholder="请输入用户名" name="name" />
                </Form.Item>
                <Form.Item
                    rules={[{ required: true, message: "请填写密码" }]}
                    name="password"
                    label="密码"
                >
                    <Input placeholder="请输入密码" type="password" name="password" />
                </Form.Item>
            </Form>
            <div className="login-warp-text" onClick={() => navigate("/register")}>
                没有账号 去注册
            </div>
        </div>
    )
}

export default Login
