import { useEffect, useState } from "react";
import { getCookie } from "../../../until/token";
import { getListJob } from "../../../service/jobs";
import { Card } from "antd";
import "../style.scss"

function JobStatistic() {
    const idCompany = getCookie("id");
    const [data, setData] = useState();

    useEffect(() => {
        const fetchApi = async() => {
            const res = await getListJob(idCompany);
            if(res){
                let obj={
                    total: 0,
                    statusTrue: 0,
                    statusFalse: 0
                };
                obj.total = res.length;
                res.forEach((item) => {
                    item.status ? obj.statusTrue++ : obj.statusFalse++;
                });
                setData(obj);
            }
        };
        fetchApi();
    },[]);
    
    return(
        <>
            {data ? (
                <>
                    <Card title="Job">
                    <div className="mb-10">
                        Số lượng job: <strong>{data.total}</strong>
                    </div>
                    <div className="mb-10">
                        Job đang bật: <strong>{data.statusTrue}</strong>
                    </div>
                    <div className="mb-10">
                        Job đang tắt: <strong>{data.statusFalse}</strong>
                    </div>
                </Card>
                </>
            ):(
                <>
                    Không có dữ liệu
                </>
            )}
        </>
    )
}

export default JobStatistic;