var apc = {
    c: {

    },
    i: {
        dcl: "#ddlCustomerList", // 门店名称
        pid: "#printerId", // 打印机id
        pn: "#printerName", // 打印机名称
        pip: "#printerIp", // 打印机ip
        dpt: "#ddlPrinterType", // 打印机类型
        sp: "#savePrinter" // 确定按钮
    },
    regular: {
        IP: /^((2[0-4]\d|25[0-5]|[1-9]?\d|1\d{2})\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)$/
    },
    atction: {

    },
    fun: {
        getInputVal: function (attr) {
            return $(attr).val();
        },
        setInputVal: function (attr, value) {
            $(attr).val(value);
        },
        getSelectValue: function (attr) {
            return {

                // 获取select 选中的 text
                text: $(attr).find("option:selected").text(),

                // 获取select选中的 value
                value: $(attr).val(),

                // 获取select选中的索引
                index: $(attr).get(0).selectedIndex
            };
        },
        settingSelect: {
            index: function (attr, indexs) {
                //设置Select索引值为indexs的项选中
                $(attr).get(0).selectedIndex = indexs;
            },
            value: function (attr, value) {
                // 设置Select的Value值为value的项选中
                $(attr).val(value);
            }
        },
        regularExpression: function (reg, value) { // 正则验证
            return new RegExp(reg).exec(value);
        }
    },
    facility: {
    },
    DiaLog: {
        /*
            有确定按钮的 
            MSG：需要提示是的信息，
            indexIco ： 更具不同的数字值将出现不同的警告
                        1：成功图标 2：错误图标 3：问号图标 4：锁  
                        5：不高兴图标   6：微笑图片 7：感叹号
        */
        winDialog: function (msg, indexIco) {
            layer.alert(msg, {
                icon: indexIco,
                skin: 'layer-ext-moon'
            });
        },
        winSpec: function (tip, layers) {
            $("#" + tip).on({
                mouseenter: function () {
                    tips(tip, layers, 0, 1);
                },
                mouseout: function () {
                    tips(tip, layers, 1, 1);
                }
            });
            function tips(tipss, layerss, time, tips) {
                layer.tips($("#" + layerss).html(), '#' + tipss, {
                    time: time,
                    tips: tips
                });
            }
        }
    },
    enum: {
        ck: "click"
    },
    msgEnum: {
        error: "页面数据存在异常,请刷新页面后重试！",
        empty: function (name) {
            return "请输入打印机" + name;
        },
        pmax: function (name, max) {
            return "打印机" + name + "最大可输入" + max + "个字符";
        },
        pipok: "请输入正确的IP地址"
    }
};


// 确定按钮点击事件
$(apc.i.sp).on(apc.enum.ck, function () {
    var ei = apc.i;
    var e = apc.fun;
    var me = apc.msgEnum;

    var pn = e.getInputVal(ei.pn); // 打印机名称
    var pip = e.getInputVal(ei.pip); // 打印机ip    

    if (pn === "") {
        apc.DiaLog.winDialog(me.empty("名称"), 2);
        return false;
    }
    if (pn.length > 30) {
        apc.DiaLog.winDialog(me.pmax("名称", 30), 2);
        return false;
    }
    if (pip === "") {
        apc.DiaLog.winDialog(me.empty("IP"), 2);
        return false;
    }
    if (pip.length > 15) {
        apc.DiaLog.winDialog(me.pmax("IP", 30), 2);
        return false;
    }

    if (!e.regularExpression(apc.regular.IP, pip)) {
        apc.DiaLog.winDialog(me.pipok, 2);
        return false;
    }

    if (
        e.getSelectValue(ei.dcl).text === "" ||
        e.getSelectValue(ei.dcl).value === "" ||
        e.getSelectValue(ei.dpt).text === "" ||
        e.getSelectValue(ei.dpt).value === ""
        ) {
        apc.DiaLog.winDialog(me.error, 2);
        return false;
    }
    return true;
});
