$(function () {
  let layer = layui.layer
  let form = layui.form
  initCate()
  // 初始化富文本编辑器
  initEditor()
  function initCate() {
    $.ajax({
      method: 'GET',
      url: '/my/article/cates',
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('获取文章分类列表失败!')
        }
        let htmlstr = template('tpl-cate', res)
        $('[name=cate_id]').html(htmlstr)
        form.render()
      }
    })
  }
  // 1. 初始化图片裁剪器
  var $image = $('#image')

  // 2. 裁剪选项
  var options = {
    aspectRatio: 400 / 280,
    preview: '.img-preview'
  }

  // 3. 初始化裁剪区域
  $image.cropper(options)
  //选着封面功能
  $('#btnChooseImage').on('click', function () {
    $('#coverFile').click()
  })
  //   监听coverFile的change事件
  $('#coverFile').on('change', function (e) {
    //  拿到用户选择的文件
    let files = e.target.files
    if (files.length === 0) {
      return
    }
    //  根据选择的文件，创建一个对应的 URL 地址：
    let newImgURL = URL.createObjectURL(files[0])
    //  先`销毁`旧的裁剪区域，再`重新设置图片路径`，之后再`创建新的裁剪区域`：
    $image
      .cropper('destroy') // 销毁旧的裁剪区域
      .attr('src', newImgURL) // 重新设置图片路径
      .cropper(options) // 重新初始化裁剪区域
  })
  let art_state = '已发布'
  $('#btn-draft').on('click', function () {
    art_state = '草稿'
  })
  $('#form-pub').on('submit', function (e) {
    e.preventDefault()
    let fd = new FormData(this)
    fd.append('state', art_state)
    $image
      .cropper('getCroppedCanvas', {
        // 创建一个 Canvas 画布
        width: 400,
        height: 280
      })
      .toBlob(function (blob) {
       fd.append('cover_img',blob)
       PostNewArticles(fd)
      })
  })
   function PostNewArticles(fd){
       $.ajax({
           method:'POST',
           url:'/my/article/add',
           data:fd,
           contentType: false,
            processData: false,
            success:function(res){
                if(res.status !==0){
                    return layer.msg('发布文章失败!')
                }
                window.parent.document.querySelector('[href="/article/art_list.html"]').click()
            }
       })
   }
})
