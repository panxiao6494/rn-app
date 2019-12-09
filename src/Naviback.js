import React, { Component, useState, useEffect } from 'react';
import { Button, View, Text, Image, StyleSheet, ScrollView, TouchableHighlight, Dimensions, TouchableOpacity, Alert } from 'react-native';
//封装全局的顶部导航栏
export default class Naviback extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentWillMount() {
        console.log(this.props)
    }
    naviback() {
        this.props.naviback()
    }
    render() {
        return (
            <View style={styles.topbar}>
                <TouchableOpacity onPress={() => { this.naviback() }} style={styles.ba}>
                    <View style={styles.back}>
                        <Image source={require('../assets/index/back.png')} style={styles.topimg} />
                        <Text style={{ fontSize: 18 }}>返回</Text>
                    </View>
                </TouchableOpacity>
                <Text style={styles.toptext}>{this.props.title}</Text>
            </View>
        )
    }
}
const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    topbar: {
        width: width,
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        borderBottomWidth: 1.2,
        borderBottomColor: '#666',
        backgroundColor: '#fff'
    },
    back: {
        flexDirection: 'row',
        alignItems: 'center',
        width: width * 0.4
    },
    topimg: {
        width: 25,
        height: 25,
    },
    toptext: {
        textAlign: "center",
        fontSize: 22,
        marginLeft: 15
    }
})