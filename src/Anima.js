import React, { Component, Fragment } from 'react';
import {
    Animated,
    Button
} from 'react-native';

export default class FadeInView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fadeAnim: new Animated.Value(0),          // 透明度初始值设为0
        };
    }
    componentDidMount() {
        this.Animated()
    }
    Animated() {
        Animated.timing(
            this.state.fadeAnim,
            {
                toValue: 1,
            }
        ).start();
    }
    Animated2() {
        Animated.timing(
            this.state.fadeAnim,
            {
                toValue: 0,
            }
        ).start();
    }
    render() {
        return (
            <Fragment>
                <Animated.View
                    style={{
                        ...this.props.style,
                        opacity: this.state.fadeAnim
                    }}
                >
                    {this.props.children}
                </Animated.View>
                <Button
                    onPress={this.Animated2()}
                    title="变色"
                />
            </Fragment>

        );
    }
}