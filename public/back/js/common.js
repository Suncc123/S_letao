/**
 * Created by sun on 2018/1/11.
 */

$(function () {
//判断可登陆

  if(location.href.indexOf("login.html") == -1){

    $.ajax({
      type:"get",
      url:"/employee/checkRootLogin",
      success:function (info) {
          if(info.error == 400){
            location.href= "login.html";
          }
      }
    })

  }

//进度条
  $(document).ajaxStart(function () {
    NProgress.start();
  });

  $(document).ajaxStop(function () {

    setTimeout(function () {
      NProgress.done();
    },1000);

  });

 var cate = $(".lt_category");

  //隐藏/显示分类列表
  cate.on("click",function () {
    $(this).find(".cate").slideToggle();

  });

 // 点击按钮aside隐藏
  $('.close_menu').on("click",function () {

    $(".lt_slide").toggleClass("now");
    $(".lt_main").toggleClass("now");

  });

 // 点击按钮激活模态框
  $(".logout_menu").on("click",function () {

    $('#lt_modal').modal('toggle');

  });

  // 点击退出
  $(".btn_logout").on("click",function () {

    $.ajax({
      type:'get',
      url:"/employee/employeeLogout",
      success:function (info) {

        if(info.success){
          location.href = "login.html";
        }
      }
    })

  })



});