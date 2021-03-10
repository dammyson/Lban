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
import { Container, Content, Toast } from 'native-base';
import Success from '../../components/views/Success';
import CameraView from '../../components/CameraView';
import { baseUrl, setToken, setRefresheToken, setIsFirst, setUserId, processResponse } from '../../utilities';
import Loader from '../../components/loader/Loader';

import Users from './user';



export default class SignPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            operation_message: '',
            token: '',
        };
    }
    async componentDidMount() {

    }

    processVerify() {
        const { token, } = this.state
        if (token == "") {
            Alert.alert('Validation failed', 'Field cannot be empty', [{ text: 'Okay' }])
            return
        }
     
        var payload = {
            token: token,
        }

        var formData = JSON.stringify(payload);

        this.setState({ loading: true })
        fetch(baseUrl() + 'accounts/verify-email', {
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
                    this.setState({ loading: false,})
                    Toast.show({
                        text: "Email was verified!",
                        buttonText: "Okay",
                        duration: 3000
                      })
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

                                <View style={{ marginLeft: 20, marginRight: 20, justifyContent: 'center', alignItems: 'center', marginBottom: 5, }}>

                                    <Text style={{ color: colors.primary_color, fontFamily: 'Poppins-Bold', fontSize: 16, marginBottom: 2, marginTop: 2 }}> Complete Sign UP</Text>
                                    <Text style={{ color: colors.primary_color, fontFamily: 'Poppins-Light', fontSize: 12, marginBottom: 2, marginTop: 2 }}> Check your email and get the token</Text>
                                </View>


                            

                                <View style={styles.textAreaContainer} >
                                    <TextInput
                                        style={styles.textArea}
                                        underlineColorAndroid="transparent"
                                        placeholder="Token Background"
                                        placeholderTextColor={colors.placeholder_color}
                                        numberOfLines={5}
                                        multiline={true}
                                        onChangeText={(text) => this.setState({ token: text })}
                                    />
                                </View>

                              

                                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={[colors.primary_color, colors.primary_color]} style={styles.buttonContainer} block iconLeft>
                                    <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }} onPress={() => this.processVerify()}>
                                        <Text style={{ fontFamily: 'Poppins-SemiBold', color: '#fff', fontSize: 14 }}>Complete Registration</Text>
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
        height: 82,
        borderColor: '#3E3E3E',
        marginBottom: 15,
        marginTop: 10,
        paddingLeft: 12,
        borderWidth: 0.6,
        borderColor: colors.primary_color,
        borderRadius: 5
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
    textAreaContainer: {
        marginBottom: 10,
        marginTop: 10,
        height: 80,
        borderColor: colors.primary_color,
        borderWidth: 0.6,
        marginRight: 30,
        marginLeft: 30,
        borderRadius: 5,
        justifyContent: 'center',
    },
    textArea: {
        height: 75,
        justifyContent: "flex-start",
        marginLeft: 20,
        marginRight: 20,
        flex: 1,
        textAlignVertical: 'top',
        fontSize: 12,
        fontFamily: 'Montserrat-Regular',
    },
});
