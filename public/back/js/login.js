/**
 * Created by sun on 2018/1/11.
 */

$(function () {
    var $form = $("form");

    $form.bootstrapValidator({
      //配置校验字段规则，name属性
      fields:{
        //username的校验规则
        username:{
          validators:{
            //  非空校验
            notEmpty:{
              message:"用户名不能为空"
            },

            callback:{
              message:"用户名不存在"
            }
          }
        },
        password:{
          validators:{
            notEmpty:{
              message:"用户密码不能为空"
            },
            stringLength:{
              min:6,
              max:12,
              message:"密码是6-12位"
            },

            callback:{
              message:"密码错误"
            }

          }
        }

      },
      feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
      }

    });

  $form.on('success.form.bv', function (e) {
    e.preventDefault();
    //使用ajax提交逻辑

    $.ajax({
      type:"post",
      url:"/employee/employeeLogin",
      data:$form.serialize(),
      dataType:"json",
      success:function (info) {
        console.log(info);
          if(info.success){
            location.href = "index.html";
          }

        if(info.error == 1000){
          $form.data('bootstrapValidator').updateStatus("username","INVALID","callback");
        }

        if(info.error == 1001){
          $form.data('bootstrapValidator').updateStatus("password","INVALID","callback");
        }

      }
    });


  });

  $('button[type="reset"]').on("click",function () {

    $form.data("bootstrapValidator").resetForm();

  })

});

