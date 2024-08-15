import { Button, Card, Col, Form, Input, message, Row, Select, Switch } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useEffect, useState } from "react";
import { getTags } from "../../../service/tags";
import { Option } from "antd/es/mentions";
import { getCity } from "../../../service/city";
import TextArea from "antd/es/input/TextArea";
import { getCookie } from "../../../until/token";
import { GetTimeCurrent } from "../../../service/getTimeCurrent";
import { createJob } from "../../../service/jobs";
import CallBack from "../Callback";

function CreateJob(){
    const idCompany = getCookie("id");
    const [form] = Form.useForm();
    const rules= [{ required: true, message: 'Vui lòng không bỏ trống!' }];
    const [skill, setSkill] = useState();
    const [city, setCity] = useState();
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        const fetchApi = async () => {
            const res = await getTags();
            if(res){
                setSkill(res);
            }
        };
        fetchApi();
    },[]);

    useEffect(() => {
        const fetchApi = async () => {
            const res = await getCity();
            if(res){
                setCity(res);
            }
        };
        fetchApi();
    },[]);

    const handleFinish = (value) => {
        value.idCompany = idCompany;
        value.createAt = GetTimeCurrent();
        const res = createJob(value);
        if(res){
            form.resetFields();
            messageApi.open({
                type: 'success',
                content: 'Tạo mới thành công!',
            });
        }else{
            messageApi.open({
                type: 'error',
                content: 'Tạo mới không thành công!',
            });
        };
    }

    return(
        <>
            <CallBack/>
            {contextHolder}
            <Card style={{marginTop:"20px"}} title="Tạo việc mới">
                <Form form={form} onFinish={handleFinish}>
                    <Row gutter={[20,20]}>
                        <Col span={24}>
                            <FormItem labelCol={{ span: 24 }}  label="Tên job" name="name" rules={rules}>
                                <Input/>
                            </FormItem>
                        </Col>
                        <Col span={16}>
                            <FormItem labelCol={{ span: 24 }}  label="Ngôn ngữ" name="tags" rules={rules}>
                                <Select mode="multiple" options={skill}></Select>
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem labelCol={{ span: 24 }} label="Mức lương $" name="salary" rules={rules}>
                                <Input/>
                            </FormItem>
                        </Col>  
                        <Col span={24}>
                            <FormItem labelCol={{ span: 24 }}  label="Thành phố" name="city" rules={rules}>
                                <Select mode="multiple" options={city}></Select>
                            </FormItem>
                        </Col>
                        <Col span={24}>
                            <FormItem labelCol={{ span: 24 }} label="Mô tả" name="description" rules={rules}>
                                <TextArea rows={4}/>
                            </FormItem>
                        </Col>  
                        <Col span={24}>
                            <FormItem labelCol={{ span: 24 }} label="Trạng thái" name="status" rules={rules} initialValue={false}>
                                <Switch />
                            </FormItem>
                        </Col> 
                        <Col span={24}>
                            <Button type="primary" htmlType="submit">Tạo mới</Button>
                        </Col>   
                    </Row>
                </Form>
            </Card>
        </>
    )
}

export default CreateJob;