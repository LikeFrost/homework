import cookieUtil from './cookie';

class User {
  /**
   * 保存token 到cookie中
   * @param accessToken
   */
  saveToken = (accessToken) => {
    cookieUtil.setItem('accessToken', accessToken, {
      path: '/',
      maxAge: 3600 * 12,
    });
  };

  /*
   * 获取token
   */
  getToken = () => {
    return cookieUtil.getItem('accessToken');
  };

  /**
   * 判断用户是否登录
   */
  isLogin = () => {
    return !!cookieUtil.getItem('accessToken');
  };

  /**
   * 保存登录接口返回的用户名、角色Id
   * @param {string} username
   */
  saveUserRoleToCookie = (userRole) => {
    cookieUtil.setItem('userRole', userRole, {
      path: '/',
      maxAge: 3600 * 12,
    });
  };

  getUserRole = () => {
    const userRole = cookieUtil.getItem('userRole');
    return userRole ;
  };

  /**
   * 用户退出登录
   *
   * @memberof User
   */
  logout = () => {
    cookieUtil.deleteItem('adminId');
    cookieUtil.deleteItem('userInfo');
  };
}

export default new User();