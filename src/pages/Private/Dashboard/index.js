import { Col, Row } from "antd";
import JobStatistic from "../JobStatistic";
import CVStatistic from "../CVStatistic";
import InfoCompany from "../InfoCompany"


function Dashboard() {
    return(
        <>
            <h1 style={{textAlign:"center", paddingBottom:"20px"}}>Tổng quan</h1>
            <Row style={{justifyContent:"space-between"}} gutter={[20,20]}>
                <Col span={8}>
                    <JobStatistic/>
                </Col>
                <Col span={8}>
                    <CVStatistic/>
                </Col>
                <Col span={8}>
                    <InfoCompany/>
                </Col>
            </Row>
        </>
    )
}

export default Dashboard;