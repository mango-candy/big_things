$(function() {
    var form = layui.form
    var layer = layui.layer


    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称长度必须在1~6个字符之间！'
            }
        }
    })
    initUserInfo()
    //初始化用户的基本信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败！')
                }
                console.log(res);
                //调用layui里面form.val()方法快速为表单赋值
                form.val('formUserInfo', res.data)
            }
        })
    }
    $("#btnReset").on('click', function(e) {
        //清除表单的默认行为，因为重置按钮的type属性为Reset，所以表单一旦重置会将用户名一起重置，我们希望保留只保留用户名，所以需要先清除重置属性的默认行为
        e.preventDefault()
        //调用initUserInfo()相当于重新刷新表单页面，将为提交给服务器的网页上面的数据清除
        initUserInfo()
    })
    //发起监听表单的提交事件 
    $('.layui-form').on('submit', function(e) {
        //阻止表单的默认提交行为
        e.preventDefault()
        //发起ajax数据请求
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败!')
                }
                layer.msg('更新用户信息成功!')
                //调用父页面中的方法，重新渲染用户的头像和用户的信息
                window.parent.getUserInfo()
            }
        })
    })

})
