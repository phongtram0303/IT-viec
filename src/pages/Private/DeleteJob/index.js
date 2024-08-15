import { Button, Popconfirm } from "antd";
import {DeleteOutlined} from "@ant-design/icons"
import { deleteJob } from "../../../service/jobs";

function DeleteJob(props) {
    const {data, onReload} = props;
    const onDelete = async() => {
        const res = await deleteJob(data.id);
        if(res){
            onReload();
        }
    }

    return(
        <>  
            <Popconfirm title="Bạn có chắc muốn xóa?" onConfirm={onDelete}>
                <Button type="primary" icon={<DeleteOutlined/>} danger style={{ marginLeft: '5px' }}/>
            </Popconfirm>
        </>
    )
}

export default DeleteJob;