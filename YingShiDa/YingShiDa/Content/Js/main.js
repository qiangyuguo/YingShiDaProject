/*
 * Scope: 本JS仅适用于高级会员平台
 * Developer: 郑开金
 * Time: 2016-11-10
 */
$(function () {
    "use strict"
    var mainConfig = {
        cs: {
            navul: 'ul.nav > li > a'
        }
    }
    $(mainConfig.cs.navul).on("click", function () {
        var enums = {
            one: "one",
            two: "two"
        }
        var e = $(this),
            eurl = e.attr("data-url"),
            ename = e.attr("data-name"),
            neul = e.next("ul"),
            psli = e.parent().attr("data-level"),
            psul = e.parents();


        if (psli === enums.one) {
            $(e.parent()).siblings("li").each(function () {
                if ($(this).attr("class") === "active") {
                    $(this).removeClass("active");
                    $(this).find("a").removeClass('Aactive');
                    $(this).find("ul").removeClass('in').find("li").each(function () {
                        $(this).removeClass("Aactive").find("div.sonaico").removeClass("sonaicoActive");
                    });
                }
            });

            $(e.parent()).addClass("active");
            e.addClass("Aactive");

            if (neul.length > 0) {
                neul.addClass("in");
            }

        } else if (psli === enums.two) {
            $(e.parent()).siblings("li").each(function () {
                $(this).find("a").removeClass("Aactive").find("div.sonaico").removeClass("sonaicoActive");
            });
            e.addClass("Aactive").find("div.sonaico").addClass("sonaicoActive");
        }

        if (typeof eurl != "undefined" && eurl != "" && eurl.length > 0) {
            $.PE_FrameTab.AddNew(eurl, ename);
            return;
        }

        // 设置菜单高度
        SetUp();
    });

    /*
     * add fun menu scroll bar beging
     * Devloper : 郑开金
     */
    $(window).resize(function () {
        SetUp();
    });

    function SetUp() {
        //获取主页面可视化高度
        var cHeight = document.body.clientHeight;

        //获取头部导航高度
        var tHeight = document.getElementById("topNavigation").clientHeight;

        // 获取菜单导航高度
        var mHeight = document.getElementById("menuNavigation");

        $(mHeight).css({
            "overflow": "auto",
            "height": cHeight - tHeight + "px"
        });
    }

    SetUp();

    /* add fun menu end */

    /* iframe 自适应 */
    var browserVersion = window.navigator.userAgent.toUpperCase();
    var isOpera = browserVersion.indexOf("OPERA") > -1 ? true : false;
    var isFireFox = browserVersion.indexOf("FIREFOX") > -1 ? true : false;
    var isChrome = browserVersion.indexOf("CHROME") > -1 ? true : false;
    var isSafari = browserVersion.indexOf("SAFARI") > -1 ? true : false;
    var isIE = (!!window.ActiveXObject || "ActiveXObject" in window);
    var isIE9More = (! -[1, ] == false);
    function reinitIframe(iframeId, minHeight) {
        try {
            var iframe = document.getElementById(iframeId);
            var bHeight = 0;
            if (isChrome == false && isSafari == false)
                bHeight = iframe.contentWindow.document.body.scrollHeight;

            var dHeight = 0;
            if (isFireFox == true)
                dHeight = iframe.contentWindow.document.documentElement.offsetHeight + 2;
            else if (isIE == false && isOpera == false)
                dHeight = iframe.contentWindow.document.documentElement.scrollHeight;
            else if (isIE == true && isIE9More) {//ie9+
                var heightDeviation = bHeight - eval("window.IE9MoreRealHeight" + iframeId);
                if (heightDeviation == 0) {
                    bHeight += 3;
                } else if (heightDeviation != 3) {
                    eval("window.IE9MoreRealHeight" + iframeId + "=" + bHeight);
                    bHeight += 3;
                }
            }
            else//ie[6-8]、OPERA
                bHeight += 3;
            var height = Math.max(bHeight, dHeight);
            if (height < minHeight) height = minHeight;
            iframe.style.height = height + "px";
        } catch (ex) { }
    }
    function startInit(iframeId, minHeight) {
        eval("window.IE9MoreRealHeight" + iframeId + "=0");
        window.setInterval(function () {
            reinitIframe(iframeId, minHeight);
        }, 100);
    }
    startInit('main_right', 800);
    /*iframe 自适应*/

});