import React, { Component } from 'react'
import { Text, StyleSheet, View, ScrollView, FlatList, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { WaveIndicator } from 'react-native-indicators';
import color from '../theme/colors';
import { navigation } from '../../../rootNavigation'
const { height, width } = Dimensions.get("window");

class Loader extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {

    }

    render() {
        const message = this.props.message
        return (
            <>
                        <View style={styles.container} >
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <View style={styles.welcome}>
                                    <WaveIndicator color={color.primary_color} size={45} />
                                    <Text style={{ color: color.primary_color, fontFamily: 'Poppins-Light', fontSize: 13, marginBottom: 2, marginTop: 2 }}>{message}</Text>
                                </View>

                            </View>
                        </View>
            </>

        )
    }

}

const mapStateToProps = state => {
    return {
        loader: state.loader
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
const styles = StyleSheet.create({
    container: {
        zIndex: 1,
        elevation: 2,
        height,
        width,
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: 'white',
    },
    welcome: {
        height: 85
    },
})
