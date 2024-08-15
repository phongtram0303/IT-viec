import { useEffect, useState } from "react";
import { getTags } from "../../../service/tags";
import { Link } from "react-router-dom";
import { Tag } from "antd";

function SkillList() {
    const [tag, setTag] = useState([]);

    useEffect(() => {
        const fetchApi =  async () => {
            const res = await getTags();           
                setTag(res);
        };
        fetchApi();
    },[]);
    return(
        <>
                {tag.map((item) => (
                    <Link to={`/search?skill=${item.value || ""}`} key={item.key}>
                        <Tag color="blue">{item.value}</Tag>
                    </Link>
                ))}
        </>
    )
}

export default SkillList;