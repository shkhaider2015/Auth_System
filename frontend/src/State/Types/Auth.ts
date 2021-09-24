export enum ECases {
    lOGIN_SUCCESS = "login_success",
    LOGIN_FAIL = "login_fail",
    USER_LOADED_SUCCESS = "user_loaded_success",
    USER_LOADED_FAIL = "user_loaded_fail"
}

export interface IAuthState {
    access : string | null
    refresh : string | null
    isAuthenticated : boolean | null
    user : string | null
}