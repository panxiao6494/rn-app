import React, { Component, useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    StyleSheet,
    TouchableHighlight,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import Spinkiter from 'react-native-spinkit';//添加加载动画

import { getCate } from "../../http";
import { Actions } from 'react-native-router-flux'
export default class Book extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cateList: [],
            cateAll: [],
            index: 0,
            cur: 0,
            heiArr: []
        }
    }

    async componentWillMount() {
        const { data: res } = await getCate();
        let cateAll = [];
        res.data.forEach(i => {
            i.commodities.forEach(item => {
                if (item.field_3 && item.field_3.indexOf('/usr/www/') !== -1) {
                    item.field_3 = item.field_3.replace('/usr/www/', 'http://www.qyino.com/')
                }
                //item.name = item.name.replace(/[\r\n]/g, "")
                cateAll.push(item)
            })
        });
        this.setState({
            cateList: res.data,
            cateAll: cateAll
        });
        console.log(this.state.cateList)
        console.log(this.state.cateAll)
    }
    goProdeal = (proid) => {
        Actions.proDeal({
            proid: proid
        })
    }
    activeCate(index) {
        this.setState({
            cur: index
        })
    }
    getHei(e) {
        e.persist();
        let cateHeight = []
        let height = e.nativeEvent.layout.height
        this.state.cateList.forEach((item, index) => {
            cateHeight.push(item.commodities.length * height)
        })
        var sum = 0;
        var heiArr = []
        cateHeight.forEach((item, index) => {
            sum += cateHeight[index];
            heiArr.push(sum)
        })
        this.setState({
            heiArr: heiArr
        })
    }
    scrollPage(e) {
        e.persist();
        let top = e.nativeEvent.contentOffset.y;
        let heiArr = this.state.heiArr
        heiArr.forEach((item, index, heiArr) => {
            if (index == 0) {
                if (top >= 0 && top < (20 + heiArr[0])) {
                    this.setState({
                        cur: 0,
                        index: 0
                    })
                }
            }
            if (index == heiArr.length - 1) {
                if (top > (20 + heiArr[heiArr.length - 2])) {
                    this.setState({
                        cur: heiArr.length,
                        index: heiArr.length
                    })
                }
            }
            if (top > 20 + heiArr[index - 1] && top < (20 + heiArr[index])) {
                this.setState({
                    cur: index,
                    index: index
                })
            }
        })
        for (var i = 0; i < heiArr.length; i++) {
            if (i == this.state.index) {
                this.scrollView.scrollTo({ x: i * 50, animated: true })
            }
        }
    }
    render() {
        return <View style={styles.container}>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={styles.scroll}
                ref={ref => { this.scrollView = ref }}
            >
                {
                    this.state.cateList.map((item, index) => {
                        return <TouchableOpacity
                            key={index + item}
                            activeOpacity={0.8}
                            onPress={() => this.activeCate(index)}
                        >
                            <Text style={this.state.cur == index ? styles.cateActive : styles.cateItem}>{item.name}</Text>
                        </TouchableOpacity>
                    })
                }
            </ScrollView>
            {this.state.cateAll.length > 1 ? (
                <ScrollView onScroll={(e) => this.scrollPage(e)}>
                    <View>
                        {
                            this.state.cateAll.map((item, i) => {
                                return <TouchableHighlight
                                    key={i + item}
                                    style={{ marginBottom: 10, alignItems: 'center', marginTop: 10 }}
                                    onPress={() => this.goProdeal(item.id)}
                                    underlayColor='#F5F5F5'
                                >
                                    <View
                                        style={styles.Catebox}
                                        onLayout={(e) => this.getHei(e)}
                                    >
                                        <Image source={{ uri: item.field_3 }} style={i % 2 == 0 ? styles.imgl : styles.imgr} resizeMode="contain" />
                                        <View style={i % 2 == 0 ? styles.prol : styles.pror}>
                                            <Text>{item.com_name}</Text>
                                            <Text>{item.field_1}</Text>
                                            <View style={styles.buybtn}>
                                                <Text style={styles.Price}>￥{item.field_10}</Text>
                                                <Text style={{ color: '#fff', flex: 1 }}>立即购买</Text>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableHighlight>
                            })
                        }
                    </View>
                </ScrollView>
            ) : (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Spinkiter isVisible={true} size={80} type={'Wave'} color={'#1e82d2'} />
                    </View>
                )}

        </View>
    }
}
const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2'
    },
    bookDan: {
        width: width,
        height: 60,
        fontSize: 23,
        lineHeight: 60,
        textAlign: 'center',
        backgroundColor: '#fff'
    },
    Catebox: {
        position: 'relative',
        flexDirection: 'row',
        width: width * 0.9,
        paddingLeft: 5,
        backgroundColor: '#fff',
        borderRadius: 15,
        alignItems: 'center',
        height: 200
    },
    imgl: {
        width: 120,
        height: 178
    },
    imgr: {
        width: 120,
        height: 178,
        position: 'absolute',
        right: 8
    },
    prol: {
        alignItems: 'center',
        marginLeft: 45
    },
    pror: {
        alignItems: 'center',
        marginLeft: 45
    },
    Price: {
        color: '#fff',
        width: 135,
        fontSize: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#fff',
        textAlign: 'center',
        flex: 1
    },
    buybtn: {
        alignItems: 'center',
        width: 135,
        height: 60,
        backgroundColor: '#82D449',
        justifyContent: 'center',
        marginTop: 40,
        borderRadius: 8
    },
    scroll: {
        height: 40,
        width: width,
        backgroundColor: '#fff'
    },
    cateItem: {
        marginHorizontal: 10
    },
    cateActive: {
        marginHorizontal: 10,
        color: '#82D449',
        borderBottomWidth: 1,
        borderBottomColor: '#82D449'
    }
})
