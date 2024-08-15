import { Button, Col, Form, Input, Row, Select } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useEffect, useState } from "react";
import { getCity } from "../../../service/city";
import { useNavigate } from "react-router-dom";

function SreachForm() {
    const navigate = useNavigate();
    const [city, setCity] = useState();

    useEffect(() => {
        const fetchApi =  async () => {
            const res = await getCity();
            if(res) {
                const objAll = {
                    key: 0,
                    value: "All"
                }     
                setCity([objAll,...res]);
            }
        };
        fetchApi();
    },[]);

    const handleFinish = (value) => {
        let city = value.city || "";
        city = value.city ==="All" ? "" : city;
        navigate(
            `/search?city=${city}&skill=${value.skill || ""}`
        ); 
    }

    return(
        <>
            <Form onFinish={handleFinish} style={{}}>
                <h1>1000+ IT Jobs For Developers</h1>
                <Row gutter={[12,12]}>
                    <Col span={6}>
                        <FormItem name="city">
                            <Select options={city} placeholder="Chọn thành phố"></Select>
                        </FormItem>
                    </Col>
                    <Col span={6}>
                        <FormItem name="skill">
                            <Input placeholder="Nhập từ khóa"></Input>
                        </FormItem>
                    </Col>
                    <Col span={6}>
                        <FormItem>
                            <Button type="primary" htmlType="submit">Tìm kiếm</Button>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        </>
    )
}

export default SreachForm;