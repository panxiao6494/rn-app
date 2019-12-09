import React, { Component } from 'react';
import { Alert, View, Text, TextInput, StyleSheet, Image, Button, ActivityIndicator, ScrollView } from 'react-native';
import Home from './src/tab/Home';
import Me from './src/tab/Me';
import Huaizhu from './src/tab/Huaizhu'
import Book from './src/tab/Book';
import TabNavigator from 'react-native-tab-navigator';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
export default class MyHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'home',
    };
  }
  render() {
    return <View style={styles.container}>
      {/*tab栏区*/}
      <TabNavigator>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'home'}
          title="首页"
          renderIcon={() => <Icon name="music-circle" size={27} color="#ccc" />}
          renderSelectedIcon={() => <Icon name="music-circle" size={27} color="#FF4E46" />}
          onPress={() => this.setState({ selectedTab: 'home' })}
        >
          <Home></Home>
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'book'}
          title="书单"
          renderIcon={() => <Icon name="book-open-outline" size={27} color="#ccc" />}
          renderSelectedIcon={() => <Icon name="book-open-outline" size={27} color="#FF4E46" />}
          // renderBadge={() => <CustomBadgeView/>}
          onPress={() => this.setState({ selectedTab: 'book' })}
        >
          <Book></Book>
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'huaizhu'}
          title="怀著"
          renderIcon={() => <Icon name="audiobook" size={27} color="#ccc" />}
          renderSelectedIcon={() => <Icon name="audiobook" size={27} color="#FF4E46" />}
          // renderBadge={() => <CustomBadgeView/>}
          onPress={() => this.setState({ selectedTab: 'huaizhu' })}
        >
          <Huaizhu />
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'me'}
          title="我的"
          renderIcon={() => <Icon name="account" size={27} color="#ccc" />}
          renderSelectedIcon={() => <Icon name="account" size={27} color="#FF4E46" />}
          // renderBadge={() => <CustomBadgeView/>}
          onPress={() => this.setState({ selectedTab: 'me' })}
        >
          <Me></Me>
        </TabNavigator.Item>
      </TabNavigator>
    </View>;

  }
}
const styles = StyleSheet.create(({
  container: {
    flex: 1,
  },
}));
