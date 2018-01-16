/**
 * Created by sun on 2018/1/14.
 */

;(function () {

  //局部滚动
  mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005,//flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    scrollY: true, //是否竖向滚动
    scrollX: false, //是否横向滚动
    startX: 0, //初始化时滚动至x
    startY: 0, //初始化时滚动至y
    indicators: false, //是否显示滚动条
    bounce: true //是否启用回弹
  });


  var gallery = mui('.mui-slider');
  gallery.slider({
    interval: 2000//自动轮播周期，若为0则不自动播放，默认为0；
  });

  function getLocation() {
    var obj = {};
    var search = location.search;
    search = search.split('?')[1];
    var arr = search.split('&');
    for (var i = 0; i < arr.length; i++) {
      var key = arr[i].split('=')[0];
      var val = arr[i].split('=')[1];
      obj[key] = val;
    }
   return obj;
  }

  function getResult(value){
    return getLocation()[value];
  }

})();