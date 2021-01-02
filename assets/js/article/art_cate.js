$(function(){
    // 获取文章分类的列表
    let layer=layui.layer
    initArtCateList();

    function initArtCateList() {
        $.ajax({
            method:'GET',
            url:'/my/article/cates',
            success:function(res){
               let htmlstr= template('tpl-table',res)
               $('tbody').html(htmlstr)
            }
        })
    }
    let  indexAdd=null
     $('#btnAddCate').on('click',function(){
         indexAdd=layer.open({
            type: 1,
            area: ['500px', '300px'],
            title: '添加文章分类'
            ,content: $('#tpl-add').html()
          });
     })
     $('body').on('submit','#form-add',function(e){
         e.preventDefault();
         $.ajax({
             method:'POST',
             url:'/my/article/addcates',
             data:$(this).serialize(),
             success:function(res){
                 if(res.status !==0){
                     return layer.msg('新增文章分类失败！')
                 }
                 initArtCateList();
                 layer.msg('新增文章分类成功！')
                 layer.close(indexAdd)
             }
         })
     })
})