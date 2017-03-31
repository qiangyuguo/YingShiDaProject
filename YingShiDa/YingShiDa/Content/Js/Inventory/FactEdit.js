/// <summary>
/// 收款JS
/// 开发人：郑开金
/// 开发时间：2016-12-14 17:44
/// </summary>
$(function () {

    /// <summary>
    /// 配置文件wcpfec命名规则
    /// w : WarehouseManagement
    /// c : Capital
    /// p : Pay
    /// f : Fact
    /// e : Edit
    /// c : config
    /// </summary>
    var wcpfec = {
        c: { // c 表示 class

        },
        i: { // i 表示 id
            xsdh: "#xxdh", // 销售单号
            skje: "#skje", // 收款金额
            skrq: "#skrq", // 收款时间
            skr: "#skr", // 收款人
            jsfs: "#dropJsfs",
            sub: "#btnsubmit",   // 确定按钮
            exit: "#btn-exit",
            btnxxdh: "#btnxxdh"
        },
        d: { // data 属性

        },
        act: { // atc 表示 server url and Action
            xsdd: "/WarehouseManagement/Capital/SalesOrderList.aspx",
            exit: "/Setting/JXCPFXSSetting.aspx?act=SKD&rid=" + Math.round(Math.random() + Date.now())
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
            },
            getValue: function (id) {
                return $(id).val().trim();
            },
            layer: function (msg, typeindex) {
                layer.alert(msg, { icon: typeindex });
            }
        }
    };

    // 日期控件
    $(wcpfec.i.skrq).datetimepicker({
        minView: 'month',
        format: 'yyyy-mm-dd',
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        forceParse: 0,
        showMeridian: 2,
        language: 'zh-CN'
    });

    // 弹出层
    $(wcpfec.i.btnxxdh).on("click", function () {
        layer.open({
            type: 2,
            title: "选择销售单号",
            skin: 'layui-layer-lan', //样式类名
            shadeClose: true,
            shade: 0.3,
            offset: '3%',
            area: ['850px', '820px'],
            btns: 2,
            content: [wcpfec.act.xsdd, "no"],
            btn: ['保存', '取消']
                    , yes: function (index, layero) {
                        var body = layer.getChildFrame('body', index);
                        $("#xxdh").val(body.find('#WinSalesOrderListTable tbody .trSelectBack').find("td:eq(0)").find('input[type="hidden"]').val());
                        layer.closeAll();
                    }, cancel: function (index) {

                    }
        });
    });

    // 确定按钮
    $(wcpfec.i.sub).on("click", function () {

        if (wcpfec.fun.getValue(wcpfec.i.xsdh) === "") {
            wcpfec.fun.layer("请选择销售单", 2);
            return false;
        }

        if (wcpfec.fun.getValue(wcpfec.i.skje) === "") {
            wcpfec.fun.layer("请输入金额", 2);
            return false;
        }

        if (wcpfec.fun.getValue(wcpfec.i.skrq) === "") {
            wcpfec.fun.layer("请选择日期", 2);
            return false;
        }
        if (wcpfec.fun.getValue(wcpfec.i.skr) === "") {
            wcpfec.fun.layer("页面数据错误，无法获取收款人信息，请刷新页面后重试！", 2);
            return false;
        }
        var selectValue = $(wcpfec.i.jsfs + " option:selected").val().trim();
        if (selectValue === "") {
            wcpfec.fun.layer("页面数据错误，无法获取结算方式信息，请刷新页面后重试！", 2);
            return false;
        }
        return true;
    });

    // 取消按钮
    $(wcpfec.i.exit).on("click", function () {
        window.location.href = wcpfec.act.exit;
        return false;
    });
});