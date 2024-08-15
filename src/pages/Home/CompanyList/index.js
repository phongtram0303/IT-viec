import { Link } from "react-router-dom";
import { getCompany } from "../../../service/company";
import { useEffect, useState } from "react";
import { Card, Col, Row } from "antd";

function CompanyList() {
    const [company, setCompany] = useState([]);

    useEffect(() => {
        const fetchApi =  async () => {
            const res = await getCompany();
            setCompany(res);
        };
        fetchApi();
    },[])


    return(
        <>
            <Row gutter={[20,20]}>
                <Col span={24}>
                    <h1>Danh sách các công ty</h1>
                </Col>
                {company.map((item) => (
                    <Col span={6} key={item.id}>
                        <Card title={<Link to={`/company/${item.id}`}>{item.companyName}</Link>}>
                            <p>Địa chỉ: {item.address}</p>
                            <p>Làm việc: {item.workingTime}</p>
                        </Card>
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default CompanyList;