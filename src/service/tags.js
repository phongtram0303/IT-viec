import {get} from "../until/request"

export const getTags = async() => {
    const res = await get("tags");
    return res;
}