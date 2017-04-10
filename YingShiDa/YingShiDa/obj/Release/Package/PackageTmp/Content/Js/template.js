$(function () {
    /* 

    javascript模板
    <script type="text/x-mydialog-template" id="dialog-template">
        <div class="dialog-bubble br-radius">
            <span class="abroad-triangle"></span>
            <span class="abroad-within"></span>
            <p>%s</p>
        </div>
    </script>

    图片删除模板
    <div class="storeImgDelBtn">
       <asp:ImageButton runat="server" ID="showdel" CommandName="Del" ImageUrl="/Content/images/delete.png" />
    </div>

    */

    "use strict"

    var YinGlobay = {
        namespace: function (ns) {
            var parts = ns.split("."),
                    thisObj = this,
                    i, len;
            for (i = 0, len = parts.length; i < len; i++) {
                if (!thisObj[parts[i]]) {
                    thisObj[parts[i]] = {};
                }
                thisObj = thisObj[parts[i]];
            }
            return thisObj;
        },
        config: {
            "event":
                [
                    '[data-event="ok"]', // 需要气泡模板控件属性
                    ".c-img-i",
                    "AspNetPager2", // 门店列表分页id
                    '[data-setting="identification"]'
                ],
            "attribute":
                [
                    "#dialog-template", // 气泡框script模板ID
                    "config",
                    ".BMap_cpyCtrl", //百度地图属性
                    "#allmap >div:eq(1)",
                    "img:eq(0)", // 图片删除属性
                    "src",
                    ".storeImgDelBtn",
                    ".dialog-bubble", //气泡框样式
                    "div.c-tit"
                ],
            "tags":
                [
                    "body"
                ],
            "url":
                [
                    { "storeIcoPath": "/Photo/AddImg.png" } // 默认图片地址
                ],
            "str":
                [
                    "0px",
                    "-30px"
                ]
        },
        NewConfig: {
            "checkbox": '#ckAllUnSelsOne[type="checkbox"],#ckAllUnSelsTow[type="checkbox"]'
        },
        logMsg: {
            "fromMsg": '请在页面from 表单中添加 data-setting="identification" 属性'
        }
    };

    //创建一个 模板 空间
    YinGlobay.namespace("template");
    YinGlobay.namespace("domData.LM")

    //获取一个标签坐标及宽度高度信息
    YinGlobay.domData.LM = function (tags) {
        var jQuery = $(tags);
        return {
            innerW: jQuery.innerWidth(),
            innerH: jQuery.innerHeight(),
            outerW: jQuery.outerWidth(),
            outerH: jQuery.outerHeight(),
            outerThisW: jQuery.outerWidth(this) === "object" ? jQuery.outerWidth : jQuery.outerWidth(this),
            outerThisH: jQuery.outerHeight(this) === "object" ? jQuery.outerHeight : jQuery.outerHeight(this),
            offsetT: jQuery.offset().top,
            offsetL: jQuery.offset().left
        }
    }

    //气泡模板替换
    YinGlobay.template.sprintf = function (text) {
        var i = 1, args = arguments;
        return text.replace(/%s/g, function () {
            return (i < args.length) ? args[i++] : "";
        });
    }

    //气泡模板删除空格后返回
    YinGlobay.template.addItem = function (text) {
        var scriptHtml = $(YinGlobay.config.attribute[0]).text(),
            result = YinGlobay.template.sprintf(scriptHtml, text);
        var div = document.createElement(YinGlobay.config.tags[0]);
        div.innerHTML = result.replace(/^\s*/, "");
        return div.firstChild;
    }

    //气泡框获得焦点事件
    $(YinGlobay.config.event[0]).focus(function () {
        try {
            var thisobj = $(this),
             config = thisobj.data(YinGlobay.config.attribute[1]);

            //获取this的相关信息
            var thisMsg = YinGlobay.domData.LM(thisobj),
                thisOffsetL = thisMsg.offsetL,
                thisOffsetT = thisMsg.offsetT,
                thisWdith = thisMsg.outerW,
                thisHeight = thisMsg.outerH;

            //获取头部信息 .c-tit信息
            var titMsg = YinGlobay.domData.LM(YinGlobay.config.attribute[8]),
                titWidth = titMsg.outerThisW,
                titHeight = titMsg.outerThisH;


            if ($(YinGlobay.config.event[3]).length > 0) {
                var thisFrom = YinGlobay.domData.LM(YinGlobay.config.event[3]),
                fromHeight = thisFrom.outerH;

                //向页面添加模态框
                $(YinGlobay.config.tags[0]).append(YinGlobay.template.addItem(config.msg));

                //获取模态框信息 
                var dialogMsg = YinGlobay.domData.LM(YinGlobay.config.attribute[7]),
                    dialogThisH = dialogMsg.outerH;

                // 定位值计算
                var sumT = Number(fromHeight - thisOffsetT + dialogThisH + 10), // dialog 显示在上方时的定位计算
                    sumB = Number(thisFrom.innerH + (thisOffsetT - thisFrom.offsetT) - (thisOffsetT + thisHeight) - dialogThisH - 10), // dialog 显示在下方时的定位计算
                    sumL = Number(thisOffsetL - (dialogMsg.innerW + 10)), // dailog 显示在左侧时计算LEFT定位值
                    sumLT = Number(thisFrom.innerH + (thisOffsetT - thisFrom.offsetT) - thisOffsetT - (dialogThisH / 2) - 15), // dailog 显示左侧计算TOP定位值
                    sumR = Number(thisOffsetL + thisWdith) + 10,// dailog 显示在右侧时计算LEFT定位值
                    sumRT = Number(fromHeight - thisOffsetT + thisHeight) - 10;// dailog 显示右侧计算TOP定位值

                // window定位
                function fixAposition(top, left) {
                    $(YinGlobay.config.attribute[7]).css({ "margin-top": "-" + top + "px", "margin-left": left + "px" }).find("span").remove();
                }

                if (Number((thisFrom.offsetT + thisOffsetT) - dialogThisH) - 10 > 1) {
                    fixAposition(sumT, thisOffsetL);
                    return;
                }

                if (Number(thisFrom.innerH - (thisOffsetT - thisFrom.offsetT) - thisHeight) - (dialogThisH + 10) > 1) {
                    fixAposition(sumB, thisOffsetL);
                    return;
                }

                if (Number(thisFrom.innerW - (thisOffsetL + dialogMsg.innerW + 10)) > 1) {
                    fixAposition(sumLT, sumL)
                    return;
                }

                if (Number(thisFrom.innerW - (thisOffsetL + thisWdith)) - (dialogMsg.innerW + 10) > 1) {
                    fixAposition(sumRT, sumR);
                    return;
                }

            } else {

                console.log(YinGlobay.logMsg.fromMsg);
            }

        } catch (e) {

            console.error(e);
        }

    });

    //气泡框失去焦点事件
    $(YinGlobay.config.event[0]).blur(function () {
        $(YinGlobay.config.tags[0] + " " + YinGlobay.config.attribute[7]).remove();
    });

    //移除百度map显示文字
    setTimeout(function () {
        $(YinGlobay.config.attribute[2]).remove();
        $(YinGlobay.config.attribute[3]).remove();
    }, 1000);


    //图片删除动画
    YinGlobay.namespace("animate").ImgDelete = function (obj, pixel) {
        var config = YinGlobay.config;
        if (obj.find(config.attribute[4]).attr(config.attribute[5]) != config.url[0].storeIcoPath) {
            obj.find(config.attribute[6]).animate({ top: pixel }); //设置top属性值            
        }
    }

    //鼠标移入移出事件
    $(YinGlobay.config.event[1]).hover(function () {
        YinGlobay.animate.ImgDelete($(this), YinGlobay.config.str[0]);
    }, function () {

        YinGlobay.animate.ImgDelete($(this), YinGlobay.config.str[1]);
    });


    //全选、全不选、单选
    $(YinGlobay.NewConfig.checkbox).change(function () {
        var objThis = $(this);
        objThis.parents(".c-table-list").find("input[type=checkbox]").attr("checked", objThis.is(":checked"));
    });
    $('.c-table-list-i input[type=checkbox]').change(function () {
        var objThis = $(this),
        titcheck = objThis.parents(".c-table-list").find(".c-table-list-tit input[type=checkbox]");
        if (!objThis.is(":checked")) {
            if (titcheck) {
                titcheck.attr("checked", objThis.is(":checked"));
            }
        } else {
            var titcheckI = objThis.parents(".c-table-list").find(".c-table-list-i input[type=checkbox]"),
                titcheckILen = titcheckI.length;

            for (var i = 0, len = titcheckI.length; i < len; i++) {
                if ($(titcheckI[i]).is(":checked")) {
                    titcheckILen--;
                }
            }
            if (titcheckILen == 0) {
                titcheck.attr("checked", true);
            }

        }
    });
});

