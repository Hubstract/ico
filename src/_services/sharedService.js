import { httpGet } from "./httpService"
// import {userLogin} from '../containers/LoginPage/action';

export const getUserProfile = (userProfileAction) => {
    httpGet('profile/', true).then(res => {
        if(res && res.data) {
            userProfileAction(res.data);
        }
    })
}