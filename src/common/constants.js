/*常量类*/
export default {
  //客户端实际返回的内容的内容类型
  http_content_type: {
    urlencoded: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    json: {
      'Content-Type': 'application/json'
    },
    file: {
      'Content-Type': 'multipart/form-data'
    },
    text: {
      'Content-Type': 'text/xml'
    }
  },
  sysCfgFileName:'static/sysConfig.json',//配置文件名称,vue2.0系列放在static目录下
  zuulPath_user:'/user',//网关中配置的用户服务路径前缀
  zuulPath_point:'/serve', //节点服务路径前缀
}
