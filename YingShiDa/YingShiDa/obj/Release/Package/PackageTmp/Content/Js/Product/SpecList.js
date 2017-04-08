/// <summary>
/// 规格列表
/// 开发人：郑开金
/// 开发时间：2016-10-11 14：37
/// </summary>
var PublicSpecID = "";
$(function () {
    var CSPECLIST = {
        C: {},
        I: {
            SA: "#specAdd",
            ASO: "#btnAddSpec",
            ASD: "#specAddDiv",
            SS: "#specSearch",
            TSL: "#tab_SpecList",
            BDSSV: 'button[data-setting="specValue"]',
            wAs: "#winAddSpec",
        },
        Fun: {
            specAddOk: function (obj) {
                var specVale = obj.prev("input[type='text']").val();
            }
        },
        DOM: {
            Template: {
                SpecValueDiv: function (colspan, dataJson) {

                    var html = "<tr data-append='Detail'>";
                    html += "<td colspan='" + colspan + "'>";
                    html += '<table class=" table table-bordered table-hover " id="tab_specValueList">';
                    html += "<thead>";
                    html += '<tr>';
                    //html += '<th>规格值编号</th>';
                    html += '<th>规格值</th>';
                    html += '<th style="width: 220px">操作</th>';
                    html += '</tr>';
                    html += "</thead>"
                    html += '<tbody>';
                    html += newTR(dataJson);
                    html += '</tbody>';
                    html += " </table>";
                    html += '<div class="stati-tool clearfix" id="specValueAddDiv">';
                    html += '<input id="productSpecValue" type="text" placeholder="规格值名称" class="stati-maker stati-tool-item br4 right"/>';
                    html += '<button class="stati-check br4 stati-tool-item" type="button" id="specValueAddOk" style="width: 90px;" onclick="return AddSpecValue()">添加规格值';
                    html += '</button>';
                    html += '</div>';
                    return html;
                    function newTR(trdataJson) {
                        var newtr = '';
                        if (trdataJson != null) {
                            for (var i = 0; i < trdataJson.length; i++) {
                                newtr += '<tr>';
                                //newtr += '<td>' + trdataJson[i].SpecValueID + '</td>';
                                newtr += '<td><input id="tdSpecValue" type="text" placeholder="规格值名称" value="' + trdataJson[i].Value + '" ToolTip="' + trdataJson[i].Value + '" class="stati-maker stati-tool-item br4 right mg0 h24" disabled="disabled" ></td>';
                                newtr += '<td>';
                                newtr += '<a onclick="return SpecUpdate(this)" class="color-light-blue" href="javascript:void(0)">编辑</a>';
                                newtr += '<a onclick="return SpecEdit(this)" SpecValueID="' + trdataJson[i].SpecValueID + '" class="color-light-blue hidden" href="javascript:void(0)" >完成</a>';
                                newtr += '&nbsp;<a onclick="return SpecDel(this)" SpecValueID="' + trdataJson[i].SpecValueID + '" class="color-light-blue" href="javascript:void(0)">删除</a>';
                                newtr += '</td>';
                                newtr += '</tr>';
                            }
                        }
                        return newtr;
                    }
                    html += "</td>";
                    html += "<tr>";

                }
            }
        }
    };

    $(CSPECLIST.I.BDSSV).on({
        click: function () {
            var obj = $(this).parents("tr").next("tr").data("append");
            if (obj == "Detail") {
                $(this).parents("tr").next("tr").remove();
            } else {
                $(this).parents("tr").after(CSPECLIST.DOM.Template.SpecValueDiv(5, 3));
            }
            return false;
        }
    });

    $(CSPECLIST.I.TSL + " tbody [data-option='event']").on({
        click: function () {

            var thisobj = $(this);
            var thisTbody = thisobj.parents("tbody");
            thisTbody.find('tr[data-append="Detail"]').remove();
            var thisisfh = thisobj.text();
            thisTbody.find("tr").find("td:eq(0)").text("+");
            PublicSpecID = thisobj.attr("data-pi");
            if (PublicSpecID == null || PublicSpecID === '' || PublicSpecID.length <= 0) {
                return;
            }

            if (thisisfh.length > 0 && thisisfh === "+") {
                thisobj.text("-");
                $.post('/Action/SpecList.ashx', { action: "GetProductSpecValue", SpecID: PublicSpecID },
                function (data) {
                    if (data != "" && data != "[]") {
                        $(thisobj).text("-");
                        var dataJson = eval(data);
                        $(thisobj).parent("tr").after(CSPECLIST.DOM.Template.SpecValueDiv(4, dataJson));
                        thisobj = null;
                    } else {
                        $(thisobj).parent("tr").after(CSPECLIST.DOM.Template.SpecValueDiv(4, null));
                        thisobj = null;
                    }
                });
            }
        }
    });

    // 触发后台事件
    $(CSPECLIST.I.ASO).on("click", function () { return true; });

    // 新建按钮
    $(CSPECLIST.I.SA).on("click", function () {
        layer.open({
            type: 1,
            title: "添加规格",
            skin: 'layui-layer-molv',
            shadeClose: true,
            offset: '5%',
            area: ['350px', '200px'],
            btns: 2,
            content: $(CSPECLIST.I.wAs).html(),
            btn: ['确定', '取消'],
            yes: function (index, layero) {
                var layerDom = $("#layui-layer" + index);
                var layerValue = layerDom.find('#txt_SpecName').val().trim();
                var layerTip = layerDom.find(".popup-tip");
                if (typeof layerValue === "undefined" || layerValue === "" || layerValue.length <= 0 || layerValue.length > 2) {
                    layerTip.show();
                    return;
                }
                layerDom.parent("body").find("form").find("#txtSpec").val(layerValue);
                layerDom.parent("body").find("form").find("#btnAddSpec").click();
            },
            cancel: function (index) {

            }
        });
        return false;
    });


});

