import React, { Component, useState, useEffect, Fragment } from 'react';
import { Button, View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, TouchableHighlight, Dimensions, FlatList, Alert, DatePickerAndroid } from 'react-native';
import Naviback from './Naviback'
const { width } = Dimensions.get('window');
import DatePicker from 'react-native-datepicker'
const monthList = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
]
export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            addFlag: true,
            dateList: [],
            monthList: monthList
        }
    }
    componentWillMount() {
        let dateList = []
        for (let i = 1; i <= 30; i++) {
            dateList.push(i)
        }
        console.log(dateList, 77)
        this.setState({
            dateList: dateList
        })
    }
    addBook() {
        Alert.alert('添加成功');
        this.setState({
            addFlag: false
        })
    }
    naviback() {
        console.log(this.props)
        const { navigation } = this.props;
        navigation.pop()
    }
    render() {
        return <View style={styles.container}>
            <Naviback title={'目录'} naviback={() => this.naviback()} />
            <View style={styles.conteb}>
                <Image source={require('../assets/Ipadmini4.png')} />
                <View style={{ marginLeft: 25 }}>
                    <Text style={{ fontSize: 18, marginBottom: 25 }}>爱你一万年</Text>
                    <Text style={{ color: '#ccc', marginBottom: 10 }}>拯救生命媒体</Text>
                    <Text style={{ color: '#ccc' }}>简体中文</Text>
                </View>
                {
                    this.state.addFlag ? (
                        <TouchableHighlight style={styles.add} onPress={() => this.addBook()} underlayColor='#fff'>
                            <Text style={{ color: '#E02140' }}>添加到书单</Text>
                        </TouchableHighlight>
                    ) : (
                            <View style={styles.add}>
                                <Text style={{ color: '#474747' }}>已添加到书单</Text>
                            </View>
                        )
                }
            </View>
            <DateList monthList={this.state.monthList} dateList={this.state.dateList} />
            <BottomTab />
        </View>;
    }
}
class DateList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            index: 0,
            cur: 0
        }
    }
    changeMonth(i) {
        console.log(i, 6)
        this.setState({
            cur: i
        })
    }
    showCell(item, index) {
        return <TouchableOpacity
            onPress={() => this.changeMonth(index)}
        >
            <Text style={index == this.state.cur ? styles.active : styles.yueitem}>{item}月</Text>
        </TouchableOpacity>



    }
    showCate(item, index) {
        return <Text style={styles.dateitem}>{item}日</Text>
    }
    render() {
        return (
            <View style={styles.tabs}>
                <FlatList
                    data={this.props.monthList}
                    renderItem={({ item, index }) => this.showCell(item, index)}
                    keyExtractor={(item, index) => (index)}
                    style={styles.leftList}
                />
                <View>
                    <View style={styles.down}>
                        <Text>正序排列</Text>
                        <Text>下载整卷</Text>
                    </View>

                    <FlatList
                        data={this.props.dateList}
                        renderItem={({ item, index }) => this.showCate(item, index)}
                        keyExtractor={(item, index) => index.toString()}
                        style={styles.rightList}
                    />
                </View>
            </View>
        )
    }
}
class BottomTab extends Component {
    constructor(props) {
        super(props)
        this.state = {
            date: new Date(),
        }
    }
    render() {
        return (
            <View style={styles.datebox}>
                <DatePicker
                    style={{ width: 200 }}
                    date={this.state.date}
                    mode="date"
                    placeholder="选择日期"
                    format="YYYY-MM-DD"
                    minDate="1999-05-01"
                    maxDate={this.state.date}
                    confirmBtnText="确定"
                    cancelBtnText="取消"
                    showIcon={true}
                    onDateChange={(date) => { this.setState({ date: date }); }}
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width
    },
    conteb: {
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingVertical: 20
    },
    add: {
        marginStart: 50,
        borderColor: '#E02140',
        borderWidth: 1.5,
        height: 30,
        justifyContent: 'center',
        paddingHorizontal: 10,
        borderRadius: 30
    },
    tabs: {
        borderTopColor: '#ccc',
        borderTopWidth: 1,
        marginTop: 15,
        height: 580,
        flexDirection: 'row',
        width: width
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5
    },

    yueitem: {
        width: width * .4,
        height: 80,
        lineHeight: 80,
        backgroundColor: '#F5F5F5',
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
        fontSize: 22,
        paddingLeft: 18
    },
    active: {
        width: width * .4,
        height: 80,
        lineHeight: 80,
        backgroundColor: '#F5F5F5',
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
        fontSize: 22,
        backgroundColor: '#E02240',
        color: `#fff`,
        paddingLeft: 18
    },
    dateitem: {
        width: width * .6,
        height: 90,
        lineHeight: 90,
        backgroundColor: '#fff',
        borderBottomColor: "#ccc",
        borderBottomWidth: 1
    },
    down: {
        flexDirection: 'row'
    }
})