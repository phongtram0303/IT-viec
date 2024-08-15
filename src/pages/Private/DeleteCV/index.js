import { Button, message, Popconfirm } from "antd";
import {DeleteOutlined} from "@ant-design/icons"
import { deleteCV } from "../../../service/cv";

function DeleteCV(props) {
    const {data, onReload} = props;
    //const [messageApi, contextHolder] = message.useMessage();
    const onDelete = async() => {
        const res = await deleteCV(data.id);
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

export default DeleteCV;