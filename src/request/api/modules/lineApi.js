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
    return Ajax.request(Constants.zuulPath_line + '/get', data, 'get');
  },

  /**
   * 新增路径
   * */
  saveLines(data){
    return Ajax.request(Constants.zuulPath_line + '/save',
      data, 'post',Constants.http_content_type.json);
  },
  /**
   * 更新路径
   * */
  editLines(data){
    return Ajax.request(Constants.zuulPath_line + '/edit',
      data, 'post',Constants.http_content_type.json);
  }
};
export default line
