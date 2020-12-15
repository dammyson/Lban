import React from 'react'
import { StyleSheet, StatusBar, Dimensions, View, Text} from 'react-native'
import PropTypes from 'prop-types';
import { BallIndicator } from 'react-native-indicators';
import color from '../theme/colors';


const width = Dimensions.get('window').width


const ActivityIndicator = ({name, message, onPress }) => {


  return (
   
    <View
    style={styles.loadingBackgroundImage}
    resizeMode="cover"
>
    <StatusBar barStyle="dark-content" hidden={false} backgroundColor="transparent" />
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={styles.welcome}>
            <BallIndicator color={color.primary_color} size={45} />
            <Text style={{ color: color.primary_color, fontFamily: 'Poppins-Light', fontSize: 13, marginBottom: 2, marginTop: 2}}>  loading..</Text>
        </View>
       
    </View>
</View>
  )
}

const styles = StyleSheet.create({
    loadingBackgroundImage: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor:'#FFF',
        position: "absolute",
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
    },
    welcome: {
        height:85
      },
    
});

export default ActivityIndicator