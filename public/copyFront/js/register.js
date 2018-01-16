/**
 * Created by sun on 2018/1/15.
 */
$(function () {

  //发送验证码
  var $getNum = $('.getNum');

  $getNum.on('click',function (e) {
    if($(this).hasClass('now')){
      return false;
    }
    var t = 4;
    e.preventDefault();
    $(this).text('发送中···');
    $(this).addClass('now');
    $.ajax({
      type:'get',
      url:'/user/vCode',
      success:function (info) {
          console.log(info);
        console.log(info.vCode);
      }
    });

    var timer = setInterval(function () {
      $getNum.text(t+'秒后再次发送');
      t--;
      if(t < 0){
        clearInterval(timer);
        $getNum.text('再次发送');
        $getNum.removeClass('now');
      }
    },1000)

  });

  mui('.mui-input-row input').input();

  $('.btn-register').on('click',function () {
    var check = true;
    mui(".mui-input-group input").each(function() {
//若当前input为空，则alert提醒
      if(!this.value || this.value.trim() == "") {
        mui.toast(this.placeholder,{ duration:'long', type:'div' });
        check = false;
        return false;
      }
    }); //校验通过，继续执行业务逻辑
    if(check){


    }
  });


});