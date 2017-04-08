$(function () {
    var Group = {};
    Group.domAttr = {};
    Group.event = {};
    Group.event.addnew = {};
    Group.event.addnew.onck = function (attr, tf, callback) {
        $(attr).on({
            click: function (e) {
                callback($(this), e);
                return tf;
            }
        })
    };
    Group.domAttr.id = {
        BSP: "#BtnSelectProduct",
        AST: "#AStartTime",
        AET: "#AEndTime",
        AAB: "#ActivityAdd_Btn",
        TPA: "#table_productAll",
        CSC: "#clinetSoloCredit",
        SSC: "#serverSoloCredit",
        WI: "#window_integral"
    };
    Group.domAttr.class = {};
    Group.dialog = {};
    Group.dialog.alert = function (msg) {
        layer.alert(msg);
    }

    var onck = Group.event.addnew.onck,
        attr = Group.domAttr,
        winDialog = Group.dialog;
    /*
     * 添加活动页面JS
     * 选择商品
     * 2016-11-18
     */

    $(attr.id.AST + ',' + attr.id.AET).datetimepicker({
        format: 'yyyy-mm-dd hh:ii',
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        forceParse: 0,
        language: 'zh-CN'
    }); // 初始化时间控件

    if ($(attr.id.BSP).length > 0) {
        onck(attr.id.BSP, false, function (e) {
            var code = $("#hfCode").val().trim();
            layer.open({
                type: 2,
                title: "选择商品",
                skin: 'layui-layer-molv',
                //shadeClose: true,
                shade: 0.3,
                offset: '3%',
                area: ['900px', '750px'], //宽高
                btns: 2,
                content: ["/Activity/NotParticipateActivity.aspx?code=" + code, "no"],
                btn: ['确定', '取消'],
                yes: function (index, layero) {
                    layer.getChildFrame('body', index).find("#BistributionAdd_Btn").click();
                },
                cancel: function (index) {

                }
            });
        });

        // 活动编辑事件按钮
        onck(attr.id.TPA + " tbody a[data-attr='clinetUpdate']", false, function (e) {
            e.addClass("hidden").next("a:eq(0)").removeClass("hidden").parents("tr").find("input[type='text']").removeAttr("disabled");
        });

        $(attr.id.TPA + " tbody a[data-attr='clinetOk']").on({
            click: function () {
                var e = $(this);
                var input = e.parent("td").prev("td:eq(0)").find("input[type='text']").val().trim();
                if (isNaN(Number(input))) {
                    layer.msg("积分只能是数字");
                    return false;
                }

                if (str <= 0) {
                    layer.msg("兑换积分不能小于等于0");
                    return false;
                }

                return true;

                function isNumber(price) {
                    //var re = /^\d+(?=\.{0,1}\d+$|$)/;
                    var re = /^\d+(?=\d+$|$)/;
                    if (!re.test(price)) {
                        return false;
                    }
                    return true;
                }
            }
        });
        //设置积分
        $(attr.id.CSC).on({
            click: function () {
                layer.open({
                    type: 1,
                    title: "积分设置弹出窗",
                    skin: 'layui-layer-rim', //加上边框
                    area: ['420px', '240px'], //宽高
                    closeBtn: 2,
                    btn: ['确定', '取消'],
                    content: $(attr.id.WI).html(),
                    yes: function (index) {
                        var str = $("#layui-layer" + index).find("#integral").val();
                        if (str == "") {
                            layer.msg("请输入积分");
                            return false;
                        }
                        if (isNaN(Number(str))) {
                            layer.msg("积分只能是数字");
                            return false;
                        }
                        if (str <= 0) {
                            layer.msg("兑换积分不能小于等于0");
                            return false;
                        }
                        var tbodyTr = $(attr.id.TPA + " tbody ").find("tr");
                        for (var i = 0, ilen = tbodyTr.length; i < ilen; i++) {
                            var trLen = $(tbodyTr[i]).find("td").length;
                            $(tbodyTr[i]).find("td:eq(" + (trLen - 2) + ")").find("input").val(str);
                        }
                        layer.close(index);
                        $(attr.id.SSC).click();
                        
                    }
                });
            }
        });

    }

    // 绑定客户端事件
    $(attr.id.SSC).click(function () { });

    // 活动保存按钮事件
    $(attr.id.AAB).on({
        click: function () {
            var e = $(this);
            if (e.attr("data-status") != "Add") {
                return false;
            }
            var str = $("#AName").val().trim();
            if (str === "" || str.length <= 0) {
                winDialog.alert("请输入活动名称");
                return false;
            }
            if (str.length > 50) {
                winDialog.alert("活动名称最多只能输入50个字符");
                return false;
            }

            var strStartTime = $("#AStartTime").val().trim();
            if (strStartTime === "" || strStartTime.length <= 0) {
                winDialog.alert("请输入活动开始时间");
                return false;
            }

            var strEndTime = $("#AEndTime").val().trim();
            if (strEndTime === "" || strEndTime.length <= 0) {

                winDialog.alert("请输入活动结束时间");
                return false;
            }

            var strAdes = $("#ADes").val().trim();
            if (strAdes != "" && strAdes.length > 300) {
                winDialog.alert("备注信息最多只能输入300个字符");
                return false;
            }

            strStartTime = new Date(strStartTime);
            strStartTime = strStartTime.getTime();
            strEndTime = new Date(strEndTime);
            strEndTime = strEndTime.getTime();

            if (strStartTime >= strEndTime) {
                winDialog.alert("活动开始时间不能大于或等于活动结束时间");
                return false;
            }

            // 状态，防止重复提交
            e.removeAttr("data-status").attr("data-status", "HaveInHand");
            return true;
        }
    }).removeAttr("data-status").attr("data-status", "Add");


});
