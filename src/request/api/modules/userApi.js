/**
 * 用户模块接口类
 */
import Ajax from '../../http'
import Constants from '../../../common/constants'
const user = {
  /**
   * 登录接口
   * @param data JSONObject
   */
  login(data) {
    return Ajax.request(Constants.zuulPath_user + '/login', data, 'post');
  },
};
export default user
