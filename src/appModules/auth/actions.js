import Axios from "axios"
import { dispatch } from "../../redux"
import { rdxFetch } from "../../config/reduxAxios";
// import { MINUS, ADD, ADDFIVE, MINUSFIVE } from '../../constants/api-constants'


export const loginAction = (payload) => async dispatch => {
    const response = await rdxFetch('LOGIN_SUCCESS', {
        url: `/api/auth/login`,
        postData: payload
    });
    dispatch(response);
}

export const registerAction = (payload) => async dispatch => {
    const response = await rdxFetch('REGISTARTION_SUCCESS', {
        url: `/api/auth/register`,
        postData: payload
    });
    dispatch(response);
}

