$(function () {
    var HomePageUploadImg, TextUploadImg = "/Photo/AddImg.png"; //默认上传图片地址

    //首页图片上传
    $('#HomePageUploadImg').click(function () {
        $('#HomePageUpload').click();
    });

    //正文图片上传
    $('#TextUploadImg').click(function () {
        $('#TextUpload').click();
    });

    // 移除图片
    $("img[src='/Photo/AddImg.png']").parent().next().find("input[type='image']").remove();
});

function checkSave() {
    var text = $.trim($("#txtTitle").val());
    if (text == "") {
        layer.alert("标题不能为空", {
            icon: 5,
            offset: '10%'
        });
        return false;
    }
    var txtKeywords = $("#txtKeywords").val().trim();
    if (txtKeywords.length > 500)
    {
        layer.alert("SEO关键字的长度不能超过500个字", {
            icon: 5,
            offset: '10%'
        });
        return false;
    }
    var txtDescription = $("#txtDescription").val().trim();
    if (txtDescription.length > 500) {
        layer.alert("SEO内容的长度不能超过500个字", {
            icon: 5,
            offset: '10%'
        });
        return false;
    }
    if (!window.confirm("确认提交信息？")) return false;
}
window.onresize = function () {
    getWidth();
}
$(document).ready(function () {
    getWidth();
})
function getWidth() {
    var cl10Width = $(".col-md-10").width() - 110;
    var hpWidth = $("#HomePageUploadImg").width();
    var tuWidth = $("#TextUploadImg").width();
    if (hpWidth > cl10Width) {
        $("#HomePageUploadImg").css({
            width: cl10Width
        });
    }
    if (tuWidth > cl10Width) {
        $("#TextUploadImg").css({
            width: cl10Width
        });
    }

    $(".edui-container").css({
        width: $(".col-md-10").width()
    });
}