import { getCookie } from "../../../until/token";
import { useEffect, useState } from "react";
import { getDetailCompany, updateCompany } from "../../../service/company";
import { Button, Card, Col, Form, Input, message, notification, Row } from "antd";
import "../style.scss"
import FormItem from "antd/es/form/FormItem";
import TextArea from "antd/es/input/TextArea";

function DetailInfoCompany() {
    const idCompany = getCookie("id");
    const [data, setData] = useState();
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const rules=[{ required: true, message: 'Vui lòng không bỏ trống!' }];
    const [isEdit, setIsEdit] = useState(true);

    const fetchApi = async () => {
        const res = await getDetailCompany(idCompany);
        if(res){
            setData(res);
        }
    };

    useEffect(() => {
        fetchApi();
    },[]);

    const handleEdit = () => {
        setIsEdit(false);
    }

    const handleCancel = () => {
        setIsEdit(true);
    }

    const onReload = () => {
        fetchApi();
    }

    const handleFinish = async (value) => {
        const res = await updateCompany(idCompany,value);
        if(res){
            messageApi.open({
                type: 'success',
                content: 'Cập nhật thành công!',
            });
            onReload();
            setIsEdit(true);
        }else{
            messageApi.open({
                type: 'error',
                content: 'Cập nhật không thành công!',
            });
        };
    }

    return(
        <>
            {contextHolder}
            {data && (
                <div style={{padding:"20px 0px"}}>
                    <Card 
                        title="Thông tin công ty" 
                        extra={isEdit? (
                            <Button type="primary" onClick={handleEdit}>Chỉnh sửa</Button>
                        ):(
                            <Button type="primary" onClick={handleCancel}>Hủy</Button>
                        )}>
                        <Form form={form} initialValues={data} disabled={isEdit} onFinish={handleFinish}>
                            <Row gutter={[20,20]}>
                                <Col span={24}>
                                    <FormItem labelCol={{ span: 24 }} label="Tên công ty" name="companyName" rules={rules} >
                                        <Input/>
                                    </FormItem>
                                </Col>
                                <Col span={8}>
                                    <FormItem labelCol={{ span: 24 }} label="Email" name="email" rules={rules} >
                                        <Input/>
                                    </FormItem>
                                </Col>
                                <Col span={8}>
                                    <FormItem labelCol={{ span: 24 }} label="Số điện thoại" name="phone" rules={rules} >
                                        <Input/>
                                    </FormItem>
                                </Col>
                                <Col span={8}>
                                    <FormItem labelCol={{ span: 24 }} label="Địa chỉ" name="address" rules={rules} >
                                        <Input/>
                                    </FormItem>
                                </Col>
                                <Col span={8}>
                                    <FormItem labelCol={{ span: 24 }} label="Số lượng nhân sự" name="quantityPeople" rules={rules} >
                                        <Input/>
                                    </FormItem>
                                </Col>
                                <Col span={8}>
                                    <FormItem labelCol={{ span: 24 }} label="Thời gian làm việc" name="workingTime" rules={rules} >
                                        <Input/>
                                    </FormItem>
                                </Col>
                                <Col span={8}>
                                    <FormItem labelCol={{ span: 24 }} label="Link Wedsite" name="website" rules={rules} >
                                        <Input/>
                                    </FormItem>
                                </Col>
                                <Col span={24}>
                                    <FormItem labelCol={{ span: 24 }} label="Mô tả ngắn" name="description" rules={rules} >
                                        <TextArea/>
                                    </FormItem>
                                </Col>
                                <Col span={24}>
                                    <FormItem labelCol={{ span: 24 }} label="Mô tả chi tiết" name="detail" rules={rules} >
                                        <TextArea rows={6}/>
                                    </FormItem>
                                </Col>
                                <Col span={24}>
                                    <Button htmlType="submit" type="primary">Lưu</Button>
                                </Col>
                            </Row>
                        </Form>
                    </Card>
                </div>
            )}
        </>
    )
}

export default DetailInfoCompany;