/**
 * Created by sun on 2018/1/16.
 */

$(function () {
  function getLocation() {
    var obj = {};
    var search = location.search;
    search = search.split('?')[1];
    var arr = search.split('&');
    for (var i = 0; i < arr.length; i++) {
      var key = arr[i].split('=')[0];
      var val = arr[i].split('=')[1];
      obj[key] = val;
    }
    return obj;
  }

  function getResult(value){
    return getLocation()[value];
  }

  var key = getResult('key');
  $('.search-text').val(key);

  //渲染数据
  function render() {
    var data = {};
    data.proName = key;
    data.page = 1;
    data.pageSize = 100;

    if($('.search_list a[data-type]').hasClass('now')){
      var param = $('.search_list a.now').data('type');

      data[param] = $('.search_list a.now').find('i').hasClass('fa-angle-down')?2:1;
    }

    $.ajax({
      type:'get',
      url:'/product/queryProduct',
      data:data,
      success:function (info) {
        console.log(info);
          $(".proShow").html( template('tpl',info));
      }
    })

  }

  render();

  $('.search_list').on('click','a',function () {

    if($(this).hasClass('now')){
      $(this).find('i').toggleClass('fa-angle-down').toggleClass('fa-angle-up');
    }else{
      $(this).addClass('now').siblings().removeClass('now');
      $('.search_list').find('i').removeClass('fa-angle-up').addClass('fa-angle-down');
    }
    render();
  });


  $('.search-btn').on('click',function () {

    $('.proShow').html('<div class="loading"></div>');

    key = $('.search-text').val();

    render();

  })

});