/**
 * 节点模块接口类
 */
import Ajax from '../../http'
import Constants from '../../../common/constants'
const user = {
  /**
   * 获取节点
   * @param data JSONObject
   */
  getUserPoint(data) {
    return Ajax.request(Constants.zuulPath_point + '/get', data, 'get');
  },

  /**
   * 保存节点
   * */
  savePoints(data) {
    return Ajax.request(Constants.zuulPath_point + '/save', data,
      'post',Constants.http_content_type.json)
  },

  /**
   * 更新节点
   * */
  editPoints(data) {
    return Ajax.request(Constants.zuulPath_point + '/edit', data,
      'post',Constants.http_content_type.json)
  }
};
export default user
