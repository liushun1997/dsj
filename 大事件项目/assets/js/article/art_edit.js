$(function () {
  // console.log(location.search); // ?id=59068&age=18 => { id: 59068, age: 18 }
  // location.search.split('?') // ['', 'id=59068&age=18']
  // location.search.split('?')[1] // id=59068&age=18
  // location.search.split('?')[1].split('&') // ['id=59068', 'age=18']

  const formatParams = (str) => {
    /* let r = str.split('?')[1].split('&');
    const obj = {};
    for (let i = 0; i < r.length; i++) {
      let arr = r[i].split('=');
      obj[arr[0]] = arr[1];
    }
    return obj; */
    const obj = {}
    let r = str.split('?')[1].split(/=|&/)
    for (let i = 0; i < r.length; i += 2) {
      obj[r[i]] = r[i + 1]
    }
    return obj
  }
  const obj = formatParams(location.search)
  // obj.id => 文章在 ID

  const getArticleDetails = () => {
    $.ajax({
      url: `/my/article/${obj.id}`,
      success(res) {
        console.log(res, 233)
        if (res.status !== 0) return layui.layer.msg('失败')
        // 填充数据
        // layui.form.val('artEdit', res.data)
        // 要等到分类也加载并渲染完毕了再填充
        initCate(res.data)
      }
    })
  }
  getArticleDetails()

  let layer = layui.layer
  let form = layui.form

  // 初始化富文本编辑器
  initEditor()
  function initCate(data) {
    $.ajax({
      method: 'GET',
      url: '/my/article/cates',
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('获取文章分类列表失败!')
        }
        let htmlstr = template('tpl-cate', res)
        $('[name=cate_id]').html(htmlstr)
        // form.render();
        // 要等到分类也加载并渲染完毕了再填充
        layui.form.val('artEdit', data)
        // 富文本编辑器里面并没有默认的内容，只有新版本才支持，这里使用手动填充
        document.querySelector('#content_ifr').contentDocument.querySelector('#tinymce').innerHTML = data.content

        // 渲染当前用户的头像
        $image.prop('src', 'http://ajax.frontend.itheima.net' + data.cover_img)
        // 等图片 src 正确了之后，再进行初始化
        $image.cropper(options)
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
  //   $image.cropper(options)
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
        fd.append('cover_img', blob)
        PostNewArticles(fd)
      })
  })
  function PostNewArticles(fd) {
    $.ajax({
      method: 'POST',
      url: '/my/article/add',
      data: fd,
      contentType: false,
      processData: false,
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('发布文章失败!')
        }
        window.parent.document.querySelector('[href="/article/art_list.html"]').click()
      }
    })
  }
})
