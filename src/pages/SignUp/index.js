import { Button, Col, Input, Row, Form, message } from "antd";
import FormItem from "antd/es/form/FormItem";
import {useNavigate} from "react-router-dom";
import {generateToken} from "../../until/token"
import { checkExits } from "../../service/user";
import { createCompany } from "../../service/company";

function SignUp(){
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();

    const handleFinish = async(value) => {
        value.token = generateToken();
        const checkExitsEmail = await checkExits("email", value.email);
        const checkExitsPhone = await checkExits("phone", value.phone);

        if (checkExitsEmail.length > 0) {
            messageApi.error("Email đã tồn tại!");
            console.log(value.email)
        }else if(checkExitsPhone.lenght > 0){
            messageApi.error("Số điện thoại đã tồn tại!");
        }else{
            const res = await createCompany(value);
            if (res) {
                messageApi.success("Chúc mừng bạn đã ký tài khoản thành công!");
                setTimeout(() => {
                    navigate("/login");
                }, 1000); // Đợi 1 giây (1000 ms)
            }
        }
    }

    return(
        <>
            {contextHolder}
            <div style={{display:"flex", justifyContent:"center"}}>
                <Form onFinish={handleFinish} layout="horizontal" form={form} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} size="middle">
                <h2>Đăng ký</h2>
                    <FormItem label="Tên công ty" name="companyName" rules={[{ required: true, message: 'Please input your company name!' }]}>
                        <Input/>
                    </FormItem>
                    <FormItem label="Email" name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
                        <Input/>
                    </FormItem>
                    <FormItem label="SĐT" name="phone" rules={[{ required: true, message: 'Please input your phone number!' }]}>
                        <Input/>
                    </FormItem>
                    <FormItem label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                        <Input.Password/>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit">
                            Sign Up
                        </Button>
                    </FormItem>
                </Form>
            </div>
        </>
    )
}

export default SignUp;