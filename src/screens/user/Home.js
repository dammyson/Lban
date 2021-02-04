import React from 'react'
import { StyleSheet, Text, Alert, Dimensions, View, TouchableOpacity ,AsyncStorage} from 'react-native'
import PropTypes from 'prop-types';
import { Icon } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../components/theme/colors'
import { baseUrl, setToken, setRefresheToken, setIsFirst, setUserId, processResponse } from '../../utilities';
import Loader from '../../components/loader/Loader';

const width = Dimensions.get('window').width


export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            code: [],
            auth: '',
            loading: false,
            lname: '',
            fname: '',
            email:""

        };
    }

    async componentWillMount() {
        this.setState({
            email: await getToken()
          })
    }


    async timeOutRequest() {
        const { email, } = this.state
       
        var payload = {
            Identity: email,
        }
        var formData = JSON.stringify(payload);

        this.setState({ loading: true })
        fetch('https://facerecogapi.azurewebsites.net/api/attendance/timeout', {
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
                   this.logOut();
                } else if (statusCode === 404) {
                    this.logOut();
                 } else {
                    this.logOut();
                }
            })
            .catch((error) => {
                this.setState({ loading: false })
                alert(error.message);
            });
    }

    logOut() {
        try {
            this.setState({ visible_log_merchant: false })
           AsyncStorage.clear();
            setTimeout(() => {
                this.props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'Welcome'}],
                  });
            }, 500);
    
            return true;
        }
        catch (exception) {
            return false;
        }
    
    
    
    }

    render() {
        if (this.state.loading) {
            return (
                <Loader message={'Clocking Out...'} />
            );
        }
        return (
            <View style={styles.backgroundImage} block iconLeft>
                <View style={{ flex: 1.6 }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: colors.primary_color, fontSize: 23, marginBottom: 20, fontWeight: '900' }}>Successful </Text>
                        <Icon
                                name="check-circle"
                                size={180}
                                type='feather'
                                color={'green'}
                            />

                    </View>
                </View>

                <View style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'center', borderRadius: 15 }}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ color: colors.primary_color, fontSize: 19, fontWeight: '500' }}> You have Successfully signed in</Text>
                    </View>
                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={[colors.primary_color, colors.primary_color,]} style={styles.buttonContainer} block iconLeft>
                        <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }} onPress={()=>this.timeOutRequest()}>
                            <Text style={{ fontFamily: 'Poppins-SemiBold', color: '#fdfdfd', fontSize: 14 }}>CLOCK OUT</Text>
                        </TouchableOpacity>
                    </LinearGradient>

                </View>
            </View>
        )
    }

}


const styles = StyleSheet.create({
    backgroundImage: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: '#fff',
    },
    buttonContainer: {
        height: 65,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 30,
        borderRadius: 5,
    },


});
