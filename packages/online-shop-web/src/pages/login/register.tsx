import { Form, Button, Input } from "react-vant"
import { useNavigate } from "react-router-dom"

import { reqRegister } from "../../api/index"
import "./index.less"

const Register = () => {
    const [form] = Form.useForm()
    const navigate = useNavigate()

    const onFinish = (values: any) => {
        reqRegister(values).then((res) => {
            if (res.data.msg === "ok") {
                navigate("/login")
            }
        })
    }

    return (
        <div className="login-warp">
            <div className="login-warp-title">注册</div>
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
                    <Input placeholder="请输入用户名" />
                </Form.Item>
                <Form.Item
                    rules={[{ required: true, message: "请填写密码" }]}
                    name="password"
                    label="密码"
                >
                    <Input placeholder="请输入密码" type="password" />
                </Form.Item>
                <Form.Item
                    rules={[{ required: true, message: "请填写密码" }]}
                    name="confirmPassword"
                    label="确认密码"
                >
                    <Input placeholder="请确认密码" type="password" />
                </Form.Item>
            </Form>
        </div>
    )
}

export default Register
