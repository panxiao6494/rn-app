import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    Dimensions
} from 'react-native';

const { width } = Dimensions.get('window');
const imgUrl = [
    {
        img: require('../assets/focus1.jpg')
    },
    {
        img: require('../assets/focus2.jpg')
    },
    {
        img: require('../assets/focus3.jpg')
    },
    {
        img: require('../assets/index/banner.png')
    },
    {
        img: require('../assets/index/in_01.png')
    }
]
export default class BagView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 0
        };
    }

    //渲染图片列表
    renderChilds = () => {
        return imgUrl.map((item, i) => {
            return <Image key={`item${i}`} source={item.img} style={styles.imageStyle}></Image>;
        });
    }
    //渲染圆
    renderCircles = () => {
        return imgUrl.map((item, i) => {
            var style = {};
            //当前页面的的指示器，橘黄色
            if (i === this.state.currentPage) {
                style = { color: 'orange' };
            }
            return <Text key={`text${i}`} style={[styles.circleStyle, style]}>&bull;</Text>
        });
    }
    //滚动的回调
    handleScroll = (e) => {
        var x = e.nativeEvent.contentOffset.x;
        var currentPage = Math.floor(x / width);
        this.setState({ currentPage: currentPage });
    }

    //定时器
    startTimer = () => {
        this.timer = setInterval(() => {
            //计算出要滚动到的页面索引，改变state
            var currentPage = ++this.state.currentPage == imgUrl.length ? 0 : this.state.currentPage;
            this.setState({ currentPage: currentPage });
            //计算滚动的距离
            var offsetX = currentPage * width;
            this.refs.scrollView.scrollTo({ x: offsetX, y: 0, animated: true });
        }, 2000);
    }
    //开始滑动
    handleScrollBegin = () => {
        clearInterval(this.timer);
    }

    handleScrollEnd = () => {
        this.startTimer();
    }

    render() {
        return <View style={styles.container}>
            <ScrollView
                ref="scrollView"
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                pagingEnabled={true}
                onMomentumScrollEnd={this.handleScroll}
                onScrollBeginDrag={this.handleScrollBegin}
                onScrollEndDrag={this.handleScrollEnd}>
                {/*子元素*/}
                {this.renderChilds()}
            </ScrollView>
            <View style={styles.circleWrapperStyle}>
                {this.renderCircles()}
            </View>
        </View>;
    }

    //定时器
    componentDidMount = () => {
        this.startTimer();
    }
    //取消定时器
    componentWillUnmount = () => {
        clearInterval(this.timer);
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        marginTop: 15,
        borderRadius: 10,
        overflow: 'hidden'
    },
    imageStyle: {
        width: width,
        height: 120
    },
    circleWrapperStyle: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        left: width * 0.4
    },
    circleStyle: {
        fontSize: 25,
        color: '#FFF'
    }
});