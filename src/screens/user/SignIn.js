import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    StatusBar,
    Alert,
    Dimensions,
    Keyboard,
    ImageBackground

} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import { Icon } from 'react-native-elements';
import LottieView from 'lottie-react-native';
import colors from '../../components/theme/colors'
import { Container, Content } from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import { navigation } from '../../../rootNavigation'
import Success from '../../components/views/Success';
import CameraView from '../../components/CameraView';
import Loader from '../../components/loader/Loader';
import { baseUrl, setToken, setRefresheToken, setIsFirst, setUserId, processResponse } from '../../utilities';
import {
    getLocation,
    geocodeLocationByName,
    geocodeAddressByName
  } from '../../utilities/locationService';

export default class SignInScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            email: '',
            image1: '',
            image1_display: '',
            is_valide_mail: false,
            done: false,
            show_camera: false,
            latitude: 6.5244,
            longitude: 3.3792,
        };
    }

    async componentDidMount() {
        var cordinates = getLocation();
        cordinates.then((result) => {
          this.setState({
            latitude: result.latitude,
            longitude: result.longitude
          });
          console.log(result);
        }, err => {
          console.log(err);
        });
    }



    validate = (text) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(text) === false) {
            this.setState({ email: text, is_valide_mail: false })
            return false;
        }
        else {
            this.setState({ email: text, is_valide_mail: true })
        }
    }

    updateSecureTextEntry = () => {
        this.setState({ secureTextEntry: this.state.secureTextEntry ? false : true })
    }

    async loginRequest() {
        const { LoginPostRequest } = this.props
        const { email, password, is_valide_mail } = this.state
        if (email == "" || password == "" || password.length < 8) {
            Alert.alert('Validation failed', 'Phone field cannot be empty', [{ text: 'Okay' }])
            return
        }
        if (!is_valide_mail) {
            Alert.alert('Validation failed', 'Email is invalid', [{ text: 'Okay' }])
            return
        }
        LoginPostRequest(email, password);
    }


    async loginRequest() {
        const { email, image1, is_valide_mail } = this.state
        if (email == "") {
            Alert.alert('Validation failed', 'Email field cannot be empty', [{ text: 'Okay' }])
            return
        }
        if (image1 == "") {
            Alert.alert('Validation failed', 'Please make sure you select test images', [{ text: 'Okay' }])
            return
        }
        if (!is_valide_mail) {
            Alert.alert('Validation failed', 'Email is invalid', [{ text: 'Okay' }])
            return
        }
        var payload = {
            Identity: email,
            image: image1,

        }
        var formData = JSON.stringify(payload);

        this.setState({ loading: true })
        fetch(baseUrl() + 'verifyface', {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }, body: formData
        })
            .then(processResponse)
            .then(res => {
                const { statusCode, data } = res;
                console.warn(statusCode, data)
                this.setState({ loading: false })
                if (statusCode === 200) {
                    setToken(email)
                    this.setState({ loading: false, done: true })
                } else if (statusCode === 500) {
                    alert(data.message)
                } else if (statusCode === 400) {
                    alert(data.message)
                } else {
                    alert(data.message)
                }
            })
            .catch((error) => {
                this.setState({ loading: false })
                alert(error.message);
            });
    }


    render() {

        if (this.state.loading) {
            return (
                <Loader message={'Verifying...'} />
            );
        }
        return (
            <ImageBackground
            source={require('../../assets/background_dot.png')}
            resizeMode="repeat"
            style={styles.background}
          >
                <StatusBar backgroundColor='#fff' barStyle="dark-content" />
                <Container style={{ backgroundColor: 'transparent' }}>
                    <Content>
                        <View style={styles.backgroundImage}>
                            <View style={styles.mainbody}>
                                <View style={styles.sideContent}>
                                <Icon
                                            name="user"
                                            size={70}
                                            type='entypo'
                                            color={colors.primary_color}

                                        />
                                </View>
                                <View style={{ marginLeft: 20, marginRight: 20, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginBottom: 5, }}>

                                    <Text style={{ color: colors.primary_color, fontFamily: 'Poppins-Bold', fontSize: 16, marginBottom: 2, marginTop: 2 }}>Sign In</Text>
                                </View>

                                <View style={styles.textInputContainer}>
                                  

                                    <View style={styles.input}>
                                        <TextInput
                                            placeholder="Email "
                                            placeholderTextColor={colors.placeholder_color}
                                            returnKeyType="next"
                                            keyboardType='email-address'
                                            autoCapitalize="none"
                                            autoCorrect={false}
                                            defaultValue={this.state.email}
                                            style={{ flex: 1, fontSize: 12, color: colors.primary_color, fontFamily: 'Poppins-SemiBold', }}
                                            onChangeText={(text) => this.validate(text)}
                                            onSubmitEditing={() => this.passwordInput.focus()}
                                        />
                                    </View>


                                    <View style={styles.operation_icon}>
                                        {this.state.is_valide_mail ?
                                            <Animatable.View
                                                animation="bounceIn"
                                            >
                                                <Icon
                                                    name="check-circle"
                                                    color="green"
                                                    size={20}
                                                    type='feather'


                                                />
                                            </Animatable.View>
                                            : null}

                                    </View>
                                </View>

                                <View style={{ flexDirection: 'row', marginRight: 30, marginLeft: 30, height: 100, marginTop: 20, marginBottom: 15 }}>
                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                                        <ImageBackground
                                            source={{ uri: this.state.image1_display }}
                                            imageStyle={{ borderRadius: 10, }}
                                            style={{ backgroundColor: "#FFF", height: 100, width: 100, borderRadius: 10, borderWidth: 1, borderColor: colors.primary_color }}>
                                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                                                <TouchableOpacity style={{}} transparent onPress={() => this.setState({ show_camera: true })}>
                                                    <Icon
                                                        active
                                                        name="camera"
                                                        type='feather'
                                                        color={colors.primary_color}
                                                        size={20}
                                                    />
                                                    <Text style={{ color: colors.placeholder_color, fontFamily: 'Poppins-SemiBold', fontSize: 10, fontWeight: '400' }}>Image 1  </Text>
                                                </TouchableOpacity>

                                            </View>
                                        </ImageBackground>
                                    </View>
                                </View>

                              

                                <View style={{ marginLeft: 20, marginRight: 20, flexDirection: 'row', marginBottom: 1, }}>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('ForgetPassword')} style={{ flex: 1, alignItems: 'center' }}>
                                        <Text style={{ color: '#193a4d', fontFamily: 'Poppins-Medium', fontSize: 12, marginBottom: 7, marginTop: 7 }}>Can't log in?</Text>
                                    </TouchableOpacity>
                                </View>
                                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={[colors.primary_color, colors.primary_color,]} style={styles.buttonContainer} block iconLeft>
                                    <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }} onPress={() => this.loginRequest()} >
                                        <Text style={{ fontFamily: 'Poppins-SemiBold', color: '#fff', fontSize: 14 }}>Log in</Text>
                                    </TouchableOpacity>
                                </LinearGradient>

                                <View style={{ marginLeft: 20, marginRight: 20, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginBottom: 10, }}>
                                    <View style={{ alignItems: 'center' }}>
                                        <Text style={{ color: '#193a4d', fontFamily: 'Poppins-Medium', fontSize: 12, marginBottom: 7, marginTop: 7 }}>Not a member?</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('SignUP')} style={{ alignItems: 'center' }}>
                                        <Text style={{ color: colors.primary_color, fontFamily: 'Poppins-Bold', fontSize: 13, marginBottom: 7, marginTop: 7 }}>  Join Now!</Text>
                                    </TouchableOpacity>
                                </View>


                            </View>
                        </View>


                    </Content>
                    {this.state.done ? this.success() : null}
                    {this.state.show_camera ? this.renderCameral() : null}
                </Container>
                </ImageBackground>
        );
    };
    success() {
        return (
            <Success
                onPress={() => navigation.replace('Home')}
                message={'User found and verified'}
            />

        );
    }

    renderCameral() {
        Keyboard.dismiss()
        return (
            <CameraView
                onCapture={(ref) => this.onCapture(ref)}
                onClose={() => this.setState({ show_camera: false })}

            />

        );
    }
    onCapture(ref) {
        this.setState({ show_camera: false })
        let proper_img = 'data:image/jpg;base64,' + ref
        this.setState({
            image1: ref,
            image1_display: proper_img
        })
    }


}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    background: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
      },
    backgroundImage: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    mainbody: {
        width: Dimensions.get('window').width,
        flex: 1,
        justifyContent: 'center'
    },
    textInputContainer: {
        flexDirection: 'row',
        marginRight: 30,
        marginLeft: 30,
        height: 45,
        borderColor: '#3E3E3E',
        marginBottom: 15,
        marginTop: 20,
        paddingLeft: 12,
        borderWidth: 0.6,
        borderColor: colors.primary_color,
        borderRadius:40
    },
    input: {
        flex: 1,
        marginLeft: 15,
    },
    text_icon: {
        padding: 10,
        borderRightWidth: 0.6,
        borderRightColor: colors.primary_color,
        alignItems: 'center',
        justifyContent: 'center',
    },
    operation_icon: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sideContent: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 128,
        height: 128,
        marginBottom: 12,
      },
    actionbutton: {
        marginTop: 7,
        marginBottom: 2,
        opacity: 0.5,
        fontSize: 14,
        color: '#0F0E43',
        textAlign: 'left',
        fontFamily: 'Poppins-Regular'
    },
    buttonContainer: {
        height: 50,
        marginRight: 30,
        marginLeft: 30,
        marginTop: 13,
        borderRadius: 40,
    },
});
