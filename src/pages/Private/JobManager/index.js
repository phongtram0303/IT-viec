import { useEffect, useState } from "react";
import { getListJob } from "../../../service/jobs";
import { getCookie } from "../../../until/token";
import { Button, Table, Tag } from "antd";
import { DiffOutlined,ReadOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom";
import EditJob from "../EditJob";
import DeleteJob from "../DeleteJob";

function JobManager() {
    const idCompany = getCookie("id");
    const [data, setData] = useState();

    const fetchApi = async () => {
        const res = await getListJob(idCompany);
        if(res){
            setData(res);
        }
    }

    useEffect(() => {
         fetchApi();
    },[]);

    const onReload = () => {
        fetchApi();
    }


    const columns= [
        {
            title: "Tên job",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Ngôn ngữ",
            dataIndex: "tags",
            key: "tags",
            render: (_,record) => {
                return <>
                        {(record.tags || []).map((item,index) => (
                            <Tag color="blue" key={index}>{item}</Tag>
                        ))}
                </>
            }
        },
        {
            title: "Mức lương $",
            dataIndex: "salary",
            key: "salary",
        },
        {
            title: "Ngày đăng",
            dataIndex: "createAt",
            key: "createAt",
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (_,data) => {
                return <>
                    {data.status ? (
                            <>
                                <Tag color="green">Đang bật</Tag>
                                {/* <Badge text="Còn phòng" color="Green" /> */}
                            </>
                        ):(
                            <>
                                <Tag color="gray">Đã tắt</Tag>
                                {/* <Badge text="Hết phòng" color="Red" /> */}
                            </>
                        )}
                </>                
                            
            }
        },
        {
            title: "Action",
            key: "action",
            render: (_,data) => {
                return <>
                    <Link to={`/admin/detail-job/${data.id}`}>
                        <Button style={{marginRight:"10px"}} icon={<ReadOutlined/>}></Button>
                    </Link>
                    <EditJob data={data} onReload={onReload}/>
                    <DeleteJob data={data} onReload={onReload}/>
                </>
            }
        }
    ]

    return(
        <>  
            <h2>Danh sách việc làm</h2>
            <Link to="/admin/create-job">
                <Button type="primary" style={{marginBottom:"20px"}} icon={<DiffOutlined />}>Tạo việc mới</Button>
            </Link>          
            <Table dataSource={data} columns={columns} rowKey="id" />
        </>
    )
}

export default JobManager;