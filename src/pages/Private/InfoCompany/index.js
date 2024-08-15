import { useEffect, useState } from "react";
import { getCookie } from "../../../until/token";
import { getDetailCompany } from "../../../service/company";
import { Card } from "antd";
import "../style.scss"

function InfoCompany() {
    const idCompany = getCookie("id");
    const [data, setData] = useState();

    useEffect(() => {
        const fetchApi = async () => {
            const res = await getDetailCompany(idCompany);
            if(res){
                setData(res);
            }
        };
        fetchApi();
    },[]);


    return(
        <>
            {data ? (
                <>
                    <Card title="Thông tin công ty">
                        <div className="mb-3">
                            Tên công ty: <strong>{data.companyName}</strong>
                        </div>
                        <div className="mb-3">
                            Email: <strong>{data.email}</strong>
                        </div>
                        <div className="mb-3">
                            Số điện thoại: <strong>{data.phone}</strong>
                        </div>
                        <div className="mb-3">
                            Địa chỉ: <strong>{data.address}</strong>
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

export default InfoCompany;