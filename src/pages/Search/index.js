import { Tag } from "antd";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SearchList from "../SearchList";
import {getAllJob} from "../../service/jobs";

function Search() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [data, setData] = useState();
    const citySearch = searchParams.get("city") || "";
    const skillSearch = searchParams.get("skill") || "";

    useEffect(() => {
        const fetchApi = async () => {
            const res = await getAllJob();
            if(res){
                const newData = res.filter((item) => {
                    const city = citySearch ? item.city?.includes(citySearch): true;
                    const skill = skillSearch?item.tags.includes(skillSearch): true;
                    const status = item.status;
                    return city && skill && status;
                });
                setData(newData.reverse());
            }
        };
        fetchApi();
    },[])
 
    return(
        <>
            <div>
                <strong>Kết quả tìm kiếm: </strong>
                {citySearch && <Tag color="orange">{citySearch}</Tag>}
                {skillSearch && <Tag color="blue">{skillSearch}</Tag>}
            </div>
            {data && (
                <SearchList data={data}/>
            )}
        </>
    )
}

export default Search;