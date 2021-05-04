import axios from 'axios';
// import React, { Component } from 'react';
import {environment} from '../environment';
/*
let userToken = null;
const checkUserToken = () => {
    userToken = 'asdasd';
    return;
    // const sessionUserToken = this.sessionStorage.getSessionStorage('userToken');
    // this.storageService.getSessionStorage().then((res) => {
    //     if (res) {
    //         this.userToken = res.token;
    //         // this.replaceToken(sessionUserToken.token, res.token);
    //     }
    //     else{
    //         // this.logoutUser(sessionUserToken.token)
    //     }
    // });
};
*/
const getToken = () => {
    // userToken = 'asdasd';
    // return userToken;
    let sessionUserToken;
    try {
        sessionUserToken = sessionStorage.getItem('userToken');
        // return sessionUserToken && sessionUserToken.hasOwnProperty('userToken') && sessionUserToken.userToken ? sessionUserToken.userToken : this.userInfo.token;
        return sessionUserToken.replace(/['"]+/g, '');
    } catch (e) {
        /*this.storageService.getSessionStorage().then((res) => {
            if (res) {
                this.userToken = res.token;
            }
        });
        return this.userToken;*/
    }
};

/*const setHeaders = () => {
    let headers = new Headers();
        
    // if (sendJWT) {
    //   userToken = '';
    //   this.checkUserToken();
    //   checkUserToken();
    //   const sessionUserToken = JSON.parse(sessionStorage.userToken || null);
    //   if (this.socialUserToken) {
    //     headers = headers.append('Authorization', 'JWT ' + this.socialUserToken);
    //   } else if (this.getToken()) {
    headers.append('Authorization', 'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo1MzU2OCwidXNlcm5hbWUiOiJ6YWhpZCIsImV4cCI6MTYxMTA1NTAyNiwiZW1haWwiOiJ6YWhpZDEyM0B5b3BtYWlsLmNvbSIsIm9yaWdfaWF0IjoxNjExMDUxNDI2fQ.Gpx5JvTVCpYLXfvau4WIwt9dJF1T_AjXexll6bJL6HQ');
    //   }
    // }
    return headers;
};
*/
export const httpPost = (url, data, sendToken) => {
    let authToken = "";
    if (sendToken) {
        authToken = 'JWT '+ getToken();
    }
    return axios.post(environment.apiUrl + url, data, {
        headers: {
            'Authorization': authToken //'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjEyMjY3MTI1LCJqdGkiOiI5NjIzYzMyNmFlOWM0NjA2ODUwN2I0MDE2ZGQ1YTRkMyIsInVzZXJfaWQiOjEwfQ.7Hc2eQBYLfdDrRBwHnTW49jLYjsnQq0Y7xNJHcxOWyg'
        }
    });
};

export const httpPostForLogin = (url, data, sendToken) => {
    let authToken = "";
    if (sendToken) {
      authToken = "JWT " + getToken();
    }
    return axios.post(url, data, {
      headers: {
        Authorization: authToken, //'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjEyMjY3MTI1LCJqdGkiOiI5NjIzYzMyNmFlOWM0NjA2ODUwN2I0MDE2ZGQ1YTRkMyIsInVzZXJfaWQiOjEwfQ.7Hc2eQBYLfdDrRBwHnTW49jLYjsnQq0Y7xNJHcxOWyg'
      },
    });
  };

export const httpGet = (url, sendToken) => {
    let authToken = "";
    if (sendToken) {
        authToken = 'JWT '+ getToken();
    }
    return axios.get(environment.apiUrl + url, {
        headers: {
            'Authorization': authToken //'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjEyMjY3MTI1LCJqdGkiOiI5NjIzYzMyNmFlOWM0NjA2ODUwN2I0MDE2ZGQ1YTRkMyIsInVzZXJfaWQiOjEwfQ.7Hc2eQBYLfdDrRBwHnTW49jLYjsnQq0Y7xNJHcxOWyg'
        }
    })
}
export const httpPut = (url, dataTosend, sendToken) => {
    let authToken = "";
    if (sendToken) {
        authToken = 'JWT '+ getToken();
    }
    return axios.put(environment.apiUrl + url, dataTosend, {
        headers: {
            'Authorization': authToken 
        }
    });
}
export const httpDelete = (url, sendToken) => {
    let authToken = "";
    if (sendToken) {
        authToken = 'JWT '+ getToken();
    }
    return axios.delete(environment.apiUrl + url, {
        headers: {
            'Authorization': authToken 
        }
    });
}