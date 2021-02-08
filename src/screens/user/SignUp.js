import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet,
    StatusBar,
    Alert,
    Keyboard,
    ImageBackground,
    Dimensions
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import { Icon } from 'react-native-elements';
import LottieView from 'lottie-react-native';
import colors from '../../components/theme/colors'
import { Container, Content } from 'native-base';
import Success from '../../components/views/Success';
import CameraView from '../../components/CameraView';
import { baseUrl, setToken, setRefresheToken, setIsFirst, setUserId, processResponse } from '../../utilities';
import Loader from '../../components/loader/Loader';

import Users from './user';



export default class SignInScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            operation_message: '',
            fname: '',
            lname: '',
            phone: '',
            email: '',
            image1: '',
            image1_display: '',
            image2: '',
            password:'',
            image2_display: '',
            is_valide_mail: false,
            secureTextEntry: false,
            show_camera: false,
            agree: false,
            done: false,
            image_no: 0,
        };
    }
    async componentDidMount() {

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

    processStepOne() {
        const { email, phone, lname, fname, is_valide_mail, agree, password, image1, image2 } = this.state
        if (email == "" || phone == "" || lname == "" || fname == ''|| password == '') {
            Alert.alert('Validation failed', 'Field cannot be empty', [{ text: 'Okay' }])
            return
        }
        if (image1 == "" || image2 == '') {
            Alert.alert('Validation failed', 'Please make sure you select test images', [{ text: 'Okay' }])
            return
        }
        if (!is_valide_mail) {
            Alert.alert('Validation failed', 'Email is invalid', [{ text: 'Okay' }])
            return
        }
        if (!agree) {
            Alert.alert('Validation failed', 'You must accept or termps and conditions', [{ text: 'Okay' }])
            return
        }
        var payload = {
            firstName: fname,
            fastName: lname,
            email: email,
            password: password,
            PhoneNumber: phone,
            Identity: email,
            confirmPassword: password,
            TrainingImage1: image1,
            TrainingImage2: image2

        }
        var formData = JSON.stringify(payload);

        this.setState({ loading: true })
        fetch(baseUrl() + 'api/facecog/registration', {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }, body: formData
        })
            .then(processResponse)
            .then(res => {
                const { statusCode, data } = res;
                console.warn(statusCode, data );
                this.setState({ loading: false })
                if (statusCode === 200) {
                    setToken(email)
                    this.setState({ loading: false,})
                    this.props.navigation.replace('SignIn')
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

    pickSingle(no) {
        Keyboard.dismiss()
        if (no == 1) {
            this.setState({
                image_no: 1,
                show_camera: true
            })
        } else {
            this.setState({
                image_no: 2,
                show_camera: true
            })
        }
    }




    render() {
        if (this.state.loading) {
            return (
                <Loader message={'Proccessing Registration...'} />
            );
        }

        return (
            <View style={styles.container}>
                <StatusBar backgroundColor='#fff' barStyle="dark-content" />
                <Container style={{ backgroundColor: 'transparent' }}>
                    <Content>
                        <View style={styles.backgroundImage}>
                            <View style={styles.mainbody}>



                                <View style={styles.sideContent}>

                                </View>

                                <View style={{ marginLeft: 20, marginRight: 20, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginBottom: 5, }}>

                                    <Text style={{ color: colors.primary_color, fontFamily: 'Poppins-Bold', fontSize: 16, marginBottom: 2, marginTop: 2 }}>  Sign UP</Text>
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


                                <View style={styles.textInputContainer}>

                                    <View style={styles.input}>
                                        <TextInput
                                            placeholder="Phone "
                                            placeholderTextColor={colors.placeholder_color}
                                            returnKeyType="next"
                                            keyboardType='default'
                                            autoCapitalize="none"

                                            autoCorrect={false}
                                            style={{ flex: 1, fontSize: 12, color: colors.primary_color, fontFamily: 'Poppins-SemiBold', }}
                                            onChangeText={(text) => this.setState({ phone: text })}
                                            onSubmitEditing={() => this.fnameInput.focus()}
                                        />
                                    </View>

                                </View>
                                <View style={styles.textInputContainer}>
                                  

                                  <View style={styles.input}>
                                      <TextInput
                                          placeholder="Password"
                                          placeholderTextColor={colors.placeholder_color}
                                          secureTextEntry
                                          returnKeyType="next"
                                          onSubmitEditing={() => this.loginRequest()}
                                          keyboardType='password'
                                          autoCapitalize="none"
                                          autoCorrect={false}
                                          style={{ flex: 1, fontSize: 12, color: colors.primary_color, fontFamily: 'Poppins-SemiBold', }}
                                          onChangeText={(text) => this.setState({password: text})}
                                          onSubmitEditing={() => this.passwordInput.focus()}
                                      />
                                  </View>
                              </View>

                                <View style={styles.textInputContainer}>
                                    <View style={styles.input}>
                                        <TextInput
                                            placeholder="First Name "
                                            placeholderTextColor={colors.placeholder_color}
                                            returnKeyType="next"
                                            keyboardType='email-address'
                                            autoCapitalize="none"
                                            autoCorrect={false}
                                            style={{ flex: 1, fontSize: 12, color: colors.primary_color, fontFamily: 'Poppins-SemiBold', }}
                                            ref={(input) => this.fnameInput = input}
                                            onChangeText={(text) => this.setState({ fname: text })}
                                            onSubmitEditing={() => this.lnameInput.focus()}

                                        />
                                    </View>

                                </View>

                                <View style={styles.textInputContainer}>
                                    <View style={styles.input}>
                                        <TextInput
                                            placeholder="Last Name "
                                            placeholderTextColor={colors.placeholder_color}
                                            returnKeyType="next"
                                            keyboardType='email-address'
                                            autoCapitalize="none"
                                            autoCorrect={false}
                                            style={{ flex: 1, fontSize: 12, color: colors.primary_color, fontFamily: 'Poppins-SemiBold', }}
                                            ref={(input) => this.lnameInput = input}
                                            onChangeText={(text) => this.setState({ lname: text })}
                                            onSubmitEditing={() => this.SignUpRequest()}
                                        />
                                    </View>

                                </View>
                             
                                <View style={{ flexDirection: 'row', marginRight: 30, marginLeft: 30, height: 100, marginTop: 10, marginBottom: 5 }}>
                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                                        <ImageBackground
                                            source={{ uri: this.state.image1_display }}
                                            imageStyle={{ borderRadius: 10, }}
                                            style={{ backgroundColor: "#FFF", height: 80, width: 80, borderRadius: 10, borderWidth: 1, borderColor: colors.primary_color }}>
                                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                                                <TouchableOpacity style={{}} transparent onPress={() => this.pickSingle(1)}>
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
                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>

                                        <ImageBackground
                                            source={{ uri: this.state.image2_display }}
                                            imageStyle={{ borderRadius: 10, }}
                                            style={{ backgroundColor: "#FFF", height: 80, width: 80, borderRadius: 10, borderWidth: 1, borderColor: colors.primary_color }}>
                                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                                                <TouchableOpacity style={{}} transparent onPress={() => this.pickSingle(2)}>
                                                    <Icon
                                                        active
                                                        name="camera"
                                                        type='feather'
                                                        color={colors.primary_color}
                                                        size={20}
                                                    />
                                                    <Text style={{ color: colors.placeholder_color, fontFamily: 'Poppins-SemiBold', fontSize: 10, fontWeight: '400' }}>Image 2 </Text>
                                                </TouchableOpacity>

                                            </View>


                                        </ImageBackground>
                                    </View>


                                </View>



                                <View style={[styles.terms_container]}>
                                    {!this.state.agree ?
                                        <TouchableOpacity onPress={() => this.setState({ agree: true, show_terms_error: false })} style={[{ height: 15, width: 15, justifyContent: 'center', alignItems: 'center', }]}>
                                            <Icon
                                                name="checkbox-passive"
                                                type='fontisto'
                                                size={15}
                                                color={colors.primary_color}
                                            />
                                        </TouchableOpacity>
                                        :
                                        <TouchableOpacity onPress={() => this.setState({ agree: false })} style={[{ height: 15, width: 15, justifyContent: 'center', alignItems: 'center', }]}>
                                            <Icon
                                                name="checkbox-active"
                                                type='fontisto'
                                                size={15}
                                                color={colors.primary_color}
                                            />
                                        </TouchableOpacity>
                                    }
                                    <Text style={{ color: colors.secondary_color, fontSize: 12, fontWeight: '200', marginLeft: 5 }}>I have read and accepted the </Text>
                                    <TouchableOpacity onPress={() => this.setState({ show_terms: true })} >
                                        <Text style={{ color: colors.primary_color, fontFamily: 'Poppins-SemiBold', fontSize: 12, fontWeight: '400' }}>Terms & Conditions  </Text>
                                    </TouchableOpacity>
                                </View>
                                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={[colors.primary_color, colors.primary_color]} style={styles.buttonContainer} block iconLeft>
                                    <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }} onPress={() => this.processStepOne()}>
                                        <Text style={{ fontFamily: 'Poppins-SemiBold', color: '#fff', fontSize: 14 }}>Next</Text>
                                    </TouchableOpacity>
                                </LinearGradient>

                                <View style={{ marginLeft: 20, marginRight: 20, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginBottom: 10, }}>
                                    <View style={{ alignItems: 'center' }}>
                                        <Text style={{ color: colors.secondary_color, fontFamily: 'Poppins-Medium', fontSize: 12, marginBottom: 7, marginTop: 7 }}>Already a member?</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('SignIn')} style={{ alignItems: 'center' }}>
                                        <Text style={{ color: colors.primary_color, fontFamily: 'Poppins-Bold', fontSize: 13, marginBottom: 7, marginTop: 7 }}>  Sign In!</Text>
                                    </TouchableOpacity>
                                </View>


                            </View>
                        </View>


                    </Content>
                    {this.state.show_camera ? this.renderCameral() : null}
                </Container>

            </View>
        );
    };

    success() {
        return (
            <Success
                onPress={() => navigation.goBack()}
                message={'Registration Was successful'}
            />

        );
    }

    renderCameral() {
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
        const { image_no } = this.state
        if (image_no == 1) {
            this.setState({
                image1: ref,
                image1_display: proper_img
            })
        } else {
            this.setState({
                image2: ref,
                image2_display: proper_img
            })
        }
    }

}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF'
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
        height: 42,
        borderColor: '#3E3E3E',
        marginBottom: 15,
        marginTop: 10,
        paddingLeft: 12,
        borderWidth: 0.6,
        borderColor: colors.primary_color,
        borderRadius: 40
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
        borderRadius: 25,
    },
    terms_container: {
        flexDirection: 'row',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 10,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
