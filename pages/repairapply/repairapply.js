// pages/repairapply/repairapply.js
Page({

  /**
   * 页面的初始数据
   */
  data: { 
    array: [],
    loudongarray: [],
    roomarray: [],
    index: 0,
    index1: 0,
    index2: 0,
    
  },

  listenerPickerSelected: function (e) {
    var index = this.data.index
    //var that = this;
    //改变index值，通过setData()方法重绘界面
    this.setData({
      index: e.detail.value,
      //deptId: this.data.equpimenttypearray[index].vchrDeviceNam 
    });
    
    // console.log(a);
  }, 
  listenerPickerSelected1: function (e) {
    var index1= this.data.index1
    //var that = this;
    //改变index值，通过setData()方法重绘界面
    this.setData({
      index1: e.detail.value,
      
    });
   
  }, 
  listenerPickerSelected2: function (e) {
    var index2 = this.data.index2
    //var that = this;
    //改变index值，通过setData()方法重绘界面
    this.setData({
      index2: e.detail.value,
    });
 
  }, 
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
   
    wx.request({
      url: 'http://localhost:8080/client/getdevice',
      data: {
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      method: "GET",
      success: function (res) {
        console.log(res.data)
        that.setData({
          array: res.data.CientDeviceList
        })

      }
    })

    var that = this;

    wx.request({
      url: 'http://localhost:8080/client/getbuilding',
      data: {
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      method: "GET",
      success: function (res) {
        console.log(res.data)
        that.setData({
          loudongarray: res.data.CientBuidingList
        })

      }
    })


    var that = this;

    wx.request({
      url: 'http://localhost:8080/client/getroom',
      data: {
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      method: "GET",
      success: function (res) {
        console.log(res.data)
        that.setData({
          roomarray: res.data.CientRoomList
        })

      }
    })


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  phoneInput: function (e) {
    var phonenum = this.data.phonenum
    this.setData({
      phonenum: e.detail.value
    })
  },
  repairdesc: function (e) {
    var desc= this.data.desc
    this.setData({
      desc: e.detail.value
    })
  },


  repaircommit:function(e){
    var userDate = new Date().toLocaleDateString();
    var account=wx.getStorageSync("phone")
     var that = this;
     var d = that.data.phonenum
    var  e= that.data.desc
    // //var deptid = wx.getStorageSync('deviceType')
     var index = that.data.index;
     var a = that.data.array; 
     var index1 = that.data.index1;
     var b = that.data.loudongarray; 
     var index2 = that.data.index2;
     var c = that.data.roomarray; 
    // console.log(a[index].vchrDeviceName);
    // console.log(b[index1].buildingName);
    // console.log(c[index2].roomName);
    // console.log(b[index1].buildingName + c[index2].roomName);
    wx.request({
      url: 'http://localhost:8080/client/addrepair',
      data: {
        "intRepairPhone": d,
        "vchrMaintainPerson":account,
        "dtCreateTime": userDate,      
        "vchrProblemDescription": e,
        "vchrDeviceName": b[index1].buildingName + c[index2].roomName
        
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      method: "POST",
      success: function (res) {
        console.log(res.data)
        that.setData({
          roomarray: res.data.CientRoomList
        })

      }
    })

  }
})