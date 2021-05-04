//import { HandleErrors } from './handleErrors';
import { httpGet, httpPost, httpPut, httpDelete } from '../_services/httpService';
//import { showNotification } from '../components/Notifications/showNotification';



export const getTrendList = (json) => (dispatch) => {
    return httpPost('nori/trending/', json, false).then(res => {
        return Promise.resolve(res.data);
    }, err => {
        // showNotification(
        //     "error",
        //     `${"Something went wrong"}`,
        //     "Danger",
        //     4000
        // );
        return Promise.resolve();
    })
}


export const getRecommandList = (json) => (dispatch) => {
    return httpPost('nori/recommended/', json, false).then(res => {
        return Promise.resolve(res.data);
    }, err => {
        // showNotification(
        //     "error",
        //     `${"Something went wrong"}`,
        //     "Danger",
        //     4000
        // );
        return Promise.resolve();
    })
}