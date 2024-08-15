import { Link, NavLink, Outlet } from "react-router-dom";
import "./layoutDefault.scss";
import { Button, Flex } from 'antd';
import { getCookie } from "../../until/token";
import { useSelector } from "react-redux";
import {UserOutlined,LogoutOutlined,LoginOutlined,SignatureOutlined} from "@ant-design/icons"

function LayoutDefault() {

    const token = getCookie("token");
    const isLogin = useSelector(state => state.loginReducer);


    return(
        <>
            <div className="layout-default">
                <div className="layout-default__header">
                    <NavLink to="/" className="layout-default__logo">IT Jobs</NavLink>
                    <div className="menu">
                        {token ? (
                            <>
                                <Button type="primary" style={{backgroundColor:"white", color:"black", marginRight:"10px"}}>
                                    <NavLink to={"admin/dashboard"}><UserOutlined/> Quản lý</NavLink>
                                </Button>
                                <Button type="primary">
                                    <NavLink to="logout"><LogoutOutlined /> Đăng xuất</NavLink>
                                </Button>                               
                            </>
                        ):(
                            <>
                                <Button type="primary" style={{backgroundColor:"white", color:"black", marginRight:"10px"}}>
                                    <NavLink to="login"><LoginOutlined /> Đăng nhập</NavLink>
                                </Button>
                                <Button type="primary">
                                    <NavLink to="signUp"><SignatureOutlined /> Đăng ký</NavLink>
                                </Button>
                            </>
                        )}                      
                    </div>
                </div>
                <div className="layout-default__main">
                    <Outlet/>
                </div>
                {/* <div className="layout-default__footer">Footer</div> */}
            </div>
        </>
    )
}

export default LayoutDefault;