import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDetailJob } from "../../service/jobs";
import { getDetailCompany } from "../../service/company";
import { createCV } from "../../service/cv";
import {Button, Card, Col, Form, Input, message, notification, Row, Select, Tag} from "antd";
import "../style.scss";
import FormItem from "antd/es/form/FormItem";
import { Option } from "antd/es/mentions";
import TextArea from "antd/es/input/TextArea";
import { GetTimeCurrent } from "../../service/getTimeCurrent";

function JobDetail() {
    const params = useParams();
    const [job, setJob] = useState();
    const [form] = Form.useForm();
    const [api, contextHolder] = notification.useNotification();

    useEffect(() => {
        const fetchApi = async () =>{
            const res = await getDetailJob(params.id);
            const infoCompany = await getDetailCompany(res.idCompany);
            const dataFinal = {
                ...res,
                infoCompany: infoCompany
            };
            setJob(dataFinal);
        };
        fetchApi();
    },[]);

    const handleFinsh = async(value) => {
        value.idJob = job.id;
        value.idCompany = job.infoCompany.id;
        value.createAt = GetTimeCurrent();
        const res = await createCV(value);

        if(res) {
            form.resetFields();
            api.success({
                message: "Gửi yêu cầu thành công!",
                description: "Nhà tuyển dụng sẽ liên hệ lại với bạn trong thời gian sớm nhất!"
            });
        }else{
            api.error({
                message: "Gửi yêu cầu không thành công!",
                description: "Hệ thống đang gặp lỗi, vui lòng gửi lại yêu cầu!"
            });
        }
    }

    return(
        <>
            {contextHolder}
            {job && (
                <>
                    <h1>{job.name}</h1>
                    <Button className="mb-10" type="primary" size="large" href="#formApply" style={{textDecoration:"none"}}>ỨNG TUYỂN NGAY</Button>
                    <div className="mb-10">
                        <span>Ngôn ngữ: </span>
                        {(job.tags || []).map((item,index) => (
                            <Tag color="blue" key={index}>{item}</Tag>
                        ))}
                    </div>
                    <div className="mb-10">
                        <span>Thành phố: </span>
                        {(job.city || []).map((item,index) => (
                            <Tag color="orange" key={index}>{item}</Tag>
                        ))}
                    </div>
                    <div className="mb-10">Mức lương: <strong>{job.salary}</strong></div>
                    <div className="mb-10">Địa chỉ: <strong>{job.infoCompany.address}</strong></div>
                    <div className="mb-10">Mô tả công việc: </div>
                    <div className="mb-10">{job.description}</div>
                    <div className="mb-10">Giới thiệu công ty: </div>
                    <div style={{marginBottom:"30px"}}>{job.infoCompany.description}</div>

                    <Card title="Ứng tuyển ngay" id="formApply">
                        <Form name="form_apply" form={form} onFinish={handleFinsh}>
                            <Row gutter={20}>
                                <Col span={6}>
                                    <FormItem labelCol={{ span: 24 }}  label="Họ tên" name="name" rules={[{ required: true, message: 'Please input your name!' }]}>
                                        <Input/>
                                    </FormItem>
                                </Col>
                                <Col span={6}>
                                    <FormItem labelCol={{ span: 24 }}  label="SĐT" name="phone" rules={[{ required: true, message: 'Please input your Phone number!' }]}>
                                        <Input/>
                                    </FormItem>
                                </Col>
                                <Col span={6}>
                                    <FormItem labelCol={{ span: 24 }}  label="Email" name="email" rules={[{ required: true, message: 'Please input your Email!' }]}>
                                        <Input/>
                                    </FormItem>
                                </Col>
                                <Col span={6}>
                                    <FormItem labelCol={{ span: 24 }}  label="Thành phố" name="city" rules={[{ required: true, message: 'Please input your Email!' }]}>
                                        <Select>
                                            {job.city.map((item,index) => (
                                                <Option value={item} label={item} key={index}></Option>
                                            ))}
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col span={24}>
                                    <FormItem labelCol={{ span: 24 }} label="Giới thiệu bản thân" name="description">
                                        <TextArea rows={6}/>
                                    </FormItem>
                                </Col>
                                <Col span={24}>
                                    <FormItem labelCol={{ span: 24 }} label="Danh sách các project đã làm" name="linkProject">
                                        <TextArea rows={6}/>
                                    </FormItem>
                                </Col>
                                <Col span={24}>
                                    <Button type="primary" htmlType="submit">Gửi yêu cầu</Button>
                                </Col>
                            </Row>
                        </Form>
                    </Card>
                </>)}
        </>
    )
}

export default JobDetail;