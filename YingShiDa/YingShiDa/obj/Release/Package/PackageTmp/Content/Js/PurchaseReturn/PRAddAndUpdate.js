/// <summary>
/// 添加或修改退款JS
/// 开发人：郑开金
/// 开发时间：2017-01-03 19:10

$(function () {

    var iprc = {
        c: { // c 表示 class
            as: ".allselect",
            tdc: ".tdcheck"
        },
        i: { // i 表示 id
            txtcgd: "#txtCGD", // input采购单
            btncgd: "#btnCGD", // btn采购单
            thrq: "#txtTHRQ", // 退货日期
            txtthr: "#txtTHR",   // 退货人
            txtbz: "#txtBZ", // 备注
            hfinput: "#hfCGDCODE",// code
            hfid: "#hfCGDID", // id
            btnxxdh: "#btnsubmit", //确定按钮
            btnexit: "#btn-exit", //取消按钮
            btnsearch: "#searchProduct", // 搜索按钮
            tbNl: "#tbNoneList" // table
        },
        d: { // data 属性
            dea: '[data-event="all"]',     // 全选
            den: '[data-event="noall"]',   // 全不选
            der: '[data-event="reverse"]', // 反选
            ded: '[data-event="detselection"]', // 删除已选中项
            det: '[data-event="trdel"]' // 单个删除
        },
        act: { // atc 表示 server url and Action     
            cgdlist: "/BuyManagement/SelectOrderList.aspx?rid=" + Math.round(Math.random() + Date.now()),// 采购单Url
            exit: "/BuyManagement/PurchaseReturnList.aspx?rid=" + Math.round(Math.random() + Date.now())
        },
        rep: {
            num: /(^[1-9]([0-9]*)$|^[0-9]$)/, //只能输入数字，对于多位数字第一位不能为0, 单个数字可以为0
            isnum: /[^\d]/g
        },
        fun: {
            getValue: function (id) {
                return $(id).val().trim();
            },
            layer: function (msg, typeindex) {
                layer.alert(msg, { icon: typeindex });
            }
        }
    };

    // 日期控件
    $(iprc.i.thrq).datetimepicker({
        minView: 'month',
        format: 'yyyy-mm-dd',
        weekStart: 1,
        todayBtn: 1,
        autoclose: true,
        todayHighlight: true,
        startView: 2,
        forceParse: 0,
        showMeridian: 1,
        language: 'zh-CN',
        endDate: new Date()
    });

    // 取消按钮
    $(iprc.i.btnexit).on('click', function () {
        window.location.href = iprc.act.exit;
        return false;
    });

    // 搜索按钮
    $(iprc.i.btnsearch).on('click', function () {
        if (iprc.fun.getValue(iprc.i.hfid) === "") {
            return false;
        }
        return true;
    });

    // 采购单按钮
    $(iprc.i.btncgd).on("click", function () {
        layer.open({
            type: 2,
            title: "选择采购单",
            skin: 'layui-layer-lan', //样式类名
            shadeClose: true,
            shade: 0.3,
            offset: '3%',
            area: ['960px', '700px'],
            btns: 2,
            content: [iprc.act.cgdlist, "no"],
            btn: ['保存', '取消'],
            yes: function (index, layero) {
                var body = layer.getChildFrame('body', index);
                var sonID = body.find('#hfOrderId').val();
                var sonCode = body.find('#hfOrderCode').val();
                $("#hfCGDCODE").val(sonCode);
                $("#hfCGDID").val(sonID);
                $("#txtCGD").val(sonCode);
                $(iprc.i.btnsearch).click();
            },
            cancel: function (index) {

            }
        });
    });

    // 全选
    $(iprc.c.as).on("click", function () {
        var e = $(this).is(':checked');
        if (e) {
            // 全选
            $(iprc.c.tdc).attr("checked", true);
        } else {
            // 全不选
            $(iprc.c.tdc).attr("checked", false);
        }
    });

    // 全选
    $(iprc.d.dea).on("click", function () {
        $(iprc.c.as).attr("checked", true);
        $(iprc.c.tdc).attr("checked", true);

    });

    // 全不选
    $(iprc.d.den).on("click", function () {
        $(iprc.c.as).attr("checked", false);
        $(iprc.c.tdc).attr("checked", false);
    });

    // 反选
    $(iprc.d.der).on("click", function () {
        $(iprc.c.tdc + ":checkbox").each(function () {
            $(this).attr("checked", !$(this).attr("checked"))
        });
        inspectAllCheck();
    });

    // 单选
    $(iprc.c.tdc).on("click", function () {
        inspectAllCheck();
    });

    // 删除已选中项
    $(iprc.d.ded).on("click", function () {
        $(iprc.c.tdc + ":checkbox").each(function () {
            if ($(this).is(":checked")) {
                $(this).parents("tr").addClass("hidden");
                ClearHtmlData($(this));
            }
        });
        inspectAllCheck();
    });

    // 单项删除
    $(iprc.d.det).on("click", function () {
        $(this).parents("tr").addClass("hidden");
        ClearHtmlData($(this));
        inspectAllCheck();
    });

    // checkbox 选择函数
    function inspectAllCheck() {
        var len = $(iprc.c.tdc).length;
        var sumLen = 0;
        $(iprc.c.tdc + ":checkbox").each(function () {
            if ($(this).is(":checked")) {
                sumLen++;
            }
        });
        if (len <= 0) {
            $(iprc.c.as).attr("checked", false);
            $(iprc.i.txtcgd + "," + iprc.i.hfid + "," + iprc.i.hfinput).val("");
            $(iprc.i.tbNl).remove();
            return;
        }
        if (sumLen == len) {
            $(iprc.c.as).attr("checked", true);
        } else {
            $(iprc.c.as).attr("checked", false);
        }
    }

    // 清空HTML数据
    function ClearHtmlData(e) {
        var obj = e.parents("tr").find("td:eq(1)").find("input[id*=hfDel]").val("-1");
        
    }

    // 确定按钮
    $(iprc.i.btnxxdh).on("click", function () {
        var code = iprc.fun.getValue(iprc.i.txtcgd);
        var code2 = iprc.fun.getValue(iprc.i.hfinput);
        //var id = iprc.fun.getValue(iprc.i.hfid);
        var thrq = iprc.fun.getValue(iprc.i.thrq);
        var thr = iprc.fun.getValue(iprc.i.txtthr);
        if (code === "" || code2 === "") {
            iprc.fun.layer("请选择采购单", 2);
            return false;
        }
        if (code != code2) {
            iprc.fun.layer("请重新选择采购单", 2);
            return false;
        }
        if (thrq === "") {
            iprc.fun.layer("请选择退货日期", 2);
            return false;
        }
        if (thr === "") {
            iprc.fun.layer("缺少关键参数,请刷新页面后重试", 2);
            return false;
        }
        return true;
    });

});