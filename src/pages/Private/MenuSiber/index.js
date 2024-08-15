import { Menu } from "antd";
import { PieChartOutlined, BankOutlined , SolutionOutlined, LaptopOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom";

function MenuSiber() {
    const item= [
        {
            key: "general",
            icon: <PieChartOutlined />,
            label: <Link to="dashboard">Tổng quan</Link>
        },
        {
            key: 'info',
            icon: <BankOutlined />,
            label: <Link to="infoCompany">Thông tin công ty</Link>
        },
        {
            key: 'job',
            icon: <LaptopOutlined />,
            label: <Link to="jobManager">Quản lý việc làm</Link>
        },
        {
            key: 'cv',
            icon: <SolutionOutlined />,
            label: <Link to="cvManager">Quản lý CV</Link>
        }
    ];


    return(
        <>
            <Menu mode="inline" items={item} defaultSelectedKeys={['general']} defaultOpenKeys={["general"]}/>
        </>
    )
}

export default MenuSiber;