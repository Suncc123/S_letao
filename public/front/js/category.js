
/**
 * Created by sun on 2018/1/14.
 */

$(function () {
  mui('.mui-scroll-wrapper').scroll({
    scrollY: true, //是否竖向滚动
    scrollX: false, //是否横向滚动
    startX: 0, //初始化时滚动至x
    startY: 0, //初始化时滚动至y
    indicators: false, //是否显示滚动条
    deceleration:0.0006, //阻尼系数,系数越小滑动越灵敏
    bounce: true //是否启用回弹
  });

  $.ajax({
    type:'get',
    url:'/category/queryTopCategory',
    success:function (info) {
        console.log(info);
        $('.lt_aside ul').html( template("tpl-left",info));
        renderSecond(info.rows[0].id);
    }
  });

  $('.lt_aside ul').on('click','li',function (){

    $(this).addClass("now").siblings().removeClass("now");
      var id = $(this).data("id");
      renderSecond(id);

  });

  function renderSecond(id) {

    $.ajax({
      type:'get',
      url:'/category/querySecondCategory',
      data:{
        id:id
      },
      success:function (info) {
        $('.lt_content ul').html( template("tpl-right",info));
      }
    })

  }
});