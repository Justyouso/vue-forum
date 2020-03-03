import Vue from 'vue';
import SvgIcon from './SvgIcon'
Vue.component('svg-icon', SvgIcon)

// 解析svg图标
/**
 * require.context: 读取指定目录的所有文件参数（目录，是否遍历子目录，遍历文件规则）
 */
const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => {
  // 转换成img的映射
  return requireContext.keys().map(requireContext)
}
requireAll(req)