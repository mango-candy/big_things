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
    var layer = layui.layer //从layui中获取弹出层
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

    //监听注册表单的提交事件
    $("#form_reg").on('submit', function(e) {
        //1.阻止 默认提交行为
        e.preventDefault()
        //2.发起Ajax的POST请求
        var data = {
            username: $('#form_reg [name = username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        $.post('/api/reguser', data,
            function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('注册成功！')
                $("#link_login").click()//自动触发点击事件
            })
    })

    //监听登录表单的提交事件
    $("#form_login").submit(function(e) {
        //1.阻止默认提交行为
        e.preventDefault()
        //2.发起Ajax的POST请求
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功！')
                //将登录成功后服务器发送的密钥token字符串，保存到localStorage中
                localStorage.setItem('token', res.token)
                location.href = '/index.html' //登录成功则跳转至主页
            }
        })
    })
})