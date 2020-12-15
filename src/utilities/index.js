import { AsyncStorage } from 'react-native';

export const baseUrl = () => {
    return 'https://facerecogapi.azurewebsites.net/api/facecog/';
};


export const setToken = (token) => {
  AsyncStorage.setItem('access_token', token);
};
export const getToken = async () => {
  return AsyncStorage.getItem('access_token')
};
export const setRefresheToken = (token) => {
  AsyncStorage.setItem('refresh_token', token);
};
export const getRefresheToken = async () => {
  return AsyncStorage.getItem('refresh_token')
};


export const setIsFirst =  () => {
  return AsyncStorage.getItem('isFirst')
};
export const getIsFirst = async () => {
  return AsyncStorage.getItem('isFirst')
};

export const setUserId =  (id) => {
  AsyncStorage.setItem('user_id', id);
};
export const getUserId = async () => {
  return AsyncStorage.getItem('user_id')
};


export const getPhone = async () => {
  return AsyncStorage.getItem('phone')
};

export const getUser = async () => {
  return AsyncStorage.getItem('user')
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



