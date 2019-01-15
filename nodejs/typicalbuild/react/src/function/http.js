import axios from 'axios'
import qs from "querystring";

// 请求方法封装
export const post = (url, dataToSend = {}) => {
    return new Promise((resolve, reject) => {
        axios.post(url, qs.stringify(dataToSend),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then(response => {
                resolve(response.data)
            })
            .catch(error => {
                reject(error)
            });
    })
};
export const get = (url, dataToSend = {}) => {
    return new Promise(((resolve, reject) => {
        axios.get(url, {params: dataToSend})
            .then(response => {
                resolve(response.data)
            })
            .catch(error => {
                alert(url + error);
                reject(error)
            });
    }))
};
export const form = (url, dataToSend) => {
    return new Promise((resolve, reject) => {
        axios.post(url, dataToSend,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(response => {
            resolve(response)
        }).catch(error => {
            reject(error)
        });
    })
};


