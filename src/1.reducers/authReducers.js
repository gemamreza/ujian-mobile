const INITIAL_STATE = {id : null, email : '', pass : ''}
import {LOGIN_SUCCESS} from './../support/constant/type'

const authReducer = (state, action) => {
    switch(action.type){
        case LOGIN_SUCCESS :
            return {...INITIAL_STATE, email : action.payload.email, id : action.payload.id}
        case 'RESET_USER' : 
            return {INITIAL_STATE}
        default :
            return INITIAL_STATE
    }

}

export default authReducer