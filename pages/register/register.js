// // pages/register/register.js
// Page({

//   /**
//    * 页面的初始数据
//    */
//   data: {
  
//   },

//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onLoad: function (options) {
  
//   },

//   /**
//    * 生命周期函数--监听页面初次渲染完成
//    */
//   onReady: function () {
  
//   },

//   /**
//    * 生命周期函数--监听页面显示
//    */
//   onShow: function () {
  
//   },

//   /**
//    * 生命周期函数--监听页面隐藏
//    */
//   onHide: function () {
  
//   },

//   /**
//    * 生命周期函数--监听页面卸载
//    */
//   onUnload: function () {
  
//   },

//   /**
//    * 页面相关事件处理函数--监听用户下拉动作
//    */
//   onPullDownRefresh: function () {
  
//   },

//   /**
//    * 页面上拉触底事件的处理函数
//    */
//   onReachBottom: function () {
  
//   },

//   /**
//    * 用户点击右上角分享
//    */
//   onShareAppMessage: function () {
  
//   }
// })
Page({
  data: {
    index: 0,
    array: [],
    phone: '',
    password: '',
    confimePwd: ''
  },
  onLoad: function (options) {
    var that = this;


    wx.request({
      url: 'http://localhost:8080/client/getdept',
      data: {
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      method: "GET",
      success: function (res) {
        console.log(res.data)
        that.setData({
          array: res.data.CientDeptList
        })
      }
    })

  },
  listenerPickerSelected: function (e) {
    var index = this.data.index 
    var that = this;
    //改变index值，通过setData()方法重绘界面
    that.setData({
      index: e.detail.value,
      deptId : this.data.array[index].deptId
    });
    wx.setStorageSync('key', this.data.array[index].deptId )
  }, 
  // 获取输入账号 
  name: function (e) {
    this.setData({
      account: e.detail.value
    })
  },

  // 获取输入密码 
  password: function (e) {
    this.setData({
    })
    console.log(deptid)
  },

  // 获取确认密码 
  conPwd: function (e) {
    this.setData({
      confimePwd: e.detail.value
    })
  },

  //注册
  formSubmit: function (e) {
    var that = this;

    var deptid = wx.getStorageSync('key')
    console.log(deptid);
    var clientUser = e.detail.value;
   
    console.log(clientUser.account);
    console.log(clientUser.password);
    if (clientUser.account.length == 0) {
      wx.showToast({
        title: '用户名不能为空！',
        icon: 'loading',
        duration: 1000
      });
      return;
    }
    if (clientUser.password.length == 0) {
      wx.showToast({
        title: '密码不能为空！',
        icon: 'loading',
        duration: 1000
      });
      return;
    }
    if (clientUser.conPwd.length == 0) {
      wx.showToast({
        title: '确认密码不能为空！',
        icon: 'loading',
        duration: 1000
      });
      return;
    }
  
    if ((clientUser.conPwd != clientUser.password)) {
    wx.showToast({
      title: '两次输入密码不一样！',
      icon: 'loading',
      duration: 1000
    });
    return;
  }
    wx.request({
      url: "http://localhost:8080/client/addclientuser",
      data: {
        "account":clientUser.account,
        "password":clientUser.password,
        "deptid": deptid,
        "dateCreateTime":"1111-11-11 11:11:11"
        
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      method: "POST",
      success: function (res) {
        console.log(res.data)
        var result = res.data.success;
        if (result != true) {
          toaseText = "用户注册失败" + res.data.errMsg;
          wx.showToast({
            title: toaseText,
            icon: '',
            duration: 2000
          });
          return;
        }
        var toaseText = "用户注册成功！";
        wx.showToast({
          title: toaseText,
          icon: '',
          duration: 2000
        });
        wx.redirectTo({
          url: '../login/login',
        })

      }
    })
  }
  

})