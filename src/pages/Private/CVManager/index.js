import { useEffect, useState } from "react";
import { getListCV } from "../../../service/cv";
import { getCookie } from "../../../until/token";
import { getDetailJob, getListJob } from "../../../service/jobs";
import { Button, Table, Tag } from "antd";
import { Link } from "react-router-dom";
import { DiffOutlined,ReadOutlined } from "@ant-design/icons";
import DeleteCV from "../DeleteCV";

function CVManager() {
    const idCompany = getCookie("id");
    const [data, setData] = useState([]);
    const [jobNames, setJobNames] = useState({}); // Tạo trạng thái lưu tên công việc

    const fetchApi = async () => {
        const res = await getListCV(idCompany);
        if (res) {
            setData(res.reverse());
        }
    };

    useEffect(() => {
        fetchApi();
    }, []);

    const fetchJobName = async (id) => {
        const res = await getDetailJob(id);
        if (res) {
            setJobNames((prev) => ({
                ...prev,
                [id]: res.name,
            }));
        }
    };

    const onReload = () => {
        fetchApi();
    }

    useEffect(() => {
        // Khi data thay đổi, lấy tên công việc cho từng idJob nếu chưa có
        data.forEach((record) => {
            if (record.idJob && !jobNames[record.idJob]) {
                fetchJobName(record.idJob);
            }
        });
    }, [data]);

    const columns = [
        {
            title: "Tên job",
            dataIndex: "idJob",
            key: "idJob",
            render: (_, record) => {
                return <>{jobNames[record.idJob] || "Loading..."}</>;  // Hiển thị tên công việc hoặc "Loading..."
            },
        },
        {
            title: "Họ tên",
            dataIndex: "name",
            key: "name"
        },
        {
            title: "Số điện thoại",
            dataIndex: "phone",
            key: "phone"
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email"
        },
        {
            title: "Ngày gửi",
            dataIndex: "createAt",
            key: "createAt"
        },
        {
            title: "Trạng thái",
            dataIndex: "statusRead",
            key: "statusRead",
            render: (_,record) => {
                return <>
                    {record.statusRead ? (
                        <Tag color="green">Đã đọc</Tag>
                    ): (
                        <Tag color="gray">Chưa đọc</Tag>
                    )}
                </>            
            }
        },
        {
            title: "Action",
            key: "action",
            render: (_,record) => {
                return <>
                    <Link to={`/admin/detail-cv/${record.id}`}>
                        <Button style={{marginRight:"10px"}} icon={<ReadOutlined/>}></Button>
                    </Link>                
                    <DeleteCV data={record} onReload={onReload}/>
                </>
            }
        }
    ]

    return(
        <>
            {data && (
                <>
                    <h2>Danh sách CV</h2>
                    <Table style={{marginTop:"20px"}} dataSource={data} columns={columns} rowKey="id" />
                </>
            )}            
        </>
    )
}

export default CVManager;