import React, { Component, Fragment } from 'react';
import { View, Text, Image, TextInput, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';
import Swiper from '../swiper'
import { Actions } from 'react-native-router-flux';
export default class Huaizhu extends Component {
    render() {
        return <View style={styles.container}>
            <View style={styles.inpts}>
                <Icon name="search" size={22} color="#ccc" style={styles.icon} />
                <TextInput placeholder="搜索书名"
                    style={styles.ipt} />
            </View>
            <Swiper />
            <Tab />
        </View>;
    }
}

class Tab extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cate: ['全部分类', '好书推荐', '免费听书', '新上架'],
            cateList: [
                [
                    {
                        title: '历代愿望',
                        img: require('../../assets/lidai.png')
                    },
                    {
                        title: '沧海桑Tina',
                        img: require('../../assets/lidai.png')
                    },
                    {
                        title: '万籁俱寂',
                        img: require('../../assets/pic3.jpg')
                    },
                    {
                        title: '沧海桑Tina',
                        img: require('../../assets/lidai.png')
                    },
                    {
                        title: '神之意志',
                        img: require('../../assets/index/book2.png')
                    }
                ],
                [
                    {
                        title: '基督比喻',
                        img: require('../../assets/index/book2.png')
                    },
                    {
                        title: '神之意志',
                        img: require('../../assets/index/book2.png')
                    },
                ],
                [
                    {
                        title: '暗黑圣战',
                        img: require('../../assets/index/ll_04.png')
                    },
                ],

                [
                    {
                        title: '喜悦源泉',
                        img: require('../../assets/index/Music.png')
                    },
                    {
                        title: '且听风吟',
                        img: require('../../assets/index/Music.png')
                    },
                ]
            ],
            cur: 0,
            index: 0
        }
    }

    render() {
        return <Fragment>
            <View style={styles.tabox}>
                {this.state.cate.map((item, index) => {
                    return <TouchableOpacity
                        onPress={() => this.chActive(index)}
                        key={index + item}
                        activeOpacity={0.8}
                    >
                        <Text style={this.state.cur == index ? styles.active : styles.tabitem}>{item}</Text>
                    </TouchableOpacity>
                })}
            </View>
            <ScrollView style={styles.taboxbo} showsVerticalScrollIndicator={false}>
                {
                    this.renderTab()
                }
            </ScrollView>
        </Fragment>
    }
    renderTab() {
        if (this.state.cur == this.state.index) {
            return <Fragment>
                {
                    this.state.cateList[this.state.index].map((item, index) => {
                        return <View key={index + item} style={styles.itembox}>
                            <Image source={item.img} style={{ height: 100, width: 100 }} />
                            <View style={{ flexDirection: 'column', marginLeft: 15, flex: 1 }}>
                                <Text>{item.title}</Text>
                                <Text style={{ marginTop: 12, color: '#666' }}>汉语圣经协会</Text>
                                <View style={{ flexDirection: 'row', marginTop: 17, justifyContent: 'space-between' }}>
                                    <Text style={styles.free}>免费</Text>
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        onPress={() => this.goBook(item.title)}
                                    >
                                        <Text style={styles.read}>立即听书</Text>
                                    </TouchableOpacity>

                                </View>
                            </View>
                        </View>
                    })
                }
            </Fragment>
        }
    }
    goBook(title) {
        Actions.bookList({ title: title })
    }
    chActive(i) {
        this.setState({
            cur: i,
            index: i
        })
    }

}
const { width } = Dimensions.get('window')
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width,
        paddingHorizontal: 20
    },
    inpts: {
        position: 'relative',
        marginTop: 10
    },
    ipt: {
        backgroundColor: "#f2f2f2",
        height: 32,
        paddingVertical: 0,
        borderRadius: 10,
        paddingStart: 40
    },
    icon: {
        position: 'absolute',
        zIndex: 9,
        top: 5,
        left: 10
    },
    tabox: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 15,
        paddingBottom: 10
    },
    tabitem: {
        backgroundColor: '#F2F2F2',
        paddingHorizontal: 15,
        paddingVertical: 6,
        borderRadius: 7,
        color: "#666",
        fontSize: 16
    },
    active: {
        paddingHorizontal: 15,
        paddingVertical: 6,
        borderRadius: 7,
        backgroundColor: '#FFCF25',
        color: '#fff',
        fontSize: 16
    },
    itembox: {
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        flexDirection: 'row'
    },
    boxx: {
        flexDirection: 'column'
    },
    free: {
        borderColor: '#17C2BF',
        borderWidth: 1,
        paddingHorizontal: 10,
        height: 25,
        lineHeight: 25,
        borderRadius: 8,
        color: '#17C2BF',
        textAlign: 'center'
    },
    read: {
        color: '#fff',
        backgroundColor: '#17C2BF',
        borderRadius: 15,
        paddingHorizontal: 10,
        paddingVertical: 3
    }

})
