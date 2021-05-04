import { httpGet, httpPost, httpPut, httpDelete } from '../_services/httpService';

export const buyAction = (data) => (dispatch) => {
    return httpPost('openOrders/', data, true).then(res => {
        return Promise.resolve(res.data);
    }, err => {
        return Promise.resolve();
    })
}

export const sellAction = (data) => (dispatch) => {
    return httpPost('openOrders/', data, true).then(res => {
        return Promise.resolve(res.data);
    }, err => {
        return Promise.resolve();
    })
}