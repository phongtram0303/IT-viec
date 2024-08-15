import { Button, Col, Input, Row, Form, message } from "antd";
import FormItem from "antd/es/form/FormItem";
import { checkLogin } from "../../service/user";
import {setCookie} from "../../until/token";
import { useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux";
import {checkLoginA} from "../../action/login"

function Login(){
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const dispatch = useDispatch();

    const handleSubmit = async(value) => {
        const data = await checkLogin(value.email, value.password);
        if(data.length > 0 ){
            const time = 1;
            setCookie("id", data[0].id, time);
            setCookie("companyName", data[0].companyName, time);
            setCookie("email", data[0].email, time);
            setCookie("token", data[0].token, time);
            dispatch(checkLoginA(true));
            navigate("/");
        }else{
            messageApi.error("Tài khoản hoặc mật khẩu không chính xác!")
        }
    }

    return(
        <>
            {contextHolder}
            <div style={{display:"flex", justifyContent:"center"}}>
                <Form onFinish={handleSubmit} layout="horizontal" form={form} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} size="middle">
                <h2>Đăng nhập</h2>
                    <FormItem label="Email" name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
                        <Input/>
                    </FormItem>
                    <FormItem label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                        <Input.Password/>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit">
                            Login
                        </Button>
                    </FormItem>
                </Form>
            </div>
        </>
    )
}

export default Login;