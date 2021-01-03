$(function(){
    // 获取文章分类的列表
    let layer=layui.layer
    let form=layui.form
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
    //  获取分类信息
    let indexEdit=null
    $('tbody').on('click','.btn-edit',function(){
        indexEdit=layer.open({
            type: 1,
            area: ['500px', '300px'],
            title: '修改文章分类'
            ,content: $('#tpl-edit').html()
          });
          let id=$(this).attr('data-Id')
          $.ajax({
              method:'GET',
              url:'/my/article/cates/'+id,
               success:function(res){
                   form.val('form-edit',res.data)
               }
          })
    })
//   修改文章分类
    $('body').on('submit','#form-edit',function(e){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/my/article/updatecate',
            data:$(this).serialize(),
             success:function(res){
                 console.log(res,123);
                 if(res.status!==0) return layer.msg('更新分类信息失败！')
                 layer.msg('更新分类信息成功！')
                 layer.close(indexEdit)
                 initArtCateList()
             }
        })
    })
    // 删除文章模块
    // 通过委托的形式为删除按钮绑定点击事件
    $('tbody').on('click', '.btn-delete', function () {
        var id = $(this).attr('data-id');
        layer.confirm('确认删除?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            $.ajax({
                method: 'GET',
                url: `/my/article/deletecate/${id}`,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除分类失败！');
                    }
                    layer.msg('删除分类成功！');
                    layer.close(index);
                    initArtCateList();
                }
            });
        });
    });
})