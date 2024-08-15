import { useEffect, useState } from "react";
import { getCookie } from "../../../until/token";
import { getListCV } from "../../../service/cv";
import { Card } from "antd";
import "../style.scss";

function CVtatistic() {
    const idCompany = getCookie("id");
    const [data, setData] = useState();

    useEffect(() => {
        const fetchApi = async() => {
            const res = await getListCV(idCompany);
            if(res){
                let obj = {
                    total: 0,
                    statusReadTrue: 0,
                    statusReadFalse: 0
                };

                obj.total = res.length;
                res.forEach((item) => {
                    item.statusRead ? obj.statusReadTrue++ : obj.statusReadFalse++;
                });
                setData(obj);
            };
        };
        fetchApi();
    },[]);

    return(
        <>
            {data ? (
                <>
                    <Card title="CV">
                    <div className="mb-10">
                        Số lượng CV: <strong>{data.total}</strong>
                    </div>
                    <div className="mb-10">
                        CV đã đọc: <strong>{data.statusReadTrue}</strong>
                    </div>
                    <div className="mb-10">
                        CV chưa đọc: <strong>{data.statusReadFalse}</strong>
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

export default CVtatistic;