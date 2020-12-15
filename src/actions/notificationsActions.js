import { notificationsActions } from '../constants'
import { SHOW_LOADER, HIDE_LOADER } from './loaderAction'
import axios from 'axios'
export const FetchNotificationsRequest = () => {
    const taskURI = 'https://covid19.mathdro.id/api/countries/'
    return (dispatch) => {
        dispatch(SHOW_LOADER('Loading..'))
        axios.get(taskURI).then(async result => {
            const notifications = result.data.countries
            dispatch(FetchNotificationsSuccess(notifications))
            dispatch(HIDE_LOADER())
        }).catch(error => {
            dispatch(FetchNotificationsFailure(error))
            dispatch(HIDE_LOADER())
        })
    }
}
const FetchDefaultState = () => {
    return {
        type: notificationsActions.FETCH_NOTIFICATIONS_REQUEST,
    }
}
export const FetchNotificationsFailure = (error) => {
    return {
        type: notificationsActions.FETCH_NOTIFICATIONS_FAILURE,
        error
    }
}
export const FetchNotificationsSuccess = (notifications) => {
    return {
        type: notificationsActions.FETCH_NOTIFICATIONS_SUCCESS,
        payload: notifications
    }
}

