import service from '@/utils/request'
/**
 * 用户列表
 */
export function userNewList(data){
  return service.request({
    method: "get",
    url: "/user/new/list",
    params:data
    // 左边data是变量名，右边data是参数名，参数名和变量名相同，可止写成一个
  })
}

/**
 * 编辑
 */

/**
* 删除
*/

/**
 * 用户关注
 */
export function userFollow(data){
  return service.request({
    method: "get",
    url: "/user/follow",
    params:data
    // 左边data是变量名，右边data是参数名，参数名和变量名相同，可止写成一个
  })
}
/**
 * 查询作者是否被关注过
 * @param {} data 
 */
export function userCheckFollow(data){
  return service.request({
    method: "get",
    url: "/user/follow",
    data
    // 左边data是变量名，右边data是参数名，参数名和变量名相同，可止写成一个
  })
}