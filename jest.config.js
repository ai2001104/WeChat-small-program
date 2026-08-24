module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'],
  collectCoverageFrom: [
    'redux绑定/wechat-weapp-redux-master/src/**/*.js',
    '科学计算器/wxapp-calculator-master/utils/*.js',
    '高仿苹果计算器/weixin_calculate-master/utils/*.js',
    '货币汇率/currencyRate-master/utils/*.js',
  ],
  coverageDirectory: 'coverage',
}
