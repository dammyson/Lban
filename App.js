import * as React from 'react';
import { Provider } from 'react-redux'
import store from './store'
import { TransitionPresets, createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import axios from 'axios'
import Main from './src/navigations/app-stack';

import { Platform } from 'react-native';
import { BASE_URL, STATUSBAR_HEIGHT } from './src/constants'

axios.defaults.baseURL = BASE_URL
const Stack = createStackNavigator();

function App() {
	const TransitionPreset = Platform.OS === 'ios' ? TransitionPresets.ModalSlideFromBottomIOS : {}
	const navigationOptions = {
		headerShown: false,
		...TransitionPreset,
		gestureResponseDistance: {
			vertical: 800
		}
	}
	return (
		<Provider store={store}>
			<Main />
		</Provider>
	)
}
export default App;