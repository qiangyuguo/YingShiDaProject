var bsc = {
    c: {
        nvali: ".nav >li",
        nvalia: ".nav >li.active"

    },
    i: {
        sp: "#iframePage"
    },
    enum: {
        hu: "hurl",
        ck: "click",
        av: "active",
        cs: "class",
        act: "act"
    },
    fun: {
        scIframe: function (url) {
            if (url == null || url === '') {
                return;
            }
            var random = Math.ceil(Math.random() * 1000000000000);

            $(bsc.i.sp).attr("src", url + "?r=" + random);
        },
        getdataname: function (ic, name) {
            return $(ic).data(name);
        },
        getAttr: function (ic, attrName) {
            return $(ic).attr(attrName);
        },
        removeAttr: function (ic, attrName) {
            $(ic).removeAttr(attrName);
        },
        getQueryString(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]); return null;
        },
        loadHtml: function (obj,init) {
            var e = $(obj);
            if (e.hasClass(bsc.enum.av)) {
                if (!init) {
                    return;
                }                
            }
            bsc.fun.removeAttr(bsc.c.nvali, bsc.enum.cs);
            $(e).attr(bsc.enum.cs, bsc.enum.av);
            var htmlurl = bsc.fun.getdataname(bsc.c.nvalia, bsc.enum.hu);
            bsc.fun.scIframe(htmlurl);
        }
    }
};

$(function () {

    // 初始化加载页面
    var act = bsc.fun.getQueryString(bsc.enum.act);
    if (act == null) {
        // 默认加载第一个
        bsc.fun.scIframe(bsc.fun.getdataname(bsc.c.nvalia, bsc.enum.hu));
    } else {
        bsc.fun.loadHtml($('li[data-act="' + act + '"]'),true);
    }

    // li 事件
    $(bsc.c.nvali).on(bsc.enum.ck, function () {
        bsc.fun.loadHtml($(this),false);
    });
});