/**
 * Created by sun on 2018/1/13.
 */

$(function () {

  function render(page,pageSize) {

    page = page || 1;

    pageSize = pageSize || 5;

    $.ajax({

      type:'get',
      url:'/user/queryUser',
      data:{
        page:page,
        pageSize:pageSize
      },
      success:function (info) {
        console.log(info);
        $('tbody').html(template("tpl",info));

        $('#pagination').bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage:page,
          totalPages:Math.ceil(info.total/info.size),
          onPageClicked:function (a,b,c,p) {
            console.log(p);
            render(p);
          }
        });
      }
    })
  }
  render();


  $("tbody").on("click",".btn",function () {

    $(".addModal").modal('show');

    var id = $(this).parent().data("id");
    var isDelete = $(this).hasClass("btn-success") ? 1 : 0;
    $('.btn_confirm').off().on('click',function () {

      $.ajax({
        type:'post',
        url:'/user/updateUser',
        data:{
          id:id,
          isDelete:isDelete
        },
        success:function (info) {
            if(info.success){

              $(".addModal").modal("hide");

              render();

            }
        }

      })

    })

  });

//  分页

});
