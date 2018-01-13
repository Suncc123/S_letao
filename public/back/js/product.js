/**
 * Created by sun on 2018/1/13.
 */

$(function () {
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

  })



});