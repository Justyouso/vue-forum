import service from '@/utils/request'
/**
 * 列表
 */
export function articleList(data){
  return service.request({
    method: "get",
    url: "/article/list",
    params:data
    // 左边data是变量名，右边data是参数名，参数名和变量名相同，可止写成一个
  })
}

/**
* 新增
*/
export function articleCreate(data){
  return service.request({
    method: "post",
    url: "/article/create",
    data
    // 左边data是变量名，右边data是参数名，参数名和变量名相同，可止写成一个
  })
}

/**
 * 编辑
 */

/**
* 删除
*/