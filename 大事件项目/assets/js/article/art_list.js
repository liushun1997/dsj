$(function () {
  let layer = layui.layer
  let form = layui.form
  let laypage = layui.laypage
  function padZero(n) {
    return n > 9 ? n : '0' + n
  }
  // 格式化时间的过滤器
  template.defaults.imports.dateFormat = function (date) {
    const dt = new Date(date)
    var y = dt.getFullYear()
    var m = padZero(dt.getMonth() + 1)
    var d = padZero(dt.getDate())

    var hh = padZero(dt.getHours())
    var mm = padZero(dt.getSeconds())
    var ss = padZero(dt.getSeconds())

    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
  }

  let q = {
    pagenum: 1, // 页码
    pagesize: 2, // 每页显示条数
    cate_id: '', // 文章分类 Id,
    state: '' // 文章的发布状态
  }
  initTable()
  function initTable() {
    $.ajax({
      method: 'GET',
      url: '/my/article/list',
      data: q,
      success: function (res) {
        if (res.status !== 0) return layer.msg('获取文章列表失败！')
        // 使用模板引擎渲染
        let htmlStr = template('tpl-table', res)
        $('tbody').html(htmlStr)
        renderPage(res.total)
      }
    })
  }

  // 获取文章分类
  initCate()
  function initCate() {
    $.ajax({
      method: 'GET',
      url: '/my/article/cates',
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('获取分类数据失败!')
        }
        let htmlStr = template('tpl-cate', res)
        $('[name=cate_id]').html(htmlStr)
        form.render()
      }
    })
  }
  //   筛选功能
  $('#form-search').on('submit', function (e) {
    e.preventDefault()
    let cate_id = $('[name=cate_id]').val()
    let state = $('[name=state]').val()
    q.cate_id = cate_id
    q.state = state

    // 根据最新的筛选条件重新渲染表格数据
    initTable()
  })
  function renderPage(total) {
    // console.log(total, 3)
    laypage.render({
      elem: 'pageBox',
      count: total,
      limit: q.pagesize,
      curr: q.pagenum,
      limits:[2, 4, 6, 8, 10],
      layout:['count','limit','prev', 'page', 'next','skip'],
      jump: function (obj, first) {
        //obj包含了当前分页的所有参数，比如：
        q.pagenum = obj.curr  //得到当前页，以便向服务端请求对应页的数据。
        q.pagesize=obj.limit  //得到每页显示的条数
        //首次不执行
        if (!first) {
          //do something
          initTable()
        }
      }
    })
  }
  // 删除功能模块
  $('tbody').on('click','.btn-delete',function(){
    let id=$(this).attr('data-id')
    let len=$('.btn-delete').length;
    layer.confirm('确认删除吗?', {icon: 3, title:'提示'}, function(index){
        $.ajax({
          method:'GET',
          url:'/my/article/deletecate/'+id,
          success:function(res){
            if(res.status !==0){
              return layer.msg('删除文章分类失败')
            }
            layer.msg('删除文章分类成功')
            if(len===1){
             q.pagenum= q.pagenum===1?1:q.pagenum-1
            }
            initTable()
          }
        })
      
      layer.close(index);
    });
  })
})
