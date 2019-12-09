import React, { Component } from 'react';
import { View, Text, Image, Dimensions, ScrollView, TouchableHighlight, StyleSheet, TouchableOpacity } from 'react-native';
import { Actions } from "react-native-router-flux";
import { getCate } from '../../http'

const { width } = Dimensions.get('window');
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: false
        }
    }

    login() {
        this.setState({
            isLogin: true
        })
    }

    logout() {
        this.setState({
            isLogin: false
        })
    }

    render() {
        return <View style={styles.container}>
            <ScrollView>
                <View style={styles.topBar}>
                    <Image source={require('../../assets/me/bg5.png')} style={styles.topImg} />
                    <UserData isLogin={this.state.isLogin} login={() => {
                        this.login()
                    }} />
                </View>
                <TouchableHighlight style={styles.userAd}>
                    <View style={styles.yum}>
                        <View style={styles.yutext}>
                            <Text style={{ fontSize: 25, color: '#fff' }}>0</Text>
                            <Text style={{ color: '#fff' }}>已听过(分钟)</Text>
                        </View>
                        <View style={styles.line}></View>
                        <View style={styles.yutext}>
                            <Text style={{ fontSize: 25, color: '#fff' }}>0</Text>
                            <Text style={{ color: '#fff' }}>读过(本)</Text>
                        </View>
                    </View>
                </TouchableHighlight>
                <Vip />
                <NaviList />
                <Loginout isLogin={this.state.isLogin} logout={() => {
                    this.logout()
                }} />
            </ScrollView>
        </View>;
    }
}

class Loginout extends Component {
    constructor(props) {
        super(props)
    }

    logout() {
        this.props.logout()
    }

    render() {
        if (this.props.isLogin) {
            return <View style={{ alignItems: 'center' }}>
                <TouchableHighlight style={styles.loginout}
                    onPress={() => {
                        this.logout()
                    }} underlayColor='#fff'>
                    <Text style={{ textAlign: 'center', color: '#f00' }}>退出登录</Text>
                </TouchableHighlight>
            </View>
        } else {
            return <View>

            </View>
        }

    }
}

class UserData extends Component {
    render() {
        if (this.props.isLogin) {
            return <View style={styles.userInf}>
                <Image source={require('../../assets/me/head.png')}
                    style={{ width: 80, height: 80, marginRight: 20 }} />
                <View>
                    <View style={styles.userv}>
                        <Text style={{ color: '#fff', fontSize: 27 }}>倒影</Text>
                        <Image source={require('../../assets/me/yinpai.png')}
                            style={{ width: 90, height: 26, marginLeft: 15 }} />
                    </View>
                    <Text style={{ color: '#fff', fontSize: 18 }}>手机号:15697157335</Text>
                </View>
            </View>
        } else {
            return <View style={styles.userInf}>
                <Image source={require('../../assets/me/userImg.png')}
                    style={{ width: 80, height: 80, marginRight: 20 }} />
                <TouchableHighlight onPress={() => this.logine()} underlayColor='#F5F5F5'>
                    <Text style={{ color: '#fff', fontSize: 27 }}>点击登录</Text>
                </TouchableHighlight>
            </View>
        }

    }

    logine() {
        this.props.login()
    }
}

