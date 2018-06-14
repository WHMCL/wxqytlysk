// pages/equipmentploblem/equipmentploblem.js
var app = getApp()

Page({
  data: {
    userInfo: {},
    toastHidden: true,
    toastContent: '',
    userListInfo: [{
      leftItem: '我的账户',
      showArrow: true,
    }, {
      leftItem: '邀请好友 （一起赚钱）',
      margin: '20rpx',
      showArrow: true,
    }, {
      leftItem: '我的业绩',
      showArrow: true,
    }, {
      leftItem: '用户协议',
      margin: '20rpx',
      showArrow: true,
    }, {
      leftItem: '当前版本',
      rightItem: 'V 1.0.0 (内测版)',
      margin: '20rpx',
      showArrow: false,
    }]
  },

  onLoad: function () {
    //调用应用实例的方法获取全局数据
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  toastChange: function () {
    this.setData({
      toastHidden: true
    })
  },

  headTap(e) {
    //更新数据
    this.setData({
      toastHidden: false,
      toastContent: "点击头部"
    })
  },

  cellItemClick(e) {
    var index = e.currentTarget.dataset.index
    console.log("index = " + index)
    //更新数据
    this.setData({
      toastHidden: false,
      toastContent: "点击" + index
    })
  },
})