import { ECases, IGoogleAuthDetail } from "../Types/Auth";
import axios from "axios";

export const load_user = () => async (dispatch:any) => {
    const isAccess:string|null = localStorage.getItem('access')
    if(isAccess)
    {
        const config = {
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : `JWT ${isAccess}`,
                'Accept' : 'application/json'
            }
        }

        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/users/me/`, config)
            dispatch({
                type : ECases.USER_LOADED_SUCCESS,
                payload : res.data
            })
        } catch (error) {
    
            dispatch({
                type  : ECases.USER_LOADED_FAIL
            })
            
        }


    }
    else
    {
        dispatch({
            type  : ECases.USER_LOADED_FAIL
        })
        
    }
    
}

export const googleAuthentication = (state:string|string[], code:string|string[]) => async (dispatch:any) => {
    const isAccess:string|null = localStorage.getItem('access');
    if(state && code && !isAccess)
    {
        const config = {
            headers : {
                'Content-Type' : 'application/x-www-form-urlencoded'
            }
        }

        

        const details:IGoogleAuthDetail = {
            state : state,
            code : code
        }

        const formBody  = Object.keys(details).map((key:string) => encodeURIComponent(key) + '=' + encodeURIComponent((details as any)[key]) ).join('&')

        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/o/google-oauth2/?${formBody}`, config)

            dispatch({
                type : ECases.GOOGLE_AUTH_SUCCESS,
                payload : res.data
            })
            dispatch(load_user())
        } catch (error) {
            dispatch({
                type : ECases.GOOGLE_AUTH_FAIL
            })
        }
    }
    else
    {
       
    }
}

export const checkAuthenticated = () => async (dispatch:any) => {

    const isAccess:string|null = localStorage.getItem('access');

    if(isAccess)
    {
        const config = {
            headers : {
                'Content-Type' : 'application/json',
                'Accept' : 'application/json'
            }
        }

        const body = JSON.stringify({ token : isAccess });

        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/verify/`, body, config);
            if(res.data.code !== 'token_not_valid')
            {
                dispatch({
                    type : ECases.AUTHENTICATED_SUCCESS
                })
            }
            else
            {
                dispatch({
                    type : ECases.AUTHENTICATED_FAIL
                })
            }
            
        } catch (error) {
            dispatch({
                type : ECases.AUTHENTICATED_FAIL
            })
        }

    }
    else
    {
        dispatch({
            type : ECases.AUTHENTICATED_FAIL
        })
    }

}

export const login = (email:string, password:string) => async (dispatch:any) => {
    const config = {
        headers : {
            'Content-Type' : 'application/json'
        }
    }

    const body = JSON.stringify({email, password})

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/create/`, body, config)

        dispatch({
            type : ECases.lOGIN_SUCCESS,
            payload : res.data
        })

        dispatch(load_user())
    } catch (error) {

        dispatch({
            type  : ECases.LOGIN_FAIL
        })
        
    }
}


export const logout = () => async (dispatch:any) => {
    dispatch({
        type : ECases.LOGOUT
    })
}

export const passwordReset = (email:string) => async (dispatch:any) => {
    const config = {
        headers : {
            'Content-Type' : 'application/json'
        }
    }

    const body = JSON.stringify({email});

    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password/`, body, config);

        dispatch({
            type : ECases.PASSWORD_RESET_SUCCESS
        })
    } catch (error) {
        dispatch({
            type : ECases.PASSWORD_RESET_FAIL
        })
        
    }
}

export const reset_password_confirm = (uid:string, token:string, new_password:string, re_new_password:string ) => async (dispatch:any) => {
    const config = {
        headers : {
            'Content-Type' : 'application/json'
        }
    };

    const body = JSON.stringify({ uid, token, new_password, re_new_password });

    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password_confirm/`, body, config);

        dispatch({
            type : ECases.PASSWORD_RESET_CONFIRM_SUCCESS
        })
    } catch (error) {
        dispatch({
            type : ECases.PASSWORD_RESET_CONFIRM_FAIL
        })
        
    }

}

export const signup = (first_name:string, last_name:string, email:string, password:string, re_password:string) => async (dispatch:any) => {
    const config = {
        headers : {
            'Content-Type' : 'application/json'
        }
    }

    const body = JSON.stringify({first_name, last_name, email, password, re_password})

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/`, body, config)

        dispatch({
            type : ECases.SIGNUP_SUCCESS,
            payload : res.data
        })

        dispatch(load_user())
    } catch (error) {

        dispatch({
            type  : ECases.SIGNUP_FAIL
        })
        
    }
}

export const verify = (uid:string, token:string) => async (dispatch:any) => {
    const config = {
        headers : {
            'Content-Type' : 'application/json'
        }
    }

    const body = JSON.stringify({uid, token})

    try {
        
        await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/activation/`, body, config)

        dispatch({
            type : ECases.ACTIVATION_SUCCESS
        })

        dispatch(load_user())
    } catch (error) {

        dispatch({
            type  : ECases.ACTIVATION_FAIL
        })
        
    }
}