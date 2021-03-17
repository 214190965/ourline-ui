/**
 * 路径模块接口类
 */
import Ajax from '../../http'
import Constants from '../../../common/constants'
const line = {
  /**
   * 路径接口
   * @param data JSONObject
   */
  getUserLine(data) {
    return Ajax.request(Constants.zuulPath_point + '/line', data, 'get');
  },
  /**
   * 获取节点路径映射
   * */
  getPointLineMap(data){
    return Ajax.request(Constants.zuulPath_point + '/plmap', data, 'get');
  }
};
export default line
