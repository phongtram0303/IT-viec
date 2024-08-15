import { del, get, patch, post } from "../until/request"

export const createCV = async (options) => {
    const res = await post("cv", options);
    return res;
}

export const getListCV = async(id) => {
    const res = await get(`cv?idCompany=${id}`);
    return res;
}

export const getDetailCV = async(id) => {
    const res = await get(`cv/${id}`);
    return res;
}

export const changeStatus = async(id, options) => {
    const res = await patch(`cv/${id}`, options);
    return res;
}

export const deleteCV = async(id) => {
    const res = await del(`cv/${id}`);
    return res;
}