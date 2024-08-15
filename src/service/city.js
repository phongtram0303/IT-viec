import {get} from "../until/request"

export const getCity = async() => {
    const res = await get("city");
    return res;
}