function SpecDel(obj) {
    var trParent = $(obj).parent().parent();
    $.post('/Action/SpecList.ashx', { action: "SpecDel", SpecValueID: $(obj).attr("SpecValueID") },
        function (data) {
            if (data != "" && data != "[]") {
                if (data == "-1") {
                    alert("不能删除改规格值,规格值下存在商品!");
                } else {
                    trParent.remove();
                    alert(data);
                }
            }
        });
}

function AddSpecValue() {
    var SpecValue = $("#productSpecValue").val();
    if (SpecValue == "") {
        alert("请输入1-5个字符的规格值!");
        return false;
    }
    if (SpecValue.length > 5) {
        alert("规格值最多不能超过五个字符");
        return false;
    }
    var newtr = '';
    var addTr = $("#tab_specValueList tbody");
    $.post('/Action/SpecList.ashx', { action: "AddSpecValue", SpecValue: SpecValue, SpecID: PublicSpecID },
        function (data) {
            var dataJson = JSON.parse(data);
            if (dataJson.flag == "false") {
                alert(dataJson.msg);
            } else {
                newtr += '<tr>';
                //newtr += '<td>' + dataJson.SpecValueID + '</td>';
                newtr += '<td><input id="tdSpecValue" type="text" placeholder="规格值名称" value="' + dataJson.Value + '" ToolTip="' + dataJson.Value + '" class="stati-maker stati-tool-item br4 right mg0 h24" disabled="disabled" ></td>';
                newtr += '<td>';
                newtr += '<a onclick="return SpecUpdate(this)" class="color-light-blue" href="javascript:void(0)">编辑</a>';
                newtr += '<a onclick="return SpecEdit(this)" SpecValueID="' + dataJson.SpecValueID + '" class="color-light-blue hidden" href="javascript:void(0)" >完成</a>';
                newtr += '&nbsp;<a onclick="return SpecDel(this)" SpecValueID="' + dataJson.SpecValueID + '" class="color-light-blue" href="javascript:void(0)">删除</a>';
                newtr += '</td>';
                newtr += '</tr>';
                addTr.append(newtr);
                $("#productSpecValue").val("");
            }
        });
}

function SpecEdit(obj) {
    var e = $(obj).parent().prev("td:eq(0)").find("input");
    var et = $(obj);
    var str = e.val().trim();
    var tool = e.attr("tooltip").trim();
    var svid = et.attr("SpecValueID").trim();
    if (str === "" || str.length === 0) {
        alert(" 请输入1-5个字符的规格值!");
        return false;
    }

    if (str.length > 5) {
        alert("规格值最多不能超过五个字符");
        return false;
    }

    if (str === tool) {
        et.addClass("hidden");
        et.prev("a:eq(0)").removeClass("hidden");
        e.attr("disabled", "disabled");
        return false;
    }

    $.post('/Action/SpecList.ashx', { action: "SpecEdit", SpecID: PublicSpecID, SpecValueID: svid, SpecValue: str, ToolTip: tool },
        function (data) {
            if (data != "" && data != "[]") {
                et.addClass("hidden");
                et.prev("a:eq(0)").removeClass("hidden");
                e.attr("disabled", "disabled");
            }
        });
}

function SpecUpdate(obj) {
    $(obj).addClass("hidden");
    $(obj).next("a:eq(0)").removeClass("hidden");
    $(obj).parent("td").prev("td:eq(0)").find("#tdSpecValue").removeAttr("disabled");
}