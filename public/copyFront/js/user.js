/**
 * Created by sun on 2018/1/15.
 */
$(function () {

  $.ajax({
    type:'get',
    url:'/user/queryUserMessage',
    success:function (info) {
        console.log(info);
        $('.user-text').html( template("tpl",info));
      if(info.error == 400){
        location.href = "login.html";
      }
    }
  });


  $('.btn-logout').on('click',function () {
    $.ajax({
      type:'get',
      url:'/user/logout',
      success:function (info) {
          console.log(info);
        if(info.success){

          location.href = "login.html";
        }
      }
    })

  })

});