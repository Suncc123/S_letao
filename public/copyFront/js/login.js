/**
 * Created by sun on 2018/1/15.
 */

$(function () {

  var $form = $('.mui-input-group');
  mui('.mui-input-row input').input();

  $('.btn-confirm').on("click",function (e) {
    e.preventDefault();
    var check = true;
    mui(".mui-input-group input").each(function() {
//若当前input为空，则用消息提示框
      if(!this.value || this.value.trim() == "") {
        var label = this.previousElementSibling;
        //mui.alert(label.innerText + "不允许为空");
        mui.toast(label.innerText + "不允许为空",{ duration:'long', type:'div' });
        check = false;
        return false;
      }
    }); //校验通过，继续执行业务逻辑
    if(check){
      $.ajax({
        type:'post',
        url:'/user/login',
        data:$form.serialize(),
        success:function (info) {
          console.log(info);
          if(info.success){
            location.href = "user.html";
          }
          if(info.error == 403){
            mui.toast(info.message,{ duration:'long', type:'div' });
          }
        }
      })
    }
  });

});