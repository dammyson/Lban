import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    AsyncStorage,
    StyleSheet,
    StatusBar,
    Alert,
    Dimensions
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import { Icon } from 'react-native-elements';
import colors from '../../components/theme/colors'
import { Container, Content } from 'native-base';
import { navigation } from '../../../rootNavigation'
import { connect } from 'react-redux'
import { RegisterRequest } from '../../actions/userActions'


import Users from './user';
import ActivityIndicator from '../../components/views/ActivityIndicator';
import { baseUrl, processResponse } from '../../utilities';


class SignUpTwo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            operation_message: '',
            fname: '',
            lname: '',
            phone: '',
            email: '',
            password: '',
            phone: '',
        };
    }



    async componentDidMount() {
        const { email, password, confirm_password } = this.props.route.params;
        this.setState({ email: email, password: password, confirm_password: confirm_password })
    }

    async SignUpRequest() {

        const { email, password, confirm_password, phone, lname,fname } = this.state
        if (phone == "" || lname == ""  || fname == '') {
          Alert.alert('Validation failed', 'Phone field cannot be empty', [{ text: 'Okay' }])
          return
        } 
        var formData = JSON.stringify({
            email: email,
            userName: fname,
            firstName: fname,
            lastName: lname,
            phoneNumber: phone,
            password: password,
            password_confirmation: confirm_password,
            clientBaseUrl: 'https://lottiefiles.com/search?q=loading+house&category=animations&animations-page=3',
        });
        const { RegisterPostRequest } = this.props
        RegisterPostRequest(formData)
      }


    render() {


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
                               
                                        <Text style={{ color: colors.primary_color, fontFamily: 'Poppins-Bold', fontSize: 16, marginBottom: 2, marginTop: 2}}>Complete  Sign Up</Text>
                                </View>

                                <View style={styles.textInputContainer}>
                                    <View style={styles.text_icon}>
                                        <Icon
                                            name="mobile-phone"
                                            size={23}
                                            type='font-awesome'
                                            color={colors.primary_color}

                                        />
                                    </View>

                                    <View style={styles.input}>
                                        <TextInput
                                            placeholder="Phone "
                                            placeholderTextColor={colors.placeholder_color}
                                            returnKeyType="next"
                                            keyboardType='default'
                                            autoCapitalize="none"
                                            autoCorrect={false}
                                            style={{ flex: 1, fontSize: 12, color: colors.primary_color, fontFamily: 'Poppins-SemiBold', }}
                                            onChangeText={(text) => this.setState({phone: text})}
                                            onSubmitEditing={() => this.fnameInput.focus()}
                                        />
                                    </View>

                                </View>

                                <View style={styles.textInputContainer}>
                                    <View style={styles.text_icon}>
                                        <Icon
                                            name="user"
                                            size={20}
                                            type='entypo'
                                            color={colors.primary_color}

                                        />
                                    </View>

                                    <View style={styles.input}>
                                        <TextInput
                                            placeholder="First Name "
                                            placeholderTextColor={colors.placeholder_color}
                                            returnKeyType="next"
                                            keyboardType='email-address'
                                            autoCapitalize="none"
                                            autoCorrect={false}
                                            style={{ flex: 1, fontSize: 12, color: colors.primary_color, fontFamily: 'Poppins-SemiBold', }}
                                            ref={(input)=> this.fnameInput = input}
                                            onChangeText={(text) => this.setState({fname: text})}
                                            onSubmitEditing={() => this.lnameInput.focus()}

                                        />
                                    </View>

                                </View>

                                <View style={styles.textInputContainer}>
                                    <View style={styles.text_icon}>
                                        <Icon
                                            name="user"
                                            size={20}
                                            type='entypo'
                                            color={colors.primary_color}

                                        />
                                    </View>

                                    <View style={styles.input}>
                                        <TextInput
                                            placeholder="Last Name "
                                            placeholderTextColor={colors.placeholder_color}
                                            returnKeyType="next"
                                            keyboardType='email-address'
                                            autoCapitalize="none"
                                            autoCorrect={false}
                                            style={{ flex: 1, fontSize: 12, color: colors.primary_color, fontFamily: 'Poppins-SemiBold', }}
                                            ref={(input)=> this.lnameInput = input}
                                            onChangeText={(text) => this.setState({lname: text})}
                                            onSubmitEditing={() => this.SignUpRequest()}
                                        />
                                    </View>

                                </View>

                             
                                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={[colors.primary_color, colors.primary_color]} style={styles.buttonContainer} block iconLeft>
                                    <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }} onPress={() => this.SignUpRequest()} >
                                        <Text style={{ fontFamily: 'Poppins-SemiBold', color: '#fff', fontSize: 14 }}>Create account</Text>
                                    </TouchableOpacity>
                                </LinearGradient>

                                <View style={{ marginLeft: 20, marginRight: 20, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginBottom: 10, marginTop:10 }}>
                                   
                                    <TouchableOpacity onPress={() =>this.props.navigation.goBack()} style={{ alignItems: 'center' }}>
                                        <Text style={{ color: colors.primary_color, fontFamily: 'Poppins-Bold', fontSize: 13, marginBottom: 7, marginTop: 7 }}> Previous</Text>
                                    </TouchableOpacity>
                                </View>


                            </View>
                        </View>


                    </Content>
                </Container>
                {this.state.loading ? <ActivityIndicator /> : null}
            </View>
        );
    };

}

const mapStateToProps = state => {
    console.warn( state.user.user)
    state.user.user.hasOwnProperty('id') ?
    navigation.navigate('SignIn') : null  
    return {
        user: state.user
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        RegisterPostRequest: (details) => dispatch(RegisterRequest(details))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignUpTwo);


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