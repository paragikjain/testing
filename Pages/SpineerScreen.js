import React from 'react';
import {Animated, StyleSheet} from 'react-native';

import {PanGestureHandler, PinchGestureHandler, RotationGestureHandler, State,} from 'react-native-gesture-handler';

let logo = 'https://pluspng.com/img-png/beer-bottle-png-hd-beer-bottle-png-image-png-image-1275.png'

export class SpinnerScreen extends React.Component {
     rotationRef = React.createRef();
 constructor(props) {
        super(props);

        this.state = {
            _isMounted: false
        };

  /* Rotation */
        this._rotate = new Animated.Value(0);
        this._rotateStr = this._rotate.interpolate({
            inputRange: [-100, 100],
            outputRange: ['-50rad', '50rad'],
        });
        this._lastRotate = 0;
        this._onRotateGestureEvent = Animated.event(
            [{nativeEvent: {rotation: this._rotate}}],
            {useNativeDriver: true}
        );

        

        this._translateX = new Animated.Value(0);
        this._translateY = new Animated.Value(0);

        this._lastOffset = {x: 0, y: 0};


    }


    _onRotateHandlerStateChange = event => {
        if (event.nativeEvent.oldState === State.ACTIVE) {
            this._lastRotate += event.nativeEvent.rotation;
            this._rotate.setOffset(this._lastRotate);
            this._rotate.setValue(0);
        }
    };



    render() {
        const {image, children} = this.props;

        return (
            <React.Fragment>

                <Animated.View  style={[
                    styles.wrapper,
                    {
                        transform: [
                            {translateX: this._translateX},
                            {translateY: this._translateY},
                        ],
                    },
                ]}>
                    <RotationGestureHandler
                       onGestureEvent={this._onRotateGestureEvent}
                       onHandlerStateChange={this._onRotateHandlerStateChange}
                        >
                        <Animated.View style={[
                                styles.wrapper,
                                {
                                    transform: [
                                        {rotate: this._rotateStr},
                                    ],
                                },
                            ]}
                        
                            
                           collapsable={false}>
                                    <Animated.Image
                                        resizeMode={"contain"}
                                        style={[
                                            styles.pinchableImage,
                                        ]}
                                        source={{uri: logo}}
                                    />
                              
                            
                        </Animated.View>
                    </RotationGestureHandler>
                </Animated.View>
            
                { children }
            </React.Fragment>
        );
    }
}

export default SpinnerScreen;


const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'transparent',
        overflow: 'hidden',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'
    },
    pinchableImage: {
        backgroundColor: "transparent",
        ...StyleSheet.absoluteFillObject,
    },
    wrapper: {
        flex: 1,
    },
});