import {LOGIN_SUCCESS} from './../support/constant/type'

export const onLoginSuccess = (email, uid) => {
    return {
        type : LOGIN_SUCCESS,
        payload : {
            email,
            id : uid
            //id disesuaikan dengan apa yg dikirim di reducers
        }
    }
}

export const resetUser = () => {
    return {
        type : 'RESET_USER'
    }
}