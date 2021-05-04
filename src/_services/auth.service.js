import SessionStorage from './sessionStorageService';
const sessionStorage = new SessionStorage();

export const AfterUserLogin = (userToken) => {
    sessionStorage.saveToSession('loggedIn', true);
    sessionStorage.saveToSession('session', Date.now());
    sessionStorage.saveToSession('userToken', userToken);
};

export const IsUserLogin = () => {
    return sessionStorage.getSessionStorage('loggedIn') ? sessionStorage.getSessionStorage('loggedIn') : false;
}

export const IsTokenExists = () => {
    const isToken = sessionStorage.getSessionStorage('userToken') ? sessionStorage.getSessionStorage('userToken') : false;
    return isToken;
}