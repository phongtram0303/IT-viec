import { useNavigate } from "react-router-dom";
import { deleteAllCookies } from "../../until/token";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkLoginA } from "../../action/login";

function Logout() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    deleteAllCookies();

    useEffect(() => {
        dispatch(checkLoginA(false));
        navigate("/login");
    },[])
    return(
        <>
            
        </>
    )
}

export default Logout;