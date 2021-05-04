import { httpGet, httpPost, httpPut, httpDelete } from '../_services/httpService';

export const updateLanguage = (data) =>{
    return (dispatch)=>{
        dispatch({type:"UPDATE_LANGUAGE" , payload:data})
}
}