import React, { Component, useState, useEffect, Fragment } from 'react';
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
import * as Progress from 'react-native-progress';
const bookList = [
    { img: require('../../assets/index/Music.png'), person: 94, loadState: '全书频更新完', progress: 0.84, title: '福山宝训' },
    { img: require('../../assets/lidai.png'), person: 414, loadState: '全书频更新完', progress: 0.57, title: '历代愿望' },
    { img: require('../../assets/index/ll_04.png'), person: 204, loadState: '全书频更新完', progress: 0.21, title: '喜悦的源泉' }
]
export default class Book extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.toptitle}>书单</Text>
                <ScrollView style={styles.bookbox}>
                    {
                        bookList.map((item, index) => {
                            return <View key={index + item} style={styles.itembox} onLayout={(e) => this.onLayout(e)}>
                                <Image source={item.img} style={{ width: 110, height: 110, marginRight: 20 }} />
                                <View>
                                    <Text style={{ fontSize: 18 }}>{item.title}</Text>
                                    <Text style={styles.right}>{item.person}人听过</Text>
                                    <Text style={{ marginTop: 8, color: '#666', marginBottom: 17 }}>{item.loadState}</Text>
                                    <Progress.Bar
                                        progress={item.progress}
                                        width={250}
                                        height={5}
                                        color={'#FF7352'}
                                        unfilledColor={'#D1CCC8'}
                                        borderWidth={0}
                                    />
                                    <View style={{ flexDirection: 'row', marginTop: 16 }}>
                                        <Text style={{ color: '#666' }}>{parseInt(item.progress * 100) + '%'}</Text>
                                        <Text style={{ color: '#666', marginLeft: 20 }}>4时54分聆听时间</Text>
                                    </View>

                                </View>
                            </View>
                        })
                    }
                </ScrollView>
            </View>

        )
    }
    onLayout(e) {
        e.persist();//解决异步事件报警问题
        console.log(e, 7)
    }
}


const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    toptitle: {
        height: 70,
        lineHeight: 70,
        textAlign: 'center',
        borderBottomColor: '#aaa',
        borderBottomWidth: 1,
        fontSize: 20
    },
    bookbox: {
        width: width,
        paddingHorizontal: 15
    },
    itembox: {
        backgroundColor: '#F7F2EE',
        borderRadius: 8,
        marginTop: 15,
        flexDirection: 'row',
        paddingVertical: 20,
        paddingLeft: 20
    },
    right: {
        position: 'absolute',
        right: 10,
        color: "#95918D"
    }
})
