/**
 * Created by sun on 2018/1/13.
 */

$(function () {
  //渲染列表数据和分页

  var $form = $('#form');

  function render(page, pageSize) {

    page = page || 1;
    pageSize = pageSize || 5;

    $.ajax({

      type: 'get',
      url: '/category/queryTopCategoryPaging',
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

  $form.bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      categoryName: {
        validators: {
          //  非空校验
          notEmpty: {
            message: "非空不能提交哦"
          }
        }
      }
    }
  });

  $('.btn-add').on("click", function () {

    $('#addModal').modal("show");

  });

  $form.on('success.form.bv', function (e) {
    e.preventDefault();
    $.ajax({
      type: 'post',
      url: '/category/addTopCategory',
      data: $form.serialize(),
      success: function (info) {
        console.log(info);
        if (info.success) {
          render(1);
          $('#addModal').modal("hide");
        }
      }
    })

  });

  $('#addModal').on("hide.bs.modal",function () {
    $form.data("bootstrapValidator").resetForm(true);
  })
});
