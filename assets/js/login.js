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

    //密码框的校验规则
    var form = layui.form //从layui中获取form对象
    form.verify({
        //自定义pwd的 校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function(value) {
            //1.将repwd给到再次确认密码框，使用函数形参value表示用户输入进再次确认密码框内的值
            //2.获取密码框内的值
            //3.将两个值进行对比，不一致则输出提示信息
            var pwd = $(".reg-box [name=password]").val()
            if (pwd !== value) {
                return '两次密码不一致，请确认'
            }

        }
    })
})