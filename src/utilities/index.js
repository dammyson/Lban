import { AsyncStorage } from 'react-native';

export const baseUrl = () => {
    return 'https://facerecogapi.azurewebsites.net/';
};



export const setEmail = (token) => {
  AsyncStorage.setItem('email', token);
};
export const getEmail = async () => {
  return AsyncStorage.getItem('email')
};

export const setToken = (token) => {
  AsyncStorage.setItem('access_token', token);
};
export const getToken = async () => {
  return AsyncStorage.getItem('access_token')
};

export const getRefresheToken = async () => {
  return AsyncStorage.getItem('refresh_token')
};


export const getLogout = () => {
  try {
    AsyncStorage.removeItem('curr');
    AsyncStorage.removeItem('cards');
    AsyncStorage.removeItem('token');
    AsyncStorage.removeItem('rem');
    return true;
  }
  catch (exception) {
    return false;
  }
};


export const processResponse = (response) => {
  const statusCode = response.status;
  const data = response.json();
  return Promise.all([statusCode, data]).then(res => ({
    statusCode: res[0],
    data: res[1]
  }));
}



