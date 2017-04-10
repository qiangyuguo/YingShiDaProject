function cleartxt(ID) {
    var value = document.getElementById(ID).value;
    if (value.substring(0, 3) == "请输入")  //聚焦时，如果文本框为初始值，则清空
        document.getElementById(ID).value = "";
}
function resettxt(ID, text) {
    var value = document.getElementById(ID).value;
    if (value == "" || value == null)  //失焦时，如果文本框为空，则给初始值
        document.getElementById(ID).value = text;
}
function modifyBg() {
    $(".beijing").css({
        "height": $(window).height(),
        "width": $(window).width(),
        "z-index": -999
    });
}

function modifyLogin() {
    /*
        beijingHeight:992px;  
        beijingWidth:1920px;
        width: 399px;
        height: 371px;
    */
    var loginTop = ($(window).height()) * 0.3;
    var loginRight = ($(window).width()) * 0.1;
    $(".login").css({
        "top": loginTop,
        "right": loginRight
    });

    var titleTop = ($(window).height()) * 0.01;
    var titleLeft = ($(window).width()) * 0.05;
    $(".inner .div1").css({
        "top": titleTop,
        "left": titleLeft
    });
}