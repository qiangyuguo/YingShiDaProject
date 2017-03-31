var clc = {
    c: {
        pt: ".popup-tip"
    },
    i: {
        bcyd: "#btn_companyadd", // 新建按钮
        dwa: "#wincompanyadd", // 弹出矿口
        tcn: "#txt_CompanyName", // input 弹出框
        ll: "#layui-layer", //layer
        bs: "#btnSave",
        tcl: "#tab_companylist", // 表格        
    },
    d: {
        ade: 'a[data-event="udtn"]'
    },
    enum: {
        ck: "click"
    },
    fun: {
        winLayer: function () {
            layer.open({
                type: 1,
                title: "添加单位",
                skin: 'layui-layer-molv',
                shadeClose: true,
                offset: '20%',
                area: ['350px', '180px'], //宽高
                btns: 2,
                content: $(clc.i.dwa).html(),
                btn: ['确定', '取消'],
                yes: function (index, layero) {
                    var layerDom = $(clc.i.ll + index);
                    var layerValue = layerDom.find(clc.i.tcn).val();
                    if (typeof layerValue === "undefined" || layerValue === "" || layerValue.length <= 0 || layerValue.length > 30) {
                        layerDom.find(clc.c.pt).show();
                        return;
                    }
                    layerDom.parent("body").find("form").find(clc.i.tcn).val(layerValue);

                    layerDom.parent("body").find("form").find(clc.i.bs).click();
                },
                cancel: function (index) {

                }
            });
        }
    }
};

$(function () {
    $(clc.i.bs).on(clc.enum.ck, function () {
        return true;
    });

    $(clc.i.bcyd).on(clc.enum.ck, function () {
        clc.fun.winLayer();
        return false;
    });

    $(clc.d.ade).on(clc.enum.ck, function () {
        var obj = $(this);
        obj.hide();
        obj.next("a:eq(0)").show();
        obj.parents("tr").find("td:eq(1)").find("input").removeAttr("disabled");
    });
});


