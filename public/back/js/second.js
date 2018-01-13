/**
 * Created by sun on 2018/1/13.
 */

$(function () {

  var $form = $('form');

  function render(page, pageSize) {

    page = page || 1;
    pageSize = pageSize || 5;

    $.ajax({
      type: 'get',
      url: '/category/querySecondCategoryPaging',
      data: {
        page: page,
        pageSize: pageSize
      },
      success: function (info) {
        console.log(info);
        $('tbody').html(template("tpl", info));

        $('#pagination').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: page,
          totalPages: Math.ceil(info.total / info.size),
          onPageClicked: function (a, b, c, p) {
            console.log(p);
            render(p);
          }
        })

      }
    })

  }

  render();

//  添加分类
  $('.btn-add').on("click", function () {
    $('#addModal').modal("show");
    $.ajax({
      type: 'get',
      url: '/category/queryTopCategoryPaging',
      data: {
        page: 1,
        pageSize: 100
      },
      success: function (info) {
        console.log(info);
        $('.dropdown-menu').html(template("menuTpl", info));
      }
    })

  });

  $('.dropdown-menu').on('click', 'a', function () {
    $('.dropdown-toggle .chance').text($(this).text());
    $('.hide_cate').val($(this).data("id"));
  });

  //表单验证
  $form.bootstrapValidator({
    excluded: [],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      categoryId: {
        validators: {
          //  非空校验
          notEmpty: {
            message: "非空不能提交哦"
          }
        }
      },
      brandName: {
        validators: {
          //  非空校验
          notEmpty: {
            message: "非空不能提交哦"
          }
        }
      },
      brandLogo: {
        validators: {
          //  非空校验
          notEmpty: {
            message: "非空不能提交哦"
          }
        }
      }
    }
  });

  $form.on('success.form.bv', function (e) {

    e.preventDefault();
    $.ajax({
      type: 'post',
      url: '/category/addSecondCategory',
      data: $form.serialize(),
      success: function (info) {
        console.log(info);
        if (info.success) {
          render(1);
          $('#addModal').modal('hide');
        }

      }

    })

  });

  // 上传图片预览
  $(".files").fileupload({
    dataType: "json",
    //e：事件对象
    //data：图片上传后的对象，通过e.result.picAddr可以获取上传后的图片地址
    done: function (e, data) {

      $(".uploadImg img").attr('src', data.result.picAddr);
      $('.hide_logo').val(data.result.picAddr);
      console.log(data);
    }
  });

  $('#addModal').on("hide.bs.modal",function () {
    $form.data("bootstrapValidator").resetForm(true);
  })
});