class NaviList extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <View style={styles.navbox}>
            <TouchableHighlight>
                <View style={styles.navi}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={require('../../assets/me/xiaoxi.png')} style={{ width: 27, height: 27 }} />
                        <Text style={styles.navtext}>我的书籍</Text>
                    </View>
                    <Image source={require('../../assets/me/nextIcon.png')} style={{ width: 10, height: 17 }} />
                </View>
            </TouchableHighlight>
            <TouchableHighlight>
                <View style={styles.navi}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={require('../../assets/me/chongzhi.png')} style={{ width: 27, height: 27 }} />
                        <Text style={styles.navtext}>我的音乐</Text>
                    </View>
                    <Image source={require('../../assets/me/nextIcon.png')} style={{ width: 10, height: 17 }} />
                </View>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => {
                NaviList.goCata('目录')
            }} underlayColor='#F5F5F5'>
                <View style={styles.navi}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={require('../../assets/me/qingchu.png')} style={{ width: 27, height: 27 }} />
                        <Text style={styles.navtext}>我的目录</Text>
                    </View>
                    <Image source={require('../../assets/me/nextIcon.png')} style={{ width: 10, height: 17 }} />
                </View>
            </TouchableHighlight>
            <TouchableHighlight>
                <View style={styles.navi}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={require('../../assets/me/qingchu.png')} style={{ width: 27, height: 27 }} />
                        <Text style={styles.navtext}>我的音乐</Text>
                    </View>
                    <Image source={require('../../assets/me/nextIcon.png')} style={{ width: 10, height: 17 }} />
                </View>
            </TouchableHighlight>
            <TouchableHighlight>
                <View style={styles.navi}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={require('../../assets/me/xiaoxi.png')} style={{ width: 27, height: 27 }} />
                        <Text style={styles.navtext}>消息提醒</Text>
                    </View>
                    <Image source={require('../../assets/me/nextIcon.png')} style={{ width: 10, height: 17 }} />
                </View>
            </TouchableHighlight>
            <TouchableHighlight>
                <View style={styles.navi}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={require('../../assets/me/xiaoxi.png')} style={{ width: 27, height: 27 }} />
                        <Text style={styles.navtext}>清除缓存</Text>
                    </View>
                    <Image source={require('../../assets/me/nextIcon.png')} style={{ width: 10, height: 17 }} />
                </View>
            </TouchableHighlight>
        </View>
    }

    static goCata(title) {
        Actions.catalogs({ title: title })
    }
}
class Vip extends Component {
    constructor(props) {
        super(props),
            this.state = {}
    }
    goVip() {
        Actions.vipCenter()
    }
    render() {
        return <View style={styles.card}>
            <View style={styles.vipcard}>
                <Text style={{ fontSize: 18 }}>12个月vip会员</Text>
                <View style={{ flexDirection: 'row', marginTop: 12 }}>
                    <Text style={{ color: "#999" }}>已使用/<Text style={{ color: '#474747', fontSize: 18 }}>300</Text>天</Text>
                    <Text style={{ color: "#999", marginLeft: 40 }}>剩余/<Text style={{ color: '#474747', fontSize: 18 }}>65</Text>天</Text>
                </View>
                <TouchableOpacity style={styles.liji} onPress={() => {
                    this.goVip()
                }}>
                    <Text style={{ textAlign: 'center', lineHeight: 38 }}>立即续费</Text>
                </TouchableOpacity>

            </View>
        </View>
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width,
        backgroundColor: '#f2f2f2'
    },
    topBar: {
        position: 'relative',
        width: width
    },
    userInf: {
        position: 'absolute',
        flexDirection: 'row',
        marginTop: 40,
        marginLeft: 40,
        alignItems: 'center'
    },
    topImg: {
        width: width,
        height: 200
    },
    navtext: {
        fontSize: 20,
        marginLeft: 15
    },
    userv: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    navbox: {
        marginTop: 130,
        width: width,
        backgroundColor: '#fff'
    },
    navi: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#f1f1f1',
        borderBottomWidth: 1.5,
        height: 46,
        justifyContent: 'space-between',
        paddingLeft: 24,
        paddingRight: 24
    },
    line: {
        height: 50,
        width: 1,
        backgroundColor: "#fff",
        marginTop: 28
    },
    loginout: {
        borderWidth: 1.5,
        borderColor: '#f00',
        width: 120,
        height: 35,
        borderRadius: 30,
        justifyContent: 'center',
        marginTop: 20
    },
    yum: {
        width: width * 0.9,
        height: 100,
        flexDirection: 'row'
    },
    yutext: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff'

    },
    userAd: {
        position: 'absolute',
        width: width,
        alignItems: 'center',
        top: 110,
        zIndex: 8
    },
    card: {
        position: 'absolute',
        width: width,
        alignItems: 'center',
        top: 195,
        backgroundColor: '#fff',
        height: 120,
        paddingTop: 20
    },
    vipcard: {
        width: width * 0.9,
        backgroundColor: "#F2E4C6",
        height: 80,
        borderRadius: 10,
        paddingVertical: 10,
        paddingLeft: 15
    },
    liji: {
        position: 'absolute',
        right: 0,
        height: 38,
        top: 21,
        backgroundColor: "#FFD51B",
        width: 90,
        borderTopLeftRadius: 38,
        borderBottomLeftRadius: 38
    }
})
