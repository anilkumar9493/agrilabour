const init = {
    postData: {},
    profileData: {},
    allPosts: {},
    deletePosts: {},
    cancelPosts: {},
    negotiateData: {},
    MyReqData: {},
    allNegotiateData: {},
    sendReqData: {},
    myPostData: {},
    myPostReqData: {},
    postReqAcceptData: {},
}
export const dashboardreducer = (state = init, action) => {
    switch (action.type) {
        case 'POST_ACTION':
            return { ...state, postData: action.payload }
        case 'GET_PROFILE_ACTION':
            return { ...state, profileData: action.payload }
        case 'GETALL_POST_ACTION':
            return { ...state, allPosts: action.payload }
        case 'DELETE_POST_ACTION':
            return { ...state, deletePosts: action.payload }
        case 'CANCEL_POST_ACTION':
            return { ...state, cancelPosts: action.payload }
        case 'NEGOTIATE_REQ_ACTION':
            return { ...state, negotiateData: action.payload }
        case 'MYPOST_REQ_ACTION':
            return { ...state, MyReqData: action.payload }
        case 'ALLNEGOTIATE_REQ_ACTION':
            return { ...state, allNegotiateData: action.payload }
        case 'SEND_REQ_ACTION':
            return { ...state, sendReqData: action.payload }
        case 'INDIVIUAL_POST_ACTION':
            return { ...state, myPostData: action.payload }
        case 'GETALL_USER_REQ_ACTION':
            return { ...state, myPostReqData: action.payload }
        case 'POSTREQ_ACCEPT_ACTION':
            return { ...state, postReqAcceptData: action.payload }
        default:
            return state;
    }
}

