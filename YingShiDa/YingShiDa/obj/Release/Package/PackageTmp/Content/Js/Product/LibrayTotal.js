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
                        CPRODUCTLIST.winDialog("该商品没有库存")
                        return;
                    }
                    var html = "<tr data-append='Detail' class='data-append-detail'>";
                    html += "<td colspan='" + colspan + "'>";
                    html += '<table class=" table table-bordered table-hover " id="tab_productList">';
                    html += "<thead>";
                    html += '<tr>';
                    html += '<th width="40%">仓库名称</th>';
                    html += '<th width="40%">出库数量</th>';
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
                            newtr += '<tr>';
                            newtr += '<td>' + array[i].WarehouseName + '</td>';
                            newtr += '<td>' + parseFloat(array[i].ProductTotal) + '</td>';
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
                offset: '20%',
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
            var libraryStart= $("#txtLibraryStart").val();
            var libraryEnd = $("#txtLibraryEnd").val();
            if (datapi == null || datapi === '' || datapi.length <= 0 || buessid == null || buessid === '' || buessid.length <= 0) {
                return;
            }
            if (thisisfh.length > 0 && thisisfh === "+") {
                $.ajax({
                    type: "post",
                    url: 'http://' + window.location.host + '/Action/ProductServer.ashx?Action=' + $("#hfaction").val() + '&DetailsProductID=' + datapi + '&Bussid=' + buessid + '&startTime=' + libraryStart + '&toTime=' + libraryEnd,
                    success: function (data) {
                        if (data == null || data == "") {
                            CPRODUCTLIST.winDialog("查询失败，请刷新页面后重试！", 2);
                            return;
                        }
                        var dataJson = JSON.parse(data);
                        if (dataJson != null) {
                            thisObj.text("-");
                            thisObj.parent("tr").after(CPRODUCTLIST.DOM.Template.tr(9, dataJson));
                        } else {
                            CPRODUCTLIST.winDialog(dataJson, 5);
                        }
                    }
                });
            }
        }
    });

});