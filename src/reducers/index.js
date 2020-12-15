import { combineReducers } from 'redux'
import notificationsReducer from './notificationsReducer'
import loaderReducer from './loaderReducer'
import userReducer from './userReducer'
const rootReducer = combineReducers({
    user: userReducer,
    notifications: notificationsReducer,
    loader: loaderReducer
})
export default rootReducer