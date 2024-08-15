import { Badge, Button, Layout } from "antd";
import {BarsOutlined, HomeOutlined, LogoutOutlined} from "@ant-design/icons";
import "./layout.scss";
import { useState } from "react";
import MenuSiber from "../../pages/Private/MenuSiber"
import { NavLink, Outlet } from "react-router-dom";
const { Header, Footer, Sider, Content } = Layout;

function LayoutAdmin() {
    const [collapse, setCollapse] = useState(false);

    const onCollapse = () => {
        setCollapse(!collapse);
        console.log(collapse);
    }

    return(
        <>
            <Layout>
                <header className="header">
                    <div className={"header__logo " + (collapse && "header__logo--collapse")}>
                        {collapse ? ("ITA") : ("IT Admin")}
                    </div>
                    <div className="header__nav">
                        <div className="header__nav-left">
                            <div className="header__collapse" onClick={onCollapse}>
                                <BarsOutlined />
                            </div>
                        </div>
                        <div className="header__right">
                            <Button type="primary" style={{backgroundColor:"orange", color:"black", marginRight:"10px"}}>
                                <NavLink to={"/"}><HomeOutlined /> Trang chủ</NavLink>
                            </Button>
                            <Button type="primary">
                                <NavLink to="/logout"><LogoutOutlined /> Đăng xuất</NavLink>
                            </Button>    
                        </div>
                    </div>
                </header>
                <Layout>
                    <Sider collapsed={collapse} theme="light">
                        <MenuSiber/>
                    </Sider>
                    <Content>
                        <div className="layout__main">
                            <Outlet/>
                        </div>
                    </Content>
                </Layout>
                {/* <Footer>Footer</Footer> */}
            </Layout>
        </>
    )
}

export default LayoutAdmin;