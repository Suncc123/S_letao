/**
 * Created by sun on 2018/1/13.
 */

$(function () {

  var $form = $('#form');
  var arr = [];
  //渲染数据
  function render(page,pageSize) {

    page = page || 1;
    pageSize = pageSize || 5;

    $.ajax({
      type:'get',
      url:'/product/queryProductDetailList',
      data:{
        page:page,
        pageSize:pageSize
      },
      success:function (info) {
          console.log(info);
        $('tbody').html(template('tpl',info));

        $('#pagination').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: page,
          totalPages: Math.ceil(info.total / info.size),
          itemTexts:function (type,page,current) {

            switch (type){
              case 'first':
                return "首页";
              case "prev":
                return "上一页";
              case "next":
                return "下一页";
              case "last":
                return "尾页";
              case "page":
                return page;
            }

          },
          useBootstrapTooltip:true,
          bootstrapTooltipOptions:{
            animation: true,
            html: true,
            placement: 'bottom',
            selector: false,
            title: "",
            container: false
          },
          tooltipTitles:function (type,page,current) {
            switch (type) {
              case 'first':
                return "首页";
              case "prev":
                return "上一页";
              case "next":
                return "下一页";
              case "last":
                return "尾页";
              case "page":
                return page;
            }
          },
          onPageClicked: function (a, b, c, p) {
            console.log(p);
            render(p);
          }
        })
      }
    })

  }

  render();

//  添加商品
  $('.btn-add').on('click',function () {

    $('#pro_modal').modal('show');

    $.ajax({
      type:'get',
      url:'/category/querySecondCategoryPaging',
      data:{
        page:1,
        pageSize:100
      },
      success:function (info) {
          console.log(info);
        $('.dropdown-menu').html( template("menuTpl",info ));
      }
    })

  });

  // 图片本地预览
  $("#files").fileupload({
    dataType:"json",
    //e：事件对象
    //data：图片上传后的对象，通过e.result.picAddr可以获取上传后的图片地址
    done:function (e, data) {
      $('.img-box').append("<img src="+ data.result.picAddr + " width='80' height='80'>");

      arr.push(data.result);

      if(arr.length === 3){
        $form.data('bootstrapValidator').updateStatus('pic2','VALID');
      }
    }
  });

//  获取brandId，二级分类
  $('.dropdown-menu').on('click','a',function () {

    $('.chance').text( $(this).text() );
    $('.hide_cate').val( $(this).data("id") );

    // 手动使brandId校验成功
    $form.data("bootstrapValidator").updateStatus('brandId','VALID');

  });

  // 表单校验
  $form.bootstrapValidator({
    excluded:[],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      brandId: {
        validators: {
          //  非空校验
          notEmpty: {
            message: "二级分类不能为空哦"
          }
        }
      },
      proName: {
        validators: {
          //  非空校验
          notEmpty: {
            message: "商品名称不能为空哦"
          }
        }
      },
      proDesc: {
        validators: {
          //  非空校验
          notEmpty: {
            message: "商品名称不能为空哦"
          }
        }
      },
      num: {
        validators: {
          //  非空校验
          notEmpty: {
            message: "商品库存不能为空哦"
          },
          //正则校验
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: '请输入合法的库存'
          }
        }
      },
      proSize:{
        validators: {
          //  非空校验
          notEmpty: {
            message: "商品尺寸不能为空哦"
          },
          //正则校验
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: '请输入合法的尺码,例如(32-46)'
          }
        }
      },
      oldPrice:{
        validators: {
          //  非空校验
          notEmpty: {
            message: "商品原价不能为空哦"
          }
        }
      },
      price:{
        validators: {
          //  非空校验
          notEmpty: {
            message: "商品价格不能为空哦"
          }
        }
      },
      pic2:{
        validators: {
          //  非空校验
          notEmpty: {
            message: "图片要上传3张哦"
          }
        }
      }
    }
  });

  //校验成功添加到数据库重新渲染
  $form.on('success.form.bv',function () {

    var result = $form.serialize();
    result += "&picName1="+arr[0].picName+"&picAddr1="+arr[0].picAddr;
    result += "&picName2="+arr[1].picName+"&picAddr2="+arr[1].picAddr;
    result += "&picName3="+arr[2].picName+"&picAddr3="+arr[2].picAddr;
     $.ajax({
      type:'post',
      url:'/product/addProduct',
      data:result,
       success:function (info) {
           if(info.success){
             $('#pro_modal').modal('hide');
             render(1);
             arr = [];
           }
       }
    })

  });

  //表单重置
  $('#pro_modal').on("hide.bs.modal",function () {
    $form.data("bootstrapValidator").resetForm(true);
  })
});