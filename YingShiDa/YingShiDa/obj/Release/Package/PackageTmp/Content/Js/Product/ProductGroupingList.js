/// <summary>
/// 规格列表
/// 开发人：郑开金
/// 开发时间：2016-10-11 17：33
/// </summary>
$(function () {
    var CPGLIST = {
        C: {},
        I: {
            CA: "#classificationAdd",
            CAO: "#classificationAddOk",
            CAD: "#classificationAddDiv",
            CS: "#classificationSearch",
            TCL: "#tab_classificationList",
            BDSCV: 'button[data-setting="classification"]'
        },
        Fun: {
            specAddOk: function (obj) {
                var specVale = obj.prev("input[type='text']").val();
            }
        },
        DOM: {
            Template: {
                classificationDiv: function (colspan, array) {
                    var html = "<tr data-append='Detail'>";
                    html += "<td colspan='" + colspan + "'>";

                    html += '<div class="panel white-bg">';
                    html += ' <div class="panel-body">';
                    html += '<div class="form-group">';
                    html += '<div class="col-md-4">';
                    html += '<label for="name" class="control-label col-md-3">类别名称：</label>';
                    html += '<div class="col-md-9">';
                    html += '<input name="txtPName" type="text" maxlength="20" id="txtPName" class="form-control">';
                    html += '</div>';
                    html += '<span class="red-xing">*</span>';
                    html += '<i class="fa fa-question-circle content-one"></i>';
                    html += '</div>';

                    html += '<div class="col-md-4">';
                    html += '<label for="name" class="control-label col-md-3">所属类别：</label>';
                    html += '<div class="col-md-9">';
                    html += '<select name="firstCatagory" class="form-control valid"></select>';
                    html += '</div>';
                    html += '<span class="red-xing">*</span>';
                    html += '<i class="fa fa-question-circle content-one"></i>';
                    html += '</div>';
                    html += '<div class="col-md-4">';
                    html += '<button class="stati-check br4 stati-tool-item" id="">确定';
                    html += '</button>';
                    html += '</div>';
                    html += '</div>';
                    html += '</div>';
                    html += '</div>';
                    html += "</td>";
                    html += "<tr>";
                    return html;

                }
            }
        }
    };

    // 显示隐藏添加规格按钮事件
    $(CPGLIST.I.CA + "," + CPGLIST.I.CAO + "," + CPGLIST.I.CS).on("click", function () {
        var obj = $(this);
        switch (obj.attr("id")) {
            case "classificationAdd":// 显示隐藏DIV

                layer.open({
                    type: 1,
                    title: "添加分类",
                    skin: 'layui-layer-molv',
                    //skin: 'layui-layer-rim', //加上边框
                    shadeClose: true,
                    //shade: 0.3,
                    offset: '5%',
                    area: ['350px', '225px'], //宽高
                    btns: 2,
                    content: $(CPGLIST.I.CAD).html(),
                    btn: ['确定', '取消'],
                    yes: function (index, layero) {
                        var layerDom = $("#layui-layer" + index);
                        var layerValue = layerDom.find('#txt_TypeName').val();
                        var layerddl = layerDom.find('#ddlGroupingType').val();
                        var layerTip = layerDom.find(".popup-tip");
                        if (typeof layerValue === "undefined" || layerValue === "" || layerValue.length <= 0 || layerValue.length > 4) {
                            layerTip.show();
                            return;
                        }
                        layerDom.parent("body").find("form").find("#txt_TypeName").val(layerValue);
                        layerDom.parent("body").find("form").find("#ddlGroupingType").val(layerddl);
                        layerDom.parent("body").find("form").find("#btnSave").click();
                    },
                    cancel: function (index) {

                    }
                });
                break;
            case "classificationAddOk": // 添加规格按钮确定事件

                CPGLIST.Fun.specAddOk(obj);

                break;
            case "classificationSearch":

                alert("查询");

                break;

            default:

                break;
        }
        return false;
    });

    $(CPGLIST.I.BDSCV).on({
        click: function () {
            var obj = $(this).parents("tr").next("tr").data("append");
            if (obj == "Detail") {
                $(this).parents("tr").next("tr").remove();
            } else {
                $(this).parents("tr").after(CPGLIST.DOM.Template.classificationDiv(5, 3));
            }
            return false;
        }
    });

    // 触发回台时间
    $("#btnSave_Click").click(function () {
        return true;
    });

    $('input[data-event="ck"]').click(function () {
        return true;
    });

    $("img.ckicos").on("click", function () {
        var objid = $(this).attr("data-id");
        try {
            var array = $(this).nextAll('input[type="image"]:eq(0)').attr("id").split("_");
            if (array.length == 3) {
                $("#" + array[0] + "_" + objid + "_" + array[2]).click();
            }
        } catch (e) {

        }
    });

    // 编辑事件
    $('a[data-event="udtn"]').on("click", function () {
        var obj = $(this);
        obj.hide();
        obj.next("a:eq(0)").show();
        obj.parents("tr").find("td:eq(1)").find("input").removeAttr("disabled");
    });

    var clinteId = sessionStorage.getItem("ClinteGroupingTypeID");
    if (typeof clinteId != "undefined" && clinteId != null && clinteId != "0" && clinteId.length > 1) {
        var obj = $('#' + clinteId);
        obj.prev("input:eq(0)").removeAttr("disabled");
        var aobj = obj.parents("tr").find("td:eq(1)");
        aobj.find("a:eq(0)").hide();
        aobj.find("a:eq(1)").show();
    }
});