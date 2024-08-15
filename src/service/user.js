import { get } from "../until/request"

export const checkExits = async(key, value) => {
    const res = await get(`company?${key}=${value}`)
    return res;
}

export const checkLogin = async(email, password) => {
    // let pass = "";
    // if(password !== ""){
    //     pass = `&password=${password}`;
    // }
    // const result = await get(`company?email=${email}${password}`);
    const result = await get(`company?email=${email}&password=${password}`)
    return result;
}