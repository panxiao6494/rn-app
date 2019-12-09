import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
//导入路由
import { Router, Stack, Scene } from 'react-native-router-flux'
import App from './App'
import BookDetail from "./src/BookDetail";
import Catalogs from './src/Catelog'
import Me from './src/tab/Me'
import ProDeal from './src/Prodeal'
import VipCenter from './src/VipCenter';
export default class Main extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return <Router sceneStyle={{ backgroundColor: '#fff' }}>
            <Stack key="root">
                {/*配置路由规则*/}
                <Scene key="app" component={App} hideNavBar={true} />

                <Scene key="bookList" component={BookDetail} hideNavBar={true} />
                <Scene key="catalogs" component={Catalogs} hideNavBar={true} />
                <Scene key="me" component={Me} hideNavBar={true} />
                <Scene key="proDeal" component={ProDeal} hideNavBar={true} />
                <Scene key="vipCenter" component={VipCenter} hideNavBar={true} />

            </Stack>
        </Router>
    }
}
