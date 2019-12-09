import React, { Component, useState, useEffect, Fragment } from 'react';
import {
    View,
    Text,
    Image,
    AppRegistry,
    StyleSheet,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    Navigator
} from 'react-native'
import Naviback from './Naviback'
import RadioModal from 'react-native-radio-master';
import Home from './tab/Home'
import Book from './tab/Book'
import Huaizhu from './tab/Huaizhu'
import TabNavigator from 'react-native-tab-navigator';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
const taoData = [
    { cate: '连续包月', price: 6, oldPrice: 10, tip: '新用户首月6元' },
    { cate: '一个月vip', price: 10, oldPrice: 12, tip: '每天0.33元' },
    { cate: '三个月', price: 30, oldPrice: 35, tip: '每天0.33元' },
    { cate: '半年vip', price: 55, oldPrice: 60, tip: '每天0.33元' }
]
let payList = [
    { type: 'wx', img: require('../assets/me/wxicon.png'), text: '微信支付', checked: true },
    { type: 'zf', img: require('../assets/me/zhifu.png'), text: '支付宝支付', checked: false }
]
export default class VipCenter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            index: 0,
            payList: payList
        }

    }

    naviback() {
        console.log(this.props)
        const { navigation } = this.props;
        navigation.pop()
    }
    chActive(i) {
        this.setState({
            index: i
        })
    }
    changeZhi = (i) => {
        let payList = this.state.payList
        payList[i].checked = true
        payList.forEach((item, index) => {
            if (i !== index) {
                item.checked = false
            }
        })
        this.setState({
            payList
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <Naviback title={'会员中心'} naviback={() => this.naviback()} />
                <View style={styles.box}>
                    <View style={styles.vipcard}>
                        <View style={{ flexDirection: 'row' }}>
                            <Image source={require('../assets/me/head.png')} style={{ height: 70, height: 70 }} resizeMode="contain" />
                            <View>
                                <Text style={{ fontSize: 17 }}>读者022566</Text>
                                <View style={{ flexDirection: 'row', marginTop: 12 }}>
                                    <Image source={require('../assets/VIP.png')} style={{ width: 25, height: 25 }} resizeMode="contain" />
                                    <Text style={{ color: '#999' }}>已激活12个月vip会员</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.vipb}>
                            <Text style={{ color: '#999' }}>已使用/<Text style={{ fontSize: 18, fontWeight: 'bold', color: '#000' }}>300</Text>天</Text>
                            <Text style={{ marginLeft: 45, color: '#999' }}>剩余/<Text style={{ fontSize: 18, fontWeight: 'bold', color: '#000' }}>65</Text>天</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.paybox}>
                    <Text style={styles.vipro}>会员套餐</Text>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ marginTop: 5, marginRight: 10 }}>
                        {
                            taoData.map((item, index) => {
                                return (
                                    <TouchableOpacity
                                        style={index === this.state.index ? styles.active : styles.pricebox}
                                        key={index + item}
                                        onPress={() => this.chActive(index)}
                                        activeOpacity={0.8}
                                    >
                                        <Text style={{ color: '#C09827', fontSize: 18 }}>{item.cate}</Text>
                                        <Text style={{ marginTop: 10, fontSize: 26 }}><Text style={{ fontSize: 19 }}>￥</Text>{item.price}</Text>
                                        <Text style={{ color: '#999', marginTop: 6, textDecorationLine: 'line-through' }}>￥{item.oldPrice}</Text>
                                        <Text style={styles.tip}>{item.tip}</Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </ScrollView>
                </View>
                <View style={styles.zhifubox}>
                    <Text style={styles.zhi}>支付方式</Text>
                    {
                        this.state.payList.map((item, index) => {
                            return <View style={{ flexDirection: 'row', height: 45, alignItems: 'center', justifyContent: 'space-between' }} key={item + index}>
                                <View style={{ flexDirection: 'row', height: 45, alignItems: 'center', justifyContent: 'space-between' }} >
                                    <Image source={item.img} style={{ width: 25, height: 25 }} resizeMode="contain" />
                                    <Text style={{ marginLeft: 12, color: '#474747' }}>{item.text}</Text>
                                </View>

                                <TouchableOpacity activeOpacity={0.8} onPress={() => { this.changeZhi(index) }}>
                                    <Image source={item.checked ? require('../assets/me/selected.png') : require('../assets/me/select.png')} style={{ width: 27, height: 27 }} />
                                </TouchableOpacity>
                            </View>
                        })
                    }
                    <View style={styles.server}>
                        <Text style={{ color: '#ccc' }}>1、充值遇到任何问题，均可联系客服获得帮助，客服24小时在线为您服务！ </Text>
                        <Text style={{ marginTop: 12, color: '#ccc' }}>2、VIP服务不支持退款，敬请谅解！</Text>
                    </View>
                </View>
            </View >
        )
    }
}
const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2'
    },
    box: {
        width: width,
        paddingHorizontal: 12,
        paddingVertical: 25,
        backgroundColor: '#fff'
    },
    vipcard: {
        paddingHorizontal: 10,
        paddingVertical: 15,
        backgroundColor: "#F3E6CA",
        borderRadius: 10
    },
    vipb: {
        flexDirection: 'row',
        marginTop: 20,
        marginLeft: 30
    },
    paybox: {
        marginTop: 10
    },
    vipro: {
        backgroundColor: '#fff',
        paddingStart: 20,
        height: 42,
        lineHeight: 42,
        fontWeight: 'bold',
        fontSize: 15
    },
    pricebox: {
        width: 120,
        height: 150,
        backgroundColor: '#fff',
        marginLeft: 20,
        borderRadius: 8,
        position: 'relative',
        overflow: 'hidden',
        paddingHorizontal: 10,
        paddingVertical: 21,
        alignItems: 'center'
    },
    active: {
        width: 120,
        height: 150,
        backgroundColor: '#FDD438',
        marginLeft: 20,
        borderRadius: 8,
        position: 'relative',
        overflow: 'hidden',
        paddingHorizontal: 10,
        paddingVertical: 21,
        alignItems: 'center'
    },
    tip: {
        position: 'absolute',
        right: 0,
        fontSize: 12,
        backgroundColor: '#F8E477',
        borderBottomLeftRadius: 8,
        paddingHorizontal: 5
    },
    zhi: {
        height: 50,
        lineHeight: 50,
        borderBottomColor: '#e2e2e2',
        borderBottomWidth: 1,
        fontWeight: 'bold',
        fontSize: 15
    },
    zhifubox: {
        backgroundColor: '#fff',
        marginTop: 12,
        paddingHorizontal: 20
    },
    radio: {
        backgroundColor: '#FDD63E',
        width: 20,
        height: 20,
        borderRadius: 20,
        color: '#fff',
        textAlign: 'center',
        lineHeight: 20
    },
    unradio: {
        backgroundColor: '#ccc',
        width: 20,
        height: 20,
        borderRadius: 20,
        color: '#fff',
        textAlign: 'center',
        lineHeight: 20
    },
    server: {
        paddingVertical: 18
    }
});
