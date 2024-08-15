import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getCookie } from "../../until/token";
import { useSelector } from "react-redux";

function PrivateRouter() {
    const isLogin = useSelector(state => state.loginReducer);
    
    return(
        <>
            {isLogin ? (<Outlet/>):(<Navigate to="/login" />)}
        </>
    )
}

export default PrivateRouter;