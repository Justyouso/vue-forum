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

/**
 * 作者详情数据
 */
export function userIndex(author_id){
  return service.request({
    method: "get",
    url: `/user/index/${author_id}`,
  })
}

/**
 * 作者关注和粉丝列表
 */
export function userIndexFollows(data){
  return service.request({
    method: "get",
    url: `/user/index/follows/${data.author_id}`,
    params:data
  })
}

/**
 * 最热用户列表
 */
export function userHotList(data){
  return service.request({
    method: "get",
    url: "/user/hot/list",
    params:data
    // 左边data是变量名，右边data是参数名，参数名和变量名相同，可止写成一个
  })
}