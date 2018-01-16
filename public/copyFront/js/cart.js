/**
 * Created by sun on 2018/1/15.
 */

$(function () {

  function renderCart(){
    $.ajax({
      type:'get',
      url:'/cart/queryCart',
      success:function (info) {
        console.log(info);
        if(info.error == 400) {
          location.href = "login.html";
        }
        var data = {
          rows : info
        };
        setTimeout(function () {
          mui('#refreshContainer').pullRefresh().endPulldownToRefresh(true);
          $('.mui-wrapper').html( template("tpl",data));
        },1000);
      }

    });
  }

  mui.init({
    pullRefresh: {
      container: "#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
      down: {
        range:'100px',
        height: 50,//可选,默认50.触发下拉刷新拖动距离,
        auto: true,//可选,默认false.首次加载自动下拉刷新一次
        contentdown: "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
        contentover: "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
        contentrefresh: "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
        callback: renderCart //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
      }
    }
  });

  var price = 0;

  $('.mui-wrapper').on('change','.checkbox',function () {
    if($(this).prop('checked')){
      price += parseFloat($(this).data('price').toFixed(3));
      console.log(price);
    }else{
      price -= parseFloat($(this).data('price').toFixed(3));
    }
   $('.price').text(price);
  })

  });