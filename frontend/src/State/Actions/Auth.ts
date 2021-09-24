import { ECases, IAuthState } from "../Types/Auth";
import axios from "axios";

export const load_user = () => async (dispatch:any) => {
    if(localStorage.getItem('access'))
    {
        const config = {
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : `JWT ${localStorage.getItem('access')}`,
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