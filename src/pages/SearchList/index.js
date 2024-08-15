import { useEffect, useState } from "react";
import { getCompany } from "../../service/company";
import { Col, Row } from "antd";
import JobItem from "../JobItem";

function SearchList(props) {
    const {data = []} = props;  
    const [dataFinal, setDataFinal] = useState([]);

    useEffect(() =>{
        const fetchApi = async () => {
            const company = await getCompany();

            const newData = data.map((item) => {
                const infoCompany = company.find(
                    (itemCompany) => itemCompany.id == item.idCompany && itemCompany
                );
                return{
                    infoCompany: infoCompany,
                    ...item,
                };
            });
            setDataFinal(newData)
        };
        fetchApi();
    },[])


    return(
        <>
            {dataFinal.length > 0 ? (
                <div className="mt-10">
                    <Row gutter={[20,20]}>
                        {dataFinal.map((item) => (
                            <Col span={6} key={item.id}>
                                <JobItem item={item} company={item.infoCompany}/>
                            </Col>
                        ))}
                    </Row>
                </div>
            ):(
                <div className="mt-20">Không tìm thấy công việc nào</div>
            )}
        </>
    )
}

export default SearchList;