import React, {Component} from 'react';
import {
    Dimensions,
    Modal,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
    TouchableOpacity,
    ScrollView
} from 'react-native';

const {width} = Dimensions.get('window');
export default class CustomAlertDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isVisible: this.props.show,
            cur: 0
        };
        this.entityList = this.props.entityList;
    }

    componentWillReceiveProps(nextProps) {
        this.setState({isVisible: nextProps.show});
    }

    closeModal() {
        this.setState({
            isVisible: false
        });
        this.props.closeModal(false);
    }

    renderItem(item, i) {
        return (
            <TouchableOpacity key={i} onPress={this.choose.bind(this, i)} style={styles.item}>
                <Text style={i === this.state.cur ? {color: '#f00', fontSize: 17} : {fontSize: 16}}>{item.date}</Text>
                <Text style={i === this.state.cur ? styles.itemd : styles.itemText}>{item.music}</Text>
            </TouchableOpacity>
        );
    }

    choose(i) {
        this.setState({
            cur: i
        });
        if (this.state.isVisible) {
            this.props.callback(i);
        }
    }

    renderDialog() {
        return (
            <View style={styles.modalStyle}>
                <Text style={styles.listT}>播放列表({this.entityList.length})</Text>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.optArea}>
                        {
                            this.entityList.map((item, i) => this.renderItem(item, i))
                        }
                    </View>
                </ScrollView>
            </View>
        )
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Modal
                    transparent={true}
                    visible={this.state.isVisible}
                    animationType={'fade'}
                    onRequestClose={() => this.closeModal()}>
                    <TouchableOpacity style={styles.container} activeOpacity={1}
                                      onPress={() => this.closeModal()}>
                        {this.renderDialog()}
                    </TouchableOpacity>
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalStyle: {
        position: "absolute",
        left: 0,
        bottom: 0,
        width: width,
        height: 300,
        flex: 1,
        flexDirection: "column",
        backgroundColor: '#ffffff',
    },
    optArea: {
        flex: 1,
        flexDirection: 'column'
    },
    item: {
        flexDirection: 'row',
        width: width,
        height: 45,
        lineHeight: 45,
        paddingLeft: 20,
        paddingRight: 20,
        alignItems: 'center',
        borderBottomWidth: 1.5,
        borderBottomColor: '#DDDDDD'
    },
    itemText: {
        fontSize: 14,
        marginLeft: 15,
        color: '#9B9B9B'
    },
    itemd: {
        fontSize: 14,
        marginLeft: 15,
        color: "#E02240"
    },
    listT: {
        width: width,
        textAlign: 'center',
        fontSize: 22,
        borderBottomWidth: 1.5,
        borderBottomColor: '#DDDDDD',
        height: 45,
        lineHeight: 45
    },
    cancel: {
        width: width,
        height: 30,
        marginTop: 12,
        alignItems: 'center',
        backgroundColor: '#ffffff'
    },
});
