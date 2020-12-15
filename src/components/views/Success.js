import React from 'react'
import { StyleSheet, Text, Dimensions, View, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types';
import { Icon } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient';

const width = Dimensions.get('window').width


export default class Success extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            code: [],
            auth: '',
            loading: false,
            lname: '',
            fname: ''

        };
    }

    async componentWillMount() {
        const name = JSON.parse(await getData())
        this.setState({
            fname: name.first_name,
            lname: name.last_name
        })
    }

    render() {
        const { name, message, onPress } = this.props;
        return (
            <View style={styles.backgroundImage} block iconLeft>
                <View style={{ flex: 1.6 }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: '#FFF', fontSize: 23, marginBottom: 20, fontWeight: '900' }}>Successful </Text>
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
                        <Text style={{ color: '#3AA34E', fontSize: 19, fontWeight: '500' }}> {message} </Text>
                    </View>
                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#4b47b7', '#0f0e43']} style={styles.buttonContainer} block iconLeft>
                        <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }} onPress={onPress}>
                            <Text style={{ fontFamily: 'Poppins-SemiBold', color: '#fdfdfd', fontSize: 14 }}>Continue</Text>
                        </TouchableOpacity>
                    </LinearGradient>

                </View>
            </View>
        )
    }

}

Success;

const styles = StyleSheet.create({
    backgroundImage: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    buttonContainer: {
        height: 65,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 30,
        borderRadius: 5,
    },


});
