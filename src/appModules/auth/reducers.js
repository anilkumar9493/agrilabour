const init = {
    loginData: {},
    registerData: {},

}
export const Authreducer = (state = init, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return { ...state, loginData: action.payload }
        case 'REGISTARTION_SUCCESS':
            return { ...state, registerData: action.payload }
        default:
            return state;
    }
}