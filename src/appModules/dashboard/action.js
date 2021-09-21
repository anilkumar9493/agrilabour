import Axios from "axios"
import { dispatch } from "../../redux"
import { rdxFetch } from "../../config/reduxAxios";



export const postAction = (payload) => async dispatch => {
    const response = await rdxFetch('POST_ACTION', {
        url: `/api/post/work_details`,
        postData: payload
    });
    dispatch(response);
}

export const getProfileAction = () => async dispatch => {
    const response = await rdxFetch('GET_PROFILE_ACTION', {
        url: `/api/auth/me`,
    });
    dispatch(response);
}

export const getAllPostAction = (payload) => async dispatch => {
    const response = await rdxFetch('GETALL_POST_ACTION', {
        url: `/api/post/get_all_posts`,
        postData: payload
    });
    dispatch(response);
}

export const IndiviualPostAction = (id) => async dispatch => {
    const response = await rdxFetch('INDIVIUAL_POST_ACTION', {
        url: `/api/post/get_posts/${id}`,
    });
    dispatch(response);
}


export const deletePostAction = (id) => async dispatch => {
    const response = await rdxFetch('DELETE_POST_ACTION', {
        url: `/api/post/delete/${id}`,
        postData: {},
    });
    dispatch(response);
}

export const cancelPostAction = (id) => async dispatch => {
    const response = await rdxFetch('CANCEL_POST_ACTION', {
        url: `/api/post/cancel/${id}`,
        postData: {},
    });
    dispatch(response);
}

export const negotiateReqAction = (payload) => async dispatch => {
    const response = await rdxFetch('NEGOTIATE_REQ_ACTION', {
        url: `/api/negotiate/request`,
        postData: payload,
    });
    dispatch(response);
}

export const MyPostReqAction = () => async dispatch => {
    const response = await rdxFetch('MYPOST_REQ_ACTION', {
        url: `/api/book/request`,
    });
    dispatch(response);
}

export const getAllReqPostAction = (id) => async dispatch => {
    const response = await rdxFetch('ALLNEGOTIATE_REQ_ACTION', {
        url: `/api/negotiate/requests/post/${id}`,
    });
    dispatch(response);
}

export const sendReqAction = (payload) => async dispatch => {
    const response = await rdxFetch('SEND_REQ_ACTION', {
        url: `/api/negotiate/request`,
        postData: payload,
    });
    dispatch(response);
}

export const getAllUserReqAction = (id) => async dispatch => {
    const response = await rdxFetch('GETALL_USER_REQ_ACTION', {
        url: `/api/negotiate/requests/user/${id}`,
    });
    dispatch(response);
}

export const postReqAcceptAction = (payload) => async dispatch => {
    const response = await rdxFetch('POSTREQ_ACCEPT_ACTION', {
        url: `/api/book/accecpt/request`,
        postData: payload,
    });
    dispatch(response);
}

