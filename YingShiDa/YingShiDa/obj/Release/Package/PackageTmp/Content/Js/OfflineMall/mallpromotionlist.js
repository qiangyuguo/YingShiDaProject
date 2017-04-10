/// <summary>
/// 添加优惠活动页面JS
/// 开发人：郑开金
/// 开发时间：2016-09-30 10:27
/// </summary>
$(function () {

    /// <summary>
    /// 配置文件oplc命名规则
    /// o : offline
    /// p : promotion
    /// l : list
    /// c : config
    /// </summary>
    var oplc = {
        c: { // c 表示 class

        },
        i: { // i 表示 id
            bp: "#btn_preview",
            idjca: "#ddlJoinCustomerAll",
            ihd: "#hidbid",
        },
        d: {
            ade: 'a[data-event="udtn"]',
            adea: 'a[data-event="add"]',
            adee: 'a[data-event="eixt"]',
            ider: 'input[ data-event="repunm"]',
            ied: 'input[eliminate="data"]'
        },
        act: { // atc 表示 server url and Action
            pmt: "../Action/HBAPServerAll.ashx"
        },
        rep: {
            num: /(^[1-9]([0-9]*)$|^[0-9]$)/, //只能输入数字，对于多位数字第一位不能为0, 单个数字可以为0
            isnum: /[^\d]/g
        },
        fun: {
            eventNameformat: function (all) {
                var strfra = "";
                for (var i = 0; i < all.length; i++) {
                    if (all[i].length <= 0) {
                        continue;
                    }
                    if (strfra == "") {
                        strfra = all[i];
                        continue;
                    } else {
                        strfra += "," + all[i];
                    }
                }
                return strfra;
            }
        }
    };
    // 页面初始化时清空页面所以文本框
    $(oplc.d.ied).val("");

    // 公共 跑马条 预览 JS
    $(oplc.i.bp).on("click", function () {
        try {
            var c = $(oplc.i.idjca + ' option:selected').val();
            var b = $(oplc.i.ihd).val();
            $.ajax({
                url: oplc.act.pmt + "?a=shoppingmall&b=" + b + "&c=" + c,
                type: "post",
                async: true,
                success: function (data) {
                    var datajson = eval('(' + data + ')');

                    if (typeof datajson === "object" && datajson.Isok && datajson.State == "200") {
                        var pmt = "", shgg = "";
                        if (typeof datajson.data.pmt != "undefined" && datajson.data.pmt.length > 0) {
                            pmt = datajson.data.pmt;
                        }

                        if (typeof datajson.data.shgg != "undefined" && datajson.data.shgg.length > 0) {
                            shgg = datajson.data.shgg;
                        }
                        loadHtml.window.childTop_cplb_top_main('', shgg, pmt);
                    }
                    else {
                        // 此处应该处理错误
                        alert(datajson)
                    }
                },
                statusCode: {
                    404: function (ex) {
                        alert("请求失败！");
                    }
                }
            });
        } catch (e) {

        }
    });

    // 添加满减活动、取消 事件
    $(oplc.fun.eventNameformat([oplc.d.adea, oplc.d.adee])).on('click', function () {
        switch ($(this).attr("data-event")) {
            case "add":
                $(this).parents('tr').addClass("hidden").prev('tr:eq(0)').removeClass('hidden');
                break;
            case "eixt":
                var e = $(this).parents('tr');
                e.find('input[type="text"]').val("");
                e.addClass('hidden').next('tr:eq(0)').removeClass('hidden');
                break;
            default:
                break;
        }
    });

    // 添加满减活动编辑事件
    $(oplc.d.ade).on("click", function () {
        var e = $(this);
        e.addClass("hidden").next('a:eq(0)').removeClass("hidden");
        e.parents('tr').find('input[type="text"]').removeAttr("disabled");
    });

    // 正则价格验证
    $(oplc.d.ider).on({
        input: function () {
            var e = $(this);
            var str = e.val();
            e.val(str.replace(oplc.rep.isnum, ''));
        }
    });
});