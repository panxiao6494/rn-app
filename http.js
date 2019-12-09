// 引入axios 封装所有的请求数据的函数
import axios from 'axios'

axios.defaults.baseURL = 'https://www.qyino.com/huazun_liquor_uat/';
//axios.defaults.baseURL = 'http://192.168.2.107:8080/';
axios.interceptors.request.use(config => {
    //config.headers.Authorization = window.sessionStorage.getItem('token')
    // 在最后必须 return config
    return config
});

export function getCate(params) {
    return axios.post('category/listCommodityByCategoryId', params)

}
export function getProdeal(param) {
    return axios.post("store/getcommodityDetails", param)
}





