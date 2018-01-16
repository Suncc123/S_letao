/**
 * Created by sun on 2018/1/16.
 */

$(function () {

  var $history = $('.lt_history');
  // 渲染数据
  function render(){

    var data = localStorage.getItem("lt_search_history");
    if(data){
      var arr = JSON.parse(data);
      $history.html( template("tpl",{arr:arr}));
    }else{
      $history.html( template("tpl",{arr:[]}));
    }
  }
  render();

  // 搜索添加记录
  $('.search-btn').on('click',function (e) {
    e.preventDefault();
    var txt = $('.search-text').val().trim();

    $('.search-text').val("");

    if(!txt){
      mui.toast('请输入搜索关键字',{ duration:'long', type:'div' });
      return;
    }
    var arr = localStorage.getItem("lt_search_history");
    console.log(arr);
    if(!arr){
         arr = [];
    }else{

       arr = JSON.parse(arr);
      var index = arr.indexOf(txt);
      if(index != -1){
        arr.splice(index,1);
      }
      if(arr.length >= 10){
        arr.pop();
      }

    }

    arr.unshift(txt);

    localStorage.setItem("lt_search_history",JSON.stringify(arr));

    location.href = "searchList.html?key=" + txt;
    render();
  });

  // 清空历史
  $history.on('click','.btn-empty',function () {

    mui.confirm('您确定要清空历史记录吗？','温馨提示',['是','否'],function (e) {
      if(e.index == 0){
        localStorage.removeItem("lt_search_history");
        render();
      }
    });

  });

  // 删除记录
  $history.on('click','.btn-delete',function () {

    var index = $(this).data("index");
    var str = localStorage.getItem("lt_search_history");

    var arr = JSON.parse(str);
    arr.splice(index,1);
    localStorage.setItem("lt_search_history",JSON.stringify(arr));
    render();
  })

});