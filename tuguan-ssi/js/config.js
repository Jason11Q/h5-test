window.$config = {
  /**
   * 基础地址
   * /
   */
  BASE_ADDRESS: '/',

  /**
   * 用户服务地址
   * /api/user/v1/
   * USER_API_SERVER_URL: 'http://test.tuguan.net/api/user/v1/'
   * 
   */
  USER_API_SERVER_URL: '/api/user/v1/',
  /**
   * 支付地址
   * /api/pay/v1/
   */
  PAY_API_SERVER_URL: '/api/pay/v1/',
  /**
   * 活动码服务地址
   * /api/activityCode/v1/
   */
  ACTIVITYCODE_API_SERVER_URL: '/api/activityCode/v1/',

  /**
   * 文档服务的地址
   * /doc/
   */
  DOC_SERVER_URL: '/doc/',

  /**
   * 百度统计配置
   */
  BAIDU_REPORT: {
    ENABLE: true,
    // 离线
    // ADDRESS: 'https://hm.baidu.com/hm.js?193efb36ea2d2909522a7f825d2fff5d',

    ADDRESS: 'https://hm.baidu.com/hm.js?8a4623c0a74eb94c5761b3e6d1e259b4',
  },

  /**
   * 发布版本号
   */
  VERSION: '3.3.20220707',

  // '?PAYMENT_PAGE': '支付页地址',
  PAYMENT_PAGE: '/price-deployment/public-cloud-edit.html',
};
