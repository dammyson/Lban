import { userActions } from '../constants'
import { Alert } from 'react-native'
const defaultState = {
    user: {},
    friends: [],
    highlightPhotos: [],
    posts: []
}
const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case userActions.LOGIN_REQUEST:
            state = { ...state, user: {} }
            return state
            break
        case userActions.LOGIN_SUCCESS:
            console.warn(action.payload)
            state = { ...state, user: action.payload }
            return state
            break
        case userActions.LOGIN_FAILURE:
            const message = action.error
            Alert.alert('Error', message)
            return state
            break
        case userActions.REGISTER_REQUEST:
            state = { ...state, user: {} }
            return state
            break
        case userActions.REGISTER_SUCCESS:
            console.warn(action.payload)
            state = { ...state, user: action.payload }
            return state
            break
        case userActions.REGISTER_FAILURE:
            const reg_message = action.error
            Alert.alert('Error', reg_message)
            return state
            break
        case userActions.FORGET_PASSWORD_REQUEST:
            state = { ...state, user: {} }
            return state
            break
        case userActions.FORGET_PASSWORD_SUCCESS:
            console.warn(action.payload)
            state = { ...state, user: action.payload }
            return state
            break
        case userActions.FORGET_PASSWORD_FAILURE:
            const forget_message = action.error
            Alert.alert('Error', forget_message)
            return state
            break
        case userActions.CHANGE_PASSWORD_REQUEST:
            state = { ...state, user: {} }
            return state
            break
        case userActions.CHANGE_PASSWORD_SUCCESS:
            console.warn(action.payload)
            state = { ...state, user: action.payload }
            return state
            break
        case userActions.CHANGE_PASSWORD_FAILURE:
            const change_message = action.error
            Alert.alert('Error', change_message)
            return state
            break
        default:
            return state
    }
}
export default reducer