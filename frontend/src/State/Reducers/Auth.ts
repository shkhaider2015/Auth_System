import { ECases, IAuthState } from "../Types/Auth"

const initialState:IAuthState = {
    access : localStorage.getItem('access'),
    refresh : localStorage.getItem('refresh'),
    isAuthenticated : null,
    user : null,
    error : null
}

export const Auth = (state=initialState, action:any) => {
    const {type, payload} = action;

    switch (type) {
        case ECases.AUTHENTICATED_SUCCESS:
            state = {
                ...state,
                isAuthenticated : true
            }
            return state;
        case ECases.AUTHENTICATED_FAIL:
            state = {
                ...state,
                isAuthenticated : false
            }
            return state;
        
        case ECases.GOOGLE_AUTH_SUCCESS:
        case ECases.FACEBOOK_AUTH_SUCCESS:
        case ECases.lOGIN_SUCCESS:
            localStorage.setItem('access', payload.access)
            localStorage.setItem('refresh', payload.refresh)
            state = {
                ...state,
                isAuthenticated : true,
                access : payload.access,
                refresh : payload.refresh,
            }
            return state
           
        case ECases.SIGNUP_SUCCESS:
            state = {
                ...state,
                isAuthenticated : false
            }
            return state
       
        case ECases.FACEBOOK_AUTH_FAIL:
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            state = {
                ...state,
                access : null,
                refresh : null,
                isAuthenticated : false,
                user : null,
                error : payload
            }
            return state;
        case ECases.GOOGLE_AUTH_FAIL:
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            state = {
                ...state,
                access : null,
                refresh : null,
                isAuthenticated : false,
                user : null,
                error : payload
            }
            return state;
        case ECases.LOGIN_FAIL:
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            state = {
                ...state,
                access : null,
                refresh : null,
                isAuthenticated : false,
                user : null,
                error : payload
            }
            return state;
        case ECases.SIGNUP_FAIL:
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            state = {
                ...state,
                access : null,
                refresh : null,
                isAuthenticated : false,
                user : null,
                error : payload
            }
            return state;
        case ECases.LOGOUT:
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            state = {
                ...state,
                access : null,
                refresh : null,
                isAuthenticated : false,
                user : null,
                error : null
            }
            return state;
            
        case ECases.USER_LOADED_SUCCESS:
            state = {
                ...state,
                user : payload
            }
            return state
        case ECases.USER_LOADED_FAIL:
            state = {
                ...state,
                user : null
            }
            return state
        
        
        case ECases.PASSWORD_RESET_SUCCESS:
        case ECases.PASSWORD_RESET_FAIL:
        case ECases.PASSWORD_RESET_CONFIRM_SUCCESS:
        case ECases.PASSWORD_RESET_CONFIRM_FAIL:
            state = { ...state }
            return state
            
        default:
            return state
    }
    
}
