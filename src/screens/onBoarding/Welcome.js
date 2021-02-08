import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  StatusBar,
  Image,
  ImageBackground,
  PermissionsAndroid,
  Animated,
  Easing
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '@react-navigation/native';
import colors from '../../components/theme/colors'
import { Icon } from 'react-native-elements';



export default class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: new Animated.Value(0),
    };
  }


  componentDidMount() {
    Animated.timing(this.state.progress, {
      toValue: 1,
      duration: 5000,
      easing: Easing.linear,
    }).start();
  }


  requestMultiplePermission = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple(
        [
          PermissionsAndroid.PERMISSIONS.CAMERA,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          //PermissionsAndroid.PERMISSIONS.ACCESS_COURSE_LOCATION,
          //PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        ]
      );
      this.props.navigation.replace('SignIn')
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {

      } else {
        console.warn("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  render() {
    return (
      <ImageBackground
        source={require('../../assets/background_dot.png')}
        resizeMode="repeat"
        style={styles.container}
      >
        <StatusBar backgroundColor='#fff' barStyle="dark-content" />
        <View style={styles.header}>
          <Icon
            name="user"
            size={70}
            type='entypo'
            color={colors.primary_color}

          />
          <Text style={{ color: colors.primary_color, fontFamily: 'Poppins-Bold', fontSize: 20, marginBottom: 2, marginTop: 2 }}>LBAN</Text>

        </View>
        <Animatable.View
          style={[styles.footer, {
            backgroundColor: colors.white
          }]}
          animation="fadeInUpBig"
        >
          <View style={{}}>
            <Text style={[styles.title, {
              color: colors.primary_color,
            }]}>Stay connected with everyone!</Text>
            <Text style={styles.text}>Sign in with account</Text>
            <View style={styles.button}>
              <TouchableOpacity onPress={() => this.requestMultiplePermission()}>
                <LinearGradient
                  colors={[colors.primary_color, colors.primary_color]}
                  style={styles.signIn}
                >
                  <Text style={styles.textSign}>Login</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.requestMultiplePermission()}>
                <View
                  colors={[colors.primary_color, colors.primary_color]}
                  style={styles.signInTwo}
                >
                  <Text style={[styles.textSign, {color:colors.primary_color}]}>Get Started</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Animatable.View>
      </ImageBackground>
    );
  }
}


const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'

  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  footer: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30
  },
  logo: {
    width: height_logo,
    height: height_logo
  },
  title: {
    color: colors.white,
    fontSize: 30,
    fontWeight: 'bold'
  },
  text: {
    color: colors.white,
    marginTop: 5
  },
  image: {
    width: 128,
    height: 128,
    marginBottom: 12,
  },
  button: {
    marginTop: 30,
  },
  signIn: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    flexDirection: 'row'
  },

  signInTwo: {
    marginTop: 10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    flexDirection: 'row',
    borderColor:colors.primary_color,
    borderWidth:1
  },
  textSign: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 15
  }
});