$(function () {
  // 去注册
  $('#link_reg').on('click', function () {
    // 隐藏登录框
    $('.login-box').hide()
    // 显示注册框
    $('.reg-box').show()
  })
  $('#link_login').on('click', function () {
    // 隐藏注册框
    $('.reg-box').hide()
    // 显示登录框
    $('.login-box').show()
  })
  // 自定义校验规则
  const form = layui.form
  const  layer=layui.layer
  form.verify({
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    repwd: function (value) {
      let pwd = $('.reg-box [name=password]').val()
      if (pwd !== value) {
        return '二次密码不正确!'
      }
    }
  })
  $('#form_reg').on('submit', function (e) {
    e.preventDefault()
    $.post(
      'http://ajax.frontend.itheima.net/api/reguser',
      {
        username: $('#form_reg [name=username]').val(),
        password: $('#form_reg [name=password]').val()
      },
      function (res) {
        if (res.status !== 0) {
            layer.msg(res.message);
        }
        layer.msg('注册成功')
        $('#link_login').click()

      }
    )
  })
   $('#form_login').on('submit',function(e){
       e.preventDefault();
    
       $.ajax({
           url:'http://ajax.frontend.itheima.net/api/login',
           method:'POST',
           data:$(this).serialize(),
           success:function(res){
               if(res.status !==0) return  layer.msg('登录失败');
               layer.msg('登录成功');
               localStorage.setItem('token',res.token)
               location.href='/index.html'
           }
       })
   })

})
