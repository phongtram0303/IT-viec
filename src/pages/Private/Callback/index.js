import { Button } from "antd";
import { useNavigate } from "react-router-dom"

function CallBack() {
    const callback = useNavigate();

    const onCallBack = () => {
        callback(-1);
    }

    return(
        <>
            <Button style={{marginTop:"20px"}} onClick={onCallBack}>Trở lại</Button>
        </>
    )
}

export default CallBack;