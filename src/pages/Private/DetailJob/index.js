import { useEffect, useState } from "react";
import { getDetailJob } from "../../../service/jobs";
import { useParams } from "react-router-dom";
import { Card, Row, Tag } from "antd";
import "../style.scss"
import CallBack from "../Callback";

function DetailJob(props) {
    const [data, setData] = useState();
    const params = useParams();

    useEffect(() => {
        const fetchApi = async () => {
            const res = await getDetailJob(params.id);
            if(res){
                setData(res);
            }
        };
        fetchApi();
    },[])

    return(
        <>
            <CallBack/>
            {data && (
                <>
                    <Card style={{marginTop:"20px"}} title={<h2>THÔNG TIN JOB</h2>}>
                        <h3>Tên Job: {data.name}</h3>
                        <div className="mb-15">
                            <span>Trạng thái:</span> 
                            {(data.status) ? (<Tag color="green">Đang bật</Tag>) : (<Tag color="gray">Đang tắt</Tag>)} 
                        </div>
                        <div className="mb-15">
                            <span>Ngôn ngữ: </span>
                            {(data.tags || []).map((item,index) => (
                                    <Tag color="blue" key={index}>{item}</Tag>
                                ))}
                        </div>
                        <div className="mb-15">
                            <span>Mức lương: </span>
                            <strong>{data.salary}$</strong>
                        </div>
                        <div className="mb-15">
                            <span>Ngày tạo: </span>
                            <strong>{data.createAt}</strong>
                        </div>
                        <div className="mb-15">
                            <span>Ngày cập nhật: </span>
                            <strong>{data.updateAt}</strong>
                        </div>
                        <div className="mb-15">
                            <span>Thành phố: </span>
                            {(data.city || []).map((item,index) => (
                                    <Tag color="orange" key={index}>{item}</Tag>
                                ))}
                        </div>
                        <div className="mb-15">
                            <span>Mô tả: <br/> </span>
                            {data.description}
                        </div>
                    </Card>
                </>
            )}
        </>
    )
}

export default DetailJob;