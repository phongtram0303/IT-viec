const API_DOMAIN = "http://localhost:3002/"

export const get = async (path) => {
    const response = await fetch(API_DOMAIN + path);
    const result = await response.json();
    return result;
}

export const post = async (path, option) => {
    const res = await fetch(API_DOMAIN + path, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type" : "application/json",
        },
        body: JSON.stringify(option),
    });
    const result = await res.json();
    return result;
}

export const del = async (path) => {
    const res = await fetch(API_DOMAIN + path, {
        method: "DELETE",
    });
    const result = await res.json();
    return result;
}

export const patch = async (path, options) => {
    const res = await fetch(API_DOMAIN + path, {
        method: "PATCH",
        headers: {
            Accept: "application/json",
            "Content-Type" : "application/json",
        },
        body: JSON.stringify(options),
    });
    const result = await res.json();
    return result;
}