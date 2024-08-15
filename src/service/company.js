import {get, patch, post} from "../until/request"

export const getCompany = async() => {
    const res = await get("company");
    return res;
}

export const getDetailCompany = async(id) => {
    const res = await get(`company/${id}`);
    return res;
}

export const getJobByCompany = async(id) => {
    const res = await get(`jobs?idCompany=${id}`);
    return res;
}

export const createCompany = async (options) => {
    const res = await post("company", options);
    return res;
}

export const updateCompany = async(id, options) => {
    const res = await patch(`company/${id}`, options);
    return res;
}