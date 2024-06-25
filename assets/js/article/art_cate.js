$(function(){

    let layer = layui.layer

    let form = layui.form

    function getArtcatelist(){
        $.ajax({
            method: 'get',
            url: '/my/article/cates',
            success: function(res){
                let htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        })
    }

    let indexAdd = null

    $('#btnAddcate').on('click', function(){
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        })
    })

    $('body').on('submit', '#form-add', function(e){
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function(res){
                if(res.status !== 0) return layer.msg('添加类别失败！')
                getArtcatelist()
                layer.msg('添加类别成功！')
                layer.close(indexAdd)
            }
        })
    })

    let indexEdit = null

    $('tbody').on('click', '.btn-edit', function(){
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        })
        let id = $(this).attr('data-id')
        $.ajax({
            method: 'get',
            url: '/my/article/cates/' + id,
            success: function(res){
                form.val('form-edit', res.data)
            }
        })
    })

    $('body').on('submit', '#form-edit', function(e){
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function(res){
                if(res.status !== 0) return layer.msg('更新类别失败！')
                getArtcatelist()
                layer.msg('更新类别成功！')
                layer.close(indexEdit)
                getArtcatelist()
            }
        })
    })

    $(tbody).on('click', '.btn-delete',function(){
        let id = $(this).attr('data-id')
        layer.confirm('确认删除?', {icon: 3, title:'提示'}, function(index){
            $ajax({
                method: 'get',
                url: '/my/article/deletecate/' + id,
                success: function(res){
                    if(res.status !== 0) return layer.msg('删除失败！')
                    layer.msg('删除成功！')
                    layer.close(index)
                    getArtcatelist()
                }
            })
          })
    })
})