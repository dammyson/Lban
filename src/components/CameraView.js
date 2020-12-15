import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
    Dimensions
} from 'react-native';
import { Icon } from 'react-native-elements';
import { CameraKitCamera } from 'react-native-camera-kit';
import { readFile as read, writeFile as write } from "react-native-fs";


export default class CameraView extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    async onCapture() {
        const image = await this.camera.capture();
         const { onCapture } = this.props;
        let img = image.uri;
        read(img, "base64").then(contents => {
         console.warn(contents);
         onCapture(contents)
          //content is base64 do seomthing wtih it.
        });

    }

    async onswitch() {
        this.camera.changeCamera()
       

    }

    render() {
        const { onClose } = this.props;
        return (
            <View style={{
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height - 40,
                backgroundColor: 'red', position: 'absolute'
            }}>
                <CameraKitCamera
                    actions={{ rightButtonText: 'Done', leftButtonText: 'Cancel' }}
                    onBottomButtonPressed={(event) => this.onBottomButtonPressed(event)}
                    ref={(cam) => (this.camera = cam)}
                    style={{
                        flex: 1,
                        backgroundColor: 'red',
                    }}
                    cameraOptions={{
                        flashMode: 'auto', // on/off/auto(default)
                        focusMode: 'on', // off/on(default)
                        zoomMode: 'on', // off/on(default)
                        ratioOverlay: '1:1', // optional
                        ratioOverlayColor: '#00000077', // optional
                    }}
                    onReadCode={(
                        event, // optional
                    ) => console.log(event.nativeEvent.codeStringValue)}
                    resetFocusTimeout={0} // optional
                    resetFocusWhenMotionDetected={true} // optional
                />
                <View style={{
                    width: Dimensions.get('window').width,
                    height: 90,
                    position: 'absolute',
                    bottom: 1, flexDirection: 'row'
                }}>
                    <View style={{ flex: 1,  justifyContent: 'center', alignItems: 'center', }}>
                        <TouchableOpacity style={{}} onPress={() => this.onswitch()} >
                            <Icon
                                name="camera-front"
                                type='material'
                                size={35}
                                color={'#FFF'}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1,justifyContent: 'center', alignItems: 'center', }}>
                        <TouchableOpacity style={{}} onPress={() => this.onCapture()} >
                            <Icon
                                name="picasa"
                                type='entypo'
                                size={45}
                                color={'#FFF'}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                        <TouchableOpacity style={{}} onPress={() => onClose()} >
                            <Icon
                                name="close"
                                type='antdesign'
                                size={35}
                                color={'#FFF'}
                            />
                        </TouchableOpacity>
                    </View>

                </View>
            </View >
        );
    };

}




const styles = StyleSheet.create({
    container: {
        flex: 1,
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

});
