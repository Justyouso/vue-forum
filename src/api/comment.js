import service from '@/utils/request'
/**
 * 文章-评论列表
 */
export function commentList(data){
  return service.request({
    method: "get",
    url: `/comment/list`,
    params:data
    // 左边data是变量名，右边data是参数名，参数名和变量名相同，可止写成一个
  })
}

/**
 * 发表评论
 */
export function commentPost(data){
  return service.request({
    method: "post",
    url: `/comment/create`,
    params:data
    // 左边data是变量名，右边data是参数名，参数名和变量名相同，可止写成一个
  })
}

