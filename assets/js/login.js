$(function() {
    //给注册按钮添加点击事件
    $("#link_reg").on('click', function() {
        $(".login-box").hide()
        $(".reg-box").show()
    })
    //给'去登录'按钮添加点击事件
    $("#link_login").on('click', function() {
        $(".login-box").show()
        $(".reg-box").hide()
    })
})