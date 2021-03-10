import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  StyleSheet,
  StatusBar,
  Image,
  Animated,
  Easing,
  AsyncStorage
} from 'react-native';
import colors from '../../components/theme/colors'
import { Icon } from 'react-native-elements';




export default class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }


  componentDidMount() {

    setTimeout(() => {
       this.initPage();
    }, 3000);
  }




  initPage = async () => {

    this.props.navigation.navigate('Welcome');

  }


  render() {
    return (
      <ImageBackground
        source={require('../../assets/background_dot.png')}
        resizeMode="repeat"
        style={styles.background}
      >
        <StatusBar backgroundColor='#fff' barStyle="dark-content" />
        <Image source={require('../../assets/logo_ni.png')} style={styles.image} />
      </ImageBackground>
    );
  }
}


const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 12,
    resizeMode:'contain'
  },
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  }

});