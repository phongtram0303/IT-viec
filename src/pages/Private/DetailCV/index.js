import { useParams } from "react-router-dom";
import { changeStatus, getDetailCV } from "../../../service/cv";
import { useEffect, useState } from "react";
import { Card, Tag } from "antd";
import "../style.scss"
import { getDetailJob } from "../../../service/jobs";
import CallBack from "../Callback";

function DetatailCV() {
    const [data, setData] = useState();
    const [job, setJob] = useState();
    const params = useParams();

    useEffect(() => {
        const fetchApi = async () => {
            const res = await getDetailCV(params.id);
            if(res){
                const result = await getDetailJob(res.idJob);
                setJob(result);
                setData(res);
            }
            changeStatus(params.id, {statusRead: true});
        };
        fetchApi();
    },[]);


    return(
        <>
            <CallBack/>
            {data && (
                <>
                    <Card style={{marginTop:"20px"}} title="Thông tin ứng viên">
                        <div className="mb-15">Họ tên: <strong>{data.name}</strong></div>
                        <div className="mb-15">Ngày gửi: <strong>{data.createAt}</strong></div>
                        <div className="mb-15">Số điện thoại: <strong>{data.phone}</strong></div>
                        <div className="mb-15">Email: <strong>{data.email}</strong></div>
                        <div className="mb-15">Thành phố: <strong>{data.city}</strong></div>
                        <div className="mb-3">Giới thiệu:</div>
                        <div className="mb-15">{data.description}</div>
                        <div className="mb-15">Link project:</div>
                        <div className="mb-15">{data.linkProject}</div>
                    </Card>

                    <Card style={{margin:"20px 0"}} title="Thông tin job đã ứng tuyển">
                        <div className="mb-15">Tên Job: <strong>{job.name}</strong></div>                       
                        <div className="mb-15">
                            <span>Ngôn ngữ: </span>
                            {(job.tags || []).map((item,index) => (
                                    <Tag color="blue" key={index}>{item}</Tag>
                                ))}
                        </div>
                        <div className="mb-15">
                            <span>Mức lương: </span>
                            <strong>{job.salary}$</strong>
                        </div>                     
                        <div className="mb-15">
                            <span>Thành phố: </span>
                            {(job.city || []).map((item,index) => (
                                    <Tag color="orange" key={index}>{item}</Tag>
                                ))}
                        </div>
                        <div className="mb-15">
                            <span>Mô tả: <br/> </span>
                            {job.description}
                        </div>
                    </Card>
                </>
            )}
        </>
    )
}

export default DetatailCV;