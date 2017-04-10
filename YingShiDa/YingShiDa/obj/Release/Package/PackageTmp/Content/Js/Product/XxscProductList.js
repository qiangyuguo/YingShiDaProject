/// <summary>
/// 添加列表JS
/// 开发人：郑开金
/// 开发时间：2016-10-11 10：21
/// </summary>

$(function () {

    var CPRODUCTLIST = {
        C: {

        },
        I: {
            Tpl: "#tab_productList"
        },
        DOM: {
            Template: {
                tr: function (colspan, array) {
                    if (array == null || array.length <= 0) {
                        CPRODUCTLIST.winDialog("该产品没有详情")
                        return;
                    }
                    var html = "<tr data-append='Detail' class='data-append-detail'>";
                    html += "<td colspan='" + colspan + "'>";
                    html += '<table class=" table table-bordered table-hover " id="tab_productList">';
                    html += "<thead>";
                    html += '<tr>';
                    html += '<th width="10%">详情编号</th>';
                    html += '<th width="10%">规格</th>';
                    html += '<th width="10%">价格</th>';
                    html += '<th width="10%">特价</th>';
                    html += '<th width="10%">条形码</th>';
                    html += '<th width="10%">状态</th>';
                    html += '</tr>';
                    html += "</thead>"
                    html += '<tbody>';
                    html += newTR();
                    html += '</tbody>';
                    html += " </table>";
                    return html;
                    function newTR() {
                        var newtr = '';
                        for (var i = 0, iLen = array.length; i < iLen; i++) {
                            var starts = array[i].Status == "1" ? "正常" : "删除";
                            newtr += '<tr>';
                            newtr += '<td>' + array[i].detailId + '</td>';
                            newtr += '<td>' + array[i].specAanSpecValue + '</td>';
                            newtr += '<td>' + array[i].price + '</td>';
                            newtr += '<td>' + array[i].offers + '</td>';
                            newtr += '<td>' + array[i].barcode + ' </td>';
                            newtr += '<td>' + starts + ' </td>';
                            newtr += '</tr>';
                        }
                        return newtr;
                    }
                    html += "</td>";
                    html += "<tr>";

                }
            }
        },
        winDialog: function (msg, ico) {
            layer.alert(msg, {
                icon: ico,
                skin: 'layer-ext-moon'
            });
        }
    };

    $(CPRODUCTLIST.I.Tpl + " tbody tr").find("td:eq(0)").on({
        click: function () {
            var thisObj = $(this);
            var thisTbody = $(this).parents("tbody");
            thisTbody.find('tr[data-append="Detail"]').remove();
            var thisisfh = $(this).text();
            thisTbody.find("tr").find("td:eq(0)").text("+");
            var datapi = $(this).attr("data-pi");
            var buessid = $("#hidBussid").val();
            if (datapi == null || datapi === '' || datapi.length <= 0 || buessid == null || buessid === '' || buessid.length <= 0) {
                return;
            }
            if (thisisfh.length > 0 && thisisfh === "+") {
                $.ajax({
                    type: "post",
                    url: 'http://' + window.location.host + '/Action/ProductServer.ashx?Action=detail' + '&pid=' + datapi + '&Bussid=' + buessid,
                    success: function (data) {
                        if (data == null || data == "") {
                            CPRODUCTLIST.winDialog("查询失败，请刷新页面后重试！", 2);
                            return;
                        }
                        var dataJson = JSON.parse(data);
                        if (dataJson != null && dataJson.State == "200" && dataJson.IsOK == true) {
                            thisObj.text("-");
                            thisObj.parent("tr").after(CPRODUCTLIST.DOM.Template.tr(9, dataJson.data.pDetail));
                        } else {
                            CPRODUCTLIST.winDialog(dataJson.Remarks, 5);
                        }
                    }
                });
            }
        }
    });

});