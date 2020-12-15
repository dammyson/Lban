import { userActions } from '../constants'
import { SHOW_LOADER, HIDE_LOADER } from './loaderAction'
import { baseUrl, setToken, setRefresheToken, setIsFirst, setUserId, processResponse } from '../utilities';
import axios from 'axios'

export const LoginRequest = (email, password) => {
    return (dispatch) => {
        dispatch(SHOW_LOADER('Login in..'))
        fetch(baseUrl() + 'auth', {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }, body: JSON.stringify({
                email: email,
                password: password,
                rememberMe: true,
            }),
        })
            .then(processResponse)
            .then(res => {
                const { statusCode, data } = res;
                if (statusCode === 200) {
                    setToken(data.access_token)
                    setRefresheToken(data.refresh_token)
                    setIsFirst('yes')
                    setUserId(data.id)
                    dispatch(LoginSuccess(data))
                    dispatch(HIDE_LOADER())
                } else if (statusCode === 422) {
                    dispatch(HIDE_LOADER())
                    dispatch(LoginFailure(data.message))
                } else {
                    dispatch(HIDE_LOADER())
                    dispatch(LoginFailure(data.message))
                }
            })
            .catch((error) => {
                dispatch(HIDE_LOADER())
                dispatch(ForgetPasswordFailure('No Internet Connection. Please Check your network'))
            });

    }
}
const FetchDefaultState = () => {
    return {
        type: userActions.LOGIN_REQUEST,
    }
}
export const LoginFailure = (error) => {
    return {
        type: userActions.LOGIN_FAILURE,
        error
    }
}
export const LoginSuccess = (user) => {
    return {
        type: userActions.LOGIN_SUCCESS,
        payload: user
    }
}

export const RegisterRequest = (details) => {
    return (dispatch) => {
        dispatch(SHOW_LOADER('Creating...'))

        fetch(baseUrl() + 'users', {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }, body: details,
        })
            .then(processResponse)
            .then(res => {
                const { statusCode, data } = res;
                if (statusCode === 200) {
                    setUserId(data.id)
                    dispatch(RegisterSuccess(data))
                    dispatch(HIDE_LOADER())
                } else if (statusCode === 422) {
                    dispatch(HIDE_LOADER())
                    dispatch(RegisterFailure(data.message))
                } else {
                    dispatch(HIDE_LOADER())
                    dispatch(RegisterFailure(data.message))
                }
            })
            .catch((error) => {
                dispatch(HIDE_LOADER())
                dispatch(ForgetPasswordFailure('No Internet Connection. Please Check your network'))
            });


    }
}

const FetchRegeDefaultState = () => {
    return {
        type: userActions.REGISTER_REQUEST,
    }
}
export const RegisterFailure = (error) => {
    return {
        type: userActions.REGISTER_FAILURE,
        error
    }
}
export const RegisterSuccess = (user) => {
    return {
        type: userActions.REGISTER_SUCCESS,
        payload: user
    }
}


export const ForgetPasswordRequest = (email, token) => {
    return (dispatch) => {
        dispatch(SHOW_LOADER('Processing...'))
        console.warn(baseUrl() + 'auth/SendForgotPasswordToken')
        fetch(baseUrl() + 'auth/SendForgotPasswordToken', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': 'Bearer ' + token,
            }, body: JSON.stringify({
                clientBaseUrl: baseUrl(),
                email: email,
            }),
        })
            .then(processResponse)
            .then(res => {
                const { statusCode, data } = res;
                console.warn(data)
                if (statusCode === 200) {
                    dispatch(ForgetPasswordSuccess(data))
                    dispatch(HIDE_LOADER())
                } else if (statusCode === 422) {
                    dispatch(HIDE_LOADER())
                    dispatch(ForgetPasswordFailure(data.message))
                } else {
                    dispatch(HIDE_LOADER())
                    dispatch(ForgetPasswordFailure(data.message))
                }
            })
            .catch((error) => {
                dispatch(HIDE_LOADER())
                console.warn(error)
                dispatch(ForgetPasswordFailure('No Internet Connection. Please Check your network'))
            });

    }
}

const FetchFGDefaultState = () => {
    return {
        type: userActions.FORGET_PASSWORD_REQUEST,
    }
}
export const ForgetPasswordFailure = (error) => {
    return {
        type: userActions.FORGET_PASSWORD_FAILURE,
        error
    }
}
export const ForgetPasswordSuccess = (user) => {
    return {
        type: userActions.FORGET_PASSWORD_SUCCESS,
        payload: user
    }
}


export const ChangePasswordRequest = (details, token) => {
    return (dispatch) => {
        dispatch(SHOW_LOADER('Processing...'))
        console.warn(baseUrl() + 'auth/ResetPassword')
        fetch(baseUrl() + 'auth/ResetPassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': 'Bearer ' + token,
            }, body: details,
        })
            .then(processResponse)
            .then(res => {
                const { statusCode, data } = res;
                console.warn(data)
                if (statusCode === 200) {
                    dispatch(ForgetPasswordSuccess(data))
                    dispatch(HIDE_LOADER())
                } else if (statusCode === 422) {
                    dispatch(HIDE_LOADER())
                    dispatch(ForgetPasswordFailure(data.message))
                } else {
                    dispatch(HIDE_LOADER())
                    dispatch(ForgetPasswordFailure(data.message))
                }
            })
            .catch((error) => {
                dispatch(HIDE_LOADER())
                console.warn(error)
                dispatch(ForgetPasswordFailure('No Internet Connection. Please Check your network'))
            });

    }
}

const FetchCPDefaultState = () => {
    return {
        type: userActions.CHANGE_PASSWORD_REQUEST,
    }
}
export const ChangePasswordFailure = (error) => {
    return {
        type: userActions.CHANGE_PASSWORD_FAILURE,
        error
    }
}
export const ChangePasswordSuccess = (user) => {
    return {
        type: userActions.CHANGE_PASSWORD_SUCCESS,
        payload: user
    }
}