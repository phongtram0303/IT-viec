import { Card, Tag } from "antd";
import { Link } from "react-router-dom";

function JobItem(props){
    const {item, company} = props;
    return(
        <>
            <Card key={item.id} title={<Link to={`/jobs/${item.id}`}>{item.name}</Link>}  style={{margin:"10px"}}>
                <div style={{marginBottom:"10px"}}>
                    <span>Ngôn ngữ: </span>
                    {item.tags.map((item,index) => (
                        <Tag color="blue" key={index}>{item}</Tag>
                    ))}
                </div>
                <div style={{marginBottom:"10px"}}>
                    <span>Thành phố: </span>
                    {item.city.map((item,index) => (
                        <Tag color="orange" key={index}>{item}</Tag>
                    ))}
                </div>
                <div style={{marginBottom:"10px"}}>
                    Lương: <strong>{item.salary}$</strong>
                </div>
                <div style={{marginBottom:"10px"}}>
                    Công ty: <strong>{company.companyName}</strong>
                </div>
                <div style={{marginBottom:"10px"}}>
                    Ngày tạo: <strong>{item.createAt}</strong>
                </div>
            </Card>
        </>
    )
}

export default JobItem;