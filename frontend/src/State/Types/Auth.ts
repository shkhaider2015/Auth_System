export enum ECases {
    lOGIN_SUCCESS = "login_success",
    LOGIN_FAIL = "login_fail",
    USER_LOADED_SUCCESS = "user_loaded_success",
    USER_LOADED_FAIL = "user_loaded_fail",
    AUTHENTICATED_SUCCESS = "authenticated_success",
    AUTHENTICATED_FAIL = "authenticated_fail",
    PASSWORD_RESET_SUCCESS = "password_reset_success",
    PASSWORD_RESET_FAIL = "password_reset_fail",
    PASSWORD_RESET_CONFIRM_SUCCESS = "password_reset_confirm_success",
    PASSWORD_RESET_CONFIRM_FAIL = "password_reset_confirm_fail",
    SIGNUP_SUCCESS = "signup-success",
    SIGNUP_FAIL = "signup-fail",
    ACTIVATION_SUCCESS = "activation-success",
    ACTIVATION_FAIL = "activation-fail",
    LOGOUT = "logout",
    GOOGLE_AUTH_SUCCESS = "google-auth-success",
    GOOGLE_AUTH_FAIL = "google-auth-fail",
    FACEBOOK_AUTH_SUCCESS = "facebook-auth-success",
    FACEBOOK_AUTH_FAIL = "facebook-auth-fail",
}

export interface IAuthState {
    access : string | null
    refresh : string | null
    isAuthenticated : boolean | null
    user : string | null
}

export interface IGoogleAuthDetail {
    'state' : string|string[]
    'code' : string|string[]
}

export type items = {
    [key: string]: string,
   }[]