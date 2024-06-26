$(function(){
    getUserinfo()

    let layer = layui.layer

    $('#btnLogOut').on('click', function(){
        layer.confirm('确定退出登录?', {icon: 3, title: '提示'}, function(index){
            localStorage.removeItem('token')

            location.href = '/login.html'

            layer.close(index)
        })
    })
})

// 获取用户的基本信息
function getUserinfo(){
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') | ''
        // },
        success: function(res){
            if(res.status !== 0) return layui.layer.msg('获取用户信息失败！')
            // 渲染用户的头像
            renderAvatar(res.data)
        },
    })
}

function renderAvatar(user){
    let name = user.nicjname || user.username

    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)

    if(user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()

        $('.text-avatar').hide()
    }else {
        $('.layui-nav-img').hide()

        let first = name[0].toUpperCase()

        $('.text-avatar').html(first).show()
    }
}