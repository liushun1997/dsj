$(function () {
    // 去注册
    $('#link_reg').on('click', function () {
        // 隐藏登录框
        $('.login-box').hide();
        // 显示注册框
        $('.reg-box').show();
    });
    $('#link_login').on('click', function () {
        // 隐藏注册框
        $('.reg-box').hide();
        // 显示登录框
        $('.login-box').show();
    });
});