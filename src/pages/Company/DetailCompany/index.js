import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getDetailCompany, getJobByCompany } from "../../../service/company";
import { Card, Col, Row } from "antd";
import JobItem from "../../JobItem";

function DetailCompany() {
    const params = useParams();
    const [company, setCompany] = useState([]);
    const [job, setJob] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const res = await getDetailCompany(params.id);
            setCompany(res);
        };
        fetchApi();
    },[]);

    useEffect(() => {
        const fetchApi = async () => {
            const res = await getJobByCompany(params.id);
            setJob(res);
        };
        fetchApi();
    },[]);

    return(
        <>
            {company && (
                <>
                    <h1 style={{textAlign:"center"}}>Thông tin công ty</h1>
                    <Card className="mb-10" title={<h2 style={{textAlign:"center", color:"blue"}}>{company.companyName}</h2>}>
                        <div className="mb-10">
                            Địa chỉ: <strong>{company.address}</strong>
                        </div>
                        <div className="mb-10">
                            Số nhân sự: <strong>{company.quantityPeople}</strong>
                        </div>
                        <div className="mb-10">
                            Thời gian làm việc: <strong>{company.workingTime}</strong>
                        </div>
                        <div className="mb-10">
                            Link Website: <strong>{company.website}</strong>
                        </div>
                        <div className="mb-10">
                            Mô tả: {company.description}
                        </div>
                        <div className="mb-10">
                            Chi tiết: {company.detail}
                        </div>
                        <div className="mb-10">
                            Email: {company.email}
                        </div>
                        <div className="mb-10">
                            Phone: {company.phone}
                        </div>
                    </Card>
                    <h3>Danh sách các job thuộc {company.companyName}</h3>
                    <Row style={{marginBottom:"50px"}} gutter={[20,20]}>                            
                        {job.map((item,index) => (
                            item.status && (
                                <Col span={6} key={index}>
                                    <JobItem item={item} company={company}/>
                                </Col>
                            )                                                        
                        ))}
                    </Row>
                </>
            )}
        </>
    )
}

export default DetailCompany;