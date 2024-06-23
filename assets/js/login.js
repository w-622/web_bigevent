$(function(){
    // 1.去注册的点击事件
    $('#link_reg').on('click', function(){
        $('.login-box').css('display', 'none')
        $('.reg-box').css('display', 'block')
    })

    // 2.去登录的点击事件
    $('#link_login').on('click', function(){
        $('.reg-box').css('display', 'none')
        $('.login-box').css('display', 'block')
    })

    // 自定义校验规则
    let form = layui.form
    let layer = layui.layer
    form.verify({
        pass: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ],
        // 验证两次密码是否一致
        repass: function(value){
            let paw =  $('.reg-box [name=password]').val()
            if(paw !== value) return '两次密码不一致'
        } 
    })

    // 监听注册表单的提交事件
    $('#form_reg').on('submit', function(e){
        // 阻止表单的默认提交
        e.prevertDefault()
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {username: $('#form_reg [name=username]').val(), password:$('#form_reg [name=password]').val()},
            success: function(res){
                if(res.status !== 0) return layer.msg(res.message)
                layer.msg('注册成功！')
                $('#link_login').click()
            }
        })
    }) 

    // 监听登录表单的提交事件
    $('#form_login').on('submit', function(e){
        e.prevertDefault()
        $.ajax({
            method: 'post',
            url: '/api/login',
            // 快速获得表单中的数据
            data: $(this).serialize(),
            success: function(res){
                if(res.status !== 0) return layer.msg('登录失败！')
                layer.msg('登录成功！')
                localStorage.setItem('token', res.token)
                // 登录成功后 跳转到后台主页
                location.href = '/index.html'
            }
        })
    })
})