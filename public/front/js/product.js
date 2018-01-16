/**
 * Created by sun on 2018/1/16.
 */

$(function(){

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

  var id = getResult('productId');


  $.ajax({
    type:'get',
    url:'/product/queryProductDetail',
    data:{
      id:id
    },
    success:function (info) {
      console.log(info);
      var size = info.size.split('-');
      console.log(size);
      var sizeArr = [];
      if(+size[0] <= size[1]){
        for(var i = +size[0]; i <= size[1] ; i++){
          sizeArr.push(i);
        }
      }else{
        for(var j = +size[1]; j <= size[0] ; j++){
          sizeArr.push(j);
        }
      }
      info.sizeArr = sizeArr;
      $('.mui-scroll').html( template('tpl',info));

      // 初始化轮播图
      var gallery = mui('.mui-slider');
      gallery.slider({
        interval:2000//自动轮播周期，若为0则不自动播放，默认为0；
      });

    //  重新初始化数字框
      mui(".mui-numbox").numbox();
    }
  })

});