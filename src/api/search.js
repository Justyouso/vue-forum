import service from '@/utils/request'
/**
 * 搜索文章
 */
export function articleSearch(data){
  return service.request({
    method: "get",
    url: "/article/search",
    params:data
    // 左边data是变量名，右边data是参数名，参数名和变量名相同，可止写成一个
  })
}
/**
 * 搜索用户
 */
export function userSearch(data){
  return service.request({
    method: "get",
    url: "/user/search",
    params:data
    // 左边data是变量名，右边data是参数名，参数名和变量名相同，可止写成一个
  })
}