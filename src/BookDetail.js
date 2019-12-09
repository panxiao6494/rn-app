import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, Dimensions, ScrollView } from 'react-native';
import Video from 'react-native-video';
import Dialog from './bottomDialog'
import Naviback from './Naviback'
import Slider from '@react-native-community/slider'
const musicList = [
    { date: '7月1日', music: '沙漠骆驼' },
    { date: '7月2日', music: '自由的飞翔' },
    { date: '7月3日', music: '水墨' },
    { date: '7月4日', music: '假装' },
    { date: '7月5日', music: '认真的雪' },
    { date: '7月6日', music: '渴死的鱼' },
    { date: '7月7日', music: '成都' },
    { date: '7月8日', music: '旧约' }
];
export default class BookDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            typeName: '歌曲列表',
            type: 0,
            activePanel: 0,                   //当前active的面板
            currentTime: 0.0,                 //当前播放的时间
            paused: true,                      //播放
            sliderValue: 0,                   //进度条的进度
            duration: 0,
            duTime: 0,
            date: new Date(),
            showDialog: false
        };
    }
    openDialog() {
        this.setState({
            showDialog: !this.state.showDialog
        })
    }

    //格式化音乐播放的时间为0：00
    formatMediaTime(duration) {
        let min = Math.floor(duration / 60);
        let second = Math.floor(duration - min * 60);
        min = min >= 10 ? min : "0" + min;
        second = second >= 10 ? second : "0" + second;
        return min + ":" + second;
    }

    //设置进度条和播放时间的变化
    setTime(data) {
        let sliderValue = parseInt(this.state.currentTime);
        this.setState({
            slideValue: sliderValue,
            currentTime: data.currentTime//获取当前时间,随着进度条自动执行
        });
    }


    //设置总时长
    setDuration(duration) {
        console.log(duration, 2)
        this.setState({ duration: duration.duration });
        let duTime = this.formatMediaTime(duration.duration);
        this.setState({
            duTime: duTime
        })
    }
    componentDidUpdate() {

    }
    naviback() {
        const { navigation } = this.props;
        navigation.pop()//返回上一页
    }
    render() {
        return <View style={styles.container}>
            <Naviback title={'音乐'} naviback={() => this.naviback()} />
            {/*接收到页面传递过来的参数*/}
            <ScrollView showsHorizontalScrollIndicator={false}>
                <View style={styles.topBar}>
                    <Text
                        style={{ fontSize: 18 }}>{this.state.date.getMonth() + 1 + '月'}{this.state.date.getDate()}日</Text>
                    <Text style={styles.topT}>{this.props.title}</Text>
                    <Image source={require('../assets/index/Music.png')} style={styles.img} />
                </View>
                <Video
                    ref={video => (this.player = video)}
                    source={require('../assets/music/送别.m4a')}
                    paused={this.state.paused}
                    onLoad={data => this.setDuration(data)}
                    volume={1.0}
                    playInBackground={true}
                    onProgress={e => this.setTime(e)}
                    playWhenInactive={true}
                    style={styles.video}
                />

                <Func openDialog={() => {
                    this.openDialog()
                }} />
                <Slider
                    style={styles.slider}
                    value={this.state.slideValue}
                    maximumValue={this.state.duration}
                    step={1}
                    onValueChange={value => this.setState({ currentTime: value })}
                    minimumTrackTintColor={'#E57373'}
                    thumbTintColor={'#e57373'}
                />
                <View style={styles.time}>
                    <Text>{this.formatMediaTime(Math.floor(this.state.currentTime))}</Text>
                    <Text>{this.state.duTime}</Text>
                </View>
                <View style={styles.set}>
                    <Image source={require('../assets/music/go.png')} style={{ width: 35, height: 35, marginRight: 20 }} />
                    <TouchableOpacity onPress={() => this.setState({ paused: !this.state.paused })}>
                        <Image
                            source={this.state.paused ? require('../assets/music/pause1.png') : require('../assets/music/play.png')}
                            style={{ width: 50, height: 50 }} />
                    </TouchableOpacity>
                    <Image
                        source={require('../assets/music/go2.png')}
                        style={{ width: 35, height: 35, marginLeft: 20 }} />
                </View>
            </ScrollView>
            <Dialog entityList={musicList} callback={(i) => {
                this.setState({
                    type: i,
                    typeName: musicList[i],
                })
            }} show={this.state.showDialog} closeModal={(show) => {
                this.setState({
                    showDialog: show
                })
            }} />
        </View>
    }
}

class Func extends Component {
    constructor(props) {
        super(props)
    }

    open() {
        this.props.openDialog()
    }

    render() {
        return <View style={styles.func}>
            <TouchableOpacity style={styles.li} onPress={() => this.open()}>
                <Image source={require('../assets/music/list.png')} style={{ width: 25, height: 25 }} />
                <Text>列表</Text>
            </TouchableOpacity>
            <View style={styles.li}>
                <Image source={require('../assets/music/wen.png')} style={{ width: 25, height: 25 }} />
                <Text>文章</Text>
            </View>
            <View style={styles.li}>
                <Image source={require('../assets/music/over.png')} style={{ width: 25, height: 25 }} />
                <Text>完成</Text>
            </View>
            <View style={styles.li}>
                <Image source={require('../assets/music/time.png')} style={{ width: 25, height: 25 }} />
                <Text>定时</Text>
            </View>
        </View>

    }
}

const win = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: win.width
    },
    topBar: {
        marginTop: 20,
        alignItems: 'center'
    },
    topT: {
        fontSize: 12,
        marginTop: 10
    },
    img: {
        width: 250,
        height: 250,
        marginTop: 40,
        marginBottom: 50
    },
    slider: {
        width: 400,
        color: 'red',

    },
    time: {
        width: 380,
        flexDirection: 'row',
        justifyContent: "space-between",
        marginBottom: 15
    },
    set: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    func: {
        flexDirection: 'row',
        marginBottom: 110,
        justifyContent: 'center',
        alignItems: 'center'
    },
    li: {
        flex: 1,
        alignItems: 'center'
    }
});
