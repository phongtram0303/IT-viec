import { Button, Card, Col, Form, Input, message, Modal, Row, Select, Switch } from "antd";
import {EditOutlined} from "@ant-design/icons"
import FormItem from "antd/es/form/FormItem";
import { getTags } from "../../../service/tags";
import { getCity } from "../../../service/city";
import { useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { updateJob } from "../../../service/jobs";
import { GetTimeCurrent } from "../../../service/getTimeCurrent";

function EditJob(props) {
    const {data, onReload} = props;
    const [form] = Form.useForm();
    const [skill, setSkill] = useState();
    const [city, setCity] = useState();
    const rules= [{ required: true, message: 'Vui lòng không bỏ trống!' }];
    const [modal, setModal] = useState(false);
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

    const openModal = () => {
        setModal(true);
    }

    const cancelModal = () => {
        setModal(false);
        form.resetFields();
    }

    const handleFinish = async(value) => {
        value.updateAt = GetTimeCurrent();
        const res = await updateJob(data.id, value);
        if(res){
            messageApi.open({
                type: 'success',
                content: 'Cập nhật thành công!',
            }); 
            setModal(false);
            onReload();
        }else{
            messageApi.open({
                type: 'error',
                content: 'Cập nhật không thành công!',
            });
        };
        console.log(res);
    }

    return(
        <>
            {contextHolder}
            <Button type="primary" icon={<EditOutlined />} onClick={openModal}/>
            <Modal open={modal} onCancel={cancelModal} title="Edit Room" footer={null}>
                <Form form={form} initialValues={data} onFinish={handleFinish}>
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
                            <FormItem labelCol={{ span: 24 }} label="Trạng thái" name="status" rules={rules}>
                                <Switch />
                            </FormItem>
                        </Col> 
                        <Col span={24}>
                            <Button type="primary" htmlType="submit">Lưu</Button>
                        </Col>   
                    </Row>
                </Form>
            </Modal>
        </>
    )
}

export default EditJob;