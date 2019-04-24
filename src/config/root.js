/**
 *这是一个将需要导入到main.js的全局引用文件
 */

import Vue from 'vue'



/**
 *导入AES加密文件
 */
import Encrypt from './MYAES.JS'
Vue.use(Encrypt)
